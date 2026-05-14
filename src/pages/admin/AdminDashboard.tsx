import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  CreditCard, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Activity,
  Globe,
  RefreshCw,
  Eye,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminApiService } from '@/services/apiService';
import { useToast } from '@/hooks/use-toast';

interface DashboardStats {
  transactions: {
    today: { totalAmount: number; totalCount: number; averageAmount: number; currency: string; period: string };
    thisWeek: { totalAmount: number; totalCount: number; averageAmount: number; currency: string; period: string };
    thisMonth: { totalAmount: number; totalCount: number; averageAmount: number; currency: string; period: string };
    thisYear: { totalAmount: number; totalCount: number; averageAmount: number; currency: string; period: string };
  };
  recentTransactions: Array<{
    id: string;
    reference: string;
    amount: number;
    currency: string;
    donorEmail: string;
    donorFirstName?: string;
    donorLastName?: string;
    purpose: string;
    provider: string;
    createdAt: string;
    paidAt?: string;
  }>;
  topPurposes: Array<{
    purpose: string;
    amount: number;
    count: number;
  }>;
  fraudAlerts: number;
  systemHealth: {
    database: boolean;
    paystack: boolean;
    paypal: boolean;
    email: boolean;
  };
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { toast } = useToast();

  const fetchDashboardStats = async () => {
    setIsLoading(true);
    try {
      const result = await AdminApiService.getDashboardStats();
      if (result.success) {
        setStats(result.data);
        setLastUpdated(new Date());
      } else {
        throw new Error(result.error || 'Failed to fetch dashboard stats');
      }
    } catch (error: any) {
      console.error('Dashboard stats error:', error);
      toast({
        title: "Error loading dashboard",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    const symbol = currency === 'NGN' ? '₦' : '$';
    return `${symbol}${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getHealthColor = (healthy: boolean) => {
    return healthy ? 'text-green-600' : 'text-red-600';
  };

  const getHealthIcon = (healthy: boolean) => {
    return healthy ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />;
  };

  if (isLoading && !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-6 h-6 animate-spin mr-2" />
        <span>Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Monitor your payment system performance</p>
        </div>
        <div className="flex items-center space-x-3">
          {lastUpdated && (
            <span className="text-sm text-gray-500">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <Button
            onClick={fetchDashboardStats}
            disabled={isLoading}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats?.transactions.today.totalAmount || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.transactions.today.totalCount || 0} transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats?.transactions.thisMonth.totalAmount || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.transactions.thisMonth.totalCount || 0} transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Donation</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats?.transactions.thisMonth.averageAmount || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Based on this month's data
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fraud Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats?.fraudAlerts || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              This week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* System Health & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              System Health
            </CardTitle>
            <CardDescription>Current status of all services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Database</span>
              <div className={`flex items-center ${getHealthColor(stats?.systemHealth.database || false)}`}>
                {getHealthIcon(stats?.systemHealth.database || false)}
                <span className="ml-1 text-sm">
                  {stats?.systemHealth.database ? 'Healthy' : 'Down'}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">PayPal</span>
              <div className={`flex items-center ${getHealthColor(stats?.systemHealth.paypal || false)}`}>
                {getHealthIcon(stats?.systemHealth.paypal || false)}
                <span className="ml-1 text-sm">
                  {stats?.systemHealth.paypal ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Paystack</span>
              <div className={`flex items-center ${getHealthColor(stats?.systemHealth.paystack || false)}`}>
                {getHealthIcon(stats?.systemHealth.paystack || false)}
                <span className="ml-1 text-sm">
                  {stats?.systemHealth.paystack ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Email Service</span>
              <div className={`flex items-center ${getHealthColor(stats?.systemHealth.email || false)}`}>
                {getHealthIcon(stats?.systemHealth.email || false)}
                <span className="ml-1 text-sm">
                  {stats?.systemHealth.email ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Donation Purposes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Top Purposes
            </CardTitle>
            <CardDescription>Most popular donation categories this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats?.topPurposes.map((purpose, index) => (
              <div key={purpose.purpose} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{purpose.purpose}</span>
                  <span className="text-gray-600">{formatCurrency(purpose.amount)}</span>
                </div>
                <Progress 
                  value={stats.topPurposes.length > 0 ? (purpose.amount / stats.topPurposes[0].amount) * 100 : 0} 
                  className="h-2"
                />
                <div className="text-xs text-gray-500">
                  {purpose.count} donations
                </div>
              </div>
            )) || (
              <p className="text-sm text-gray-500 text-center py-4">No data available</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Recent Transactions
            </CardTitle>
            <CardDescription>Latest payment activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats?.recentTransactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-2 border rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {transaction.donorFirstName} {transaction.donorLastName} 
                      {!transaction.donorFirstName && transaction.donorEmail}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {transaction.purpose} • {formatDate(transaction.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {formatCurrency(transaction.amount, transaction.currency)}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {transaction.provider}
                    </Badge>
                  </div>
                </div>
              )) || (
                <p className="text-sm text-gray-500 text-center py-4">No recent transactions</p>
              )}
            </div>
            
            {stats?.recentTransactions && stats.recentTransactions.length > 5 && (
              <Button variant="outline" className="w-full mt-4" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View All Transactions
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Performance Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Transaction trends across different time periods</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="week" className="space-y-4">
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
              <TabsTrigger value="year">This Year</TabsTrigger>
            </TabsList>
            
            <TabsContent value="today" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(stats?.transactions.today.totalAmount || 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Revenue</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {stats?.transactions.today.totalCount || 0}
                  </div>
                  <div className="text-sm text-gray-600">Transactions</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {formatCurrency(stats?.transactions.today.averageAmount || 0)}
                  </div>
                  <div className="text-sm text-gray-600">Average Amount</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="week" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(stats?.transactions.thisWeek.totalAmount || 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Revenue</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {stats?.transactions.thisWeek.totalCount || 0}
                  </div>
                  <div className="text-sm text-gray-600">Transactions</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {formatCurrency(stats?.transactions.thisWeek.averageAmount || 0)}
                  </div>
                  <div className="text-sm text-gray-600">Average Amount</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="month" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(stats?.transactions.thisMonth.totalAmount || 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Revenue</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {stats?.transactions.thisMonth.totalCount || 0}
                  </div>
                  <div className="text-sm text-gray-600">Transactions</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {formatCurrency(stats?.transactions.thisMonth.averageAmount || 0)}
                  </div>
                  <div className="text-sm text-gray-600">Average Amount</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="year" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(stats?.transactions.thisYear.totalAmount || 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Revenue</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {stats?.transactions.thisYear.totalCount || 0}
                  </div>
                  <div className="text-sm text-gray-600">Transactions</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {formatCurrency(stats?.transactions.thisYear.averageAmount || 0)}
                  </div>
                  <div className="text-sm text-gray-600">Average Amount</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;