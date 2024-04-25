// Path URL
// const url = import.meta.env.VITE_BASE_URL

// GetData
async function getTask(path) {
  try {
    const res = await fetch(`http://localhost:8080/itb-kk/v1/${path}`)
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}


export { getTask }
