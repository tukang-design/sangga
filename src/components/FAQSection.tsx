export const FAQSection = () => {
  return (
    <section className="faq-section">
      <div className="container">
        <h2 className="section-title centered">
          Frequently Asked Questions
        </h2>
        
        <div className="faq-grid">
          <div className="faq-item">
            <h3 className="faq-question">What laptops is it compatible with?</h3>
            <p className="faq-answer">
              Sangga supports all laptops and tablets from 10 to 17 inches, up to a weight of 6kg.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-question">What is it made of?</h3>
            <p className="faq-answer">
              It's constructed from high-quality, anodized aluminum for a premium feel and lasting durability.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-question">How long does shipping take?</h3>
            <p className="faq-answer">
              Orders within Malaysia typically arrive in 2-4 business days. All orders ship free!
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-question">What if I don't like it?</h3>
            <p className="faq-answer">
              No problem. Just contact us within 30 days for a full refund, as part of our risk-free guarantee.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
