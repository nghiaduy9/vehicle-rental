<script>
import vuecookies from 'vue-cookies'
import router from '../router.js'

export default {
  name: 'Index',
  mounted: function() {
    if (vuecookies.get('id')) router.push('/dashboard')
    else router.push('/login')
  }
}
</script>
