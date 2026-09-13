export interface NavItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  badge?: string | number;
  children?: NavItem[];
}

export interface NavSection {
  id: string;
  label?: string;
  items: NavItem[];
}

export interface LayoutConfig {
  logo: {
    icon: string;
    alt: string;
  };
  sidebarSections: NavSection[];
  topbarLinks: NavItem[];
}

export const layoutConfig: LayoutConfig = {
  logo: {
    icon: 'pi pi-share-alt',
    alt: 'CRM home',
  },
  sidebarSections: [
    {
      id: 'general',
      label: 'General',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: 'pi pi-th-large', route: '/dashboard' },
        { id: 'tasks', label: 'Tasks', icon: 'pi pi-list-check', route: '/tasks' },
        { id: 'apps', label: 'Apps', icon: 'pi pi-box', route: '/apps' },
        { id: 'chats', label: 'Chats', icon: 'pi pi-comments', route: '/chats', badge: 3 },
        { id: 'users', label: 'Users', icon: 'pi pi-users', route: '/users' },
        {
          id: 'clerk',
          label: 'Secured by Clerk',
          icon: 'pi pi-lock',
          children: [
            { id: 'sign-in', label: 'Sign In', icon: 'pi pi-sign-in', route: '/auth/login' },
            { id: 'sign-up', label: 'Sign Up', icon: 'pi pi-user-plus', route: '/auth/registration' },
            { id: 'user-management', label: 'User Management', icon: 'pi pi-id-card', route: '/users' },
          ],
        },
      ],
    },
    {
      id: 'pages',
      label: 'Pages',
      items: [
        {
          id: 'auth',
          label: 'Auth',
          icon: 'pi pi-shield',
          children: [
            { id: 'auth-sign-in', label: 'Sign In', icon: 'pi pi-sign-in', route: '/auth/login' },
            { id: 'auth-sign-up', label: 'Sign Up', icon: 'pi pi-user-plus', route: '/auth/registration' },
          ],
        },
        {
          id: 'errors',
          label: 'Errors',
          icon: 'pi pi-exclamation-circle',
          children: [
            { id: 'error-404', label: 'Not Found', icon: 'pi pi-ban', route: '/errors/404' },
            { id: 'error-500', label: 'Server Error', icon: 'pi pi-times-circle', route: '/errors/500' },
          ],
        },
      ],
    },
    {
      id: 'other',
      label: 'Other',
      items: [],
    },
  ],
  topbarLinks: [
    { id: 'overview', label: 'Overview', icon: 'pi pi-home', route: '/dashboard' },
    { id: 'customers', label: 'Customers', icon: 'pi pi-users', route: '/customers' },
    { id: 'products', label: 'Products', icon: 'pi pi-box', route: '/products' },
    { id: 'settings', label: 'Settings', icon: 'pi pi-cog', route: '/settings' },
  ],
};
