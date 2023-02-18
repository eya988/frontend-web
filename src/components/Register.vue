<template>
  <h1 class="title">Create account</h1>

  <router-view />
  <form @submit.prevent="submitRegisterForm" class="login-form">
    <div>
      <label for="username">Username: </label>
      <input id="username" type="text" v-model="username" required class="login-form input" />
    </div>
    <div>
      <label for="password">Password: </label>
      <input id="password" type="password" v-model="password" required class="login-form input"/>
    </div>
    <br/>
    <button type="submit" class="login-form button">Register</button>
    <router-link to="/login">Log In</router-link>
  </form>
</template>

<script>
import axios from 'axios';
import Login from './Login.vue';
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    }
  },
  methods: {
    async submitRegisterForm() {
      try {
        const response = await axios.post('http://localhost:3000/users/register', {
          username: this.username,
          password: this.password,
        });

        try {
          const response = await axios.post('http://localhost:3000/users/login', {
            username: this.username,
            password: this.password,
          });
          localStorage.setItem('token', response.data.jwt);
          localStorage.setItem('username', this.username);
        } catch (error) {
          console.error(error);
        }

        this.$router.push({ path: '/' });
      } catch (error) {
        if (error.response.status === 400) {
          this.errorMessage = " Error username";
        } else {
          this.errorMessage = "Error";
        }
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