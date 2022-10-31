<template>
  <div class="container">
    <h3>Status</h3>
    <div v-if="message" class="alert alert-success">
      {{ this.message }}</div>
    <div class="container">
      <table class="table">
        <thead>
          <tr> 
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>DoB</th>
            <th>Phone Number</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          <tr v-bind:key="user.id">
          
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.status }}</td>
            <td>{{ user.dob }}</td>
            <td>{{ user.phoneNumber }}</td>
            <td>{{ user.city }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import UserDataService from "../service/UserDataService";

export default {
  name: "Status",
  data() {
    return {
      user: [],
      message: "",
    };
  },
    computed: {
    id() {
      return this.$route.params.id;
    },
    //status() {
    //  return this.$route.params.status;
    //}
  },
  methods: {
    displayUser() {
      UserDataService.retrieveUser(this.id).then((res) => {
        this.user = res.data
      });
    },
  },
  created() {
    this.displayUser();
  },
};
</script>