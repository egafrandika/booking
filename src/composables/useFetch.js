import { ref } from 'vue'

export default function useFetch() {
  const dataSource = ref([])
  const editingItem = ref(null)
  const showEditModal = ref(false)

  const getDataSource = async () => {
    try {
      const res = await fetch('http://localhost:3000/menu')
      const result = await res.json()

      dataSource.value = result
    } catch (error) {
      console.error('Error fetching data source:', error)
    }
  }

  const deleteDataSource = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/menu/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed delete menu')

      dataSource.value = dataSource.value.filter((item) => item.id !== id)
    } catch (error) {
      console.error('Error updating data source:', error)
    }
  }

  const openEditModal = (item) => {
    editingItem.value = { ...item }
    showEditModal.value = true
  }

  const addMenu = () => {
    const newItem = {
      id: Date.now().toString(),
      name: '',
      price: '',
      detail: '',
      image: 'https://images.pexels.com/photos/31282324/pexels-photo-31282324.jpeg',
    }
    openEditModal(newItem)
  }

  const saveChanges = async () => {
    const index = dataSource.value.findIndex((item) => item.id === editingItem.value.id)
    if (index !== -1) {
      dataSource.value[index] = { ...editingItem.value }
      await fetch(`http://localhost:3000/menu/${editingItem.value.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem.value),
      })
    } else {
      const params = {
        ...editingItem.value,
        price: '$' + editingItem.value.price,
      }
      dataSource.value.push(params)
      await fetch('http://localhost:3000/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      })
    }
    showEditModal.value = false
  }

  return {
    dataSource,
    editingItem,
    showEditModal,
    getDataSource,
    deleteDataSource,
    addMenu,
    saveChanges,
    openEditModal,
  }
}
