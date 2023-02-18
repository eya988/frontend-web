<script>
export default {
  data() {
    return {
      token: localStorage.getItem('token',),
    }
  },
}
</script>

<template>
  <main>
    <nav>
    <router-link to="/" style="font-size: 25px;"> Home</router-link> |
      <router-link to="/locations" style="font-size: 25px;">Locations</router-link>
    <router-view/>
    </nav>
  </main>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9f9f9;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

p {
  font-size: 2.2rem;
  margin-bottom: 1rem;
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

.nav-link {
  color: #fff;
  text-decoration: none;
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  background-color: #333;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: #555;
  color: #fff;
}
</style>
