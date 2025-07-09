import { ref } from 'vue'

export default function useFetch() {
  const dataSource = ref([])

  async function fetchDataSource() {
    try {
      const res = await fetch('http://localhost:3000/menu')
      const result = await res.json()

      dataSource.value = result
    } catch (error) {
      console.error('Error fetching data source:', error)
    }
  }

  return { dataSource, fetchDataSource }
}
