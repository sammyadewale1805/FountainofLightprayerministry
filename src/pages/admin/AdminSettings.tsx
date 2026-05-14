import React, { useState, useEffect } from 'react';
import {
  Settings,
  Shield,
  User,
  Key,
  Globe,
  AlertCircle,
  CheckCircle,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  Copy,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AdminApiService } from '@/services/apiService';
import { useToast } from '@/hooks/use-toast';

interface SystemSettings {
  siteName: string;
  siteUrl: string;
  contactEmail: string;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  rateLimitEnabled: boolean;
  maxRequestsPerMinute: number;
  webhookRetryAttempts: number;
  sessionTimeout: number;
}

interface SecuritySettings {
  requireTwoFactor: boolean;
  passwordMinLength: number;
  passwordRequireSpecialChars: boolean;
  loginAttemptLimit: number;
  lockoutDuration: number;
  apiKeyRotationDays: number;
}

interface PaymentSettings {
  paystackEnabled: boolean;
  paypalEnabled: boolean;
  fraudDetectionEnabled: boolean;
  fraudScoreThreshold: number;
  autoBlockHighRisk: boolean;
  webhookSignatureValidation: boolean;
}

const AdminSettings: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('system');
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  // Settings state
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    siteName: 'Light Across Nations',
    siteUrl: 'https://lightacrossnations.org',
    contactEmail: 'admin@lightacrossnations.org',
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,
    rateLimitEnabled: true,
    maxRequestsPerMinute: 60,
    webhookRetryAttempts: 3,
    sessionTimeout: 24
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    requireTwoFactor: false,
    passwordMinLength: 8,
    passwordRequireSpecialChars: true,
    loginAttemptLimit: 5,
    lockoutDuration: 30,
    apiKeyRotationDays: 90
  });

  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({
    paystackEnabled: true,
    paypalEnabled: true,
    fraudDetectionEnabled: true,
    fraudScoreThreshold: 70,
    autoBlockHighRisk: false,
    webhookSignatureValidation: true
  });

  const [apiKeys, setApiKeys] = useState({
    paystack: {
      public: 'pk_test_xxx...',
      secret: '••••••••••••••••',
      lastRotated: '2024-01-15'
    },
    paypal: {
      clientId: 'AYxxx...',
      clientSecret: '••••••••••••••••',
      lastRotated: '2024-01-10'
    }
  });

  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, this would fetch settings from the backend
      // For now, we'll use the default values set in state
      setIsLoading(false);
    } catch (error: any) {
      console.error('Settings load error:', error);
      toast({
        title: "Error loading settings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async (section: string) => {
    setIsSaving(true);
    try {
      // In a real implementation, this would save settings to the backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      toast({
        title: "Settings saved",
        description: `${section} settings have been updated successfully.`,
      });
    } catch (error: any) {
      console.error('Settings save error:', error);
      toast({
        title: "Error saving settings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const rotateApiKey = async (provider: string) => {
    try {
      // In a real implementation, this would rotate the API key
      toast({
        title: "API Key rotated",
        description: `New ${provider} API key has been generated.`,
      });
    } catch (error: any) {
      console.error('API key rotation error:', error);
      toast({
        title: "Error rotating API key",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const togglePasswordVisibility = (field: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "API key has been copied to your clipboard.",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage system configuration and preferences</p>
        </div>
        <Badge variant="outline" className="text-green-600">
          <CheckCircle className="w-3 h-3 mr-1" />
          System Healthy
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>

        {/* System Settings */}
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                System Configuration
              </CardTitle>
              <CardDescription>
                Basic system settings and site configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={systemSettings.siteName}
                    onChange={(e) => setSystemSettings(prev => ({
                      ...prev,
                      siteName: e.target.value
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteUrl">Site URL</Label>
                  <Input
                    id="siteUrl"
                    type="url"
                    value={systemSettings.siteUrl}
                    onChange={(e) => setSystemSettings(prev => ({
                      ...prev,
                      siteUrl: e.target.value
                    }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={systemSettings.contactEmail}
                  onChange={(e) => setSystemSettings(prev => ({
                    ...prev,
                    contactEmail: e.target.value
                  }))}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Behavior</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance">Maintenance Mode</Label>
                    <p className="text-sm text-gray-500">
                      Enable to temporarily disable public access
                    </p>
                  </div>
                  <Switch
                    id="maintenance"
                    checked={systemSettings.maintenanceMode}
                    onCheckedChange={(checked) => setSystemSettings(prev => ({
                      ...prev,
                      maintenanceMode: checked
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="registration">Allow Registration</Label>
                    <p className="text-sm text-gray-500">
                      Allow new user registration
                    </p>
                  </div>
                  <Switch
                    id="registration"
                    checked={systemSettings.allowRegistration}
                    onCheckedChange={(checked) => setSystemSettings(prev => ({
                      ...prev,
                      allowRegistration: checked
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="rateLimiting">Rate Limiting</Label>
                    <p className="text-sm text-gray-500">
                      Enable API rate limiting
                    </p>
                  </div>
                  <Switch
                    id="rateLimiting"
                    checked={systemSettings.rateLimitEnabled}
                    onCheckedChange={(checked) => setSystemSettings(prev => ({
                      ...prev,
                      rateLimitEnabled: checked
                    }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxRequests">Max Requests/Minute</Label>
                  <Input
                    id="maxRequests"
                    type="number"
                    min="1"
                    max="1000"
                    value={systemSettings.maxRequestsPerMinute}
                    onChange={(e) => setSystemSettings(prev => ({
                      ...prev,
                      maxRequestsPerMinute: parseInt(e.target.value)
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    min="1"
                    max="168"
                    value={systemSettings.sessionTimeout}
                    onChange={(e) => setSystemSettings(prev => ({
                      ...prev,
                      sessionTimeout: parseInt(e.target.value)
                    }))}
                  />
                </div>
              </div>

              <Button
                onClick={() => saveSettings('System')}
                disabled={isSaving}
                className="w-full"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save System Settings'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Security Configuration
              </CardTitle>
              <CardDescription>
                Manage security policies and authentication settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Authentication</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="twoFactor">Require Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">
                      Require 2FA for all admin accounts
                    </p>
                  </div>
                  <Switch
                    id="twoFactor"
                    checked={securitySettings.requireTwoFactor}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({
                      ...prev,
                      requireTwoFactor: checked
                    }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Password Policy</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="passwordLength">Minimum Password Length</Label>
                    <Input
                      id="passwordLength"
                      type="number"
                      min="6"
                      max="32"
                      value={securitySettings.passwordMinLength}
                      onChange={(e) => setSecuritySettings(prev => ({
                        ...prev,
                        passwordMinLength: parseInt(e.target.value)
                      }))}
                    />
                  </div>
                  <div className="flex items-center justify-between pt-7">
                    <div>
                      <Label htmlFor="specialChars">Require Special Characters</Label>
                    </div>
                    <Switch
                      id="specialChars"
                      checked={securitySettings.passwordRequireSpecialChars}
                      onCheckedChange={(checked) => setSecuritySettings(prev => ({
                        ...prev,
                        passwordRequireSpecialChars: checked
                      }))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Login Security</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                    <Input
                      id="loginAttempts"
                      type="number"
                      min="3"
                      max="10"
                      value={securitySettings.loginAttemptLimit}
                      onChange={(e) => setSecuritySettings(prev => ({
                        ...prev,
                        loginAttemptLimit: parseInt(e.target.value)
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lockoutDuration">Lockout Duration (minutes)</Label>
                    <Input
                      id="lockoutDuration"
                      type="number"
                      min="5"
                      max="1440"
                      value={securitySettings.lockoutDuration}
                      onChange={(e) => setSecuritySettings(prev => ({
                        ...prev,
                        lockoutDuration: parseInt(e.target.value)
                      }))}
                    />
                  </div>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Security Notice</AlertTitle>
                <AlertDescription>
                  Changes to security settings will affect all users. Make sure to communicate
                  any policy changes to your team.
                </AlertDescription>
              </Alert>

              <Button
                onClick={() => saveSettings('Security')}
                disabled={isSaving}
                className="w-full"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Security Settings'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Payment Configuration
              </CardTitle>
              <CardDescription>
                Configure payment providers and fraud detection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Providers</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="paystackEnabled">Paystack Integration</Label>
                    <p className="text-sm text-gray-500">
                      Enable Paystack payment processing
                    </p>
                  </div>
                  <Switch
                    id="paystackEnabled"
                    checked={paymentSettings.paystackEnabled}
                    onCheckedChange={(checked) => setPaymentSettings(prev => ({
                      ...prev,
                      paystackEnabled: checked
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="paypalEnabled">PayPal Integration</Label>
                    <p className="text-sm text-gray-500">
                      Enable PayPal payment processing
                    </p>
                  </div>
                  <Switch
                    id="paypalEnabled"
                    checked={paymentSettings.paypalEnabled}
                    onCheckedChange={(checked) => setPaymentSettings(prev => ({
                      ...prev,
                      paypalEnabled: checked
                    }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Fraud Detection</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="fraudDetection">Enable Fraud Detection</Label>
                    <p className="text-sm text-gray-500">
                      Analyze transactions for suspicious patterns
                    </p>
                  </div>
                  <Switch
                    id="fraudDetection"
                    checked={paymentSettings.fraudDetectionEnabled}
                    onCheckedChange={(checked) => setPaymentSettings(prev => ({
                      ...prev,
                      fraudDetectionEnabled: checked
                    }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fraudThreshold">Fraud Score Threshold</Label>
                    <Input
                      id="fraudThreshold"
                      type="number"
                      min="0"
                      max="100"
                      value={paymentSettings.fraudScoreThreshold}
                      onChange={(e) => setPaymentSettings(prev => ({
                        ...prev,
                        fraudScoreThreshold: parseInt(e.target.value)
                      }))}
                    />
                    <p className="text-xs text-gray-500">
                      Transactions above this score will be flagged
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-7">
                    <div>
                      <Label htmlFor="autoBlock">Auto-block High Risk</Label>
                    </div>
                    <Switch
                      id="autoBlock"
                      checked={paymentSettings.autoBlockHighRisk}
                      onCheckedChange={(checked) => setPaymentSettings(prev => ({
                        ...prev,
                        autoBlockHighRisk: checked
                      }))}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="webhookValidation">Webhook Signature Validation</Label>
                  <p className="text-sm text-gray-500">
                    Validate webhook signatures for security
                  </p>
                </div>
                <Switch
                  id="webhookValidation"
                  checked={paymentSettings.webhookSignatureValidation}
                  onCheckedChange={(checked) => setPaymentSettings(prev => ({
                    ...prev,
                    webhookSignatureValidation: checked
                  }))}
                />
              </div>

              <Button
                onClick={() => saveSettings('Payment')}
                disabled={isSaving}
                className="w-full"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Payment Settings'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys */}
        <TabsContent value="api">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="w-5 h-5 mr-2" />
                  API Key Management
                </CardTitle>
                <CardDescription>
                  Manage and rotate API keys for payment providers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Security Warning</AlertTitle>
                  <AlertDescription>
                    Keep your API keys secure. Never share them publicly or commit them to version control.
                  </AlertDescription>
                </Alert>

                {/* Paystack Keys */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Paystack</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="paystackPublic">Public Key</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="paystackPublic"
                        value={apiKeys.paystack.public}
                        readOnly
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(apiKeys.paystack.public)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paystackSecret">Secret Key</Label>
                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <Input
                          id="paystackSecret"
                          type={showPasswords.paystackSecret ? 'text' : 'password'}
                          value={showPasswords.paystackSecret ? 'sk_test_your_actual_secret_key' : apiKeys.paystack.secret}
                          readOnly
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          onClick={() => togglePasswordVisibility('paystackSecret')}
                        >
                          {showPasswords.paystackSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard('sk_test_your_actual_secret_key')}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => rotateApiKey('Paystack')}
                      >
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Last rotated: {apiKeys.paystack.lastRotated}
                    </p>
                  </div>
                </div>

                {/* PayPal Keys */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">PayPal</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="paypalClientId">Client ID</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="paypalClientId"
                        value={apiKeys.paypal.clientId}
                        readOnly
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(apiKeys.paypal.clientId)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paypalSecret">Client Secret</Label>
                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <Input
                          id="paypalSecret"
                          type={showPasswords.paypalSecret ? 'text' : 'password'}
                          value={showPasswords.paypalSecret ? 'your_actual_paypal_secret' : apiKeys.paypal.clientSecret}
                          readOnly
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          onClick={() => togglePasswordVisibility('paypalSecret')}
                        >
                          {showPasswords.paypalSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard('your_actual_paypal_secret')}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => rotateApiKey('PayPal')}
                      >
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Last rotated: {apiKeys.paypal.lastRotated}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;