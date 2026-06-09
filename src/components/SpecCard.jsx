import { useRef, useEffect } from 'react'
import gsap from 'gsap'

function SpecCard({ label, value, description, labelColor = 'text-primary' }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    // Отключить эффект на мобильных
    const isMobile = window.innerWidth < 768

    const handleMouseMove = (e) => {
      if (isMobile) return

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        scale: 1.05,
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      if (isMobile) return

      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)',
      })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div className="magnetic-wrap scroll-reveal">
      <div
        ref={cardRef}
        className="glass-panel p-6 md:p-10 h-full flex flex-col justify-between group cursor-default interactive-card"
      >
        <span
          className={`font-label-sm text-label-sm ${labelColor} uppercase tracking-widest mb-8 md:mb-12 group-hover:text-white transition-colors text-xs md:text-sm`}
        >
          {label}
        </span>
        <div>
          <h3 className="font-display-xl text-display-xl-mobile md:text-display-xl text-2xl md:text-5xl text-primary leading-none mb-2 group-hover:scale-105 transition-transform duration-500 origin-left">
            {value}
          </h3>
          <p className="font-body-md text-body-md text-sm md:text-base text-on-surface-variant group-hover:text-white transition-colors">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SpecCard
