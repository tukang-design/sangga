export const OfferSection = () => {
  return (
    <section className="offer-section">
      <div className="container">
        <h2 className="section-title centered">
          Ready to Transform Your Workspace?
        </h2>
        
        <div className="offer-content">
          <div className="offer-image">
            <div className="image-placeholder">
              Beautiful angle of Sangga stand in elegant packaging
            </div>
          </div>
          
          <div className="offer-details">
            <h3 className="offer-subtitle">Here's what you get:</h3>
            
            <ul className="offer-features">
              <li>✓ The Sangga Ergonomic Laptop Stand</li>
              <li>✓ Reduced Neck & Shoulder Strain</li>
              <li>✓ Improved Posture & Comfort</li>
              <li>✓ A More Productive, Stylish Workspace</li>
              <li>✓ FREE Shipping Across Malaysia</li>
            </ul>
            
            <div className="pricing">
              <h4 className="pricing-title">Limited-Time Launch Offer</h4>
              <div className="price-comparison">
                <span className="original-price">Retail Price: ~RM249~</span>
                <span className="current-price">Today Only: RM199</span>
                <span className="savings">(You Save 20%!)</span>
              </div>
            </div>
            
            <button className="btn btn-primary btn-large cta-main">
              ADD TO CART
            </button>
            
            <div className="trust-badges">
              <span className="trust-text">Secure Payments:</span>
              <div className="payment-logos">
                <span className="payment-logo">[Visa]</span>
                <span className="payment-logo">[Mastercard]</span>
                <span className="payment-logo">[FPX]</span>
                <span className="payment-logo">[GrabPay]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
