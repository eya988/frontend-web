<template>
  <h2> List Of Locations</h2>
  <div>
    <div v-for="location in currentLocations" :key="location._id">
      <ul>
        <li>
      <a @click="locationDetails(location._id)">{{ location.filmName }}</a></li>
      </ul>
    </div>
    <br/>

    <div>
      <button @click="previousPage">Previous</button>
      <button @click="nextPage">Next</button>

        <button @click="addLocation">Add Location</button>

    </div>
  </div>

</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      token: localStorage.getItem('token'),
      locations: [],
      currentPage: 1,
      itemsPerPage: 5,
      role: '',
    };
  },
  computed: {
    currentLocations() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.locations.slice(start, end);
    },
  },
  async mounted() {
    await this.fetchLocations();
    this.role = await this.userRole();
  },
  methods: {
    async userRole() {
      try {
        const response = await axios.get('http://localhost:3000/users/me', {
          headers: {
            'Authorization': `Bearer ${this.token}`,
          }
        },);
        return response.data.role;
      } catch (error) {
        return error.response;
      }
    },
    async fetchLocations() {
      const { data } = await axios.get('http://localhost:3000/locations', {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        }});
      this.locations = data;
    },
    addLocation() {
      this.$router.push('/addLocation');
    },
    locationDetails(locationId) {
      this.$router.push(`/locationDetails/${locationId}`);
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < Math.ceil(this.locations.length / this.itemsPerPage)) {
        this.currentPage++;
      }
    },
  },
};
</script>
<style>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  margin-bottom: 10px;
}


a:hover {
  background-color: #3e8e41;
}

button {
  padding: 10px;
  font-size: 1.1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background-color: #3e8e41;
}


</style>