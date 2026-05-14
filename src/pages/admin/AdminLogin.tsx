import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Loader2, Shield, Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AdminApiService } from '@/services/apiService';
import { useToast } from '@/hooks/use-toast';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Redirect if already authenticated
  useEffect(() => {
    if (AdminApiService.isAuthenticated()) {
      const from = location.state?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    }
  }, [navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await AdminApiService.login(email, password);
      
      if (result.success) {
        // Store user data
        localStorage.setItem('admin_user', JSON.stringify(result.data?.user));
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${result.data?.user.firstName}!`,
        });

        // Redirect to intended page or dashboard
        const from = location.state?.from?.pathname || '/admin';
        navigate(from, { replace: true });
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (error: any) {
      setError(error.message || 'Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">FOLM Admin Portal</h1>
          <p className="text-gray-600">Sign in to access the admin dashboard</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Alert */}
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@folm.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                    autoComplete="email"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                    autoComplete="current-password"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isLoading || !email || !password}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-blue-900 mb-2">Demo Credentials:</p>
              <div className="text-sm text-blue-700 space-y-1">
                <p><strong>Email:</strong> admin@folm.org</p>
                <p><strong>Password:</strong> admin123</p>
              </div>
              <p className="text-xs text-blue-600 mt-2">
                ⚠️ Change these credentials in production!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>© 2024 Fountain of Light Prayer Ministry International</p>
          <p className="mt-1">Secure admin access portal</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;