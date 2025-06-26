<script setup>
import ImgLogo from '../assets/logo.png';
</script>
<template>
  <div :class="$route.name === 'Home' ? 'restoran' : 'isNotHome'">
    <div class="t-wrap">
      <img :src="ImgLogo" alt="logo" width="60px" height="auto">
      <span class="title">RESTAURANT</span>
    </div>
    <div class="nav">
      <RouterLink to="/" class="mr-20 t-dec">HOME</RouterLink>
      <RouterLink to="/menu" class="mr-20 t-dec">MENU</RouterLink>
      <RouterLink to="/booking" class="b-table t-dec">BOOK A TABLE</RouterLink>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.restoran {
  display: flex;
  justify-content: space-between;
  padding: 20px 80px;

  .t-wrap {
    display: flex;
    flex-direction: row;
  }

  .title {
    color: white;
    display: flex;
    align-items: center;
    margin-left: 10px;
    font-size: 20px;
  }

  .nav {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    color: white;
    align-items: center;

    .b-table {
      padding: 8px 10px;
      border: 1px solid white;
      border-radius: 4px;

      &:hover {
        background-color: orange;
      }
    }

    .t-dec {
      text-decoration: none;
      color: white;
    }
  }
}

.isNotHome {
  display: flex;
  justify-content: space-between;
  padding: 20px 80px;

  .t-wrap {
    display: flex;
    flex-direction: row;
  }

  .title {
    color: black;
    display: flex;
    align-items: center;
    margin-left: 10px;
    font-size: 20px;
  }

  .nav {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    color: black;
    align-items: center;

    .b-table {
      padding: 8px 10px;
      border: 1px solid black;
      border-radius: 4px;

      &:hover {
        background-color: orange;
      }
    }

    .t-dec {
      text-decoration: none;
      color: black;
    }
  }
}
</style>
