import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useGsapAnimations() {
  useEffect(() => {
    // Nav bar reveal
    const navBar = document.getElementById('nav-bar')
    if (navBar) {
      navBar.classList.add('visible')
    }

    // Scroll Progress
    gsap.to('#scroll-progress', {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    })

    // Hero Content Reveal
    gsap.from('#hero .reveal-item', {
      opacity: 0,
      y: 40,
      duration: 1.2,
      stagger: 0.2,
      ease: 'expo.out',
      delay: 0.5,
    })

    // Hero Car Model Floating & Parallax
    const heroModel = document.getElementById('car-model-mock')
    if (heroModel) {
      gsap.to(heroModel, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }

    gsap.to('#hero-canvas-container', {
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: 200,
      ease: 'none',
    })

    // Parallax for Flyline and others
    document.querySelectorAll('.parallax-target').forEach((target) => {
      const speed = target.dataset.speed || 0.1
      gsap.to(target, {
        scrollTrigger: {
          trigger: target.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        y: -100 * speed,
        ease: 'none',
      })
    })

    // Bento Grid Reveal
    gsap.fromTo('#cards-container .scroll-reveal',
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '#cards-container',
          start: 'top 85%',
        },
      }
    )

    // Staggered reveal for section children
    document.querySelectorAll('.staggered-parent').forEach((parent) => {
      const revealItems = parent.querySelectorAll('.reveal-item')

      gsap.fromTo(revealItems,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          immediateRender: false,
          overwrite: 'auto',
          scrollTrigger: {
            trigger: parent,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          duration: 1.2,
          stagger: 0.15,
          ease: 'power4.out',
        }
      )
    })

    // Responsive Mouse Tracking for Hero Model
    const heroSection = document.getElementById('hero')
    const handleHeroMouseMove = (e) => {
      if (!heroModel) return
      const { clientX, clientY } = e
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const moveX = (clientX - centerX) / 40
      const moveY = (clientY - centerY) / 40

      gsap.to(heroModel, {
        x: moveX,
        y: moveY,
        rotationY: moveX * 0.1,
        rotationX: -moveY * 0.1,
        ease: 'power2.out',
      })
    }

    if (heroSection) {
      heroSection.addEventListener('mousemove', handleHeroMouseMove)
    }

    // GSAP Scroll reveals for general elements
    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      if (el.closest('#cards-container')) return
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      gsap.killTweensOf('*')
      if (heroSection) {
        heroSection.removeEventListener('mousemove', handleHeroMouseMove)
      }
    }
  }, [])
}
