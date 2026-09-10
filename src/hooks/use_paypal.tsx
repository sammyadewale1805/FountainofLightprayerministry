"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string;
//const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const API_URL = 'https://fountainoflightprayerministry.onrender.com/api';

export interface PaymentPayload {
  amount: string;
  currency?: string;
  purpose?: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  amount?: string;
  currency?: string;
  payerEmail?: string;
  payerName?: string;
  error?: string;
}

declare global {
  interface Window {
    paypal?: any;
  }
}

export function usePaypal(
  containerId: string,
  payload: PaymentPayload,
  {
    onSuccess,
    onError,
  }: {
    onSuccess: (result: PaymentResult) => void;
    onError: (error: string) => void;
  }
) {
  const [loading, setLoading] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const successHandlerRef = useRef(onSuccess);
  const errorHandlerRef = useRef(onError);

  useEffect(() => {
    successHandlerRef.current = onSuccess;
  }, [onSuccess]);

  useEffect(() => {
    errorHandlerRef.current = onError;
  }, [onError]);

  useEffect(() => {
    if (!PAYPAL_CLIENT_ID) {
      errorHandlerRef.current('PayPal is not configured right now. Please contact support.');
      return;
    }

    // If SDK already loaded, just mark ready
    if (window.paypal) {
      setSdkReady(true);
      return;
    }

    // Remove any existing PayPal script to avoid duplicates
    const existingScript = document.querySelector('script[data-paypal-sdk]');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');

    // enable-funding: shows PayPal, Venmo, Pay Later, card options
    // components=buttons: loads the full button suite
    // intent=capture: immediate payment (not authorize then capture later)
    script.src = [
      `https://www.paypal.com/sdk/js`,
      `?client-id=${PAYPAL_CLIENT_ID}`,
      `&currency=${payload.currency ?? 'USD'}`,
      `&intent=capture`,
      `&enable-funding=paypal,venmo,paylater,card`,
      `&disable-funding=credit`,
      `&components=buttons`,
    ].join('');

    script.async = true;
    script.dataset.paypalSdk = 'true'; // marker so we can find and remove it
    script.onload = () => setSdkReady(true);
    script.onerror = () => errorHandlerRef.current('Failed to load PayPal. Please refresh and try again.');
    document.body.appendChild(script);

    return () => {
      // Cleanup script if component unmounts before load
      if (!window.paypal) script.remove();
    };
  }, [payload.currency]);

  useEffect(() => {
    if (!sdkReady || !window.paypal) return;

    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    const buttons = window.paypal.Buttons({
      style: {
        layout: 'vertical',  // stacks all funding options vertically
        color: 'gold',
        shape: 'pill',
        label: 'donate',
        height: 45,
      },

      // Funding eligibility — let PayPal decide what's available
      fundingSource: undefined,

      createOrder: async () => {
        setLoading(true);
        try {
          const res = await fetch(`${API_URL}/paypal/create-order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              amount: payload.amount,
              currency: payload.currency ?? 'USD',
              purpose: payload.purpose ?? 'Ministry Donation',
            }),
          });

          if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData?.message ?? 'Failed to create order');
          }

          const data = await res.json();
          return data.orderId;
        } catch (err: any) {
          setLoading(false);
          errorHandlerRef.current(err.message ?? 'Order creation failed. Please try again.');
          throw err;
        }
      },

      onApprove: async (data: { orderID: string }) => {
        try {
          const res = await fetch(`${API_URL}/paypal/capture-order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId: data.orderID }),
          });

          if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData?.message ?? 'Failed to capture payment');
          }

          const result = await res.json();
          setLoading(false);
          successHandlerRef.current(result);
        } catch (err: any) {
          setLoading(false);
          errorHandlerRef.current(err.message ?? 'Payment capture failed. Please contact support.');
        }
      },

      onCancel: () => {
        setLoading(false);
        errorHandlerRef.current('Payment was cancelled');
      },

      onError: (err: any) => {
        setLoading(false);
        errorHandlerRef.current(err?.message ?? 'An unexpected PayPal error occurred. Please try again.');
      },
    });

    // Check if buttons are eligible before rendering
    if (buttons.isEligible()) {
      buttons.render(`#${containerId}`).catch((err: any) => {
        setLoading(false);
        errorHandlerRef.current(err?.message ?? 'Unable to initialize PayPal. Please refresh.');
      });
    } else {
      errorHandlerRef.current('PayPal is not available in your region.');
    }

    return () => {
      container.innerHTML = '';
    };
  }, [sdkReady, containerId, payload.amount, payload.currency, payload.purpose]);

  const reset = useCallback(() => {
    const container = document.getElementById(containerId);
    if (container) container.innerHTML = '';
    setLoading(false);
    setSdkReady(false);
  }, [containerId]);

  return { loading, sdkReady, reset };
}