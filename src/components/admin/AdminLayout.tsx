import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CreditCard, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdminApiService } from '@/services/apiService';
import { useToast } from '@/hooks/use-toast';

interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<AdminUser | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated
    if (!AdminApiService.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }

    // Try to get user info from localStorage
    const userData = localStorage.getItem('admin_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    AdminApiService.logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      current: location.pathname === '/admin'
    },
    {
      name: 'Transactions',
      href: '/admin/transactions',
      icon: CreditCard,
      current: location.pathname.startsWith('/admin/transactions')
    },
    {
      name: 'Donors',
      href: '/admin/donors',
      icon: Users,
      current: location.pathname.startsWith('/admin/donors')
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: Settings,
      current: location.pathname.startsWith('/admin/settings')
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-200 ease-in-out lg:translate-x-0`}>
        
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="ml-3 text-lg font-semibold text-gray-900">FOLM Admin</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      item.current
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${
                      item.current ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-500'
                    }`} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User info and logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          {user && (
            <div className="mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
                <div className="ml-3 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.role}</p>
                </div>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className={`${isSidebarOpen ? 'lg:pl-64' : ''} flex flex-col min-h-screen`}>
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden mr-3"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              <h1 className="text-xl font-semibold text-gray-900">
                {navigation.find(item => item.current)?.name || 'Admin Panel'}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-10 w-64 bg-gray-50 border-gray-300"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>

              {/* User avatar */}
              {user && (
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {user.firstName?.[0]}{user.lastName?.[0]}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;