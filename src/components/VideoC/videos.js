const API = import.meta.env.VITE_API_URL

export async function fetchVideos() {
  const response = await fetch(`${API}/api/videos`)
  if (!response.ok) throw new Error('Videote laadimine ebaõnnestus')
  return response.json()
}
