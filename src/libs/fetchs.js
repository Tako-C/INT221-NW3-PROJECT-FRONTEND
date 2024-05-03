// GetData
async function getTask(path) {
  try {
    // const res = await fetch(`http://ip23nw3.sit.kmutt.ac.th:8080/v1/${path}`)
    const res = await fetch(`http://localhost:8080/v1/${path}`)

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

async function removeTaskById(id) {
  try {
    const res = await fetch(
      `http://localhost:8080/v1/tasks/${id}`,
      {
        method: 'DELETE',
      }
    )

    if (!res.ok) {
      throw new Error('Failed to delete task')
    }
    console.log('Task deleted successfully')
  } catch (error) {
    console.error('Error deleting task:', error)
    throw error
  }
}

async function addTask(data,path) {
  try {
    const response = await fetch(
      `http://localhost:8080/v1/${path}`,
      {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(data),
      }
    )
    console.log(data)
    const result = await response.json()
    console.log('Success:', result)
    return result
  } catch (error) {
    console.error('Error:', error)
  }
}

async function editTask(taskId, data) {
  try {
    const response = await fetch(
      `http://localhost:8080/v1/tasks/${taskId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )

    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(errorMessage)
    }
    const result = await response.json()
    console.log('Success:', result)
    return result
  } catch (error) {
    console.error('Error:', error.message)
    throw error
  }
}

export { getTask, removeTaskById, addTask, editTask }
