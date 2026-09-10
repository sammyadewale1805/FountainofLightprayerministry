"use client";

import { useId } from "react";
import { Loader2 } from "lucide-react";
import { usePaypal, type PaymentPayload, type PaymentResult } from "@/hooks/use_paypal";

interface PayPalButtonProps {
  payload: PaymentPayload;
  onSuccess: (result: PaymentResult) => void;
  onError: (error: string) => void;
  disabled?: boolean;
}

export function PayPalButton({ payload, onSuccess, onError, disabled }: PayPalButtonProps) {
  const uid = useId().replace(/:/g, "");
  const containerId = `paypal-btn-${uid}`;
  const { loading, sdkReady } = usePaypal(containerId, payload, { onSuccess, onError });

  return (
    <div className="w-full">
      {(!sdkReady || loading) && (
        <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          {loading ? "Processing payment…" : "Loading PayPal…"}
        </div>
      )}
      <div
        id={containerId}
        style={{
          opacity: disabled ? 0.4 : 1,
          pointerEvents: disabled ? "none" : "auto",
          minHeight: sdkReady ? 50 : 0,
        }}
      />
    </div>
  );
}
