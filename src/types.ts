export type OccupationType = 'Student' | 'Employed' | 'Entrepreneur' | 'Other';

export interface OnboardingData {
  // Step 1: About You
  fullName: string;
  preferredName: string;
  birthDay: string; // 1-31
  birthMonth: string; // January - December
  gender: 'Male' | 'Female' | 'Prefer not to say' | '';
  city: string;
  currentLocation: string;
  phone: string;
  email: string;

  // Step 2: What You Do
  occupation: OccupationType | '';
  occupationOtherDetail?: string;
  professionOrCourse: string;
  skills: string;
  schoolOfStudy: string; // Only required if occupation === 'Student'

  // Step 3: Your Walk with God
  faithQuestions: string;
  walkStartedWhen: string;
  spiritualGoals: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  category: 'Daily Devotion' | 'Life by the Word' | 'Intentional Growth' | 'Excellence';
  quote: string;
  story: string;
  scripture?: string;
  imageUrl?: string;
  date: string;
  isCustom?: boolean;
}

export interface DevotionalTestimony {
  id: string;
  contributorName: string;
  devotionalTitle: string;
  reflection: string;
  isCustom?: boolean;
}

