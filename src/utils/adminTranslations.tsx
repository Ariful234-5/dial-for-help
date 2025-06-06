
export type LanguageKey = 'bn' | 'en';

interface TextContent {
  [key: string]: string;
}

export const text: Record<LanguageKey, TextContent> = {
  bn: {
    dashboard: 'অ্যাডমিন ড্যাশবোর্ড',
    overview: 'সংক্ষিপ্ত বিবরণ',
    users: 'ব্যবহারকারী',
    providers: 'প্রদানকারী',
    reports: 'রিপোর্ট',
    analytics: 'বিশ্লেষণ',
    settings: 'সেটিংস',
    totalUsers: 'মোট ব্যবহারকারী',
    activeProviders: 'সক্রিয় প্রদানকারী',
    pendingApprovals: 'অনুমোদনের অপেক্ষায়',
    totalRevenue: 'মোট আয়',
    userManagement: 'ব্যবহারকারী পরিচালনা',
    providerManagement: 'প্রদানকারী পরিচালনা',
    systemReports: 'সিস্টেম রিপোর্ট',
    performanceAnalytics: 'কর্মক্ষমতা বিশ্লেষণ',
    viewAll: 'সবগুলো দেখুন',
    approve: 'অনুমোদন',
    reject: 'প্রত্যাখ্যান',
    view: 'দেখুন',
    edit: 'সম্পাদনা',
    delete: 'মুছুন',
    suspend: 'স্থগিত',
    activate: 'সক্রিয়',
    name: 'নাম',
    email: 'ইমেইল',
    phone: 'ফোন',
    status: 'অবস্থা',
    location: 'এলাকা',
    category: 'ক্যাটেগরি',
    rating: 'রেটিং',
    completedJobs: 'সম্পন্ন কাজ',
    joinDate: 'যোগদানের তারিখ',
    actions: 'কার্যক্রম',
    generateReport: 'রিপোর্ট তৈরি',
    downloadReport: 'রিপোর্ট ডাউনলোড',
    refreshData: 'তথ্য রিফ্রেশ',
    exportData: 'তথ্য রপ্তানি',
    active: 'সক্রিয়',
    inactive: 'নিষ্ক্রিয়',
    pending: 'অপেক্ষমাণ',
    suspended: 'স্থগিত',
    approved: 'অনুমোদিত',
    rejected: 'প্রত্যাখ্যাত',
    electrician: 'ইলেকট্রিশিয়ান',
    plumber: 'প্লাম্বার',
    cleaner: 'ক্লিনার',
    acRepair: 'এসি মেরামত',
    painter: 'রঙমিস্ত্রি',
    carpenter: 'কাঠমিস্ত্রি'
  },
  en: {
    dashboard: 'Admin Dashboard',
    overview: 'Overview',
    users: 'Users',
    providers: 'Providers',
    reports: 'Reports',
    analytics: 'Analytics',
    settings: 'Settings',
    totalUsers: 'Total Users',
    activeProviders: 'Active Providers',
    pendingApprovals: 'Pending Approvals',
    totalRevenue: 'Total Revenue',
    userManagement: 'User Management',
    providerManagement: 'Provider Management',
    systemReports: 'System Reports',
    performanceAnalytics: 'Performance Analytics',
    viewAll: 'View All',
    approve: 'Approve',
    reject: 'Reject',
    view: 'View',
    edit: 'Edit',
    delete: 'Delete',
    suspend: 'Suspend',
    activate: 'Activate',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    status: 'Status',
    location: 'Location',
    category: 'Category',
    rating: 'Rating',
    completedJobs: 'Completed Jobs',
    joinDate: 'Join Date',
    actions: 'Actions',
    generateReport: 'Generate Report',
    downloadReport: 'Download Report',
    refreshData: 'Refresh Data',
    exportData: 'Export Data',
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    suspended: 'Suspended',
    approved: 'Approved',
    rejected: 'Rejected',
    electrician: 'Electrician',
    plumber: 'Plumber',
    cleaner: 'Cleaner',
    acRepair: 'AC Repair',
    painter: 'Painter',
    carpenter: 'Carpenter'
  }
};

export const getTranslation = (key: string, language: LanguageKey = 'bn'): string => {
  return text[language][key] || key;
};

export const getCategoryTranslation = (category: string, language: LanguageKey = 'bn'): string => {
  const categoryMap: Record<string, string> = {
    electrician: getTranslation('electrician', language),
    plumber: getTranslation('plumber', language),
    cleaner: getTranslation('cleaner', language),
    'ac-repair': getTranslation('acRepair', language),
    painter: getTranslation('painter', language),
    carpenter: getTranslation('carpenter', language)
  };
  return categoryMap[category] || category;
};

export const getStatusTranslation = (status: string, language: LanguageKey = 'bn'): string => {
  const statusMap: Record<string, string> = {
    active: getTranslation('active', language),
    inactive: getTranslation('inactive', language),
    pending: getTranslation('pending', language),
    suspended: getTranslation('suspended', language),
    approved: getTranslation('approved', language),
    rejected: getTranslation('rejected', language)
  };
  return statusMap[status] || status;
};
