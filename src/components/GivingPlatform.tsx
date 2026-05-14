import { useMemo, useState, useEffect, useRef } from "react";
import {
  Heart,
  Globe,
  Building,
  Users,
  Shield,
  CheckCircle,
  Copy,
  Landmark,
  Sparkles,
} from "lucide-react";
import PayPalButton from "@/components/PayPalButton";
import type { PaymentResult } from "@/hooks/use_paypal";

type PaymentMethod = "paypal" | "bank_transfer";


const quickAmounts = [25, 50, 100, 250, 500];

const bankTransferDetails = {
  bankName: import.meta.env.VITE_BANK_NAME || "Fountain of Light Ministry Bank",
  accountName:
    import.meta.env.VITE_BANK_ACCOUNT_NAME ||
    "Fountain of Light Prayer Ministry International",
  accountNumber: import.meta.env.VITE_BANK_ACCOUNT_NUMBER || "0000000000",
  routingNumber: import.meta.env.VITE_BANK_ROUTING_NUMBER || "000000000",
  swiftCode: import.meta.env.VITE_BANK_SWIFT_CODE || "FOLMUS00",
  supportEmail:
    import.meta.env.VITE_GIVING_SUPPORT_EMAIL || "giving@lightacrossnations.org",
  currency: import.meta.env.VITE_BANK_TRANSFER_CURRENCY || "USD",
};

const GivingPlatform = () => {
  const [amount, setAmount] = useState<number | "">("");
  const [customAmount, setCustomAmount] = useState("");
  const [purpose, setPurpose] = useState("general");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("paypal");
  const [result, setResult] = useState<PaymentResult | null>(null);
  const [completedMethod, setCompletedMethod] = useState<PaymentMethod | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const [bankTransferName, setBankTransferName] = useState("");
  const [bankTransferEmail, setBankTransferEmail] = useState("");
  const [bankTransferReference, setBankTransferReference] = useState("");
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);
    // Particle canvas animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: {
      x: number; y: number; r: number;
      vx: number; vy: number; alpha: number; va: number;
    }[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -Math.random() * 0.4 - 0.1,
      alpha: Math.random() * 0.5 + 0.1,
      va: (Math.random() - 0.5) * 0.003,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.va;
        if (p.alpha <= 0 || p.alpha >= 0.7) p.va *= -1;
        if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(228, 196, 120, ${p.alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  const finalAmountValue = amount !== "" ? amount : Number(customAmount) || 0;
  const finalAmount = finalAmountValue.toFixed(2);
  const isReady = finalAmountValue > 0;


  const copyToClipboard = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyMessage(`${label} copied`);
      setTimeout(() => setCopyMessage(""), 2000);
    } catch {
      setErrorMsg("Could not copy to clipboard. Please copy manually.");
    }
  };

  const handleSuccess = (res: PaymentResult) => {
    setResult(res);
    setCompletedMethod("paypal");
    setErrorMsg("");
  };

  const handleError = (err: string) => {
    if (err === "Payment was cancelled") return;
    setErrorMsg(err);
  };

  const handleBankTransferConfirmation = () => {
    if (!isReady) { setErrorMsg("Please enter a valid donation amount."); return; }
    if (!bankTransferEmail || !bankTransferEmail.includes("@")) {
      setErrorMsg("Please enter a valid email for transfer confirmation.");
      return;
    }
    setErrorMsg("");
    setResult({
      success: true,
      amount: finalAmount,
      currency: bankTransferDetails.currency,
      payerEmail: bankTransferEmail.trim(),
      payerName: bankTransferName.trim() || undefined,
      transactionId: bankTransferReference.trim() || `BANK-${Math.floor(Date.now() / 1000)}`,
    });
    setCompletedMethod("bank_transfer");
  };

  const reset = () => {
    setResult(null); setCompletedMethod(null); setErrorMsg("");
    setAmount(""); setCustomAmount(""); setPurpose("general");
    setPaymentMethod("paypal"); setCopyMessage("");
    setBankTransferName(""); setBankTransferEmail(""); setBankTransferReference("");
  };

  if (result?.success) {
    return (
      <section className="giving-section">
        <canvas ref={canvasRef} className="particle-canvas" />
        <div className={`thank-you-wrap ${mounted ? "visible" : ""}`}>
          <div className="rays-bg" />
          <div className="thank-you">
            <div className="check-ring">
              <div className="check-inner">
                <CheckCircle size={38} strokeWidth={1.2} />
              </div>
            </div>
            <p className="thank-eyebrow">
              <Sparkles size={11} /> Offering Received
            </p>
            <h2>Bless You</h2>
            <div className="gift-pill">
              <span className="gift-amount">${result.amount}</span>
              <span className="gift-cur">{result.currency}</span>
            </div>
            {result.payerName && (
              <p className="payer-name">Thank you, {result.payerName}</p>
            )}
            <p className="method-badge">
              {completedMethod === "bank_transfer" ? "🏦 Bank Transfer" : "🔐 PayPal"}
            </p>
            {result.transactionId && (
              <p className="txid">ref: {result.transactionId}</p>
            )}
            <div className="verse-block">
              <span className="verse-mark">"</span>
              <p>God loves a cheerful giver.</p>
              <cite>— 2 Corinthians 9:7</cite>
            </div>
            <button className="give-again-btn" onClick={reset}>
              Give Again
            </button>
          </div>
        </div>
        <style>{styles}</style>
      </section>
    );
  }

  return (
    <section className="giving-section" id="giving">
      <canvas ref={canvasRef} className="particle-canvas" />
      <div className="ambient-orb orb-1" />
      <div className="ambient-orb orb-2" />
      <div className="ambient-orb orb-3" />

      <div className={`giving-inner ${mounted ? "visible" : ""}`}>
        {/* Header */}
        <header className="giving-header">
          <div className="header-icon-ring">
            <Heart size={20} strokeWidth={1.5} />
          </div>
          <div className="eyebrow-row">
            <span className="eyebrow-dot" />
            <span className="eyebrow-text">Global Giving</span>
            <span className="eyebrow-dot" />
          </div>
          <h2>Partner With <em>Our Ministry</em></h2>
          <p>Supporting communities across New York, Lagos &amp; Akure</p>
        </header>

        {/* Main Card */}
        <div className="giving-card">
          <div className="card-glow" />

          
          {/* Amount */}
          <div className="field">
            <label className="field-label">
              <span className="step-num"></span>
              Gift amount ({bankTransferDetails.currency})
            </label>
            <div className="quick-row">
              {quickAmounts.map((q) => (
                <button
                  key={q}
                  type="button"
                  className={`quick-btn ${amount === q ? "active" : ""}`}
                  onClick={() => { setAmount(q); setCustomAmount(""); }}
                >
                  ${q}
                </button>
              ))}
            </div>
            <div className="amount-wrapper">
              <span className="amount-prefix">$</span>
              <input
                type="number"
                className="amount-input"
                placeholder="Custom amount"
                min={1}
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setAmount(""); }}
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="field">
            <label className="field-label">
              <span className="step-num">03</span>
              Payment method
            </label>
            <div className="method-grid">
              <button
                type="button"
                className={`method-btn ${paymentMethod === "paypal" ? "active" : ""}`}
                onClick={() => setPaymentMethod("paypal")}
              >
                <Shield size={15} strokeWidth={1.5} />
                <div>
                  <div className="method-name">PayPal</div>
                  <div className="method-sub">Instant &amp; secure</div>
                </div>
                {paymentMethod === "paypal" && <span className="method-active-dot" />}
              </button>
              <button
                type="button"
                className={`method-btn ${paymentMethod === "bank_transfer" ? "active" : ""}`}
                onClick={() => setPaymentMethod("bank_transfer")}
              >
                <Landmark size={15} strokeWidth={1.5} />
                <div>
                  <div className="method-name">Bank Transfer</div>
                  <div className="method-sub">Wire / SWIFT</div>
                </div>
                {paymentMethod === "bank_transfer" && <span className="method-active-dot" />}
              </button>
            </div>
          </div>

          {/* Alerts */}
          {errorMsg && (
            <div className="alert alert-error">
              <span className="alert-icon">⚠</span> {errorMsg}
            </div>
          )}
          {copyMessage && (
            <div className="alert alert-success">
              <span className="alert-icon">✓</span> {copyMessage}
            </div>
          )}

          {/* Action Zone */}
          <div className="field action-zone">
            {!isReady ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <Heart size={22} strokeWidth={1.2} />
                </div>
                <p>Enter an amount above to continue</p>
              </div>
            ) : paymentMethod === "paypal" ? (
              <div className="paypal-wrap">
                <PayPalButton
                  payload={{ amount: finalAmount, currency: bankTransferDetails.currency }}
                  onSuccess={handleSuccess}
                  onError={handleError}
                />
              </div>
            ) : (
              <div className="bank-card">
                <div className="bank-header">
                  <Landmark size={16} strokeWidth={1.5} />
                  <div>
                    <div className="bank-title">Bank Transfer Details</div>
                    <div className="bank-subtitle">
                      Transfer <strong>${finalAmount} {bankTransferDetails.currency}</strong> using the details below
                    </div>
                  </div>
                </div>

                <div className="bank-grid">
                  {[
                    ["Bank Name", bankTransferDetails.bankName],
                    ["Account Name", bankTransferDetails.accountName],
                    ["Account Number", bankTransferDetails.accountNumber],
                    ["Routing Number", bankTransferDetails.routingNumber],
                    ["SWIFT / BIC", bankTransferDetails.swiftCode],
                  ].map(([label, value]) => (
                    <div key={label} className="bank-row">
                      <span className="bank-row-label">{label}</span>
                      <button
                        type="button"
                        className="bank-copy-btn"
                        onClick={() => copyToClipboard(label, value)}
                        title={`Copy ${label}`}
                      >
                        <span className="bank-value">{value}</span>
                        <Copy size={12} strokeWidth={1.8} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bank-divider">
                  <span>After sending, confirm below</span>
                </div>

                <div className="bank-form">
                  <div className="input-group">
                    <input
                      type="text"
                      className="styled-input"
                      placeholder="Your full name (optional)"
                      value={bankTransferName}
                      onChange={(e) => setBankTransferName(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="email"
                      className="styled-input"
                      placeholder="Confirmation email *"
                      value={bankTransferEmail}
                      onChange={(e) => setBankTransferEmail(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="text"
                      className="styled-input"
                      placeholder="Transfer reference (optional)"
                      value={bankTransferReference}
                      onChange={(e) => setBankTransferReference(e.target.value)}
                    />
                  </div>
                </div>

                <button type="button" className="confirm-btn" onClick={handleBankTransferConfirmation}>
                  <CheckCircle size={15} strokeWidth={1.8} />
                  I've Completed the Bank Transfer
                </button>

                <p className="bank-support">
                  Need help?{" "}
                  <a href={`mailto:${bankTransferDetails.supportEmail}`} className="support-link">
                    {bankTransferDetails.supportEmail}
                  </a>
                </p>
              </div>
            )}
          </div>

          {/* Trust bar */}
          <div className="trust-bar">
            <Shield size={11} strokeWidth={1.8} />
            <span>
              {paymentMethod === "paypal"
                ? "Secured by PayPal · PCI DSS compliant · No card data stored"
                : "Manual bank transfer · Reference your name for quick reconciliation"}
            </span>
          </div>
        </div>
      </div>

      <style>{styles}</style>
    </section>
  );
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Outfit:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gold: #e4c478;
    --gold-dim: rgba(228, 196, 120, 0.18);
    --gold-border: rgba(228, 196, 120, 0.28);
    --gold-glow: rgba(228, 196, 120, 0.08);
    --bg-deep: #080e18;
    --bg-mid: #0e1a2e;
    --text-bright: #f4ead8;
    --text-mid: rgba(244, 234, 216, 0.65);
    --text-dim: rgba(244, 234, 216, 0.32);
    --card-bg: rgba(255, 255, 255, 0.034);
    --card-border: rgba(255, 255, 255, 0.07);
    --radius-lg: 22px;
    --radius-md: 13px;
    --radius-sm: 9px;
    --font-display: 'Playfair Display', Georgia, serif;
    --font-body: 'Outfit', system-ui, sans-serif;
    --transition: 0.22s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .giving-section {
    min-height: 100vh;
    background: radial-gradient(ellipse 80% 60% at 50% 0%, #112240 0%, var(--bg-deep) 55%),
                var(--bg-deep);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5rem 1.5rem;
    font-family: var(--font-body);
    position: relative;
    overflow: hidden;
    isolation: isolate;
  }

  /* Particle Canvas */
  .particle-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }

  /* Ambient Orbs */
  .ambient-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    pointer-events: none;
    z-index: 0;
  }
  .orb-1 {
    width: 560px; height: 560px;
    top: -120px; left: -100px;
    background: radial-gradient(circle, rgba(228,196,120,0.055) 0%, transparent 70%);
  }
  .orb-2 {
    width: 400px; height: 400px;
    bottom: -80px; right: -80px;
    background: radial-gradient(circle, rgba(120,160,228,0.055) 0%, transparent 70%);
  }
  .orb-3 {
    width: 300px; height: 300px;
    top: 40%; left: 50%;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, rgba(228,196,120,0.03) 0%, transparent 70%);
  }

  /* Entrance Animation */
  .giving-inner, .thank-you-wrap {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .giving-inner.visible, .thank-you-wrap.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .giving-inner {
    width: 100%;
    max-width: 520px;
    position: relative;
    z-index: 1;
  }

  /* Header */
  .giving-header {
    text-align: center;
    margin-bottom: 2.5rem;
    animation: fadeUp 0.6s ease both;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .header-icon-ring {
    width: 52px; height: 52px;
    margin: 0 auto 1.2rem;
    border-radius: 50%;
    border: 1px solid var(--gold-border);
    background: var(--gold-dim);
    display: flex; align-items: center; justify-content: center;
    color: var(--gold);
    box-shadow: 0 0 28px rgba(228,196,120,0.15);
    animation: pulse-ring 3s ease-in-out infinite;
  }
  @keyframes pulse-ring {
    0%, 100% { box-shadow: 0 0 28px rgba(228,196,120,0.15); }
    50% { box-shadow: 0 0 42px rgba(228,196,120,0.28); }
  }

  .eyebrow-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 0.85rem;
  }
  .eyebrow-dot {
    width: 4px; height: 4px;
    border-radius: 50%;
    background: var(--gold);
    opacity: 0.5;
  }
  .eyebrow-text {
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--gold);
    opacity: 0.85;
  }

  .giving-header h2 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 2.8rem);
    font-weight: 700;
    color: var(--text-bright);
    line-height: 1.15;
    margin-bottom: 0.5rem;
  }
  .giving-header h2 em {
    font-style: italic;
    color: var(--gold);
  }
  .giving-header p {
    color: var(--text-dim);
    font-size: 0.85rem;
    font-weight: 300;
    letter-spacing: 0.02em;
  }

  /* ─── WHITE CARD ─── */
  .giving-card {
    background: #ffffff;
    border: 1px solid rgba(228, 196, 120, 0.3);
    border-radius: var(--radius-lg);
    padding: 2.2rem;
    box-shadow:
      0 0 0 1px rgba(228,196,120,0.06),
      0 32px 80px rgba(0,0,0,0.5),
      0 4px 28px rgba(228,196,120,0.14);
    position: relative;
    overflow: hidden;
  }

  .card-glow {
    position: absolute;
    top: 0; left: 50%; transform: translateX(-50%);
    width: 70%; height: 2px;
    background: linear-gradient(90deg, transparent, rgba(228,196,120,0.65), transparent);
    pointer-events: none;
  }

  /* Fields */
  .field {
    margin-bottom: 1.8rem;
  }
  .field-label {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    font-size: 0.7rem;
    font-weight: 600;
    color: #6b7280;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 0.85rem;
  }
  .step-num {
    font-family: var(--font-display);
    font-size: 0.9rem;
    font-style: italic;
    color: #b8943a;
    opacity: 1;
    min-width: 18px;
  }

  /* Purpose Grid */
  .purpose-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }
  .purpose-btn {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 0.7rem 0.9rem;
    background: #f9fafb;
    border: 1.5px solid #e5e7eb;
    border-radius: var(--radius-sm);
    color: #6b7280;
    font-family: var(--font-body);
    font-size: 0.82rem;
    font-weight: 400;
    cursor: pointer;
    transition: all var(--transition);
    text-align: left;
    position: relative;
    overflow: hidden;
  }
  .purpose-btn::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, var(--accent, #e4c478), transparent);
    opacity: 0;
    transition: opacity var(--transition);
  }
  .purpose-btn:hover {
    border-color: rgba(228,196,120,0.6);
    color: #1f2937;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(228,196,120,0.15);
  }
  .purpose-btn:hover::before { opacity: 0.06; }
  .purpose-btn.active {
    border-color: var(--accent, #e4c478);
    color: #1f2937;
    background: #fffdf5;
    box-shadow: 0 0 0 3px rgba(228,196,120,0.12), 0 2px 8px rgba(228,196,120,0.12);
  }
  .purpose-btn.active::before { opacity: 0.06; }
  .purpose-icon {
    width: 26px; height: 26px;
    border-radius: 6px;
    background: rgba(228,196,120,0.12);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    color: var(--accent, #b8943a);
  }
  .purpose-label { flex: 1; }
  .purpose-check {
    font-size: 0.7rem;
    color: var(--accent, #b8943a);
    margin-left: auto;
  }

  /* Quick Amounts */
  .quick-row {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
    margin-bottom: 0.75rem;
  }
  .quick-btn {
    padding: 0.42rem 0.85rem;
    background: #f3f4f6;
    border: 1.5px solid #e5e7eb;
    border-radius: 100px;
    color: #6b7280;
    font-family: var(--font-body);
    font-size: 0.84rem;
    cursor: pointer;
    transition: all var(--transition);
  }
  .quick-btn:hover {
    border-color: rgba(228,196,120,0.5);
    color: #1f2937;
    background: #fffdf5;
  }
  .quick-btn.active {
    background: #fffbeb;
    border-color: #e4c478;
    color: #b8943a;
    font-weight: 600;
    box-shadow: 0 0 0 2px rgba(228,196,120,0.2);
  }

  .amount-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }
  .amount-prefix {
    position: absolute;
    left: 1rem;
    color: #9ca3af;
    font-size: 1rem;
    font-weight: 300;
    pointer-events: none;
    z-index: 1;
  }
  .amount-input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2rem;
    background: #f9fafb;
    border: 1.5px solid #e5e7eb;
    border-radius: var(--radius-sm);
    color: #1f2937;
    font-family: var(--font-body);
    font-size: 1rem;
    font-weight: 400;
    outline: none;
    transition: border var(--transition), box-shadow var(--transition);
    appearance: textfield;
    -moz-appearance: textfield;
  }
  .amount-input::placeholder { color: #d1d5db; }
  .amount-input:focus {
    border-color: #e4c478;
    box-shadow: 0 0 0 3px rgba(228,196,120,0.15);
    background: #fff;
  }
  .amount-input::-webkit-outer-spin-button,
  .amount-input::-webkit-inner-spin-button { -webkit-appearance: none; }

  /* Method Buttons */
  .method-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }
  .method-btn {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.75rem 0.9rem;
    background: #f9fafb;
    border: 1.5px solid #e5e7eb;
    border-radius: var(--radius-sm);
    color: #6b7280;
    cursor: pointer;
    transition: all var(--transition);
    font-family: var(--font-body);
    text-align: left;
    position: relative;
  }
  .method-btn:hover {
    border-color: rgba(228,196,120,0.5);
    color: #1f2937;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(228,196,120,0.12);
  }
  .method-btn.active {
    border-color: #e4c478;
    background: #fffbeb;
    color: #1f2937;
    box-shadow: 0 0 0 3px rgba(228,196,120,0.12);
  }
  .method-name { font-size: 0.85rem; font-weight: 500; line-height: 1.2; color: #374151; }
  .method-sub { font-size: 0.68rem; color: #9ca3af; margin-top: 1px; }
  .method-active-dot {
    position: absolute; top: 10px; right: 10px;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #b8943a;
    box-shadow: 0 0 8px rgba(184,148,58,0.5);
  }

  /* Alerts */
  .alert {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.65rem 0.9rem;
    border-radius: var(--radius-sm);
    font-size: 0.81rem;
    margin-bottom: 1.2rem;
    animation: slideIn 0.2s ease;
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .alert-error {
    background: #fef2f2;
    border: 1px solid #fca5a5;
    color: #dc2626;
  }
  .alert-success {
    background: #f0fdf4;
    border: 1px solid #86efac;
    color: #16a34a;
  }
  .alert-icon { font-size: 0.85rem; }

  /* Empty State */
  .empty-state {
    text-align: center;
    padding: 2rem;
    border: 1.5px dashed #e5e7eb;
    border-radius: var(--radius-md);
    background: #fafafa;
  }
  .empty-icon {
    width: 44px; height: 44px;
    border-radius: 50%;
    background: rgba(228,196,120,0.1);
    display: flex; align-items: center; justify-content: center;
    color: #b8943a;
    opacity: 0.7;
    margin: 0 auto 0.75rem;
  }
  .empty-state p { color: #9ca3af; font-size: 0.82rem; }

  /* PayPal wrap */
  .paypal-wrap { }
  .paypal-summary {
    font-size: 0.82rem;
    color: #6b7280;
    margin-bottom: 1rem;
    text-align: center;
  }
  .paypal-summary strong { color: #1f2937; }

  /* Bank Card */
  .bank-card {
    border: 1.5px solid #e5e7eb;
    border-radius: var(--radius-md);
    padding: 1.25rem;
    background: #f9fafb;
  }
  .bank-header {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 1.1rem;
    color: #b8943a;
  }
  .bank-title { font-size: 0.9rem; font-weight: 600; color: #1f2937; }
  .bank-subtitle { font-size: 0.75rem; color: #6b7280; margin-top: 2px; }
  .bank-subtitle strong { color: #374151; }

  .bank-grid {
    display: grid;
    gap: 0.38rem;
    margin-bottom: 1rem;
  }
  .bank-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.7rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: #ffffff;
    transition: border-color var(--transition), box-shadow var(--transition);
  }
  .bank-row:hover {
    border-color: rgba(228,196,120,0.5);
    box-shadow: 0 1px 4px rgba(228,196,120,0.1);
  }
  .bank-row-label {
    color: #9ca3af;
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    flex-shrink: 0;
    min-width: 90px;
  }
  .bank-copy-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: transparent;
    border: none;
    color: #374151;
    font-size: 0.78rem;
    font-family: var(--font-body);
    cursor: pointer;
    text-align: right;
    transition: color var(--transition);
  }
  .bank-copy-btn:hover { color: #b8943a; }
  .bank-value { font-size: 0.76rem; }

  .bank-divider {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 1rem 0;
  }
  .bank-divider::before, .bank-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e5e7eb;
  }
  .bank-divider span {
    color: #9ca3af;
    font-size: 0.68rem;
    letter-spacing: 0.06em;
    white-space: nowrap;
  }

  .bank-form {
    display: grid;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  .input-group { position: relative; }
  .styled-input {
    width: 100%;
    padding: 0.65rem 0.9rem;
    background: #ffffff;
    border: 1.5px solid #e5e7eb;
    border-radius: var(--radius-sm);
    color: #1f2937;
    font-family: var(--font-body);
    font-size: 0.86rem;
    font-weight: 400;
    outline: none;
    transition: border var(--transition), box-shadow var(--transition);
    box-sizing: border-box;
  }
  .styled-input::placeholder { color: #d1d5db; }
  .styled-input:focus {
    border-color: #e4c478;
    box-shadow: 0 0 0 3px rgba(228,196,120,0.12);
  }

  .confirm-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.78rem 1rem;
    background: linear-gradient(135deg, #e4c478, #c9a840);
    border: none;
    border-radius: var(--radius-sm);
    color: #fff;
    font-family: var(--font-body);
    font-size: 0.87rem;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition);
    letter-spacing: 0.02em;
    box-shadow: 0 2px 12px rgba(184,148,58,0.35);
  }
  .confirm-btn:hover {
    background: linear-gradient(135deg, #eacf88, #d4a843);
    box-shadow: 0 4px 20px rgba(184,148,58,0.45);
    transform: translateY(-1px);
  }

  .bank-support {
    margin-top: 0.8rem;
    font-size: 0.7rem;
    color: #9ca3af;
    text-align: center;
  }
  .support-link { color: #b8943a; text-decoration: none; }
  .support-link:hover { color: #8a6d28; }

  /* Trust Bar */
  .trust-bar {
    display: flex;
    align-items: center;
    gap: 6px;
    justify-content: center;
    margin-top: 1.4rem;
    padding-top: 1.2rem;
    border-top: 1px solid #f0f0f0;
    color: #9ca3af;
    font-size: 0.68rem;
    letter-spacing: 0.03em;
  }

  /* Thank You */
  .thank-you-wrap {
    position: relative; z-index: 1;
    display: flex; align-items: center; justify-content: center;
    min-height: 80vh;
  }
  .rays-bg {
    position: absolute; inset: 0;
    background: conic-gradient(from 180deg at 50% 100%, transparent 60deg, rgba(228,196,120,0.04) 90deg, transparent 120deg);
    pointer-events: none;
  }
  .thank-you {
    text-align: center;
    max-width: 420px;
    padding: 3rem 2rem;
    background: #ffffff;
    border: 1px solid rgba(228,196,120,0.3);
    border-radius: var(--radius-lg);
    box-shadow: 0 32px 80px rgba(0,0,0,0.45), 0 4px 28px rgba(228,196,120,0.12);
  }
  .check-ring {
    width: 80px; height: 80px;
    margin: 0 auto 1.6rem;
    border-radius: 50%;
    border: 1.5px solid rgba(228,196,120,0.4);
    background: #fffbeb;
    display: flex; align-items: center; justify-content: center;
    animation: check-pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  }
  @keyframes check-pop {
    from { opacity: 0; transform: scale(0.5) rotate(-20deg); }
    to { opacity: 1; transform: scale(1) rotate(0deg); }
  }
  .check-inner { color: #b8943a; }
  .thank-eyebrow {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 0.68rem; font-weight: 500; letter-spacing: 0.12em;
    text-transform: uppercase; color: #b8943a;
    margin-bottom: 0.6rem;
  }
  .thank-you h2 {
    font-family: var(--font-display);
    font-size: 3rem; font-weight: 700; color: #1f2937;
    line-height: 1.1; margin-bottom: 1.5rem;
  }
  .gift-pill {
    display: inline-flex; align-items: baseline; gap: 6px;
    background: #fffbeb; border: 1.5px solid rgba(228,196,120,0.4);
    border-radius: 100px; padding: 0.5rem 1.4rem;
    margin-bottom: 0.75rem;
  }
  .gift-amount { font-size: 1.8rem; font-weight: 700; color: #b8943a; font-family: var(--font-display); }
  .gift-cur { font-size: 0.85rem; color: #9ca3af; font-weight: 300; }
  .gift-dest { color: #6b7280; font-size: 0.85rem; margin-bottom: 0.5rem; }
  .gift-dest strong { color: #1f2937; }
  .payer-name { color: #b8943a; font-size: 0.88rem; margin-bottom: 0.4rem; }
  .method-badge { color: #9ca3af; font-size: 0.76rem; margin-bottom: 0.4rem; }
  .txid { font-family: 'Courier New', monospace; font-size: 0.65rem; color: #9ca3af; margin-bottom: 1.5rem; }

  .verse-block {
    position: relative;
    padding: 1.1rem 1.4rem;
    background: #fffdf5;
    border: 1px solid rgba(228,196,120,0.25);
    border-radius: var(--radius-md);
    margin-bottom: 1.8rem;
  }
  .verse-mark {
    position: absolute; top: -0.2rem; left: 0.8rem;
    font-family: var(--font-display); font-size: 3rem; font-style: italic;
    color: rgba(228,196,120,0.35); line-height: 1;
  }
  .verse-block p {
    font-style: italic; color: #b8943a;
    font-size: 0.88rem; font-family: var(--font-display); line-height: 1.6;
    position: relative; z-index: 1;
  }
  .verse-block cite {
    display: block; font-size: 0.68rem; color: #9ca3af;
    margin-top: 0.4rem; font-style: normal; letter-spacing: 0.05em;
    position: relative; z-index: 1;
  }
  .give-again-btn {
    display: inline-block;
    padding: 0.68rem 2.2rem;
    background: transparent;
    border: 1.5px solid rgba(228,196,120,0.5);
    border-radius: 100px;
    color: #b8943a;
    font-family: var(--font-body);
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition);
    letter-spacing: 0.04em;
  }
  .give-again-btn:hover {
    background: #fffbeb;
    border-color: #e4c478;
    box-shadow: 0 4px 16px rgba(228,196,120,0.2);
  }

  @media (max-width: 480px) {
    .giving-section { padding: 3.5rem 1rem; }
    .giving-header h2 { font-size: 1.85rem; }
    .giving-card { padding: 1.5rem; }
    .purpose-grid, .method-grid { grid-template-columns: 1fr 1fr; }
    .thank-you { padding: 2rem 1.25rem; }
    .thank-you h2 { font-size: 2.4rem; }
  }
`;

export default GivingPlatform;