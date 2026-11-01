import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  LogOut,
  Upload,
  Download,
  FileText,
  Users,
  CheckCircle2,
  Clock,
  Search,
  ExternalLink,
  Trash2,
  RefreshCw,
  ArrowLeft,
  AlertCircle,
  FileCheck,
  ShieldCheck,
  Radio,
  FileUp,
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
  X,
  Eye,
} from 'lucide-react';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { BrandLogo } from './BrandLogo';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

interface SubscriberRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  expectations?: string;
  devotionalTitle?: string;
  downloaded: boolean;
  emailSent: boolean;
  createdAt: string;
}

interface DevotionalEdition {
  id: string;
  title: string;
  description: string;
  month?: string;
  publicationMonth?: string;
  fileName: string;
  fileUrl: string;
  fileSize?: number;
  isPublished: boolean;
  requestsCount: number;
  downloadsCount: number;
  createdAt: string;
  updatedAt?: string;
}

const AUTHORIZED_ADMIN_EMAILS = [
  'thewinnerman111@gmail.com',
  'admin@thedevotedones.org',
  'thewinnerolubode@gmail.com',
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite }) => {
  // Auth state
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [token, setToken] = useState<string>(() => sessionStorage.getItem('devoted_admin_token') || '');
  const [adminEmail, setAdminEmail] = useState<string>(() => sessionStorage.getItem('devoted_admin_email') || 'thewinnerman111@gmail.com');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Tab navigation: 'overview' | 'subscribers' | 'devotionals'
  const [activeTab, setActiveTab] = useState<'overview' | 'subscribers' | 'devotionals'>('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [subscribers, setSubscribers] = useState<SubscriberRequest[]>([]);
  const [devotionals, setDevotionals] = useState<DevotionalEdition[]>([]);
  const [stats, setStats] = useState({
    totalRequests: 0,
    totalDownloads: 0,
    publishedDevotionalsCount: 1,
    totalDevotionalsCount: 1,
    activeEditionTitle: 'Walking in Devotion & Purpose (Volume 1)',
    recentRequests: [] as SubscriberRequest[],
  });

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadFilter, setDownloadFilter] = useState<'all' | 'downloaded' | 'pending'>('all');
  const [libraryFilter, setLibraryFilter] = useState<'all' | 'published' | 'archived'>('all');

  // Upload Form state
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadMonth, setUploadMonth] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [publishImmediately, setPublishImmediately] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);
  const [uploadErrorMessage, setUploadErrorMessage] = useState<string | null>(null);

  // Replace PDF Modal State
  const [replacingDevotional, setReplacingDevotional] = useState<DevotionalEdition | null>(null);
  const [replacementFile, setReplacementFile] = useState<File | null>(null);
  const [isReplacingPdf, setIsReplacingPdf] = useState(false);
  const [replaceError, setReplaceError] = useState<string | null>(null);

  // General Action Alert
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.email && AUTHORIZED_ADMIN_EMAILS.includes(user.email.toLowerCase())) {
          setCurrentUser(user);
          const idToken = await user.getIdToken();
          setToken(idToken);
          sessionStorage.setItem('devoted_admin_token', idToken);
          sessionStorage.setItem('devoted_admin_email', user.email);
          fetchData(idToken);
        } else {
          setLoginError(`Access denied: ${user.email} is not authorized as an administrator.`);
          signOut(auth);
        }
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch data when token is available
  const fetchData = async (authToken = token) => {
    if (!authToken) return;
    setIsLoading(true);
    try {
      // 1. Fetch Subscribers & Stats
      const subsRes = await fetch('/api/admin/subscribers', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (subsRes.ok) {
        const subsData = await subsRes.json();
        setSubscribers(subsData.subscribers || []);
        if (subsData.stats) {
          setStats((prev) => ({
            ...prev,
            ...subsData.stats,
            recentRequests: subsData.stats.recentRequests || subsData.subscribers?.slice(0, 5) || [],
          }));
        }
      } else if (subsRes.status === 401 || subsRes.status === 403) {
        handleLogout();
        return;
      }

      // 2. Fetch Devotionals
      const devRes = await fetch('/api/admin/devotionals', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (devRes.ok) {
        const devData = await devRes.json();
        setDevotionals(devData.devotionals || []);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [token]);

  // Handle Email & Password Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      // 1. Try Firebase Auth client sign-in first
      try {
        const userCredential = await signInWithEmailAndPassword(auth, adminEmail, passwordInput);
        if (userCredential.user.email && AUTHORIZED_ADMIN_EMAILS.includes(userCredential.user.email.toLowerCase())) {
          const idToken = await userCredential.user.getIdToken();
          setToken(idToken);
          sessionStorage.setItem('devoted_admin_token', idToken);
          sessionStorage.setItem('devoted_admin_email', userCredential.user.email);
          setPasswordInput('');
          fetchData(idToken);
          setIsLoggingIn(false);
          return;
        }
      } catch (firebaseErr: any) {
        // Fall back to backend authentication check
      }

      // 2. Backend verification check
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: passwordInput }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid administrator password.');
      }

      const receivedToken = data.token;
      setToken(receivedToken);
      sessionStorage.setItem('devoted_admin_token', receivedToken);
      sessionStorage.setItem('devoted_admin_email', adminEmail);
      setPasswordInput('');
      fetchData(receivedToken);
    } catch (err: any) {
      setLoginError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setLoginError(null);
    setIsLoggingIn(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email?.toLowerCase();
      if (email && AUTHORIZED_ADMIN_EMAILS.includes(email)) {
        const idToken = await result.user.getIdToken();
        setToken(idToken);
        sessionStorage.setItem('devoted_admin_token', idToken);
        sessionStorage.setItem('devoted_admin_email', email);
        fetchData(idToken);
      } else {
        await signOut(auth);
        setLoginError(`Access denied: ${email} is not authorized as an administrator.`);
      }
    } catch (err: any) {
      setLoginError(err.message || 'Google sign-in encountered an issue.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch {}
    setToken('');
    setCurrentUser(null);
    sessionStorage.removeItem('devoted_admin_token');
    sessionStorage.removeItem('devoted_admin_email');
  };

  // Toggle Publish / Unpublish
  const handlePublishDevotional = async (devotionalId: string) => {
    try {
      const res = await fetch('/api/admin/devotionals/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ devotionalId }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setActionMessage('Published! Visitors will now download and receive this edition.');
        fetchData();
        setTimeout(() => setActionMessage(null), 4000);
      } else {
        alert(data.error || 'Failed to update published edition');
      }
    } catch (err: any) {
      alert(err.message || 'Server error publishing devotional');
    }
  };

  const handleUnpublishDevotional = async (devotionalId: string) => {
    try {
      const res = await fetch('/api/admin/devotionals/unpublish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ devotionalId }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setActionMessage('Devotional unpublished.');
        fetchData();
        setTimeout(() => setActionMessage(null), 4000);
      } else {
        alert(data.error || 'Failed to unpublish devotional');
      }
    } catch (err: any) {
      alert(err.message || 'Server error unpublishing devotional');
    }
  };

  // Replace PDF File for an existing devotional
  const handleReplacePdfSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replacingDevotional || !replacementFile) {
      setReplaceError('Please select a replacement PDF file.');
      return;
    }

    setIsReplacingPdf(true);
    setReplaceError(null);

    try {
      const formData = new FormData();
      formData.append('pdf', replacementFile);

      const res = await fetch(`/api/admin/devotionals/${replacingDevotional.id}/replace-pdf`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to replace PDF file.');
      }

      setActionMessage(`PDF successfully replaced for "${replacingDevotional.title}".`);
      setReplacingDevotional(null);
      setReplacementFile(null);
      fetchData();
      setTimeout(() => setActionMessage(null), 4000);
    } catch (err: any) {
      setReplaceError(err.message || 'Error uploading replacement PDF.');
    } finally {
      setIsReplacingPdf(false);
    }
  };

  // Delete publication
  const handleDeleteDevotional = async (devotionalId: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/devotionals/${devotionalId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setActionMessage(`Devotional "${title}" deleted.`);
        fetchData();
        setTimeout(() => setActionMessage(null), 4000);
      } else {
        alert(data.error || 'Failed to delete devotional');
      }
    } catch (err: any) {
      alert(err.message || 'Server error deleting devotional');
    }
  };

  // Upload New Devotional
  const handleUploadDevotional = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadErrorMessage(null);
    setUploadSuccessMessage(null);

    if (!uploadTitle.trim()) {
      setUploadErrorMessage('Please provide a title for this devotional edition.');
      return;
    }

    if (!uploadFile) {
      setUploadErrorMessage('Please select a PDF file from your device.');
      return;
    }

    if (!uploadFile.name.toLowerCase().endsWith('.pdf')) {
      setUploadErrorMessage('Only PDF files (.pdf) are supported.');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('pdf', uploadFile);
      formData.append('title', uploadTitle.trim());
      formData.append('description', uploadDescription.trim());
      formData.append(
        'publicationMonth',
        uploadMonth.trim() || new Date().toLocaleString('default', { month: 'long', year: 'numeric' })
      );
      formData.append('publishNow', publishImmediately ? 'true' : 'false');

      const res = await fetch('/api/admin/devotionals/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload devotional file.');
      }

      setUploadSuccessMessage(
        `Successfully uploaded "${uploadTitle}"! ${
          publishImmediately ? 'It is now the active published edition on the website.' : ''
        }`
      );
      setUploadTitle('');
      setUploadMonth('');
      setUploadDescription('');
      setUploadFile(null);
      fetchData();
      setTimeout(() => setUploadSuccessMessage(null), 5000);
    } catch (err: any) {
      setUploadErrorMessage(err.message || 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleExportCsv = () => {
    window.open(`/api/admin/subscribers/export?token=${encodeURIComponent(token)}`, '_blank');
  };

  // Filter subscribers
  const filteredSubscribers = subscribers.filter((sub) => {
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      sub.name.toLowerCase().includes(query) ||
      sub.email.toLowerCase().includes(query) ||
      sub.phone.toLowerCase().includes(query) ||
      (sub.devotionalTitle && sub.devotionalTitle.toLowerCase().includes(query)) ||
      (sub.expectations && sub.expectations.toLowerCase().includes(query));

    if (!matchesQuery) return false;

    if (downloadFilter === 'downloaded') return sub.downloaded;
    if (downloadFilter === 'pending') return !sub.downloaded;
    return true;
  });

  // Filter devotionals
  const filteredDevotionals = devotionals.filter((item) => {
    if (libraryFilter === 'published') return item.isPublished;
    if (libraryFilter === 'archived') return !item.isPublished;
    return true;
  });

  // =============================================================
  // 1. ADMIN LOGIN VIEW
  // =============================================================
  if (!token) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md bg-[#0d0d0d] border border-[#FFD700]/30 rounded-2xl p-8 shadow-[0_16px_50px_rgba(0,0,0,0.9)]"
        >
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-[#FFD700]/15 border border-[#FFD700] flex items-center justify-center text-[#FFD700] mb-3">
              <Lock className="h-6 w-6" />
            </div>
            <BrandLogo size="sm" showText={true} interactive={false} />
            <h1 className="font-hyperbonnard text-2xl uppercase tracking-wider text-white mt-3">
              Administrator Login
            </h1>
            <p className="text-xs text-white/70 font-sans mt-1">
              Authorized access to subscribers, analytics, and devotional publications.
            </p>
          </div>

          {loginError && (
            <div className="mb-5 p-3.5 rounded-lg bg-[#F00020]/15 border border-[#F00020]/40 flex items-start gap-2.5 text-xs text-[#F00020]">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Google Sign In option */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoggingIn}
            className="w-full mb-4 inline-flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer disabled:opacity-50"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign In with Google</span>
          </button>

          <div className="relative my-4 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <span className="relative bg-[#0d0d0d] px-3 text-[11px] uppercase tracking-wider text-white/40">
              Or with Admin Password
            </span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/90 mb-1.5">
                Admin Email Address
              </label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="thewinnerman111@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-[#FFD700]/30 text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/90 mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password"
                className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-[#FFD700]/30 text-sm text-white placeholder-white/35 focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white transition-all shadow-[0_4px_16px_rgba(255,215,0,0.25)] cursor-pointer disabled:opacity-50"
            >
              {isLoggingIn ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  <span>Verifying Credentials…</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  <span>Sign In to Admin Portal</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={onBackToSite}
              className="text-white/60 hover:text-[#FFD700] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Main Site</span>
            </button>
            <span className="text-white/40 font-mono text-[11px]">Firebase Secured</span>
          </div>
        </motion.div>
      </div>
    );
  }

  // =============================================================
  // 2. DASHBOARD VIEW (AUTHENTICATED)
  // =============================================================
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Bar */}
      <header className="border-b border-[#FFD700]/25 bg-[#0a0a0a]/90 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" showText={false} interactive={false} />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-hyperbonnard text-lg uppercase tracking-wider text-[#FFD700]">
                  THE DEVOTED ONES
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#FFD700]/15 text-[#FFD700] border border-[#FFD700]/40">
                  Admin Console
                </span>
              </div>
              <p className="text-[11px] text-white/60">
                Firestore Database · Cloud Storage · Firebase Authentication
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToSite}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-[#FFD700] hover:bg-white/5 border border-white/15 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>View Website</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-[#F00020] hover:bg-[#F00020]/10 border border-[#F00020]/30 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action notification banner */}
        {actionMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3.5 rounded-xl bg-[#FFD700]/15 border border-[#FFD700]/40 flex items-center justify-between gap-3 text-xs text-[#FFD700]"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{actionMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setActionMessage(null)}
              className="text-white/60 hover:text-white"
            >
              ✕
            </button>
          </motion.div>
        )}

        {/* 4 CORE DASHBOARD METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Metric 1: Total Registered Subscribers */}
          <div className="rounded-xl border border-[#FFD700]/30 bg-[#0c0c0c] p-5 shadow-sm">
            <div className="flex items-center justify-between text-white/60 mb-2">
              <span className="text-xs uppercase font-semibold tracking-wider">Registered Subscribers</span>
              <Users className="h-4 w-4 text-[#FFD700]" />
            </div>
            <div className="font-hyperbonnard text-3xl text-white">
              {stats.totalRequests || subscribers.length}
            </div>
            <span className="text-[11px] text-white/50 mt-1 block">Total devotional request submissions</span>
          </div>

          {/* Metric 2: Total PDF Downloads */}
          <div className="rounded-xl border border-[#FFD700]/30 bg-[#0c0c0c] p-5 shadow-sm">
            <div className="flex items-center justify-between text-white/60 mb-2">
              <span className="text-xs uppercase font-semibold tracking-wider">Total PDF Downloads</span>
              <Download className="h-4 w-4 text-[#FFD700]" />
            </div>
            <div className="font-hyperbonnard text-3xl text-[#FFD700]">
              {stats.totalDownloads}
            </div>
            <span className="text-[11px] text-white/50 mt-1 block">Successful devotional downloads</span>
          </div>

          {/* Metric 3: Number of Published Devotionals */}
          <div className="rounded-xl border border-[#FFD700]/30 bg-[#0c0c0c] p-5 shadow-sm">
            <div className="flex items-center justify-between text-white/60 mb-2">
              <span className="text-xs uppercase font-semibold tracking-wider">Published Devotionals</span>
              <Radio className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="font-hyperbonnard text-3xl text-white">
              {stats.publishedDevotionalsCount}
              <span className="text-sm font-sans text-white/40 font-normal ml-2">
                / {devotionals.length || 1} total
              </span>
            </div>
            <span className="text-[11px] text-white/50 mt-1 block">Currently active on the website</span>
          </div>

          {/* Metric 4: Currently Active Edition */}
          <div className="rounded-xl border border-[#FFD700]/30 bg-[#0c0c0c] p-5 shadow-sm">
            <div className="flex items-center justify-between text-white/60 mb-2">
              <span className="text-xs uppercase font-semibold tracking-wider">Active Website Edition</span>
              <FileCheck className="h-4 w-4 text-[#FFD700]" />
            </div>
            <div className="font-medium text-xs text-white line-clamp-1 mb-1.5" title={stats.activeEditionTitle}>
              {stats.activeEditionTitle}
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('devotionals')}
              className="text-[11px] text-[#FFD700] hover:underline inline-flex items-center gap-1"
            >
              <span>Manage in PDF section</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-white/10 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`inline-flex items-center gap-2 px-4 sm:px-5 py-3 border-b-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-[#FFD700] text-[#FFD700] bg-white/5'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('subscribers')}
              className={`inline-flex items-center gap-2 px-4 sm:px-5 py-3 border-b-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'subscribers'
                  ? 'border-[#FFD700] text-[#FFD700] bg-white/5'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Subscriber Management ({subscribers.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('devotionals')}
              className={`inline-flex items-center gap-2 px-4 sm:px-5 py-3 border-b-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'devotionals'
                  ? 'border-[#FFD700] text-[#FFD700] bg-white/5'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>PDF Management & Library ({devotionals.length})</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => fetchData()}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            title="Refresh database records"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: DASHBOARD OVERVIEW (Summary & Recent Requests)    */}
        {/* ======================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Recent Devotional Requests Section */}
            <div className="rounded-xl border border-white/15 bg-[#0c0c0c] p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-white/10">
                <div>
                  <h3 className="font-hyperbonnard text-xl uppercase tracking-wide text-white">
                    Recent Devotional Requests
                  </h3>
                  <p className="text-xs text-white/60 mt-0.5">
                    Real-time visitor submissions logged directly to Firestore.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleExportCsv}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white transition-colors cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('subscribers')}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-[#FFD700] hover:bg-white/5 border border-white/15 transition-colors cursor-pointer"
                  >
                    <span>View All ({subscribers.length})</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {subscribers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white/5 border-b border-white/10 text-white/70 uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="py-2.5 px-3">Subscriber</th>
                        <th className="py-2.5 px-3">Contact</th>
                        <th className="py-2.5 px-3">Requested Devotional</th>
                        <th className="py-2.5 px-3">Download Status</th>
                        <th className="py-2.5 px-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {subscribers.slice(0, 5).map((sub) => (
                        <tr key={sub.id} className="hover:bg-white/[0.02]">
                          <td className="py-3 px-3 font-medium text-white">
                            <div>{sub.name}</div>
                            {sub.expectations && (
                              <div className="text-[11px] text-white/50 italic line-clamp-1 max-w-xs">
                                "{sub.expectations}"
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-3">
                            <div className="font-mono text-white/90">{sub.email}</div>
                            <div className="font-mono text-white/60 text-[11px]">{sub.phone}</div>
                          </td>
                          <td className="py-3 px-3 text-white/70 max-w-xs truncate">
                            {sub.devotionalTitle || 'Current Edition'}
                          </td>
                          <td className="py-3 px-3">
                            {sub.downloaded ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                <CheckCircle2 className="h-3 w-3" />
                                Downloaded
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-amber-500/15 text-amber-400 border border-amber-500/30">
                                <Clock className="h-3 w-3" />
                                Requested
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-white/50 font-mono text-[11px] whitespace-nowrap">
                            {new Date(sub.createdAt).toLocaleString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-8 text-center text-white/50 text-xs">
                  No subscriber requests logged yet. As visitors request devotionals, they will appear here in real time.
                </div>
              )}
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-[#FFD700]/30 bg-[#0c0c0c] p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[#FFD700] text-xs font-bold uppercase tracking-wider mb-2">
                    <Upload className="h-4 w-4" />
                    <span>Upload New Devotional</span>
                  </div>
                  <h4 className="font-hyperbonnard text-lg text-white mb-2">
                    Upload & Publish Monthly Edition
                  </h4>
                  <p className="text-xs text-white/70 leading-relaxed mb-4">
                    Add new PDF files directly from your device. When published, the website request form automatically switches to deliver this new copy to all subsequent visitors.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('devotionals')}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white transition-colors cursor-pointer"
                >
                  <FileUp className="h-4 w-4" />
                  <span>Go to PDF Upload Section</span>
                </button>
              </div>

              <div className="rounded-xl border border-white/15 bg-[#0c0c0c] p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-wider mb-2">
                    <Users className="h-4 w-4 text-[#FFD700]" />
                    <span>Subscriber Management</span>
                  </div>
                  <h4 className="font-hyperbonnard text-lg text-white mb-2">
                    Search & Export Requesters
                  </h4>
                  <p className="text-xs text-white/70 leading-relaxed mb-4">
                    View complete names, verified email addresses, WhatsApp numbers, spiritual goals, and download statuses. Export full spreadsheets anytime.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('subscribers')}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors cursor-pointer"
                >
                  <Users className="h-4 w-4" />
                  <span>Open Subscriber Database</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: SUBSCRIBER MANAGEMENT                            */}
        {/* ======================================================== */}
        {activeTab === 'subscribers' && (
          <div className="space-y-4">
            {/* Search and Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex flex-1 items-center gap-2 max-w-md">
                <div className="relative w-full">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, email, phone, or devotional…"
                    className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-[#0c0c0c] border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#FFD700]"
                  />
                </div>

                <select
                  value={downloadFilter}
                  onChange={(e: any) => setDownloadFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-[#0c0c0c] border border-white/15 text-xs text-white focus:outline-none focus:border-[#FFD700] cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="downloaded">Downloaded</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              {/* Export to CSV Button */}
              <button
                type="button"
                onClick={handleExportCsv}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white transition-colors cursor-pointer shadow-sm"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export as CSV</span>
              </button>
            </div>

            {/* Subscribers Table Container */}
            <div className="rounded-xl border border-white/15 bg-[#0c0c0c] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 border-b border-white/10 text-white/70 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="py-3 px-4">Full Name</th>
                      <th className="py-3 px-4">Email Address</th>
                      <th className="py-3 px-4">WhatsApp / Phone</th>
                      <th className="py-3 px-4">Devotional Requested</th>
                      <th className="py-3 px-4">Download Status</th>
                      <th className="py-3 px-4">Email Sent</th>
                      <th className="py-3 px-4">Date & Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredSubscribers.length > 0 ? (
                      filteredSubscribers.map((sub) => (
                        <tr key={sub.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4 font-medium text-white">
                            <div>{sub.name}</div>
                            {sub.expectations && (
                              <div className="text-[11px] text-white/50 italic line-clamp-1 max-w-xs mt-0.5">
                                "{sub.expectations}"
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-white/90">
                            <a href={`mailto:${sub.email}`} className="hover:text-[#FFD700] hover:underline">
                              {sub.email}
                            </a>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-white/80">
                            <a
                              href={`https://wa.me/${sub.phone.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-[#FFD700] hover:underline inline-flex items-center gap-1"
                            >
                              <span>{sub.phone}</span>
                              <ExternalLink className="h-3 w-3 opacity-60" />
                            </a>
                          </td>
                          <td className="py-3.5 px-4 text-white/70 max-w-xs truncate">
                            {sub.devotionalTitle || 'Current Edition'}
                          </td>
                          <td className="py-3.5 px-4">
                            {sub.downloaded ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                <CheckCircle2 className="h-3 w-3" />
                                Downloaded
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-500/15 text-amber-400 border border-amber-500/30">
                                <Clock className="h-3 w-3" />
                                Requested
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            {sub.emailSent ? (
                              <span className="text-emerald-400 text-[11px] font-medium">✓ Sent</span>
                            ) : (
                              <span className="text-white/40 text-[11px]">Queued</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-white/50 font-mono text-[11px] whitespace-nowrap">
                            {new Date(sub.createdAt).toLocaleString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-white/50 text-xs">
                          {searchQuery
                            ? 'No subscribers match your search query.'
                            : 'No devotional requests logged yet. When visitors request the devotional e-book, they will appear here in real time.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: PDF MANAGEMENT & DEVOTIONAL LIBRARY               */}
        {/* ======================================================== */}
        {activeTab === 'devotionals' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Upload Form (Left Column) */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-[#FFD700]/30 bg-[#0c0c0c] p-6 shadow-sm sticky top-24">
                <div className="flex items-center gap-2 text-[#FFD700] text-xs font-bold uppercase tracking-wider mb-2">
                  <Upload className="h-4 w-4" />
                  <span>Upload Monthly Devotional PDF</span>
                </div>
                <h3 className="font-hyperbonnard text-xl uppercase tracking-wide text-white mb-2">
                  Add New Monthly Publication
                </h3>
                <p className="text-xs text-white/70 mb-5">
                  Upload PDF files from your device. When published, the website request form immediately delivers this new devotional to visitors.
                </p>

                {uploadSuccessMessage && (
                  <div className="mb-4 p-3 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-xs text-emerald-400 flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{uploadSuccessMessage}</span>
                  </div>
                )}

                {uploadErrorMessage && (
                  <div className="mb-4 p-3 rounded-lg bg-[#F00020]/15 border border-[#F00020]/40 text-xs text-[#F00020] flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{uploadErrorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleUploadDevotional} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/90 mb-1.5">
                      Devotional Title <span className="text-[#FFD700]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      placeholder="e.g., Walking with God: December 2026 Edition"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-white/20 text-xs text-white placeholder-white/35 focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/90 mb-1.5">
                      Publication Month <span className="text-[#FFD700]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={uploadMonth}
                      onChange={(e) => setUploadMonth(e.target.value)}
                      placeholder="e.g., December 2026"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-white/20 text-xs text-white placeholder-white/35 focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/90 mb-1.5">
                      Description & Themes
                    </label>
                    <textarea
                      rows={3}
                      value={uploadDescription}
                      onChange={(e) => setUploadDescription(e.target.value)}
                      placeholder="e.g., 30-day foundational guide focusing on personal devotion, character formation, and spiritual discipline."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-white/20 text-xs text-white placeholder-white/35 focus:outline-none focus:border-[#FFD700] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/90 mb-1.5">
                      Select Devotional PDF File <span className="text-[#FFD700]">*</span>
                    </label>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      required
                      onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                      className="w-full px-3 py-2 rounded-lg bg-black border border-white/20 text-xs text-white file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#FFD700] file:text-black cursor-pointer"
                    />
                    {uploadFile && (
                      <p className="mt-1 text-[11px] text-[#FFD700]">
                        Selected: {uploadFile.name} ({(uploadFile.size / (1024 * 1024)).toFixed(2)} MB)
                      </p>
                    )}
                  </div>

                  <div className="pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-white/90 select-none">
                      <input
                        type="checkbox"
                        checked={publishImmediately}
                        onChange={(e) => setPublishImmediately(e.target.checked)}
                        className="rounded border-white/30 text-[#FFD700] focus:ring-[#FFD700]"
                      />
                      <span>Publish immediately as the active edition on website</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isUploading}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {isUploading ? (
                      <>
                        <span className="h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                        <span>Uploading & Processing PDF…</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        <span>Upload & Save Publication</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Devotional Library (Right Column) */}
            <div className="lg:col-span-7">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-hyperbonnard text-xl uppercase tracking-wide text-white">
                    Devotional Library ({devotionals.length})
                  </h3>
                  <p className="text-xs text-white/60">
                    Previous and active publications stored in cloud repository.
                  </p>
                </div>

                {/* Library Filter */}
                <div className="flex items-center gap-1.5 bg-[#0c0c0c] border border-white/15 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setLibraryFilter('all')}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                      libraryFilter === 'all' ? 'bg-[#FFD700] text-black' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    All ({devotionals.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setLibraryFilter('published')}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                      libraryFilter === 'published' ? 'bg-[#FFD700] text-black' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Published
                  </button>
                  <button
                    type="button"
                    onClick={() => setLibraryFilter('archived')}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                      libraryFilter === 'archived' ? 'bg-[#FFD700] text-black' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Archived
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredDevotionals.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-xl border p-5 transition-all ${
                      item.isPublished
                        ? 'border-[#FFD700] bg-[#FFD700]/5 shadow-[0_4px_20px_rgba(255,215,0,0.1)]'
                        : 'border-white/10 bg-[#0c0c0c]'
                    }`}
                  >
                    <div className="flex flex-col justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {item.isPublished ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#FFD700] text-black">
                              <Radio className="h-2.5 w-2.5 animate-pulse" />
                              Active Published Edition
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white/60">
                              Archived in Library
                            </span>
                          )}

                          {(item.publicationMonth || item.month) && (
                            <span className="text-[11px] text-white/50 font-mono">
                              · {item.publicationMonth || item.month}
                            </span>
                          )}
                        </div>

                        <h4 className="font-semibold text-base text-white mb-1">
                          {item.title}
                        </h4>

                        {item.description && (
                          <p className="text-xs text-white/70 line-clamp-2 mb-3 leading-relaxed">
                            {item.description}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-4 text-[11px] text-white/50 font-mono py-2 border-y border-white/5">
                          <span>Total Requests: <strong className="text-white">{item.requestsCount || 0}</strong></span>
                          <span>Total Downloads: <strong className="text-white">{item.downloadsCount || 0}</strong></span>
                          <span>File: <strong className="text-white truncate max-w-[150px]">{item.fileName}</strong></span>
                          {item.fileSize && (
                            <span>Size: <strong className="text-white">{(item.fileSize / (1024 * 1024)).toFixed(2)} MB</strong></span>
                          )}
                        </div>
                      </div>

                      {/* Action buttons toolbar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <div className="flex items-center gap-2">
                          {/* Publish or Unpublish Toggle */}
                          {item.isPublished ? (
                            <button
                              type="button"
                              onClick={() => handleUnpublishDevotional(item.id)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-colors cursor-pointer"
                              title="Unpublish this edition"
                            >
                              <span>Unpublish</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handlePublishDevotional(item.id)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#FFD700] text-black hover:bg-white transition-colors cursor-pointer"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              <span>Publish to Website</span>
                            </button>
                          )}

                          {/* Replace PDF Button */}
                          <button
                            type="button"
                            onClick={() => {
                              setReplacingDevotional(item);
                              setReplacementFile(null);
                              setReplaceError(null);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-[#FFD700] bg-white/5 hover:bg-white/10 border border-white/15 transition-colors cursor-pointer"
                            title="Upload replacement PDF file"
                          >
                            <FileUp className="h-3.5 w-3.5" />
                            <span>Replace PDF</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Download / Preview PDF */}
                          <a
                            href={item.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-colors"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>Preview</span>
                          </a>

                          {/* Delete Publication */}
                          {item.id !== 'devoted-ones-vol-1' && (
                            <button
                              type="button"
                              onClick={() => handleDeleteDevotional(item.id, item.title)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-[#F00020]/80 hover:text-[#F00020] hover:bg-[#F00020]/10 border border-transparent hover:border-[#F00020]/30 transition-colors cursor-pointer"
                              title="Delete publication"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================= */}
      {/* MODAL: REPLACE PDF FILE                                       */}
      {/* ============================================================= */}
      <AnimatePresence>
        {replacingDevotional && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#0e0e0e] border border-[#FFD700]/30 rounded-2xl p-6 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setReplacingDevotional(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2 text-[#FFD700] text-xs font-bold uppercase tracking-wider mb-2">
                <FileUp className="h-4 w-4" />
                <span>Replace PDF Document</span>
              </div>

              <h3 className="font-hyperbonnard text-xl uppercase tracking-wide text-white mb-2">
                Replace PDF File
              </h3>
              <p className="text-xs text-white/70 mb-4">
                Upload a newer PDF file for: <strong className="text-white">"{replacingDevotional.title}"</strong>. The existing download link will immediately serve this new file.
              </p>

              {replaceError && (
                <div className="mb-4 p-3 rounded-lg bg-[#F00020]/15 border border-[#F00020]/40 text-xs text-[#F00020] flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{replaceError}</span>
                </div>
              )}

              <form onSubmit={handleReplacePdfSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/90 mb-1.5">
                    Select Replacement PDF <span className="text-[#FFD700]">*</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    required
                    onChange={(e) => setReplacementFile(e.target.files?.[0] || null)}
                    className="w-full px-3 py-2 rounded-lg bg-black border border-white/20 text-xs text-white file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#FFD700] file:text-black cursor-pointer"
                  />
                  {replacementFile && (
                    <p className="mt-1 text-[11px] text-[#FFD700]">
                      Selected: {replacementFile.name} ({(replacementFile.size / (1024 * 1024)).toFixed(2)} MB)
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setReplacingDevotional(null)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isReplacingPdf}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isReplacingPdf ? (
                      <>
                        <span className="h-3.5 w-3.5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                        <span>Uploading Replacement…</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-3.5 w-3.5" />
                        <span>Upload & Replace</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
