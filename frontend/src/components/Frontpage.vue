<template>
  <div class="container">
    <h3>All Users</h3>
    <div v-if="message" class="alert alert-success">
      {{ this.message }}</div>
    <div class="container">
      <table class="table">
        <tbody>
            <td>
              <button class="btn btn-warning" 
              v-on:click="openApplication()">
                Apply
              </button>
            </td>
            <td>
            <form>
                <fieldset class="form-group">
                <label>Applicant ID</label>
                <input type="text" class="form-control" v-model="id" />
                </fieldset>
            </form>
              <button class="btn btn-warning" 
              v-on:click="checkStatus()">
                  Check Status
              </button>
              <button class="btn btn-warning" 
              v-on:click="continueApp()">
                  Continue Application
              </button>
            </td>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>

export default {
  name: "Frontpage",
  data() {
    return {
      id: "",
    };
  },
  methods: {
    openApplication() {
      this.$router.push(`/user/-1`);
    }, 
    checkStatus() {
      this.$router.push({path: "/user/" + this.id + "/status"})
    },
    continueApp() {
      this.$router.push({path: "/user/" + this.id})
    },
  },
};
</script>