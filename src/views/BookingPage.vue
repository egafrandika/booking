<script setup>
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const dateTime = ref('');
const people = ref('');
const specialRequest = ref('');

const submitForm = async () => {
  if (!name.value || !email.value || !dateTime.value || !people.value) {
    alert('Please fill in all required fields.');
    return;
  }

  const booking = {
    name: name.value,
    email: email.value,
    dateTime: dateTime.value,
    people: people.value,
    specialRequest: specialRequest.value,
  };

  await fetch('http://localhost:3000/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(booking),
  });

  alert('Reservation submitted!');

  name.value = '';
  email.value = '';
  dateTime.value = '';
  people.value = '';
  specialRequest.value = '';
};
</script>

<template>
  <div class="reservation-container">
    <div class="form-wrapper">
      <h3 class="sub-title">Reservation</h3>
      <h1 class="main-title">Book A Table Online</h1>
      <form @submit.prevent="submitForm">
        <div class="form-row">
          <input type="text" v-model="name" placeholder="Your Name" required />
          <input type="email" v-model="email" placeholder="Your Email" required />
        </div>
        <div class="form-row">
          <input type="datetime-local" v-model="dateTime" required />
          <select v-model="people" required>
            <option disabled value="">No Of People</option>
            <option v-for="option in peopleOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
        <textarea v-model="specialRequest" placeholder="Special Request"></textarea>
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$reservation-bg: #0f172a;
$primary-color: orange;
$text-color: white;
$input-padding: 12px;
$border-radius: 5px;

.reservation-container {
  display: flex;
  justify-content: center;
  background-color: $reservation-bg;
  color: $text-color;
  padding: 40px;
  height: 100vh;

  .form-wrapper {
    max-width: 600px;
    width: 100%;

    .sub-title {
      color: $primary-color;
      font-weight: bold;
    }

    .main-title {
      font-size: 2rem;
      margin-bottom: 20px;
    }

    form {
      .form-row {
        display: flex;
        gap: 16px;
        margin-bottom: 16px;
      }

      input,
      select,
      textarea {
        width: 100%;
        padding: $input-padding;
        border: none;
        border-radius: $border-radius;
      }

      textarea {
        height: 100px;
        margin-bottom: 16px;
        resize: vertical;
      }

      button {
        background-color: $primary-color;
        color: $text-color;
        padding: $input-padding 0;
        width: 100%;
        border: none;
        font-weight: bold;
        border-radius: $border-radius;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: darken($primary-color, 10%);
        }
      }
    }
  }
}
</style>
