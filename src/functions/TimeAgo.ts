function timeAgo (dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000) // Diferencia en segundos

  const intervals = [
    { label: 'año', seconds: 31536000 },
    { label: 'mes', seconds: 2592000 },
    { label: 'día', seconds: 86400 },
    { label: 'hora', seconds: 3600 },
    { label: 'minuto', seconds: 60 }
  ]

  for (const interval of intervals) {
    const count = Math.floor(diff / interval.seconds)
    if (count >= 1)
      return `Hace ${count} ${interval.label}${count > 1 ? 's' : ''}`
  }

  return 'Hace unos segundos'
}

export { timeAgo }
