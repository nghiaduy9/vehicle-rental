<template>
  <div>
    <TopBar/>
    <div class="container w-75 my-5">
      <div v-if="accType === 'renter'">
        <RenterAvailableVehicle/>
        <RenterPendingVehicle/>
        <RenterRentingVehicle/>
        <RenterPayingVehicle/>
        <RenterHistory/>
      </div>
      <div v-else>
        <LenderAvailableVehicle/>
        <LenderPendingVehicle/>
        <LenderRentingVehicle/>
        <LenderPayingVehicle/>
        <LenderHistory/>
      </div>
    </div>
  </div>
</template>

<script>
import vuecookies from 'vue-cookies'
import TopBar from '../components/top-bar'
import LenderAvailableVehicle from '../components/lender/lender-available-vehicle'
import LenderHistory from '../components/lender/lender-history'
import LenderPayingVehicle from '../components/lender/lender-paying-vehicle'
import LenderPendingVehicle from '../components/lender/lender-pending-vehicle'
import LenderRentingVehicle from '../components/lender/lender-renting-vehicle'
import RenterAvailableVehicle from '../components/renter/renter-available-vehicle'
import RenterHistory from '../components/renter/renter-history'
import RenterPayingVehicle from '../components/renter/renter-paying-vehicle'
import RenterPendingVehicle from '../components/renter/renter-pending-vehicle'
import RenterRentingVehicle from '../components/renter/renter-renting-vehicle'
import router from '../router'

export default {
  name: 'dashboard',
  components: {
    TopBar,
    LenderAvailableVehicle,
    LenderHistory,
    LenderPayingVehicle,
    LenderPendingVehicle,
    LenderRentingVehicle,
    RenterAvailableVehicle,
    RenterHistory,
    RenterPayingVehicle,
    RenterPendingVehicle,
    RenterRentingVehicle
  },
  data: function() {
    return { accType: '', id: '' }
  },
  mounted: async function() {
    try {
      this.id = await vuecookies.get('id')
      this.accType = await vuecookies.get('account-type')
      if (!this.id) router.push('/login')
    } catch (err) {
      console.error(err)
    }
  }
}
</script>

<style lang="scss">
.card.vehicle-card {
  background-color: rgba(0, 0, 0, 0.03);
}
.card.vehicle-card:not(:last-child) {
  margin-bottom: 1rem;
}
</style>
