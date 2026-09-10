"use client";

import { useState } from "react";
import { CheckCircle2, Copy, Landmark, Send } from "lucide-react";
import type { PaymentResult } from "@/hooks/use_paypal";

type Frequency = "once" | "monthly";
type Method = "zelle" | "bank_transfer";
// PayPal is temporarily disabled — flip this back on once it's ready to re-enable.
const PAYPAL_ENABLED = false;

const CATEGORIES = [
  { id: "general", label: "General Offering" },
  { id: "tithes", label: "Tithes" },
  { id: "missions", label: "Missions" },
  { id: "building", label: "Building & Projects" },
];

const BANK_DETAILS = {
  bankName: process.env.NEXT_PUBLIC_BANK_NAME || "UBA (United Bank for Africa)",
  accountName:
    process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME || "Fountain of Light Prayer Ministry International",
  accountNumber: process.env.NEXT_PUBLIC_BANK_ACCOUNT_NUMBER || "1028675968",
  supportEmail: process.env.NEXT_PUBLIC_GIVING_SUPPORT_EMAIL || "flpmi24@gmail.com",
};

const ZELLE_DETAILS = {
  tag: process.env.NEXT_PUBLIC_ZELLE_TAG || "flpmi24@gmail.com",
  accountName:
    process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME || "Fountain of Light Prayer Ministry International",
};

export function GivingExperience() {
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("once");
  const [category, setCategory] = useState("general");
  const [method, setMethod] = useState<Method>("zelle");
  const [result, setResult] = useState<PaymentResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorName, setDonorName] = useState("");

  const finalAmount = (Number(customAmount) || 0).toFixed(2);
  const isReady = Number(finalAmount) > 0;

  const copyToClipboard = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyMessage(`${label} copied`);
      setTimeout(() => setCopyMessage(""), 2000);
    } catch {
      setErrorMsg("Could not copy — please copy manually.");
    }
  };

  const confirmManualGift = (prefix: string) => {
    if (!isReady) {
      setErrorMsg("Please enter a valid amount.");
      return;
    }
    if (!donorEmail.includes("@")) {
      setErrorMsg("Please enter a valid email for confirmation.");
      return;
    }
    setErrorMsg("");
    setResult({
      success: true,
      amount: finalAmount,
      currency: "USD",
      payerEmail: donorEmail.trim(),
      payerName: donorName.trim() || undefined,
      transactionId: `${prefix}-${Date.now()}`,
    });
  };

  const reset = () => {
    setResult(null);
    setErrorMsg("");
    setCustomAmount("");
    setCategory("general");
    setMethod("zelle");
    setDonorEmail("");
    setDonorName("");
  };

  if (result?.success) {
    return (
      <div className="mx-auto max-w-lg rounded-sm border border-border bg-background p-10 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-ember" />
        <h2 className="mt-6 font-display text-2xl font-semibold text-ink">Thank You</h2>
        <p className="mt-2 text-3xl font-display font-semibold text-ember">${result.amount}</p>
        {result.transactionId && (
          <p className="mt-1 text-xs text-muted-foreground">Ref: {result.transactionId}</p>
        )}
        <p className="mt-6 text-sm italic text-muted-foreground">
          &ldquo;God loves a cheerful giver.&rdquo; — 2 Corinthians 9:7
        </p>
        <button
          onClick={reset}
          className="mt-8 border-2 border-ink px-6 py-2.5 text-sm font-semibold text-ink hover:bg-sand"
        >
          Give Again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg rounded-sm border border-border bg-background p-8 md:p-10">
      {/* Frequency */}
      <div className="mb-8 grid grid-cols-2 border-2 border-ink">
        {(["once", "monthly"] as Frequency[]).map((f) => (
          <button
            key={f}
            onClick={() => setFrequency(f)}
            className={`py-2.5 text-sm font-semibold transition-colors ${
              frequency === f ? "bg-ink text-cream" : "bg-transparent text-ink hover:bg-ink/5"
            }`}
          >
            {f === "once" ? "One-Time" : "Recurring Monthly"}
          </button>
        ))}
      </div>

      {/* Category */}
      <div className="mb-7">
        <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Give toward</p>
        <div className="grid grid-cols-2 gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`rounded-sm border px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                category === c.id ? "border-ember bg-ember/5 text-ink" : "border-border text-muted-foreground hover:border-ink/30"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Amount */}
      <div className="mb-7">
        <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Amount (USD)</p>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
          <input
            type="number"
            min={1}
            placeholder="Enter amount"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="w-full rounded-sm border border-border bg-sand py-2.5 pl-8 pr-4 text-sm outline-none focus-visible:border-ember"
          />
        </div>
      </div>

      {/* Method */}
      <div className="mb-7">
        <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Payment method</p>
        <div className={`grid gap-2 ${PAYPAL_ENABLED ? "grid-cols-3" : "grid-cols-2"}`}>
          <button
            onClick={() => setMethod("zelle")}
            className={`flex items-center justify-center gap-2 rounded-sm border px-3 py-2.5 text-sm font-medium transition-colors ${
              method === "zelle" ? "border-ember bg-ember/5" : "border-border hover:border-ink/30"
            }`}
          >
            <span className="rounded bg-[#6d1ed4] px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white">
              Zelle
            </span>
          </button>
          <button
            onClick={() => setMethod("bank_transfer")}
            className={`flex items-center gap-2 rounded-sm border px-3 py-2.5 text-sm font-medium transition-colors ${
              method === "bank_transfer" ? "border-ember bg-ember/5" : "border-border hover:border-ink/30"
            }`}
          >
            <Landmark className="h-4 w-4 text-ember" /> Bank Transfer
          </button>
        </div>
      </div>

      {errorMsg && <p className="mb-4 rounded-sm bg-destructive/10 px-4 py-2.5 text-sm text-destructive">{errorMsg}</p>}
      {copyMessage && <p className="mb-4 rounded-sm bg-moss/10 px-4 py-2.5 text-sm text-moss">{copyMessage}</p>}

      {!isReady ? (
        <p className="rounded-sm border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
          Enter an amount above to continue
        </p>
      ) : method === "zelle" ? (
        <div className="space-y-4 rounded-sm border border-border bg-sand p-5">
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#6d1ed4] px-2 py-1 text-xs font-bold tracking-wide text-white">Zelle</span>
            <p className="text-sm text-muted-foreground">
              Send <strong className="text-ink">${finalAmount} USD</strong> to the Zelle tag below, then confirm.
            </p>
          </div>
          <button
            onClick={() => copyToClipboard("Zelle tag", ZELLE_DETAILS.tag)}
            className="flex w-full items-center justify-between rounded-sm border border-border bg-background px-3 py-2.5 text-left hover:border-ember"
          >
            <span className="text-xs uppercase tracking-wide text-muted-foreground">Zelle Tag</span>
            <span className="flex items-center gap-2 font-medium text-ink">
              {ZELLE_DETAILS.tag} <Copy className="h-3.5 w-3.5 text-muted-foreground" />
            </span>
          </button>
          <p className="text-xs text-muted-foreground">
            Account name: <span className="font-medium text-ink">{ZELLE_DETAILS.accountName}</span>
          </p>

          <div className="space-y-2 border-t border-border pt-4">
            <input
              placeholder="Your name (optional)"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full rounded-sm border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:border-ember"
            />
            <input
              type="email"
              placeholder="Confirmation email *"
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
              className="w-full rounded-sm border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:border-ember"
            />
          </div>
          <button
            onClick={() => confirmManualGift("ZELLE")}
            className="btn-stamp flex w-full items-center justify-center gap-2 bg-ink py-2.5 text-sm text-cream hover:bg-ink/90"
          >
            <Send className="h-4 w-4" />
            I&apos;ve Sent It on Zelle
          </button>
        </div>
      ) : (
        <div className="space-y-4 rounded-sm border border-border bg-sand p-5">
          <p className="text-sm text-muted-foreground">
            Transfer <strong className="text-ink">${finalAmount} USD</strong> using the details below, then
            confirm.
          </p>
          <div className="space-y-2 text-sm">
            {[
              ["Bank Name", BANK_DETAILS.bankName],
              ["Account Name", BANK_DETAILS.accountName],
              ["Account Number", BANK_DETAILS.accountNumber],
            ].map(([label, value]) => (
              <button
                key={label}
                onClick={() => copyToClipboard(label, value)}
                className="flex w-full items-center justify-between rounded-sm border border-border bg-background px-3 py-2 text-left hover:border-ember"
              >
                <span className="text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
                <span className="flex items-center gap-2 font-medium text-ink">
                  {value} <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                </span>
              </button>
            ))}
          </div>
          <div className="space-y-2 border-t border-border pt-4">
            <input
              placeholder="Your name (optional)"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full rounded-sm border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:border-ember"
            />
            <input
              type="email"
              placeholder="Confirmation email *"
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
              className="w-full rounded-sm border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:border-ember"
            />
          </div>
          <button
            onClick={() => confirmManualGift("BANK")}
            className="btn-stamp w-full bg-ink py-2.5 text-sm text-cream hover:bg-ink/90"
          >
            I&apos;ve Completed the Transfer
          </button>
          <p className="text-center text-xs text-muted-foreground">
            Need help? <a href={`mailto:${BANK_DETAILS.supportEmail}`} className="text-ember">{BANK_DETAILS.supportEmail}</a>
          </p>
        </div>
      )}

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Your gift goes directly to {ZELLE_DETAILS.accountName}.
      </p>
    </div>
  );
}
