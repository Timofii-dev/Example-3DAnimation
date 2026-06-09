const footerLinks = [
  { text: 'Legal Notice', href: '#' },
  { text: 'Privacy Policy', href: '#' },
  { text: 'Cookie Policy', href: '#' },
  { text: 'Consumption/Emissions', href: '#' },
]

function Footer() {
  return (
    <footer className="bg-surface py-8 md:py-10 border-t border-outline-variant">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop gap-4 md:gap-unit max-w-container-max mx-auto">
        <div className="font-headline-lg text-headline-lg md:text-xl font-bold text-primary text-sm md:text-base">
          Veltris Motors
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 my-6 md:my-0">
          {footerLinks.map((link, index) => (
            <a
              key={index}
              className="text-on-surface-variant hover:text-tertiary transition-colors font-label-sm text-label-sm text-xs md:text-sm"
              href={link.href}
            >
              {link.text}
            </a>
          ))}
        </div>
        <div className="font-label-sm text-label-sm text-on-surface-variant text-xs md:text-sm">
          © 2026
        </div>
      </div>
      
      {/* 3D Model Attribution */}
      <div className="border-t border-outline-variant mt-8 pt-6 px-margin-desktop max-w-container-max mx-auto">
        <p className="text-on-surface-variant text-xs md:text-sm text-center">
          3D model <a href="https://sketchfab.com/3d-models" target="_blank" rel="noopener noreferrer" className="text-tertiary hover:text-white transition-colors">"2021 Porsche Panamera Turbo S Sport Turismo"</a> by{' '}
          <a href="https://sketchfab.com/Ddiaz" target="_blank" rel="noopener noreferrer" className="text-tertiary hover:text-white transition-colors">Ddiaz Design</a>
          , licensed under{' '}
          <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="text-tertiary hover:text-white transition-colors">
            CC BY 4.0
          </a>
          . Source:{' '}
          <a href="https://sketchfab.com" target="_blank" rel="noopener noreferrer" className="text-tertiary hover:text-white transition-colors">
            Sketchfab
          </a>
          .
        </p>
      </div>
    </footer>
  )
}

export default Footer
