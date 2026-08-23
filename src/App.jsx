import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'

// Scope: homepage hero + navigation only, pending visual approval.
export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  )
}
