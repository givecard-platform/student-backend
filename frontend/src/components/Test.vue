<template>
  <div class="container">
    <h3>Login</h3>
    <div v-if="message" class="alert alert-success">
      {{ this.message }}</div>
    <div class="container">
      <table class="table">
        <tbody>
            <td>
            <form>
                <fieldset class="form-group">
                <label>Email</label>
                <input type="email" class="form-control" v-model="email" />
                </fieldset>
            </form>
            <form>
                <fieldset class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" v-model="password" />
                </fieldset>
            </form>
              <button class="btn btn-warning" 
              v-on:click="submit()">
                  Login
              </button>
            </td>
        </tbody>
      </table>
    </div>
  </div>
</template>



<script>
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        submit() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    alert('Successfully logged in');
                    this.$router.push({path: '/users'});
                })
                .catch(error => {
                    alert(error.message);
                });
        },
    },
};
</script>