<template>
  <div>
    <h1>This is the home page</h1>
  </div>
</template>

<script>
import router from '../router.js'

export default {
  name: 'Index',
  mounted: function() {
    router.push('/login')
  }
}
</script>
