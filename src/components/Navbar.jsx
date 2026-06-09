function Navbar() {
  return (
    <nav
      className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-3xl border-b border-white/10"
      id="nav-bar"
    >
      <div className="flex justify-between items-center px-margin-desktop py-3 md:py-4 w-full max-w-container-max mx-auto">
        <div className="font-headline-lg text-headline-lg md:text-xl font-bold text-primary tracking-tighter text-sm md:text-base">
          Veltris Motors
        </div>
        <div className="hidden md:flex gap-4 md:gap-8">
          <a
            className="text-primary border-b-2 border-primary pb-1 font-label-sm text-label-sm text-xs md:text-sm"
            href="#"
          >
            Models
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm text-xs md:text-sm"
            href="#"
          >
            Features
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm text-xs md:text-sm"
            href="#"
          >
            Technical
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm text-xs md:text-sm"
            href="#"
          >
            E-Hybrid
          </a>
        </div>
        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden lg:flex items-center gap-3 md:gap-4 text-on-surface-variant">
            <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-all text-sm">
              location_on
            </span>
            <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-all text-sm">
              person
            </span>
          </div>
          <button className="bg-primary text-on-primary px-4 md:px-6 py-2 md:py-2 rounded-lg font-label-sm text-label-sm hover:scale-95 transition-all duration-200 uppercase tracking-widest font-bold text-xs md:text-sm">
            Build Your Own
          </button>
        </div>
      </div>
      <div className="progress-bar" id="scroll-progress"></div>
    </nav>
  )
}

export default Navbar
