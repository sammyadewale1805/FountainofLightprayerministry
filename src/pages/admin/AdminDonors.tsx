import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  RefreshCw,
  User,
  Mail,
  Calendar,
  Heart,
  TrendingUp,
  DollarSign,
  Gift
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AdminApiService } from '@/services/apiService';
import { useToast } from '@/hooks/use-toast';

interface Donor {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  totalAmount: number;
  totalTransactions: number;
  lastDonationDate?: string;
  firstDonationDate: string;
  preferredCurrency: string;
  isRecurringDonor: boolean;
  averageDonation: number;
  updatedAt: string;
}

interface DonorDetail extends Donor {
  transactions: Array<{
    id: string;
    reference: string;
    amount: number;
    currency: string;
    status: string;
    purpose: string;
    purposeTitle?: string;
    provider: string;
    createdAt: string;
  }>;
}

const AdminDonors: React.FC = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDonor, setSelectedDonor] = useState<DonorDetail | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  
  // Filters
  const [search, setSearch] = useState('');
  const [currencyFilter, setCurrencyFilter] = useState('');
  const [sortBy, setSortBy] = useState('lastDonationDate');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 20;

  const { toast } = useToast();

  const fetchDonors = async () => {
    setIsLoading(true);
    try {
      const params: any = {
        page: currentPage,
        limit: pageSize,
        sortBy,
      };

      if (search) params.search = search;
      if (currencyFilter) params.currency = currencyFilter;

      const result = await AdminApiService.getDonors(params);
      
      if (result.success) {
        setDonors(result.data || []);
        setTotal(result.pagination?.total || 0);
        setTotalPages(result.pagination?.totalPages || 1);
      } else {
        throw new Error(result.error || 'Failed to fetch donors');
      }
    } catch (error: any) {
      console.error('Donors fetch error:', error);
      toast({
        title: "Error loading donors",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDonorDetails = async (donorId: string) => {
    setIsLoadingDetails(true);
    try {
      const result = await AdminApiService.getDonorDetails(donorId);
      
      if (result.success) {
        setSelectedDonor(result.data);
        setShowDetailsModal(true);
      } else {
        throw new Error(result.error || 'Failed to fetch donor details');
      }
    } catch (error: any) {
      console.error('Donor details fetch error:', error);
      toast({
        title: "Error loading donor details",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoadingDetails(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, [currentPage, sortBy]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage === 1) {
        fetchDonors();
      } else {
        setCurrentPage(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, currencyFilter]);

  const formatCurrency = (amount: number, currency: string) => {
    const symbol = currency === 'NGN' ? '₦' : '$';
    return `${symbol}${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDonorDisplayName = (donor: Donor) => {
    if (donor.firstName && donor.lastName) {
      return `${donor.firstName} ${donor.lastName}`;
    }
    return donor.email;
  };

  const getDonorLevel = (totalAmount: number) => {
    if (totalAmount >= 50000) return { label: 'Champion', variant: 'default' as const, color: 'text-purple-600' };
    if (totalAmount >= 10000) return { label: 'Hero', variant: 'secondary' as const, color: 'text-blue-600' };
    if (totalAmount >= 1000) return { label: 'Supporter', variant: 'outline' as const, color: 'text-green-600' };
    return { label: 'Friend', variant: 'outline' as const, color: 'text-gray-600' };
  };

  const handleViewDetails = (donor: Donor) => {
    fetchDonorDetails(donor.id);
  };

  const handleExport = () => {
    // In a real implementation, this would generate and download a CSV/Excel file
    toast({
      title: "Export started",
      description: "Your donors export is being prepared...",
    });
  };

  // Calculate stats from current donors data
  const stats = {
    totalDonors: total,
    recurringDonors: donors.filter(d => d.isRecurringDonor).length,
    totalValue: donors.reduce((sum, d) => sum + d.totalAmount, 0),
    averageDonation: donors.length > 0 ? donors.reduce((sum, d) => sum + d.averageDonation, 0) / donors.length : 0
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Donors</h1>
          <p className="text-gray-600">Manage donor relationships and history</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button onClick={handleExport} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={fetchDonors} disabled={isLoading} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <div className="text-2xl font-bold">{stats.totalDonors.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Total Donors</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-600" />
              <div className="ml-3">
                <div className="text-2xl font-bold">{stats.recurringDonors}</div>
                <p className="text-xs text-muted-foreground">Recurring Donors</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <div className="text-2xl font-bold">
                  ${stats.totalValue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Total Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <div className="text-2xl font-bold">
                  ${Math.round(stats.averageDonation).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Avg Donation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search donors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Currencies</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="NGN">NGN</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lastDonationDate">Last Donation</SelectItem>
                <SelectItem value="firstDonationDate">First Donation</SelectItem>
                <SelectItem value="totalAmount">Total Amount</SelectItem>
                <SelectItem value="totalTransactions">Total Donations</SelectItem>
                <SelectItem value="averageDonation">Average Donation</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={() => {
                setSearch('');
                setCurrencyFilter('');
                setSortBy('lastDonationDate');
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Donors Table */}
      <Card>
        <CardHeader>
          <CardTitle>Donor List</CardTitle>
          <CardDescription>
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, total)} of {total} donors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Donor</TableHead>
                  <TableHead>Total Donated</TableHead>
                  <TableHead>Donations</TableHead>
                  <TableHead>Average</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>First Donation</TableHead>
                  <TableHead>Last Donation</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                      Loading donors...
                    </TableCell>
                  </TableRow>
                ) : donors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No donors found
                    </TableCell>
                  </TableRow>
                ) : (
                  donors.map((donor) => {
                    const level = getDonorLevel(donor.totalAmount);
                    return (
                      <TableRow key={donor.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium flex items-center">
                              {getDonorDisplayName(donor)}
                              {donor.isRecurringDonor && (
                                <Badge variant="secondary" className="ml-2 text-xs">
                                  <Heart className="w-3 h-3 mr-1" />
                                  Recurring
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Mail className="w-3 h-3 mr-1" />
                              {donor.email}
                            </div>
                            {donor.phone && (
                              <div className="text-sm text-gray-500">{donor.phone}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold">
                            {formatCurrency(donor.totalAmount, donor.preferredCurrency)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Gift className="w-4 h-4 mr-1 text-gray-400" />
                            {donor.totalTransactions}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {formatCurrency(donor.averageDonation, donor.preferredCurrency)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={level.variant} className={level.color}>
                            {level.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{formatDate(donor.firstDonationDate)}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {donor.lastDonationDate ? formatDate(donor.lastDonationDate) : 'N/A'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewDetails(donor)}
                            disabled={isLoadingDetails}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Donor Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Donor Details</DialogTitle>
            <DialogDescription>
              Complete donor profile and donation history
            </DialogDescription>
          </DialogHeader>
          
          {isLoadingDetails ? (
            <div className="text-center py-8">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
              Loading donor details...
            </div>
          ) : selectedDonor && (
            <div className="space-y-6">
              {/* Donor Profile */}
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Name</label>
                      <div className="font-medium">
                        {getDonorDisplayName(selectedDonor)}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <div>{selectedDonor.email}</div>
                    </div>
                    {selectedDonor.phone && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Phone</label>
                        <div>{selectedDonor.phone}</div>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium text-gray-500">Preferred Currency</label>
                      <div>{selectedDonor.preferredCurrency}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Donor Level</label>
                      <div>{getDonorLevel(selectedDonor.totalAmount).label}</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Donation Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Total Donated</label>
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(selectedDonor.totalAmount, selectedDonor.preferredCurrency)}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Total Donations</label>
                      <div className="text-lg font-semibold">{selectedDonor.totalTransactions}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Average Donation</label>
                      <div className="font-medium">
                        {formatCurrency(selectedDonor.averageDonation, selectedDonor.preferredCurrency)}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">First Donation</label>
                      <div>{formatDate(selectedDonor.firstDonationDate)}</div>
                    </div>
                    {selectedDonor.lastDonationDate && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Last Donation</label>
                        <div>{formatDate(selectedDonor.lastDonationDate)}</div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Transaction History */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Donation History</CardTitle>
                  <CardDescription>
                    All donations from this donor ({selectedDonor.transactions.length} total)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Reference</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Purpose</TableHead>
                          <TableHead>Provider</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedDonor.transactions.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>
                              <div className="font-mono text-sm">{transaction.reference}</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-semibold">
                                {formatCurrency(transaction.amount, transaction.currency)}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="max-w-32 truncate">
                                {transaction.purposeTitle || transaction.purpose}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{transaction.provider}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={transaction.status === 'COMPLETED' ? 'default' : 'secondary'}
                              >
                                {transaction.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">{formatDate(transaction.createdAt)}</div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDonors;