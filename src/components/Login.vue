<template>
  <h1>Login</h1>
  <router-link to="/register">Register</router-link>
  <router-view />
  <form @submit.prevent="submitLoginForm" class="login-form">
    <div>
      <label for="username">Username: </label>
      <input id="username" type="text" v-model="username" required class="login-form input" />
    </div>
    <div>
      <label for="password">Password: </label>
      <input id="password" type="password" v-model="password" required class="login-form input" />
    </div>
    <br/>
    <button type="submit" class="login-form button">Login</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async userRole() {
      const response = await axios.get('http://localhost:3000/users/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      },);
      return response.data.role;
    },
    async login(username, password) {
      try {
        const response = await axios.post('http://localhost:3000/users/login', {username, password});
        localStorage.setItem('token', response.data.jwt);
        localStorage.setItem('username', username);
      } catch (error) {
        console.error(error);
      }
    },
    async submitLoginForm() {
      await this.login(this.username, this.password);
      this.$router.push({ path: '/' });
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