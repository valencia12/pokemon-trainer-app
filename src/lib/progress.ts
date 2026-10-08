export function getStatPercentage(value: number, maximum: number) {
  if (!Number.isFinite(value) || !Number.isFinite(maximum) || maximum <= 0) return 0
  return Math.min(100, Math.max(0, value / maximum * 100))
}
