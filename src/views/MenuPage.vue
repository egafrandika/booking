<script setup>
import { ref, onMounted, computed } from 'vue'
const dataSource = ref([])
const currentTab = ref('breakfast')
const showEditModal = ref(false)
const editingItem = ref(null)

const tabs = [
  { key: 'breakfast', icon: 'md-fastfood', subtitle: 'Popular', title: 'Breakfast' },
  { key: 'lunch', icon: 'gi-onigori', subtitle: 'Special', title: 'Launch' },
  { key: 'dinner', icon: 'md-dinnerdining', subtitle: 'Lovely', title: 'Dinner' }
]

onMounted(async () => {
  const response = await fetch('http://localhost:3000/menu')
  const result = await response.json()
  dataSource.value = result
})

const chunkedMenus = computed(() => {
  const size = 4
  const chunks = []
  for (let i = 0; i < dataSource.value.length; i += size) {
    chunks.push(dataSource.value.slice(i, i + size))
  }
  return chunks
})

function addMenu() {
  const newItem = {
    id: Date.now(),
    name: '',
    price: '',
    detail: '',
    image: 'https://via.placeholder.com/150'
  }
  // dataSource.value.push(newItem)
  openEditModal(newItem)
}

function openEditModal(item) {
  editingItem.value = { ...item }
  showEditModal.value = true
}

function saveChanges() {
  const index = dataSource.value.findIndex(item => item.id === editingItem.value.id)
  if (index !== -1) {
    dataSource.value[index] = { ...editingItem.value }
  }
  showEditModal.value = false
}
</script>

<template>
  <NavBar />
  <div class="menu">
    <div class="container menu-tabs">
      <div v-for="tab in tabs" :key="tab.key" class="tab" :class="{ active: currentTab === tab.key }"
        @click="currentTab = tab.key">
        <v-icon :name="tab.icon" class="icon" scale="2"></v-icon>
        <div class="tab-label">
          <span class="subtitle">{{ tab.subtitle }}</span>
          <span class="title">{{ tab.title }}</span>
        </div>
      </div>
    </div>
    <div class="modal" @click="addMenu">Add New Menu</div>
    <div v-if="showEditModal" class="modal-popup">
      <form class="modal-form" @submit.prevent="saveChanges">
        <div class="modal-header">
          <h3>Edit Menu</h3>
          <button type="button" class="close-btn" @click="showEditModal = false">×</button>
        </div>
        <div class="form-group">
          <label>Menu Name</label>
          <input v-model="editingItem.name" required placeholder="Enter menu name" />
        </div>
        <div class="form-group">
          <label>Menu Price</label>
          <input v-model="editingItem.price" required type="text" placeholder="Enter menu price" />
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea v-model="editingItem.detail" placeholder="Enter menu description" />
        </div>
        <div class="modal-actions">
          <button type="button" class="btn cancel" @click="showEditModal = false">CLOSE</button>
          <button type="submit" class="btn save">SAVE CHANGES</button>
        </div>
      </form>
    </div>
    <div class="container m-page menu-grid">
      <div v-for="(chunk, index) in chunkedMenus" :key="index" class="menu-column">
        <div v-for="data in chunk" :key="data.id" class="c-menu">
          <img loading="lazy" :src="data.image" :alt="data.name" class="img" />
          <div class="card">
            <span class="name">{{ data.name }}</span>
            <div class="divider"></div>
            <span class="price">{{ data.price }}</span>
          </div>
          <span class="detail">{{ data.detail }}</span>
          <div class="edit-btn" @click="openEditModal(data)">Edit Menu</div>
        </div>
      </div>
    </div>
  </div>


</template>

<style lang="scss" scoped>
.menu {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(120deg, rgba(34, 49, 63, 0.85) 0%, rgba(3, 34, 65, 0.85) 100%),
      url('https://images.pexels.com/photos/32380216/pexels-photo-32380216.jpeg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 1;
    filter: blur(2px) brightness(0.9);
    z-index: 0;
    transition: filter 0.3s;
  }

  >* {
    position: relative;
    z-index: 1;
  }
}

.modal {
  color: white;
  border: 1px solid white;
  width: fit-content;
  align-items: center;
  padding: 10px 20px;
  border-radius: 10px;
  margin: 0 auto;

  &:hover {
    background-color: orange;
    cursor: pointer;
  }
}

.menu-tabs {
  display: flex;
  padding-top: 80px;
  justify-content: center;
  gap: 40px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;

  .tab {
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    padding-bottom: 6px;

    &.active::after {
      content: "";
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: white;
      border-radius: 2px;
    }

    .icon {
      font-size: 24px;
      color: white;
      margin-right: 10px;
    }

    .tab-label {
      display: flex;
      flex-direction: column;

      .subtitle {
        font-size: 12px;
        color: white;
      }

      .title {
        font-weight: bold;
        font-size: 14px;
        color: white;
      }
    }
  }
}

.modal-popup {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;

  .modal-form {
    background: white;
    padding: 24px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;

      h3 {
        margin: 0;
      }

      .close-btn {
        background: transparent;
        border: none;
        font-size: 20px;
        cursor: pointer;
      }
    }

    .form-group {
      margin-bottom: 16px;

      label {
        display: block;
        margin-bottom: 4px;
        font-weight: bold;
      }

      input,
      textarea {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
      }

      textarea {
        resize: vertical;
        min-height: 60px;
      }
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;

      .btn {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
      }

      .cancel {
        background: #777;
        color: white;
      }

      .save {
        background: orange;
        color: white;
      }

      .cancel:hover {
        background: #555;
      }

      .save:hover {
        background: #e69500;
      }
    }
  }
}

.edit-btn {
  margin-top: 8px;
  padding: 6px 12px;
  font-size: 12px;
  color: black;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  justify-content: center;
  display: flex;
  align-items: center;

  &:hover {
    background: orange;
  }
}

.m-page {
  padding: 48px;
}

.menu-grid {
  display: flex;
  gap: 32px;
}

.menu-column {
  flex: 1;
}

.c-menu {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);

  .img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 6px;
    margin-bottom: 12px;
  }

  .card {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    margin-bottom: 8px;

    .name {
      color: #222;
      display: flex;
    }

    .price {
      color: #007bff;
    }
  }

  .detail {
    color: #666;
    font-size: 14px;
    line-height: 1.4;
    margin: 4px 0;
    border-top: 1px solid black;
  }
}
</style>
