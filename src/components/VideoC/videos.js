export async function fetchVideos() {
  const response = await fetch('http://localhost:4000/api/videos')
  if (!response.ok) throw new Error('Videote laadimine ebaõnnestus')
  return response.json()
}
