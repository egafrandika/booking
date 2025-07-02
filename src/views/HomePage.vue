<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const onBook = () => {
  router.push('/booking');
};
</script>
<template>
  <div class="home-page">
    <NavBar />
    <div class="h-page container">
      <div class="d-wrap">
        <span class="h-title">Enjoy Our <br> Delicious Onigiri</span>
        <p class="hero-description">
          Handcrafted with love, our onigiri brings the taste of Japan to your table.
          Fresh ingredients, savory fillings, and the perfect rice triangle — made just for you.
        </p>
        <div class="btn-book" @click="onBook">
          BOOKING A TABLE
        </div>
      </div>
      <div class="img-oni">
        <img src="../assets/image-grill.png" alt="hero-onigiri" class="img" width="550px" height="auto">
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.home-page {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(120deg, rgba(34, 49, 63, 0.85) 0%, rgba(44, 62, 80, 0.85) 100%),
      url('@/assets/background.png');
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

  .h-page {
    display: flex;
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    padding: 48px 48px;
    color: #fff;
    font-weight: 500;
    letter-spacing: 0.5px;

    .h-title {
      font-size: 70px;
    }

    .hero-description {
      font-size: 18px;
      color: white;
      margin-top: 15px;
      max-width: 600px;
      line-height: 1.6;
    }

    .btn-book {
      padding: 20px;
      width: fit-content;
      border: 1px solid white;
      border-radius: 8px;
      margin: 20px 0;

      &:hover {
        background-color: orange;
      }
    }

    .d-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .img-oni {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    img {
      display: block;
    }
  }
}
</style>
