import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { ProblemSection } from './components/ProblemSection'
import { BenefitsSection } from './components/BenefitsSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { OfferSection } from './components/OfferSection'
import { GuaranteeSection } from './components/GuaranteeSection'
import { FAQSection } from './components/FAQSection'
import { CreatorStorySection } from './components/CreatorStorySection'
import CollapsibleColorSelector from './components/CollapsibleColorSelector'
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
                <CollapsibleColorSelector />
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

        {/* Section 5: Creator Story */}
        <CreatorStorySection />

        {/* Section 6: The Offer */}
        <OfferSection />

        {/* Section 7: Guarantee */}
        <GuaranteeSection />

        {/* Section 8: FAQ */}
        <FAQSection />
      </main>
    </div>
  )
}

export default App
