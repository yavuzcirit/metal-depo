const stats = [
  { value: '50+', label: 'Countries Served' },
  { value: '5,000+', label: 'Products Available' },
  { value: '20+', label: 'Years Experience' },
  { value: '10K+', label: 'Satisfied Clients' },
]

export function StatsBar() {
  return (
    <section className="bg-navy text-white">
      <div className="container-wide py-0">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-8 px-4 text-center"
            >
              <span className="text-3xl font-black text-gold mb-1">{stat.value}</span>
              <span className="text-white/50 text-xs uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
