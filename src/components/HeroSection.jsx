import Model3D from './Model3D'

const HERO_IMAGE_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsFGUsa5qnVN9VvUmS3eCj3zssA1NbVTtQx_RtC_n8bknIYxD6XbJ4wG5GH-_DjkC4XbdFrG86LulY8QW0PNgngIrm3k_MDlAv_tTUv8ksBmaUz4wEV9YcxeV3Kv11hNOX_bD64x4Yqsf17JHnNOxBFxR87vbIwlldHg3NzxWqpM_hVDJ6bH6cqKVCrEbEG_1ZIbXn8rHXPaLK_7DRPlKCxEDYR7_T5c4dIzk78qHAc812dHI9vmMhDPdPGmvAELn99zwYwTnzB5NK'

function HeroSection() {
  return (
    <section
      className="relative h-screen w-full flex flex-col justify-end overflow-hidden studio-floor"
      id="hero"
    >
      <div className="absolute inset-0 z-0 parallax-target" id="hero-canvas-container">
        
        <div className="absolute inset-0">
          <Model3D />
        </div>
    
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div className="flex flex-col items-center gap-3 md:gap-4 animate-bounce opacity-60 hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <span className="material-symbols-outlined text-sm md:text-base">
                touch_app
              </span>
              <span className="font-label-sm text-label-sm text-white uppercase tracking-widest text-xs md:text-sm">
                Drag to Rotate
              </span>
            </div>
            <div className="flex gap-2 text-white/40 text-xs md:text-sm">
              <span>↓</span>
              <span>LMB</span>
              <span>↓</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 px-margin-desktop mb-12 md:mb-24 max-w-container-max mx-auto w-full">
        <div className="max-w-2xl staggered-parent scroll-reveal active">
          <h1 className="font-display-xl md:text-display-xl text-4xl md:text-7xl text-on-background tracking-tighter leading-none mb-4 reveal-item">
            Veltris Motors
          </h1>
          <p className="font-body-lg md:text-body-lg text-sm md:text-base text-on-surface-variant max-w-lg mb-8 reveal-item">
            Choose thrills. The new Panamera combines sports car performance
            with the comfort of an exclusive saloon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 reveal-item">
            <button className="bg-primary text-on-primary px-6 md:px-8 py-3 md:py-4 rounded-sm font-label-sm text-label-sm uppercase tracking-widest font-bold hover:bg-white transition-colors">
              Build Your Own
            </button>
            <button className="glass-panel text-on-background border border-white/20 px-6 md:px-8 py-3 md:py-4 rounded-sm font-label-sm text-label-sm uppercase tracking-widest font-bold hover:bg-white/10 transition-colors">
              Request a Test Drive
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="font-label-sm text-label-sm uppercase tracking-widest text-xs">
          Explore
        </span>
        <div className="w-px h-8 md:h-12 bg-gradient-to-b from-primary to-transparent"></div>
      </div>
    </section>
  )
}

export default HeroSection
