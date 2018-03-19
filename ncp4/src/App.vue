<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
  font-family: 'Roboto', sans-serif;
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

</style>
