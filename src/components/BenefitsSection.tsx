export const BenefitsSection = () => {
  return (
    <section className="benefits-section">
      <div className="container">
        <h2 className="section-title centered">
          Experience a New Level of Comfort and Focus.
        </h2>
        
        <div className="benefits-grid">
          <div className="benefit-item">
            <div className="benefit-image">
              <div className="image-placeholder">
                Professional in clean home office, sitting upright on video call
              </div>
            </div>
            <div className="benefit-content">
              <h3 className="benefit-title">Ergonomic Relief</h3>
              <p className="benefit-description">
                Reduces neck and shoulder strain by raising your screen to the perfect eye level. Feel the difference in minutes.
              </p>
            </div>
          </div>

          <div className="benefit-item reverse">
            <div className="benefit-image">
              <div className="image-placeholder">
                Designer adjusting laptop on Sangga for creative work
              </div>
            </div>
            <div className="benefit-content">
              <h3 className="benefit-title">Fully Adjustable</h3>
              <p className="benefit-description">
                With flexible height and angle settings, you can create your ideal setup for any task, whether you're sitting or standing.
              </p>
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-image">
              <div className="image-placeholder">
                Close-up of Sangga's solid build holding laptop securely
              </div>
            </div>
            <div className="benefit-content">
              <h3 className="benefit-title">Stable & Durable</h3>
              <p className="benefit-description">
                Holds your laptop securely without a single wobble. Its durable, sleek design blends into any workspace.
              </p>
            </div>
          </div>

          <div className="benefit-item reverse">
            <div className="benefit-image">
              <div className="image-placeholder">
                Student packing lightweight Sangga into backpack
              </div>
            </div>
            <div className="benefit-content">
              <h3 className="benefit-title">Portable Productivity</h3>
              <p className="benefit-description">
                Lightweight and easy to carry anywhere. Your comfortable, ergonomic workspace is always ready to go.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
