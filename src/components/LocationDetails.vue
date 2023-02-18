<template>
  <div>
    <h1> Location details </h1>

    <table>
      <tr>
        <td>Name:</td>
        <td>{{ locationInfos.filmName }}</td>
      </tr>
      <tr>
        <td>Type:</td>
        <td>{{ locationInfos.filmType }}</td>
      </tr>
      <tr>
        <td>Film Producer Name:</td>
        <td>{{ locationInfos.filmProducerName }}</td>
      </tr>
      <tr>
        <td>Address:</td>
        <td>{{ locationInfos.address }}</td>
      </tr>
      <tr>
        <td>District:</td>
        <td>{{ locationInfos.district }}</td>
      </tr>
      <tr>
        <td>Year:</td>
        <td>{{ locationInfos.year }}</td>
      </tr>
    </table>
  </div>
  <div>
    <div v-if="role === 'admin'">
    <button @click="editLocation(locationId)">Edit</button>
    <button @click="deleteLocation">Delete</button>
      </div>
  </div>
</template>
<add key="webpages:Enabled" value="true" />

<script>
import axios from "axios";

export default {
  data() {
    return {
      locationId: this.$route.params.locationId,
      locationInfos: [],
      role: '',
    };
  },
  async mounted() {
    await this.displayDetails();
    this.role = await this.userRole();
  },
  methods: {
    async displayDetails() {
      const {data} = await axios.get(`http://localhost:3000/locations/${this.locationId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
      });
      this.locationInfos = data;
    },
    async deleteLocation() {
      try {
        await axios.delete(`http://localhost:3000/locations/${this.locationId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        alert('Location deleted successfully !');
        this.$router.back();
      } catch (error) {
        alert('An error occurred, please try again later');
      }
    },
    editLocation(locationId) {
      this.$router.push(`/editLocation/${locationId}`);
    },
    async userRole() {
      try {
        const response = await axios.get('http://localhost:3000/users/me', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }
        },);
        return response.data.role;
      } catch (error) {
        return error.response;
      }
    },

  }
};
</script>
<style>
table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 20px;
}

th, td {
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  color: #333;
}

</style>