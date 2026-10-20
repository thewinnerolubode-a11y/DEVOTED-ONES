import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Heart,
  Sparkles,
  Camera,
  Upload,
  Plus,
  Search,
  CheckCircle2,
  Quote,
  BookOpen,
  ArrowRight,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { TestimonialItem } from '../types';

import imgTestimony1 from '../assets/images/devoted_testimony_1_1792401310895.jpg';
import imgTestimony2 from '../assets/images/devoted_testimony_2_1792401324113.jpg';
import imgTestimony3 from '../assets/images/devoted_testimony_3_1792401337913.jpg';

interface TestimoniesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenJoin: () => void;
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    name: 'Maya L.',
    role: 'Biochemistry Student',
    location: 'Toronto',
    category: 'Daily Devotion',
    scripture: 'Psalm 63:1',
    quote: 'I used to open my Bible only on Sundays. Devoting 20 quiet morning minutes transformed my entire academic pressure into deep peace.',
    story: 'Before committing to this walk, I treated prayer as a backup plan whenever exam week was overwhelming. Starting every single morning anchored in Scripture shifted my mindset. The daily devotional teachings helped me move from inconsistent quiet time into a genuine daily appetite for God’s presence.',
    imageUrl: imgTestimony1,
    date: 'Recent',
  },
  {
    id: 't-2',
    name: 'Chidinma O.',
    role: 'Law Student',
    location: 'Lagos',
    category: 'Life by the Word',
    scripture: 'Joshua 1:8',
    quote: 'Consistency was my greatest battle. Learning to live by His Word gave me a steady anchor when university life felt noisy.',
    story: 'On campus, compromise is easy and inconsistency feels normal. The Devoted Ones community challenged me to take God seriously in secret, where nobody is watching. The monthly devotional resources gave me clarity on how to apply Scripture to real everyday situations and tough choices.',
    imageUrl: imgTestimony2,
    date: 'Recent',
  },
  {
    id: 't-3',
    name: 'Marcus K.',
    role: 'Software Engineering Major',
    location: 'Austin',
    category: 'Excellence',
    scripture: 'Colossians 3:23',
    quote: 'Devotion is not just prayer; it transformed my work ethic, how I manage my time, and how I treat my peers.',
    story: 'I used to separate my spiritual life from my academic and technical pursuits. Understanding the pillar of Living Excellently showed me that God is honored when we pursue mastery with pure integrity. My focus, diligence, and spiritual clarity have reached a whole new level.',
    imageUrl: imgTestimony3,
    date: 'Recent',
  },
];

const CATEGORIES = [
  'All Stories',
  'Daily Devotion',
  'Life by the Word',
  'Intentional Growth',
  'Excellence',
];

export const TestimoniesModal: React.FC<TestimoniesModalProps> = ({
  isOpen,
  onClose,
  onOpenJoin,
}) => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    try {
      const saved = localStorage.getItem('devoted_ones_testimonials_v2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return DEFAULT_TESTIMONIALS;
  });

  const [activeCategory, setActiveCategory] = useState('All Stories');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeUploadId, setActiveUploadId] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // New testimonial form state
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newCategory, setNewCategory] = useState<TestimonialItem['category']>('Daily Devotion');
  const [newScripture, setNewScripture] = useState('');
  const [newQuote, setNewQuote] = useState('');
  const [newStory, setNewStory] = useState('');
  const [newImagePreview, setNewImagePreview] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const formFileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('devoted_ones_testimonials_v2', JSON.stringify(testimonials));
    } catch {
      // ignore
    }
  }, [testimonials]);

  // Lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const showNotification = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => {
      setSuccessToast(null);
    }, 3500);
  };

  // Handle uploading/replacing photo for an existing testimonial
  const handleTriggerUpload = (id: string) => {
    setActiveUploadId(id);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleCardFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeUploadId) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setTestimonials((prev) =>
        prev.map((item) => (item.id === activeUploadId ? { ...item, imageUrl: result } : item))
      );
      showNotification('Photo updated successfully!');
      setActiveUploadId(null);
    };
    reader.readAsDataURL(file);
  };

  // Handle image upload for new testimonial form
  const handleFormImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setNewImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Submit new testimonial
  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newStory.trim() || !newQuote.trim()) {
      alert('Please fill in your name, reflection headline, and testimony story.');
      return;
    }

    const newEntry: TestimonialItem = {
      id: `custom-${Date.now()}`,
      name: newName.trim(),
      role: newRole.trim() || 'Community Member',
      location: newLocation.trim() || 'Global',
      category: newCategory,
      scripture: newScripture.trim() || undefined,
      quote: newQuote.trim(),
      story: newStory.trim(),
      imageUrl: newImagePreview || undefined,
      date: 'Just now',
      isCustom: true,
    };

    setTestimonials((prev) => [newEntry, ...prev]);
    showNotification('Testimony and image added successfully!');

    // Reset form
    setNewName('');
    setNewRole('');
    setNewLocation('');
    setNewCategory('Daily Devotion');
    setNewScripture('');
    setNewQuote('');
    setNewStory('');
    setNewImagePreview('');
    setShowAddForm(false);
  };

  // Delete custom testimonial
  const handleDeleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    showNotification('Testimony removed.');
  };

  // Filtered list
  const filtered = testimonials.filter((item) => {
    const matchesCategory =
      activeCategory === 'All Stories' || item.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.role.toLowerCase().includes(q) ||
      item.quote.toLowerCase().includes(q) ||
      item.story.toLowerCase().includes(q) ||
      (item.scripture && item.scripture.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-200">
      {/* Hidden file input for card photo upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleCardFileChange}
        accept="image/*"
        className="hidden"
      />

      <div
        className="relative w-full max-w-5xl h-[92vh] flex flex-col rounded-2xl bg-[#000000] border border-[#FFD700]/30 shadow-[0_15px_60px_rgba(0,0,0,0.95)] text-[#FFFFFF] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="testimony-modal-title"
      >
        {/* Toast alert */}
        {successToast && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#FFD700] text-[#000000] px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2 animate-in slide-in-from-top-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#FFD700]/20 bg-[#000000] shrink-0">
          <div className="flex items-center gap-3">
            <BrandLogo size="md" showText={false} />
            <div>
              <span className="font-hyperbonnard text-lg sm:text-xl tracking-wider uppercase text-[#FFD700] block">
                THE DEVOTED ONES
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#FFFFFF]/70">
                Stories of Devotion & Transformed Lives
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#FFFFFF]/70 hover:text-[#FFD700] hover:bg-[#FFD700]/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Main Content Scroll Area */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-6">
          {/* Top Banner with Image Upload guidance */}
          <div className="rounded-xl bg-[#FFD700]/[0.04] border border-[#FFD700]/30 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#FFD700]/15 text-[#FFD700] shrink-0 mt-0.5">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-hyperbonnard text-base sm:text-lg tracking-wide uppercase text-[#FFFFFF]">
                  Stories of Devotion
                </h3>
                <p className="text-xs sm:text-sm text-[#FFFFFF]/85 font-sans mt-0.5 max-w-2xl">
                  Real accounts of young people pursuing God daily, moving from inconsistency to steady faith.
                  You can click <strong className="text-[#FFD700]">“Add / Change Photo”</strong> on any card to attach your images directly, or share a new testimony.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#FFD700] text-[#000000] hover:bg-[#FFFFFF] transition-all cursor-pointer shrink-0 shadow-sm"
            >
              <Plus className="h-4 w-4" />
              <span>{showAddForm ? 'Close Form' : 'Add Testimonial & Photo'}</span>
            </button>
          </div>

          {/* Add Testimonial Form (Expandable) */}
          {showAddForm && (
            <div className="rounded-2xl border border-[#FFD700]/40 bg-[#000000] p-6 shadow-xl animate-in slide-in-from-top-3 duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#FFD700]/20 mb-5">
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4 text-[#FFD700]" />
                  <h4 className="font-hyperbonnard text-lg uppercase text-[#FFD700]">
                    Share Your Testimony with Image
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-xs text-[#FFFFFF]/60 hover:text-[#FFFFFF]"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleAddTestimonial} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#FFFFFF]/80 mb-1.5">
                      Full Name / Preferred Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Samuel B."
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full text-sm rounded-lg bg-[#000000] border border-[#FFD700]/30 px-3.5 py-2 text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#FFFFFF]/80 mb-1.5">
                      Course / Profession
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Architecture Student"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="w-full text-sm rounded-lg bg-[#000000] border border-[#FFD700]/30 px-3.5 py-2 text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#FFFFFF]/80 mb-1.5">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Nairobi, Kenya"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full text-sm rounded-lg bg-[#000000] border border-[#FFD700]/30 px-3.5 py-2 text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#FFFFFF]/80 mb-1.5">
                      Devotion Pillar / Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full text-sm rounded-lg bg-[#000000] border border-[#FFD700]/30 px-3.5 py-2 text-[#FFFFFF] focus:outline-none focus:border-[#FFD700]"
                    >
                      <option value="Daily Devotion">Daily Devotion</option>
                      <option value="Life by the Word">Life by the Word</option>
                      <option value="Intentional Growth">Intentional Growth</option>
                      <option value="Excellence">Excellence</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#FFFFFF]/80 mb-1.5">
                      Scripture Anchor (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 1 Timothy 4:12"
                      value={newScripture}
                      onChange={(e) => setNewScripture(e.target.value)}
                      className="w-full text-sm rounded-lg bg-[#000000] border border-[#FFD700]/30 px-3.5 py-2 text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>
                </div>

                {/* Headline Quote */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#FFFFFF]/80 mb-1.5">
                    Core Transformation Headline / Quote *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Overcoming spiritual dry spells through consistent morning reflection."
                    value={newQuote}
                    onChange={(e) => setNewQuote(e.target.value)}
                    className="w-full text-sm rounded-lg bg-[#000000] border border-[#FFD700]/30 px-3.5 py-2 text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none focus:border-[#FFD700]"
                  />
                </div>

                {/* Story */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#FFFFFF]/80 mb-1.5">
                    Your Testimony & Story *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe how devotion in God's Word has changed your daily consistency, habits, character, or peace of mind..."
                    value={newStory}
                    onChange={(e) => setNewStory(e.target.value)}
                    className="w-full text-sm rounded-lg bg-[#000000] border border-[#FFD700]/30 px-3.5 py-2 text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none focus:border-[#FFD700] resize-none"
                  />
                </div>

                {/* Image Picker */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#FFFFFF]/80 mb-1.5">
                    Testimonial Photo / Image
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl border border-dashed border-[#FFD700]/40 bg-[#FFD700]/[0.02]">
                    {newImagePreview ? (
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-[#FFD700] shrink-0">
                        <img
                          src={newImagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setNewImagePreview('')}
                          className="absolute top-1 right-1 p-1 rounded-full bg-black/80 text-[#F00020]"
                          title="Remove photo"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-[#000000] border border-[#FFD700]/30 flex items-center justify-center text-[#FFD700]/60 shrink-0">
                        <Camera className="h-6 w-6" />
                      </div>
                    )}

                    <div className="flex-1 text-center sm:text-left">
                      <input
                        type="file"
                        ref={formFileInputRef}
                        accept="image/*"
                        onChange={handleFormImageChange}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => formFileInputRef.current?.click()}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-[#FFD700]/20 text-[#FFD700] hover:bg-[#FFD700] hover:text-[#000000] transition-colors cursor-pointer"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        <span>Choose Photo File</span>
                      </button>
                      <p className="text-[11px] text-[#FFFFFF]/60 mt-1">
                        JPG, PNG, or WEBP. Uploads directly into this session and stays saved.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-xs font-medium text-[#FFFFFF]/70 hover:text-[#FFFFFF]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-md text-xs font-bold uppercase tracking-wider bg-[#FFD700] text-[#000000] hover:bg-[#FFFFFF] transition-colors cursor-pointer"
                  >
                    Publish Testimony
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Filter Bar & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#FFD700] text-[#000000] font-bold shadow-sm'
                      : 'bg-[#000000] text-[#FFFFFF]/80 hover:text-[#FFD700] border border-[#FFD700]/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#FFD700]" />
              <input
                type="text"
                placeholder="Search reflections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs rounded-lg bg-[#000000] border border-[#FFD700]/25 pl-8 pr-3 py-1.5 text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none focus:border-[#FFD700]"
              />
            </div>
          </div>

          {/* Testimonies Grid */}
          {filtered.length === 0 ? (
            <div className="py-16 text-center border border-[#FFD700]/20 rounded-2xl bg-[#000000]">
              <BookOpen className="h-8 w-8 text-[#FFD700]/50 mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#FFFFFF]">No testimonies found</p>
              <p className="text-xs text-[#FFFFFF]/60 mt-1">Try another category or search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-[#FFD700]/25 bg-[#000000] hover:border-[#FFD700] transition-all duration-300 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
                >
                  <div>
                    {/* Image Container with Upload Overlay */}
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-[#FFD700]/30 bg-[#0a0a0a] mb-4">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#111] to-[#000] text-[#FFFFFF]/40">
                          <Camera className="h-8 w-8 mb-1 text-[#FFD700]/50" />
                          <span className="text-[11px] font-mono">No Image Added</span>
                        </div>
                      )}

                      {/* Photo Upload/Change Action Button */}
                      <button
                        type="button"
                        onClick={() => handleTriggerUpload(item.id)}
                        className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-black/85 hover:bg-[#FFD700] text-[#FFFFFF] hover:text-[#000000] border border-[#FFD700]/40 transition-colors shadow-md backdrop-blur-sm cursor-pointer"
                        title="Upload your own photo for this testimony"
                      >
                        <Camera className="h-3 w-3" />
                        <span>{item.imageUrl ? 'Change Photo' : 'Add Photo'}</span>
                      </button>

                      {/* Category Badge */}
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-black/80 border border-[#FFD700]/40 text-[#FFD700] backdrop-blur-sm">
                        {item.category}
                      </span>
                    </div>

                    {/* Scripture anchor tag */}
                    {item.scripture && (
                      <div className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-[#FFD700] mb-2">
                        <Quote className="h-3 w-3 text-[#FD7000]" />
                        <span>{item.scripture}</span>
                      </div>
                    )}

                    {/* Headline Quote */}
                    <h4 className="text-sm font-bold text-[#FFFFFF] leading-snug mb-3 font-sans">
                      “{item.quote}”
                    </h4>

                    {/* Full story */}
                    <p className="text-xs text-[#FFFFFF]/80 leading-relaxed font-sans mb-4">
                      {item.story}
                    </p>
                  </div>

                  {/* Card Footer: Person info & verification */}
                  <div className="pt-3 border-t border-[#FFD700]/15 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#FFFFFF] flex items-center gap-1">
                        <span>{item.name}</span>
                        <CheckCircle2 className="h-3 w-3 text-[#FFD700]" />
                      </p>
                      <p className="text-[11px] text-[#FFFFFF]/60 font-sans">
                        {item.role} · {item.location}
                      </p>
                    </div>

                    {item.isCustom && (
                      <button
                        onClick={() => handleDeleteTestimonial(item.id)}
                        className="p-1.5 rounded text-[#FFFFFF]/40 hover:text-[#F00020] transition-colors"
                        title="Delete testimony"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Bottom CTA */}
        <div className="px-6 sm:px-8 py-4 border-t border-[#FFD700]/20 bg-[#000000] shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#FFFFFF]/80">
            <Heart className="h-3.5 w-3.5 text-[#F00020] fill-[#F00020]" />
            <span>Ready to embark on your own journey of devotion?</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2 text-xs font-medium text-[#FFFFFF]/70 hover:text-[#FFFFFF]"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenJoin();
              }}
              className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#000000] bg-[#FFD700] hover:bg-[#FFFFFF] rounded-md transition-all cursor-pointer"
            >
              <span>Join The Community</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
