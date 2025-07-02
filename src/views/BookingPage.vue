<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const dateTime = ref('');
const people = ref('');
const specialRequest = ref('');
const router = useRouter();

const peopleOptions = [
  { value: 1, label: '1 Person' },
  { value: 2, label: '2 People' },
  { value: 3, label: '3 People' },
  { value: 4, label: '4 People' },
  { value: 5, label: '5 People' },
  { value: 6, label: '6 People' },
  { value: 7, label: '7 People' },
  { value: 8, label: '8 People' },
  { value: 9, label: '9 People' },
  { value: 10, label: '10 People' }
];

const submitForm = async () => {
  if (!name.value || !email.value || !dateTime.value || !people.value) {
    alert('Please fill in all required fields.');
    return;
  }

  const booking = {
    name: name.value,
    email: email.value,
    booking_date: dateTime.value,
    people: String(people.value),
    created_date: new Date().toISOString(),
    special_request: specialRequest.value,
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

  router.push('/');
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
          <label>
            Booking Date
            <input type="datetime-local" v-model="dateTime" :min="new Date().toISOString().slice(0, 16)" required />
          </label>
          <label>
            Amount of People
            <select v-model="people" required>
              <option disabled value="">No Of People</option>
              <option v-for="option in peopleOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </label>
        </div>
        <label>
          Special Request
          <textarea v-model="specialRequest" placeholder="Special Request"></textarea>
        </label>

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
          background-color: #cc8400;
        }
      }
    }
  }
}
</style>
