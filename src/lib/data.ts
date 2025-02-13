const API_KEY = import.meta.env.YOUTUBE_API_KEY

export interface Video {
  id: number
  title: string
  url: string
  videoId: string
  thumbnail: string
  views: number
  likes: number
  uploadedAgo: string // Nuevo campo para "hace cuánto"
}

const videoIds = [
  '-sJ6a4t27d8',
  '_0qxMRAJ_Gg',
  '2-Gw1o9RJN4',
  '2FvMEp0aAWU',
  'pYQ_uCX0ql8',
  't6FCUt-SXDc',
  'h5r2IdOvMc8',
  'WoMCIyUb234',
  'Gw0NsJXRnmc',
  'e0D4n33lxvk'
]

function timeAgo (dateString: string): string {
  const publishedDate = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - publishedDate.getTime()

  const seconds = Math.floor(diffMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (years > 0) return `hace ${years} año${years > 1 ? 's' : ''}`
  if (months > 0) return `hace ${months} mes${months > 1 ? 'es' : ''}`
  if (weeks > 0) return `hace ${weeks} semana${weeks > 1 ? 's' : ''}`
  if (days > 0) return `hace ${days} día${days > 1 ? 's' : ''}`
  if (hours > 0) return `hace ${hours} hora${hours > 1 ? 's' : ''}`
  if (minutes > 0) return `hace ${minutes} minuto${minutes > 1 ? 's' : ''}`
  return 'hace unos segundos'
}

export async function fetchVideos (): Promise<Video[]> {
  const ids = videoIds.join(',')
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${ids}&key=${API_KEY}`
  const response = await fetch(url)
  const data = await response.json()

  return data.items.map((item: any, index: number) => ({
    id: index + 1,
    title: item.snippet.title,
    url: `https://youtu.be/${item.id}`,
    videoId: item.id,
    thumbnail: item.snippet.thumbnails.high.url,
    views: item.statistics.viewCount,
    likes: item.statistics.likeCount,
    uploadedAgo: timeAgo(item.snippet.publishedAt) // Calcula "hace cuánto"
  }))
}
