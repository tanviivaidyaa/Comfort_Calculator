import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage = () => {
  const [statusMessage, setStatusMessage] = useState('');

  const handleCheckout = (event) => {
    event.preventDefault();
    setStatusMessage('🚀 Premium access will be available here soon. We will notify you when checkout goes live.');
  };

  return (
    <div className="payment-page">
      <div className="payment-hero">
        <p className="eyebrow">Premium • $4.99 / month</p>
        <h1>Unlock Excel exports & AI planning tools</h1>
        <p>Upgrade in seconds and keep every relocation scenario organized in one place.</p>
      </div>

      <div className="payment-layout compact">
        <section className="plan-overview">
          <div className="plan-card">
            <h2>Premium Plan</h2>
            <p className="price">$4.99<span>/month</span></p>
            <ul>
              <li>📊 Unlimited Excel exports</li>
              <li>🤖 AI scenario recommendations</li>
              <li>📈 Lifestyle comparison workspace</li>
            </ul>
          </div>

          <div className="mini-benefits">
            <p className="label">Includes:</p>
            <div className="pill">7-day free trial</div>
            <div className="pill">Cancel anytime</div>
            <div className="pill">Priority roadmap access</div>
          </div>
        </section>

        <section className="checkout-panel light">
          <h2>Secure checkout</h2>
          <form className="checkout-form" onSubmit={handleCheckout}>
            <div className="form-row">
              <label htmlFor="fullName">Full name</label>
              <input id="fullName" name="fullName" type="text" placeholder="Alex Morgan" required />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="form-row">
              <label htmlFor="cardNumber">Card number</label>
              <input id="cardNumber" name="cardNumber" type="text" inputMode="numeric" placeholder="4242 4242 4242 4242" required />
            </div>
            <div className="form-split">
              <div className="form-row">
                <label htmlFor="expiry">Expiry</label>
                <input id="expiry" name="expiry" type="text" placeholder="MM / YY" required />
              </div>
              <div className="form-row">
                <label htmlFor="cvc">CVC</label>
                <input id="cvc" name="cvc" type="text" placeholder="123" required />
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>$4.99 / month</span>
              </div>
              <div className="summary-row">
                <span>Trial</span>
                <span>7 days free</span>
              </div>
              <div className="summary-total">
                <span>Due today</span>
                <strong>$0.00</strong>
              </div>
            </div>

            <label className="terms-checkbox">
              <input type="checkbox" required />
              <span>I agree to the <a href="https://example.com/terms" target="_blank" rel="noreferrer">Terms</a> & <a href="https://example.com/privacy" target="_blank" rel="noreferrer">Privacy</a>.</span>
            </label>

            <button type="submit" className="checkout-button full-width">
              Start Premium
            </button>
            {statusMessage && <p className="status-message">{statusMessage}</p>}
          </form>

          <div className="security-note minimal">
            <span>🔐 SSL encrypted • Cancel anytime</span>
          </div>
        </section>
      </div>

      <div className="payment-footer">
        <Link to="/" className="back-link">← Back to calculator</Link>
        <p className="legal-text">Cancel anytime. Taxes may apply. Prices shown in USD.</p>
      </div>
    </div>
  );
};

export default PaymentPage;
