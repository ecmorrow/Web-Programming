<template>
  <div class="column">
    <h1>MyNote</h1>
    <h2>An online note helper</h2>
    <form v-on:submit.prevent="register">
      <p>Register Below</p>
      <input class="narrow" v-model="username" placeholder="Username">
      <input class="narrow" v-model="name" placeholder="First and Last Name"><br/>
      <input class="narrow" v-model="email" placeholder="Email Address">
      <input class="narrow" type="password" v-model="password" placeholder="Password">
      <button class="alternate primary" type="submit">Register</button>
    </form>
    <p class="error">{{registerError}}</p>
    <a href="https://github.com/EmMorrow/cs260/tree/master/final-cp">Github</a>
  </div>

</template>

<script>
 export default {
   name: 'WelcomePage',
   data () {
     return {
       username: '',
       email: '',
       password: '',
       name: '',
     }
   },
   computed: {
     registerError: function() {
       return this.$store.getters.registerError;
     },
   },
   methods: {
     register: function() {
       this.$store.dispatch('register',{
          username: this.username,
          email: this.email,
          password: this.password,
          name: this.name,
       });
     }
   }
 }
</script>

<style scoped>
input, button {
  vertical-align: top;
}

input {
  border: 0;
  outline: 0;
  padding: 5px;
  margin: 5px;
  background: transparent;
  border-bottom: 1px solid gray;
}
*:focus {
  outline: none;
}

 img {
     width: 100px;
 }

 h1 {
     margin-bottom: 0px;
     /*padding-top: 10%;*/
 }
 h2 {
     margin-top: 12px;
     font-size: 1.2em;
     font-weight: normal;
     margin-bottom: 50px;
 }
 .narrow {
     width: 170px;
 }
 .wide {
     width: 370px;
 }
 .column {
  padding-left: 10%;
  padding-top: 10px;
 }
</style>