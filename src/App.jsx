import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import SpecsGrid from './components/SpecsGrid'
import FlylineSection from './components/FlylineSection'
import CockpitSection from './components/CockpitSection'
import Footer from './components/Footer'
import WebGLBackground from './components/WebGLBackground'
import useGsapAnimations from './hooks/useGsapAnimations'

function App() {
  useGsapAnimations()

  return (
    <div className="bg-background selection:bg-tertiary selection:text-on-tertiary">
      <WebGLBackground />
      <Navbar />
      <HeroSection />
      <SpecsGrid />
      <FlylineSection />
      <CockpitSection />
      <Footer />
    </div>
  )
}

export default App
