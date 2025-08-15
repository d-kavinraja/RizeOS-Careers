export function Stats() {
  const stats = [
    { label: "Active Jobs", value: "2,500+" },
    { label: "Companies", value: "450+" },
    { label: "Successful Matches", value: "12,000+" },
    { label: "Countries", value: "85+" },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
