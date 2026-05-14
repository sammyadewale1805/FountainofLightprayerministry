import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || '';

declare global {
  interface Window { paypal?: any; }
}

const PayPalDebug: React.FC = () => {
  const [testData, setTestData] = useState({ amount: '10.00', currency: 'USD' });
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [sdkError, setSdkError] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const buttonRef = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);

  const checkConfiguration = () => {
    setDebugInfo({
      clientId: PAYPAL_CLIENT_ID ? PAYPAL_CLIENT_ID.substring(0, 20) + '...' : 'NOT SET',
      clientIdValid: PAYPAL_CLIENT_ID.length > 10,
      environment: import.meta.env.MODE,
      viteVars: Object.keys(import.meta.env).filter(k => k.startsWith('VITE_')),
      sdkLoaded: !!window.paypal,
    });
  };

  const loadSDK = () => {
    if (window.paypal) { setSdkReady(true); return; }
    if (!PAYPAL_CLIENT_ID) { setSdkError('VITE_PAYPAL_CLIENT_ID is not set in your .env file.'); return; }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=${testData.currency}`;
    script.onload = () => { setSdkReady(true); setSdkError(''); };
    script.onerror = () => setSdkError('Failed to load PayPal SDK. Check your Client ID.');
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!sdkReady || !buttonRef.current || rendered.current) return;
    rendered.current = true;
    buttonRef.current.innerHTML = '';

    window.paypal.Buttons({
      style: { layout: 'vertical', color: 'gold', shape: 'pill', label: 'pay' },
      createOrder: (_: any, actions: any) =>
        actions.order.create({
          purchase_units: [{ amount: { value: testData.amount, currency_code: testData.currency } }],
        }),
      onApprove: async (_: any, actions: any) => {
        const details = await actions.order.capture();
        setPaymentStatus(`✅ Payment successful! Transaction ID: ${details.id}`);
      },
      onError: (err: any) => {
        setPaymentStatus(`❌ PayPal error: ${err}`);
        console.error('PayPal error:', err);
      },
      onCancel: () => setPaymentStatus('⚠️ Payment cancelled by user.'),
    }).render(buttonRef.current);
  }, [sdkReady]);

  const reloadButton = () => {
    rendered.current = false;
    setSdkReady(false);
    setPaymentStatus('');
    if (buttonRef.current) buttonRef.current.innerHTML = '';
    // Remove old script to reload with potentially new currency
    const old = document.querySelector(`script[src*="paypal.com/sdk"]`);
    if (old) old.remove();
    delete window.paypal;
    setTimeout(loadSDK, 100);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>PayPal Debug Tool</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          {/* Check config */}
          <Button onClick={checkConfiguration} variant="outline">
            Check Configuration
          </Button>

          {debugInfo && (
            <Alert>
              <AlertDescription>
                <div className="font-mono text-sm space-y-1">
                  <div>Client ID: {debugInfo.clientId || 'NOT SET'}</div>
                  <div>Valid Format: {debugInfo.clientIdValid ? '✓' : '✗ — must be longer than 10 chars'}</div>
                  <div>Environment: {debugInfo.environment}</div>
                  <div>VITE Vars: {debugInfo.viteVars.join(', ') || 'none found'}</div>
                  <div>SDK Loaded: {debugInfo.sdkLoaded ? '✓' : '✗'}</div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Test inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <Input
                type="number"
                value={testData.amount}
                step="0.01"
                min="1"
                onChange={(e) => setTestData({ ...testData, amount: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Currency</label>
              <select
                value={testData.currency}
                onChange={(e) => setTestData({ ...testData, currency: e.target.value })}
                className="w-full border rounded-md px-3 py-2 text-sm"
              >
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>

          {/* Load button */}
          {!sdkReady ? (
            <Button onClick={loadSDK} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
              Load PayPal &amp; Test Payment
            </Button>
          ) : (
            <Button onClick={reloadButton} variant="outline" className="w-full">
              Reload with New Settings
            </Button>
          )}

          {/* SDK error */}
          {sdkError && (
            <Alert variant="destructive">
              <AlertDescription>{sdkError}</AlertDescription>
            </Alert>
          )}

          {/* PayPal button renders here */}
          <div ref={buttonRef} />

          {/* Payment status */}
          {paymentStatus && (
            <Alert>
              <AlertDescription className="font-mono text-sm">{paymentStatus}</AlertDescription>
            </Alert>
          )}

          {/* Setup guide */}
          <div className="text-xs text-gray-500 space-y-1 border-t pt-3">
            <strong>Setup Checklist:</strong>
            <div>1. Create app at <a href="https://developer.paypal.com/dashboard" target="_blank" rel="noreferrer" className="underline">developer.paypal.com</a></div>
            <div>2. Add <code className="bg-gray-100 px-1 rounded">VITE_PAYPAL_CLIENT_ID=your_client_id</code> to your <code>.env</code></div>
            <div>3. Use Sandbox Client ID for testing, Live for production</div>
            <div>4. NGN is not supported by PayPal — use USD, GBP, or EUR</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayPalDebug;