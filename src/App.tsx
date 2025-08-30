import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { ProblemSection } from './components/ProblemSection'
import { BenefitsSection } from './components/BenefitsSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { OfferSection } from './components/OfferSection'
import { GuaranteeSection } from './components/GuaranteeSection'
import { FAQSection } from './components/FAQSection'
import ColorSelector from './components/ColorSelector'
import Scene3D from './components/Scene3D'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app">
      <Header scrolled={isScrolled} />
      
      <main className="main-content">
        {/* Section 1: Hero */}
        <section className="hero-section">
          <div className="hero-grid">
            <div className="hero-left">
              <HeroSection />
            </div>
            <div className="hero-right">
              <div className="product-viewer">
                <Scene3D />
                <ColorSelector />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: The Problem */}
        <ProblemSection />

        {/* Section 3: Benefits */}
        <BenefitsSection />

        {/* Section 4: Testimonials */}
        <TestimonialsSection />

        {/* Section 5: The Offer */}
        <OfferSection />

        {/* Section 6: Guarantee */}
        <GuaranteeSection />

        {/* Section 7: FAQ */}
        <FAQSection />
      </main>
    </div>
  )
}

export default App
