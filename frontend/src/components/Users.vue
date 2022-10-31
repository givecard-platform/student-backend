<template>
  <div class="container">
    <h3>All Users</h3>
    <div v-if="message" class="alert alert-success">
      {{ this.message }}</div>
    <div class="container">
      <table class="table">
        <thead>
          <tr> 
            <th>First Name</th>
            <th>Last Name</th>
            <th>ID</th>
            <th>Email</th>
            <th>Status</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" v-bind:key="user.id">
          
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.id }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.status }}</td>
            <td>
              <button class="btn btn-warning" 
              v-on:click="updateUser(user.id)">
                Update
              </button>
            </td>
            <td>
              <button class="btn btn-danger" 
              v-on:click="deleteUser(user.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row">
        <button class="btn btn-success" 
        v-on:click="addUser()">Add</button>
      </div>
    </div>
  </div>
</template>
<script>
import UserDataService from "../service/UserDataService";
//import { uuid } from 'vue-uuid';

export default {
  name: "Users",
  data() {
    return {
      //uuid: uuid.v1(),
      users: [],
      message: "",
    };
  },
  methods: {
    refreshUsers() {
      UserDataService.retrieveAllUsers().then((res) => {
        this.users = res.data;
        //this.uuid = uuid.v1()
      });
    },
    addUser() {
      this.$router.push(`/user/-1`);
      //this.$router.push(`/user/${this.uuid}`);
      //this.$router.push(`/user/` + this.uuid);
    },
    updateUser(id) {
      this.$router.push(`/user/${id}`);
    },
    deleteUser(id) {
      UserDataService.deleteUser(id).then(() => {
        this.refreshUsers();
      });
    },
  },
  created() {
    this.refreshUsers();
  },
};
</script>