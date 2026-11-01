import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer from 'multer';
import nodemailer from 'nodemailer';
import { initializeApp, getApps } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  increment,
  writeBatch
} from 'firebase/firestore';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load firebase-applet-config.json
const firebaseConfigPath = path.resolve(__dirname, 'firebase-applet-config.json');
let firebaseConfig: any = {};
if (fs.existsSync(firebaseConfigPath)) {
  try {
    firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, 'utf8'));
  } catch (err) {
    console.error('Failed to parse firebase-applet-config.json', err);
  }
}

// Initialize Firebase App for server
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId)
  : getFirestore(firebaseApp);

// Ensure uploads directory exists
const uploadsDir = path.resolve(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for PDF uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, `${uniqueSuffix}-${safeName}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 30 * 1024 * 1024 }, // 30MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF documents are allowed.'));
    }
  },
});

// Configure Nodemailer for Email Delivery
let mailTransporter: any = null;

async function getMailTransporter(): Promise<any> {
  if (mailTransporter) return mailTransporter;

  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    mailTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    // Generate an Ethereal test account or local transport for zero-config out-of-the-box operation
    try {
      const testAccount = await nodemailer.createTestAccount();
      mailTransporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      console.log('Using Ethereal Mail Transporter for Devotional delivery:', testAccount.user);
    } catch {
      // Fallback JSON logger transport
      mailTransporter = nodemailer.createTransport({
        jsonTransport: true,
      });
    }
  }
  return mailTransporter;
}

// Admin secret token or password
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'devoted2026!';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(uploadsDir));

// Fallback devotional record if none exists in Firestore yet
const DEFAULT_DEVOTIONAL = {
  id: 'devoted-ones-vol-1',
  title: 'Walking in Devotion & Purpose (Volume 1)',
  description: 'A monthly deep-dive devotional workbook into cultivating steady spiritual consistency, scripture meditation, and daily prayer fellowship.',
  month: 'November 2026',
  fileUrl: '/devotional_sample.pdf',
  fileName: 'The_Devoted_Ones_Devotional_Vol1.pdf',
  fileSize: 2450000,
  isPublished: true,
  downloadsCount: 142,
  requestsCount: 238,
  createdAt: new Date().toISOString(),
};

// -------------------------------------------------------------
// API: GET /api/devotional/current
// Retrieves the currently published devotional
// -------------------------------------------------------------
app.get('/api/devotional/current', async (_req: Request, res: Response) => {
  try {
    const q = query(collection(db, 'devotionals'), where('isPublished', '==', true));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      const data = docSnap.data();
      return res.json({
        id: docSnap.id,
        ...data,
      });
    }
    return res.json(DEFAULT_DEVOTIONAL);
  } catch (error: any) {
    console.error('Error fetching current devotional:', error);
    return res.json(DEFAULT_DEVOTIONAL);
  }
});

// -------------------------------------------------------------
// API: POST /api/devotional/request
// Submits visitor information, logs to Firestore, triggers download link & email
// -------------------------------------------------------------
app.post('/api/devotional/request', async (req: Request, res: Response) => {
  try {
    const name = req.body.name || req.body.fullName;
    const email = req.body.email || req.body.emailAddress;
    const phone = req.body.phone || req.body.phoneNumber;
    const expectations = req.body.expectations;

    // 1. Server-side validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ error: 'Please provide a valid full name.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    if (!phone || typeof phone !== 'string' || phone.trim().replace(/\D/g, '').length < 7) {
      return res.status(400).json({ error: 'Please provide a valid phone or WhatsApp number (at least 7 digits).' });
    }

    // 2. Forward to Google Apps Script backend (SUBSCRIBERS Google Sheet) & retrieve configured devotional PDF
    const GOOGLE_APPS_SCRIPT_BACKEND_URL =
      process.env.GOOGLE_APPS_SCRIPT_URL ||
      'https://script.google.com/macros/s/AKfycbymhg5xHdsOs_15e2ZxnQCN0VZ3ZxOVhF8zJPzXlfLh3oR6w27NQXznydk0PFNRkz6_2Q/exec';

    let appsScriptDownloadUrl = '';
    let appsScriptMessage = '';
    let appsScriptSuccess = false;

    try {
      const appsScriptPayload = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        whatsapp: phone.trim(),
        fullName: name.trim(),
        emailAddress: email.trim().toLowerCase(),
        phoneNumber: phone.trim(),
        whatsappNumber: phone.trim(),
        expectations: expectations ? String(expectations).trim() : '',
      };

      const appsScriptRes = await fetch(GOOGLE_APPS_SCRIPT_BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(appsScriptPayload),
        redirect: 'follow',
      });

      if (appsScriptRes.ok) {
        const text = await appsScriptRes.text();
        try {
          const appsScriptData = JSON.parse(text);
          if (appsScriptData && appsScriptData.success) {
            appsScriptSuccess = true;
            appsScriptMessage = appsScriptData.message || '';
            if (appsScriptData.downloadUrl) {
              appsScriptDownloadUrl = appsScriptData.downloadUrl;
              console.log('Retrieved devotional download URL from Google Apps Script:', appsScriptDownloadUrl);
            }
          } else {
            console.warn('Apps Script returned unverified status:', appsScriptData);
          }
        } catch {
          console.warn('Apps Script response was not JSON:', text);
        }
      }
    } catch (appsScriptErr) {
      console.error('Error forwarding to Google Apps Script backend:', appsScriptErr);
    }

    // 3. Fetch current published devotional
    let publishedDevotional: any = DEFAULT_DEVOTIONAL;
    try {
      const q = query(collection(db, 'devotionals'), where('isPublished', '==', true));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        publishedDevotional = {
          id: snapshot.docs[0].id,
          ...snapshot.docs[0].data(),
        };
      }
    } catch (e) {
      console.warn('Could not read published devotional from Firestore, using default fallback.', e);
    }

    const effectiveDownloadUrl = appsScriptDownloadUrl || publishedDevotional.fileUrl;

    // 4. Save submission to Firestore
    const submissionDate = new Date().toISOString();
    let requestId = '';
    try {
      const docRef = await addDoc(collection(db, 'devotional_requests'), {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        expectations: expectations ? String(expectations).trim() : '',
        devotionalId: publishedDevotional.id,
        devotionalTitle: publishedDevotional.title,
        downloadUrl: effectiveDownloadUrl,
        downloaded: false,
        emailSent: false,
        appsScriptSaved: appsScriptSuccess,
        createdAt: submissionDate,
      });
      requestId = docRef.id;

      // Increment request count on the published devotional
      if (publishedDevotional.id !== DEFAULT_DEVOTIONAL.id) {
        const devotionalDocRef = doc(db, 'devotionals', publishedDevotional.id);
        await updateDoc(devotionalDocRef, {
          requestsCount: increment(1),
        });
      }
    } catch (dbErr) {
      console.error('Error saving to Firestore:', dbErr);
      requestId = 'req_' + Date.now();
    }

    // 4. Send Email with devotional download link
    let emailSuccess = false;
    let previewUrl = '';
    try {
      const transporter = await getMailTransporter();
      const host = req.get('host') || 'localhost:3000';
      const protocol = req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
      
      const fullDownloadUrl = effectiveDownloadUrl.startsWith('http')
        ? effectiveDownloadUrl
        : `${protocol}://${host}${effectiveDownloadUrl}`;

      const mailOptions = {
        from: process.env.FROM_EMAIL || '"THE DEVOTED ONES" <community@thedevotedones.org>',
        to: email.trim(),
        subject: `Your Devotional: ${publishedDevotional.title} - THE DEVOTED ONES`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #000000; color: #ffffff; padding: 32px 24px; border-radius: 12px; border: 1px solid #333333;">
            <div style="text-align: center; margin-bottom: 24px;">
              <span style="color: #FFD700; font-size: 11px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase;">THE DEVOTED ONES</span>
              <h1 style="color: #ffffff; font-size: 24px; margin: 8px 0; text-transform: uppercase;">Your Devotional E-Book is Ready</h1>
            </div>

            <p style="color: #cccccc; font-size: 15px; line-height: 1.6;">Dear ${name.trim()},</p>
            <p style="color: #cccccc; font-size: 15px; line-height: 1.6;">Thank you for requesting your copy of <strong>${publishedDevotional.title}</strong> (${publishedDevotional.month || 'Current Edition'}).</p>

            <div style="background-color: #0e0e0e; border: 1px solid #FFD700; border-radius: 8px; padding: 20px; margin: 24px 0; text-align: center;">
              <h2 style="color: #FFD700; font-size: 18px; margin: 0 0 10px 0;">${publishedDevotional.title}</h2>
              <p style="color: #bbbbbb; font-size: 13px; margin: 0 0 16px 0;">${publishedDevotional.description || ''}</p>
              <a href="${fullDownloadUrl}" style="background-color: #FFD700; color: #000000; font-weight: bold; font-size: 13px; text-transform: uppercase; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block;">Download Your Devotional PDF</a>
            </div>

            <p style="color: #999999; font-size: 13px; line-height: 1.5;">If the button does not work, copy and paste this link into your browser:<br/>
              <a href="${fullDownloadUrl}" style="color: #FFD700; word-break: break-all;">${fullDownloadUrl}</a>
            </p>

            <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #222222; text-align: center;">
              <p style="color: #cccccc; font-size: 14px; margin-bottom: 12px;"><strong>Join Our Daily Fellowship on WhatsApp</strong></p>
              <a href="https://chat.whatsapp.com/BeAyO0iD9JE0QWBTc7b2Yq?s=cl&p=a&mlu=4&ilr=4" style="background-color: #25D366; color: #ffffff; font-weight: bold; font-size: 12px; text-transform: uppercase; padding: 10px 20px; border-radius: 6px; text-decoration: none; display: inline-block;">Join Official WhatsApp Community</a>
              <p style="color: #666666; font-size: 11px; margin-top: 24px;">THE DEVOTED ONES &bull; Raising a generation rooted in the Word, growing in every area of life.</p>
            </div>
          </div>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      emailSuccess = true;
      previewUrl = nodemailer.getTestMessageUrl(info) || '';
      if (previewUrl) {
        console.log('Email delivery simulated via Ethereal:', previewUrl);
      }

      // Update request record with emailSent status
      if (requestId && !requestId.startsWith('req_')) {
        try {
          await updateDoc(doc(db, 'devotional_requests', requestId), {
            emailSent: true,
          });
        } catch {}
      }
    } catch (emailErr) {
      console.warn('Email dispatch warning (handled gracefully):', emailErr);
    }

    return res.status(200).json({
      success: true,
      requestId,
      devotional: {
        ...publishedDevotional,
        fileUrl: effectiveDownloadUrl,
      },
      downloadUrl: effectiveDownloadUrl,
      fileName: publishedDevotional.fileName || 'The_Devoted_Ones_Devotional.pdf',
      emailSent: emailSuccess,
      previewUrl,
      appsScriptSaved: appsScriptSuccess,
      message: appsScriptMessage || 'Devotional request received successfully! Your download will start automatically.',
    });
  } catch (error: any) {
    console.error('Request processing error:', error);
    return res.status(500).json({ error: error.message || 'Failed to process devotional request. Please try again.' });
  }
});

// -------------------------------------------------------------
// API: POST /api/devotional/download-click
// Increments download counters
// -------------------------------------------------------------
app.post('/api/devotional/download-click', async (req: Request, res: Response) => {
  try {
    const { devotionalId, requestId } = req.body;
    if (devotionalId && devotionalId !== DEFAULT_DEVOTIONAL.id) {
      try {
        const devotionalRef = doc(db, 'devotionals', devotionalId);
        await updateDoc(devotionalRef, {
          downloadsCount: increment(1),
        });
      } catch (e) {
        console.warn('Error incrementing devotional downloadsCount:', e);
      }
    }

    if (requestId && !requestId.startsWith('req_')) {
      try {
        const reqRef = doc(db, 'devotional_requests', requestId);
        await updateDoc(reqRef, {
          downloaded: true,
        });
      } catch (e) {
        console.warn('Error updating request downloaded flag:', e);
      }
    }

    return res.json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// ADMIN AUTHENTICATION MIDDLEWARE
// -------------------------------------------------------------
function requireAdmin(req: Request, res: Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  const token = (authHeader && authHeader.split(' ')[1]) || (req.query.token as string);

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Admin authentication token required.' });
  }

  // Token is verified against admin password or valid admin session
  if (token === ADMIN_PASSWORD || token === 'admin-authenticated-token') {
    return next();
  }

  return res.status(403).json({ error: 'Forbidden: Invalid administrator credentials.' });
}

// -------------------------------------------------------------
// API: POST /api/admin/login
// Admin verification
// -------------------------------------------------------------
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { password, email } = req.body;
  if (password === ADMIN_PASSWORD || (email === 'thewinnerman111@gmail.com' && password === 'devoted2026!')) {
    return res.json({
      success: true,
      token: 'admin-authenticated-token',
      user: {
        email: email || 'admin@thedevotedones.org',
        role: 'admin',
      },
    });
  }
  return res.status(401).json({ error: 'Incorrect administrator password.' });
});

// -------------------------------------------------------------
// API: GET /api/admin/stats & subscribers
// Lists all people who have requested a copy + stats
// -------------------------------------------------------------
app.get('/api/admin/subscribers', requireAdmin, async (_req: Request, res: Response) => {
  try {
    const q = query(collection(db, 'devotional_requests'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    const subscribers: any[] = [];
    let totalDownloads = 0;

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.downloaded) totalDownloads++;
      subscribers.push({
        id: docSnap.id,
        ...data,
      });
    });

    // Query published devotionals count & library stats
    let publishedCount = 0;
    let activeTitle = 'The Devoted Life Devotional';
    let devotionalDownloads = 0;
    let totalDevotionals = 0;
    try {
      const devSnap = await getDocs(collection(db, 'devotionals'));
      totalDevotionals = devSnap.size;
      devSnap.forEach((docSnap) => {
        const dev = docSnap.data();
        if (dev.isPublished) {
          publishedCount++;
          activeTitle = dev.title || activeTitle;
        }
        if (dev.downloadsCount) devotionalDownloads += Number(dev.downloadsCount);
      });
    } catch (e) {
      console.warn('Error reading devotionals for stats:', e);
    }

    const recentRequests = subscribers.slice(0, 5);

    return res.json({
      subscribers,
      stats: {
        totalRequests: subscribers.length,
        totalDownloads: Math.max(totalDownloads, devotionalDownloads),
        publishedDevotionalsCount: publishedCount,
        totalDevotionalsCount: totalDevotionals || 1,
        activeEditionTitle: activeTitle,
        recentRequests,
      },
    });
  } catch (error: any) {
    console.error('Error fetching subscribers:', error);
    return res.status(500).json({ error: error.message || 'Failed to fetch subscribers.' });
  }
});

// -------------------------------------------------------------
// API: GET /api/admin/subscribers/export
// Exports subscriber information as CSV
// -------------------------------------------------------------
app.get('/api/admin/subscribers/export', requireAdmin, async (_req: Request, res: Response) => {
  try {
    const q = query(collection(db, 'devotional_requests'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    let csvContent = 'ID,Full Name,Email Address,Phone / WhatsApp,Expectations,Devotional Title,Downloaded,Email Sent,Submission Date\n';

    snapshot.forEach((docSnap) => {
      const d = docSnap.data();
      const escape = (str: any) => `"${String(str || '').replace(/"/g, '""')}"`;
      csvContent += `${escape(docSnap.id)},${escape(d.name)},${escape(d.email)},${escape(d.phone)},${escape(d.expectations)},${escape(d.devotionalTitle)},${escape(d.downloaded ? 'Yes' : 'No')},${escape(d.emailSent ? 'Yes' : 'No')},${escape(d.createdAt)}\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="devoted_ones_subscribers.csv"');
    return res.status(200).send(csvContent);
  } catch (error: any) {
    console.error('Error exporting CSV:', error);
    return res.status(500).send('Error generating CSV export.');
  }
});

// -------------------------------------------------------------
// API: GET /api/admin/devotionals
// Lists all devotionals
// -------------------------------------------------------------
app.get('/api/admin/devotionals', requireAdmin, async (_req: Request, res: Response) => {
  try {
    const snapshot = await getDocs(collection(db, 'devotionals'));
    const devotionals: any[] = [];
    snapshot.forEach((docSnap) => {
      devotionals.push({
        id: docSnap.id,
        ...docSnap.data(),
      });
    });

    // If none in firestore, include default
    if (devotionals.length === 0) {
      devotionals.push(DEFAULT_DEVOTIONAL);
    }

    return res.json({ devotionals });
  } catch (error: any) {
    console.error('Error fetching devotionals:', error);
    return res.json({ devotionals: [DEFAULT_DEVOTIONAL] });
  }
});

// -------------------------------------------------------------
// API: POST /api/admin/devotionals/upload
// Uploads a new monthly devotional PDF & adds to Firestore
// -------------------------------------------------------------
app.post(
  '/api/admin/devotionals/upload',
  requireAdmin,
  upload.single('pdf'),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Please select a valid PDF file to upload.' });
      }

      const title = req.body.title;
      const description = req.body.description;
      const month = req.body.month || req.body.publicationMonth;
      const isPublished = req.body.publishImmediately === 'true' || req.body.publishImmediately === true || req.body.publishNow === 'true' || req.body.publishNow === true;

      if (!title || !String(title).trim()) {
        return res.status(400).json({ error: 'Devotional title is required.' });
      }

      const fileUrl = `/uploads/${req.file.filename}`;

      // If published, unpublish other existing devotionals
      if (isPublished) {
        try {
          const publishedSnapshot = await getDocs(
            query(collection(db, 'devotionals'), where('isPublished', '==', true))
          );
          const batch = writeBatch(db);
          publishedSnapshot.forEach((docSnap) => {
            batch.update(docSnap.ref, { isPublished: false, updatedAt: new Date().toISOString() });
          });
          await batch.commit();
        } catch (e) {
          console.warn('Batch unpublish warning:', e);
        }
      }

      const newDevotional = {
        title: title.trim(),
        description: description ? description.trim() : '',
        month: month ? month.trim() : new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        fileUrl,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        isPublished,
        downloadsCount: 0,
        requestsCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, 'devotionals'), newDevotional);

      return res.status(201).json({
        success: true,
        devotional: {
          id: docRef.id,
          ...newDevotional,
        },
        message: 'Devotional PDF uploaded and saved successfully!',
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      return res.status(500).json({ error: error.message || 'Failed to upload devotional.' });
    }
  }
);

// -------------------------------------------------------------
// API: POST /api/admin/devotionals/publish
// Changes the currently published devotional
// -------------------------------------------------------------
app.post('/api/admin/devotionals/publish', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { devotionalId } = req.body;
    if (!devotionalId) {
      return res.status(400).json({ error: 'devotionalId is required.' });
    }

    // Unpublish all
    const allPublished = await getDocs(
      query(collection(db, 'devotionals'), where('isPublished', '==', true))
    );
    const batch = writeBatch(db);
    allPublished.forEach((docSnap) => {
      batch.update(docSnap.ref, { isPublished: false, updatedAt: new Date().toISOString() });
    });
    await batch.commit();

    // Publish target
    if (devotionalId !== DEFAULT_DEVOTIONAL.id) {
      const targetRef = doc(db, 'devotionals', devotionalId);
      await updateDoc(targetRef, {
        isPublished: true,
        updatedAt: new Date().toISOString(),
      });
    }

    return res.json({
      success: true,
      message: 'Published devotional updated successfully!',
    });
  } catch (error: any) {
    console.error('Publish error:', error);
    return res.status(500).json({ error: error.message || 'Failed to publish devotional.' });
  }
});

// -------------------------------------------------------------
// API: POST /api/admin/devotionals/unpublish
// -------------------------------------------------------------
app.post('/api/admin/devotionals/unpublish', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { devotionalId } = req.body;
    if (!devotionalId) {
      return res.status(400).json({ error: 'devotionalId is required.' });
    }

    if (devotionalId !== DEFAULT_DEVOTIONAL.id) {
      const targetRef = doc(db, 'devotionals', devotionalId);
      await updateDoc(targetRef, {
        isPublished: false,
        updatedAt: new Date().toISOString(),
      });
    }

    return res.json({
      success: true,
      message: 'Devotional unpublished successfully.',
    });
  } catch (error: any) {
    console.error('Unpublish error:', error);
    return res.status(500).json({ error: error.message || 'Failed to unpublish devotional.' });
  }
});

// -------------------------------------------------------------
// API: POST /api/admin/devotionals/:id/replace-pdf
// Replaces the PDF file for an existing publication
// -------------------------------------------------------------
app.post(
  '/api/admin/devotionals/:id/replace-pdf',
  requireAdmin,
  upload.single('pdf'),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!req.file) {
        return res.status(400).json({ error: 'Please upload a replacement PDF file.' });
      }

      const fileUrl = `/uploads/${req.file.filename}`;
      const targetRef = doc(db, 'devotionals', id);
      await updateDoc(targetRef, {
        fileUrl,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        updatedAt: new Date().toISOString(),
      });

      return res.json({
        success: true,
        fileUrl,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        message: 'Devotional PDF file replaced successfully!',
      });
    } catch (error: any) {
      console.error('Replace PDF error:', error);
      return res.status(500).json({ error: error.message || 'Failed to replace PDF file.' });
    }
  }
);

// -------------------------------------------------------------
// API: DELETE /api/admin/devotionals/:id
// -------------------------------------------------------------
app.delete('/api/admin/devotionals/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (id !== DEFAULT_DEVOTIONAL.id) {
      await deleteDoc(doc(db, 'devotionals', id));
    }
    return res.json({ success: true, message: 'Devotional deleted successfully.' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------
// MOUNT VITE IN DEV / SERVE DIST IN PRODUCTION
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
