<template>
  <div>
    <h3>Next</h3>
    <div class="container">
      <form @submit="validateAndSubmit">
        <div v-if="errors.length">
          <div
            class="alert alert-danger"
            v-bind:key="index"
            v-for="(error, index) in errors"
          >
            {{ error }}
          </div>
        </div>
        <fieldset class="form-group">
          <label>DoB</label>
          <input type="text" class="form-control"
           v-model="dob" />
        </fieldset>
        <fieldset class="form-group">
          <label>Phone Number</label>
          <input type="text" class="form-control"
           v-model="phoneNumber" />
        </fieldset>
        <fieldset class="form-group">
          <label>City</label>
          <input type="text" class="form-control" 
          v-model="city" />
        </fieldset>
        <button class="btn btn-success" 
        type="submit">Save</button>
      </form>
    </div>
  </div>
</template>
<script>
import UserDataService from "../service/UserDataService";

export default {
  name: "Next",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      status: "",
      dob: "",
      phoneNumber: "",
      city: "",
      errors: [],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    refreshUserDetails() {
      UserDataService.retrieveUser(this.id).then((res) => {
        //this.id = res.data.id;
        this.firstName = res.data.firstName;
        this.lastName = res.data.lastName;
        this.email = res.data.email;
        this.status = res.data.status;
        this.dob = res.data.dob;
        this.phoneNumber = res.data.phoneNumber;
        this.city = res.data.city;
      });
    },
    validateAndSubmit(e) {
      e.preventDefault();
      this.errors = [];
      if (!this.city) {
        this.errors.push("Enter valid values");
      } 
      if (!this.dob) {
        this.errors.push("Enter valid values");
      } 
      if (this.errors.length === 0) {
        if (this.id == -1) {
          UserDataService.createUser({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            status: this.status,
            dob: this.dob,
            phoneNumber: this.phoneNumber,
            city: this.city,
          }).then(() => {
            this.$router.push({path: "/user/" + this.id + "/status"});
          });
        } else {
          UserDataService.updateUser(this.id, {
            //id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            status: this.status,            
            dob: this.dob,
            phoneNumber: this.phoneNumber,
            city: this.city,
          }).then(() => {
            this.$router.push({path: "/user/" + this.id + "/status"})
          });
        }
      }
    },
  },
  created() {
    this.refreshUserDetails();
  },
};
</script>
