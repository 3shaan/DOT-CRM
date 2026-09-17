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
        { id: 'users', label: 'Users', icon: 'pi pi-users', route: '/users' },
        { id: 'customers', label: 'Customers', icon: 'pi pi-users', route: '/customer' },
      ],
    },
   
   
  ],
  topbarLinks: [
    // { id: 'overview', label: 'Overview', icon: 'pi pi-home', route: '/dashboard' },
    // { id: 'customers', label: 'Customers', icon: 'pi pi-users', route: '/customers' },
    // { id: 'products', label: 'Products', icon: 'pi pi-box', route: '/products' },
    // { id: 'settings', label: 'Settings', icon: 'pi pi-cog', route: '/settings' },
  ],
};
