<script>
import axios from 'axios';
export default {
  data() {
    return {
      awesome: true,
      username: localStorage.getItem('username'),
      token: localStorage.getItem('token',),
      role: localStorage.getItem('role',),
      dataTest: [],
    };
  },
  computed: {
    message() {
      return this.token ? `Welcome ${localStorage.getItem('username')} !` : "Welcome  " +
          "Login or Register ?";
    },
  },
  methods: {
    logout() {
      this.token, this.role, this.username = null;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      this.goToPage('/login');
    },
    async getFilms() {
      try {
        const { data } = await axios.get('http://localhost:3000/locations', {
          headers: {
            'Authorization': `Bearer ${this.token}`,
          },
        });
        this.dataTest = data;
      }
      catch(error) {
        console.error(error);
      }
    },
    goToPage(path) {
      this.$router.push({ path: path });
    }
  },
  mounted() {
    if (this.token) {
      this.getFilms();
    }
  },
}
</script>

<template>
  <main>
    <p>{{message}}</p>
    <template v-if="token">
      <button @click="logout">Logout</button>
    </template>
    <template v-else>
      <button @click="goToPage('/login')">Login</button>
      <br>
      <button @click="goToPage('/register')" >Register</button>
    </template>
  </main>
</template>

<style>
main {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f1f1f1;
  text-align: center;
}

p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

button {
  padding: 10px;
  font-size: 1.1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3e8e41;
}
</style>
