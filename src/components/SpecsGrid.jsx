import SpecCard from './SpecCard'

const specs = [
  {
    label: 'Performance',
    value: '3.1s',
    description: '0 - 100 km/h with Sport Chrono Package',
    labelColor: 'text-tertiary',
  },
  {
    label: 'Engine',
    value: '4.0L',
    description: 'V8 Twin-Turbocharged Engine',
    labelColor: 'text-primary',
  },
  {
    label: 'Top Speed',
    value: '315',
    description: 'Max Speed (km/h)',
    labelColor: 'text-primary',
  },
  {
    label: 'Output',
    value: '500',
    description: 'Power (kW) / 680 PS',
    labelColor: 'text-tertiary',
  },
]

function SpecsGrid() {
  return (
    <section
      className="py-section-gap px-margin-desktop max-w-container-max mx-auto"
      id="specs-section"
    >
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-gutter mb-12"
        id="cards-container"
      >
        {specs.map((spec, index) => (
          <SpecCard key={index} {...spec} />
        ))}
      </div>
    </section>
  )
}

export default SpecsGrid
