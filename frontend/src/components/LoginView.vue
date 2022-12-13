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
                <input type="text" class="form-control" v-model="id" />
                </fieldset>
            </form>
            <form>
                <fieldset class="form-group">
                <label>Password</label>
                <input type="text" class="form-control" v-model="id" />
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

<style>
.centered-form .label {
  text-align:center;
}
</style>

<script>
// import defineComponent from 'vue';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import * as bulmaToast from 'bulma-toast';
import axios from 'axios';
import UserDataService from '../service/UserDataService';

const auth = getAuth();
//const stateRouteMap = new Map<string, string>([
//  ['business_info', 'businessInfo'],
//  ['authorized_person', 'authorizedPersonInfo'],
//  ['submit_application', 'submitConfirmation'],
//  ['waiting_for_beneficial_owners', 'beneficialOwnerStatus'],
//  ['application_submitted', 'submitConfirmation'],
//  ['active', 'cards'],
//]);

export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
      error: null,
      debug: false,
      info: null,
      userId: '',
      output: null,
    };
  },
  methods: {

    submit() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((data) => {
          this.userId=data.user.uid;
          //const url=`${process.env.VUE_APP_WHIMSY_BASE_URL}/users/${this.userId}/`;
          const url=`/user/${this.userId}/`;

          //axios
          UserDataService
            .get(url)
            .then((response) => {
              //this.$router.push({ name: 'Frontpage' });
              this.getRoutePath(response.data.status, response.data.id);
            });

          //sessionStorage.removeItem('redirectPath');
        })
        .catch((error) => {
          bulmaToast.toast({ message: error.message, type: 'is-danger', position: 'top-center' });
        });
    },
  },
};
</script>
