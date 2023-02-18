<template>
  <form @submit.prevent="submitForm" class="login-form">
      <label for="name">Name</label>
      <input type="text" id="filmName" v-model="filmName" class="login-form input" />
      <label for="filmType">Film Type</label>
      <input type="text" id="filmType" v-model="filmType" class="login-form input"/>
      <label for="filmDirectorName">Film Director Name</label>
      <input type="text" id="filmDirectorName" v-model="filmDirectorName" class="login-form input"/>
      <label for="filmProducerName">Film Producer Name</label>
      <input type="text" id="filmProducerName" v-model="filmProducerName" class="login-form input"/>
      <label for="address">Address</label>
      <input type="text" id="address" v-model="address" class="login-form input"/>
      <label for="district">District </label>
      <input type="text" id="district" v-model="district" class="login-form input"/>
      <label for="year">Year</label>
      <input type="number" id="year" v-model="year" class="login-form input"/>
    <button type="submit" class="login-form button">Submit</button>
  </form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      filmName: '',
      filmType: '',
      filmDirectorName: '',
      filmProducerName: '',
      address: '',
      district: '',
      year: '',
    };
  },
  methods: {
    async submitForm() {
      try {
        await axios.post('http://localhost:3000/locations', {
          filmName: this.filmName,
          filmType: this.filmType,
          filmDirectorName: this.filmDirectorName,
          filmProducerName: this.filmProducerName,
          address: this.address,
          district: this.district,
          year: this.year
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }});
        this.filmName = '';
        this.filmType = '';
        this.filmDirectorName = '';
        this.filmProducerName = '';
        this.address = '';
        this.district = '';
        this.year = '';
        alert('Location created ');
      } catch (error) {
        alert('Error');
      }
    }
  }
};
</script>

<style>

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
}

.login-form input[type="text"],
.login-form input[type="password"] {
  margin: 0.5rem 0;
  padding: 0.5rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.login-form button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.login-form button:hover {
  background-color: #0062cc;
}
.title {
  font-size: 2rem;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;

}

</style>