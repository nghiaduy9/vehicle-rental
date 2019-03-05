<template>
  <div id="app">
    <TopBar/>
    <router-view/>
  </div>
</template>

<script>
export default { name: 'App' }
</script>


<style lang="sass">
@import './styles/index.scss'
</style>
