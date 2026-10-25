// What a brand-new browser starts with: rules, categories and one admin.
export const DEFAULT_SETTINGS = {
  loanDays: 14,
  maxBooks: 3,
  fineRate: 10,
  graceDays: 0,
  maxRenewals: 1,
  holdDays: 3,
  library: {
    name: 'BookVerse Library',
    address: 'Add your library address in Settings',
    email: 'desk@bookverse.edu',
    phone: '+91 00000 00000',
    hours: 'Mon–Sat, 9:00 am – 5:00 pm',
  },
  // The lists behind the Department dropdowns (an admin edits them in Settings).
  departments: {
    student: [
      'CSE',
      'CSE (AI & ML)',
      'CSE (Data Science)',
      'CSE (Cyber Security)',
      'IT',
      'ECE',
      'EEE',
      'Mechanical',
      'Civil',
      'BCA',
      'MCA',
      'MBA',
    ],
    staff: ['Circulation', 'Cataloguing', 'Reference', 'Digital Resources', 'Administration'],
  },
};

export const DEFAULT_CATEGORIES = [
  { id: 'Programming', icon: 'fa-code' },
  { id: 'Computer Science', icon: 'fa-microchip' },
  { id: 'AI & ML', icon: 'fa-brain' },
  { id: 'Databases', icon: 'fa-database' },
  { id: 'Mathematics', icon: 'fa-calculator' },
  { id: 'Fiction', icon: 'fa-feather' },
  { id: 'Self Development', icon: 'fa-lightbulb' },
];

// The one account that exists on first run, so someone can log in and set things up.
export const FIRST_ADMIN = {
  name: 'Library Admin',
  email: 'admin@bookverse.edu',
  password: 'Admin@123',
  phone: '+91 00000 00000',
  department: 'Administration',
};
