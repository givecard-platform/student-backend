
<template>
<!-- eslint-disable max-len -->


  <div class = "container is-fluid" id="createUser">

   <div class="header" >
    <h1>Section 1: Create User</h1>
    <h4>Welcome! Please complete your user information to get started.</h4>
  </div>

<div class="create-user-form">
<v-form v-model="isFormValid">
  <div class="field">
  <label for="givenName" class="label">First Name
  <div class="control">
    <input class="input" type="text" v-model="givenName" placeholder="First Name">
  </div>
  </label>
</div>

<div class="field">
  <label for="familyName" class="label">Last Name
  <div class="control">
    <input class="input" type="text" v-model="familyName" placeholder="Last Name">
  </div>
  </label>
</div>

<div class="field">
<label for=phoneNumber class="label">Phone Number
  <div class="control">
    <input class="input" type="text" v-model="phoneNumber" placeholder="1234567890">
  </div>
  <p class="help" style= "text-align:left">Do not add dashes</p>
  <p class="help is-danger" v-if="!phoneIsValid && attemptedSubmit">
        Invalid phone number.<br>
        Needs to have 10 digits, no dashes </p>
  </label>
</div>

<div class="form-help">
<h1><b>Login Information</b></h1>
<p><i>This will be the information you use to login to your dashboard upon approval.</i></p>
</div>
<div id="loginInfo">
<div class="field">
  <label for="email" class="label">Email
    <div class="control">
    <input class="input" type="email" v-model="email" placeholder="Email">
    </div>
  </label>
</div>

<div class="field">
    <div class="control">
      <label class ="label" for="password">Create a Password
      <div><input class = "input" type="password" placeholder="Create Password" required v-model="password"/></div>
    </label>
      <p class="help">Password Requirements: at least 6 characters <br> </p>
    </div>
  </div>
</div>
</v-form>
</div>

<div class="field">
  <p class="control">
    <v-btn v-if="isFormValid()" class="button is-success" @click="submitCreateUser"> Create Account and Begin Application </v-btn>
    <v-btn v-if="!isFormValid()" class="button" @click="incompleteMsg()"> Create Account and Begin Application </v-btn>
  </p>
</div>

</div>

</template>

<style>
.label{
  text-align: left;
}

.form-help{
  text-align:center;
  min-width:400px;
  padding-bottom:10px;

}

#createUser .header{
  margin-top:-20px;
  margin-bottom:-10px;
  min-width: 400px;
}

.create-user-form {
  padding-top:30px;
  padding-bottom:30px;
}

.create-user-form .field{
  min-width:400px;
}

#loginInfo .field {
  justify-content:center;
  margin-left:auto;
  margin-right:auto;
  width:50%;
}

</style>

<!-- eslint-disable prefer-regex-literals -->
<script lang="js">
//import PhoneNumber from '@/api/models';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import * as bulmaToast from 'bulma-toast';
import UserDataService from '../service/UserDataService';
//import useCreateUser from '../api/whimsy';

const auth = getAuth();

export default {
  props: ['emailInput'],
  data() {
    return {
      givenName: '',
      familyName: '',
      email: '',
      password: '',
      phoneNumber: '',
      complete: false,
      debug: false,
      phoneIsValid: false,
      attemptedSubmit: false,
    };
  },
  //setup() {
    //const { mutate: createUserCall, data: userData, error: userError }=useCreateUser();
    //return { createUserCall, userData, userError };
  //},

  mounted() {
    this.email=this.emailInput;
  },

  methods: {
    isFormValid() {
      this.formValidation();
      if(this.givenName&&this.familyName&&this.phoneNumber) {
        if(this.email&&this.password) {
          return true;
        }
      }
      return false;
    },

    formValidation() {
      const regP=new RegExp('^\\d{10}$');
      this.phoneIsValid=regP.test(this.phoneNumber);

      if(!this.phoneIsValid) {
        return false;
      }
      return true;
    },

    incompleteMsg() {
      const msg='Incomplete form fields. Please fill out all fields to the next page.';
      bulmaToast.toast({ message: msg, type: 'is-danger', position: 'top-center' });
    },

    submitCreateUser() {
      if(!this.formValidation()) {
        this.attemptedSubmit=true;
        return;
      }
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((data) => {

          const user=getAuth().currentUser;

          //const phonenumber: PhoneNumber={
          //  code: '1',
          //  value: this.phoneNumber,
          //  country: 'US',
          //};

          this.createUserCall(
            {
              data: {
                email: this.email,
                firstName: this.givenName,
                lastName: this.familyName,
                phoneNumber: this.phonenumber,
                userReferenceId: user.uid,
              },
            },
            {
              onError: () => {
                bulmaToast.toast({ message: this.userError.toString(), type: 'is-danger', position: 'top-center' });
              },
              onSuccess: () => {
                this.$router.push({ name: 'businessInfo' });
              },
            }
          );
        })
        .catch((error) => {
          bulmaToast.toast({ message: error.message, type: 'is-danger', position: 'top-center' });
        });
    },
    
  },
};
</script>
