<script setup>
import { ref, onMounted, computed } from 'vue'
const dataSource = ref([])
const currentTab = ref('breakfast')

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
