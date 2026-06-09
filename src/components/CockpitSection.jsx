const COCKPIT_IMAGE_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_iJcUDbjBDouoyZZ861oD9uFVuyk0jXhEErYpO7UVlNhIAZsjC5agIUvqGfFnNDKVeHoJXAHgEn_pWkK0F8R091lIIujw9BR5Ixdj9rM7LpWEcRYIW33G02NrLvZWmYkT82hkP4nWVXUG58QKA2LOPf-3kj735N4a4mum9Tz0rtbLanKOPMwJD2LVaUd-fIizPQs4bfKH53Jsmrotv1hBWcgtMcehnz3cTAqIyPMpqOpO3im-6_BidZ5OJy7hjqGa6xOC7cYz3W5E'

const features = [
  {
    icon: 'tune',
    text: 'Porsche Active Ride Suspension',
  },
  {
    icon: 'monitor',
    text: 'Passenger Display Interface',
  },
  {
    icon: 'surround_sound',
    text: 'Burmester® 3D Surround Sound',
  },
]

function CockpitSection() {
  return (
    <section
      className="py-section-gap px-margin-desktop max-w-container-max mx-auto"
      id="cockpit"
    >
      <div className="flex flex-col md:flex-row gap-4 md:gap-gutter items-center">
        <div className="w-full md:w-1/2 scroll-reveal parallax-container overflow-hidden rounded-lg">
          <div className="relative glass-border-light border aspect-video group overflow-hidden">
            <img
              alt="Digital Cockpit"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2000ms] parallax-target"
              data-speed="0.25"
              src={COCKPIT_IMAGE_URL}
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 p-4 md:p-unit md:p-margin-desktop staggered-parent">
          <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest mb-4 block reveal-item text-xs md:text-sm">
            Driver Experience
          </span>
          <h2 className="font-display-xl-mobile md:text-display-xl text-3xl md:text-6xl text-white leading-tight mb-6 reveal-item">
            Digital,<br />
            Focused,<br />
            Personal.
          </h2>
          <p className="font-body-lg text-body-lg text-sm md:text-base text-white mb-8 reveal-item">
            The Porsche Driver Experience: a balanced interaction between
            digital and analogue control elements. All essential controls are
            oriented towards the driver, ensuring maximum focus on the road.
          </p>
          <ul className="space-y-3 md:space-y-4">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-3 md:gap-4 text-primary reveal-item"
              >
                <span className="material-symbols-outlined text-sm md:text-base">
                  {feature.icon}
                </span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-xs md:text-sm">
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default CockpitSection
