
// GetData
async function getTask(path) {
  try {
    const res = await fetch(`http://ip23nw3.sit.kmutt.ac.th/v1/${path}`)
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
