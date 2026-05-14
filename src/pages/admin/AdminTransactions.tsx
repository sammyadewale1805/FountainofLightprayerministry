import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  RefreshCw,
  Calendar,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  MoreHorizontal
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AdminApiService } from '@/services/apiService';
import { useToast } from '@/hooks/use-toast';

interface Transaction {
  id: string;
  reference: string;
  transactionId?: string;
  amount: number;
  currency: string;
  status: string;
  provider: string;
  donorEmail: string;
  donorFirstName?: string;
  donorLastName?: string;
  purpose: string;
  purposeTitle?: string;
  isRecurring: boolean;
  fraudScore: number;
  isBlocked: boolean;
  webhookVerified: boolean;
  createdAt: string;
  paidAt?: string;
  updatedAt: string;
}

const AdminTransactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [providerFilter, setProviderFilter] = useState('');
  const [currencyFilter, setCurrencyFilter] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 20;

  const { toast } = useToast();

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const params: any = {
        page: currentPage,
        limit: pageSize,
      };

      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      if (providerFilter) params.provider = providerFilter;
      if (currencyFilter) params.currency = currencyFilter;

      const result = await AdminApiService.getTransactions(params);
      
      if (result.success) {
        setTransactions(result.data || []);
        setTotal(result.pagination?.total || 0);
        setTotalPages(result.pagination?.totalPages || 1);
      } else {
        throw new Error(result.error || 'Failed to fetch transactions');
      }
    } catch (error: any) {
      console.error('Transactions fetch error:', error);
      toast({
        title: "Error loading transactions",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage === 1) {
        fetchTransactions();
      } else {
        setCurrentPage(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, statusFilter, providerFilter, currencyFilter]);

  const formatCurrency = (amount: number, currency: string) => {
    const symbol = currency === 'NGN' ? '₦' : '$';
    return `${symbol}${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      COMPLETED: { variant: 'default' as const, icon: CheckCircle, color: 'text-green-600' },
      PENDING: { variant: 'secondary' as const, icon: Clock, color: 'text-yellow-600' },
      PROCESSING: { variant: 'secondary' as const, icon: RefreshCw, color: 'text-blue-600' },
      FAILED: { variant: 'destructive' as const, icon: XCircle, color: 'text-red-600' },
      CANCELLED: { variant: 'outline' as const, icon: XCircle, color: 'text-gray-600' },
      REFUNDED: { variant: 'outline' as const, icon: RefreshCw, color: 'text-purple-600' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  const getFraudScoreBadge = (score: number) => {
    if (score >= 80) return <Badge variant="destructive">High Risk ({score})</Badge>;
    if (score >= 50) return <Badge variant="secondary">Medium Risk ({score})</Badge>;
    if (score > 0) return <Badge variant="outline">Low Risk ({score})</Badge>;
    return <Badge variant="default">Clean (0)</Badge>;
  };

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailsModal(true);
  };

  const handleExport = () => {
    // In a real implementation, this would generate and download a CSV/Excel file
    toast({
      title: "Export started",
      description: "Your transaction export is being prepared...",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600">Manage and monitor all payment transactions</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button onClick={handleExport} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={fetchTransactions} disabled={isLoading} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{total.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total Transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {transactions.filter(t => t.status === 'COMPLETED').length}
            </div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">
              {transactions.filter(t => t.status === 'PENDING' || t.status === 'PROCESSING').length}
            </div>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">
              {transactions.filter(t => t.status === 'FAILED').length}
            </div>
            <p className="text-xs text-muted-foreground">Failed</p>
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="PROCESSING">Processing</SelectItem>
                <SelectItem value="FAILED">Failed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
                <SelectItem value="REFUNDED">Refunded</SelectItem>
              </SelectContent>
            </Select>

            <Select value={providerFilter} onValueChange={setProviderFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Providers</SelectItem>
                <SelectItem value="PAYSTACK">Paystack</SelectItem>
                <SelectItem value="PAYPAL">PayPal</SelectItem>
                <SelectItem value="MANUAL">Manual</SelectItem>
              </SelectContent>
            </Select>

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

            <Button
              onClick={() => {
                setSearch('');
                setStatusFilter('');
                setProviderFilter('');
                setCurrencyFilter('');
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, total)} of {total} transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Donor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                      Loading transactions...
                    </TableCell>
                  </TableRow>
                ) : transactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                      No transactions found
                    </TableCell>
                  </TableRow>
                ) : (
                  transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div className="font-mono text-sm">{transaction.reference}</div>
                        {transaction.isRecurring && (
                          <Badge variant="outline" className="text-xs mt-1">Recurring</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">
                            {transaction.donorFirstName && transaction.donorLastName
                              ? `${transaction.donorFirstName} ${transaction.donorLastName}`
                              : transaction.donorEmail
                            }
                          </div>
                          {transaction.donorFirstName && transaction.donorLastName && (
                            <div className="text-sm text-gray-500">{transaction.donorEmail}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold">
                          {formatCurrency(transaction.amount, transaction.currency)}
                        </div>
                        <div className="text-xs text-gray-500">{transaction.currency}</div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(transaction.status)}
                        {transaction.webhookVerified && (
                          <div className="text-xs text-green-600 mt-1 flex items-center">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{transaction.provider}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-32 truncate">
                          {transaction.purposeTitle || transaction.purpose}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getFraudScoreBadge(transaction.fraudScore)}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{formatDate(transaction.createdAt)}</div>
                        {transaction.paidAt && transaction.paidAt !== transaction.createdAt && (
                          <div className="text-xs text-gray-500">
                            Paid: {formatDate(transaction.paidAt)}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(transaction)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
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

      {/* Transaction Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              Complete information about transaction {selectedTransaction?.reference}
            </DialogDescription>
          </DialogHeader>
          
          {selectedTransaction && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Reference</label>
                  <div className="font-mono text-sm">{selectedTransaction.reference}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Transaction ID</label>
                  <div className="font-mono text-sm">{selectedTransaction.transactionId || 'N/A'}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Amount</label>
                  <div className="text-lg font-semibold">
                    {formatCurrency(selectedTransaction.amount, selectedTransaction.currency)}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div>{getStatusBadge(selectedTransaction.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Provider</label>
                  <div><Badge variant="outline">{selectedTransaction.provider}</Badge></div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Purpose</label>
                  <div>{selectedTransaction.purposeTitle || selectedTransaction.purpose}</div>
                </div>
              </div>

              {/* Donor Info */}
              <div>
                <h3 className="text-lg font-medium mb-3">Donor Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Name</label>
                    <div>
                      {selectedTransaction.donorFirstName && selectedTransaction.donorLastName
                        ? `${selectedTransaction.donorFirstName} ${selectedTransaction.donorLastName}`
                        : 'Not provided'
                      }
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <div>{selectedTransaction.donorEmail}</div>
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div>
                <h3 className="text-lg font-medium mb-3">Security Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Fraud Score</label>
                    <div>{getFraudScoreBadge(selectedTransaction.fraudScore)}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Webhook Verified</label>
                    <div>
                      {selectedTransaction.webhookVerified ? (
                        <Badge variant="default">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <XCircle className="w-3 h-3 mr-1" />
                          Not Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Blocked</label>
                    <div>
                      {selectedTransaction.isBlocked ? (
                        <Badge variant="destructive">Blocked</Badge>
                      ) : (
                        <Badge variant="default">Not Blocked</Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Recurring</label>
                    <div>
                      {selectedTransaction.isRecurring ? (
                        <Badge variant="secondary">Recurring</Badge>
                      ) : (
                        <Badge variant="outline">One-time</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timestamps */}
              <div>
                <h3 className="text-lg font-medium mb-3">Timeline</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Created</label>
                    <div>{formatDate(selectedTransaction.createdAt)}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Updated</label>
                    <div>{formatDate(selectedTransaction.updatedAt)}</div>
                  </div>
                  {selectedTransaction.paidAt && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Paid At</label>
                      <div>{formatDate(selectedTransaction.paidAt)}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTransactions;