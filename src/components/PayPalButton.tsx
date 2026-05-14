import { useEffect, useId } from 'react';
import { usePaypal, PaymentPayload, PaymentResult } from '@/hooks/use_paypal';
import { Loader2 } from 'lucide-react';

interface PayPalButtonProps {
  payload: PaymentPayload;
  onSuccess: (result: PaymentResult) => void;
  onError: (error: string) => void;
  disabled?: boolean;
}

const PayPalButton = ({ payload, onSuccess, onError, disabled }: PayPalButtonProps) => {
  const uid = useId().replace(/:/g, '');
  const containerId = `paypal-btn-${uid}`;

  const { loading, sdkReady } = usePaypal(containerId, payload, { onSuccess, onError });

  return (
    <div className="paypal-wrapper">
      {/* Loading state */}
      {(!sdkReady || loading) && (
        <div className="paypal-loading">
          <Loader2 className="animate-spin" size={18} />
          <span>{loading ? 'Processing payment…' : 'Loading PayPal…'}</span>
        </div>
      )}

      {/* PayPal injects its button here */}
      <div
        id={containerId}
        style={{
          opacity: disabled ? 0.4 : 1,
          pointerEvents: disabled ? 'none' : 'auto',
          minHeight: sdkReady ? 50 : 0,
        }}
      />

      <style>{`
        .paypal-wrapper { width: 100%; }
        .paypal-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px;
          color: rgba(255,255,255,0.5);
          font-size: 0.85rem;
          font-family: 'DM Sans', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default PayPalButton;