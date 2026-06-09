const FLYLINE_IMAGE_URL = '/photo4k/image-1.jpeg'

function FlylineSection() {
  return (
    <section
      className="relative min-h-[500px] md:min-h-[900px] flex items-center overflow-hidden"
      id="flyline"
    >
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden parallax-container">
        <img
          alt="Porsche Panamera Silhouette"
          className="w-full h-full object-cover object-center opacity-85 scale-125 transition-all duration-1000 parallax-target"
          data-speed="0.4"
          src={FLYLINE_IMAGE_URL}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background"></div>
      </div>

      <div className="relative z-10 px-margin-desktop w-full max-w-container-max mx-auto flex justify-end">
        <div className="max-w-xl w-full glass-panel p-6 md:p-12 staggered-parent">
          <h2 className="font-headline-lg text-headline-lg md:text-4xl text-primary mb-6 reveal-item">
            The Flyline.
          </h2>
          <p className="font-body-lg text-body-lg text-sm md:text-base text-on-surface-variant mb-8 reveal-item">
            An unmistakable silhouette that merges the DNA of a legendary sports
            car with the presence of a luxury sedan. Dynamic, focused, and
            poised for action. Every line is an invitation to drive.
          </p>
          <div className="h-1 w-24 bg-tertiary reveal-item"></div>
        </div>
      </div>
    </section>
  )
}

export default FlylineSection
