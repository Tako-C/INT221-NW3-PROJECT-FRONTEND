// Path URL
// const url = import.meta.env.VITE_BASE_URL

// GetData (All page)
async function getTask() {
  try {
    const res = await fetch('http://localhost:8080/itb-kk/v1/tasks')
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

// getTasksFromBackend()
//   .then((data) => {
//     // ใช้ข้อมูลที่ได้ตามต้องการ
//     console.log(data)
//   })
//   .catch((error) => {
//     // จัดการข้อผิดพลาดที่เกิดขึ้น
//     console.error('Error:', error)
//   })

export { getTask }
