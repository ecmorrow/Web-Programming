<template>
  <div id ="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>

body {
  font-family: 'Roboto', sans-serif;
}

#app {
  height: 100%;
  width: 100%;
}



.footer {
/*position: fixed;*/
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  margin-top: 40px;
  text-align: center;
  overflow: hidden;
  position: absolute;
  color: gray;
}

/* Add animation to "page content" */
/*.animate-bottom {
  position: relative;
  -webkit-animation-name: animatebottom;
  -webkit-animation-duration: 1s;
  animation-name: animatebottom;
  animation-duration: 1s
}

@-webkit-keyframes animatebottom {
  from { bottom:-100px; opacity:0 } 
  to { bottom:0px; opacity:1 }
}

@keyframes animatebottom { 
  from{ bottom:-100px; opacity:0 } 
  to{ bottom:0; opacity:1 }
}
*/


</style>
