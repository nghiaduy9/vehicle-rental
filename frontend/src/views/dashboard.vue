<template>
  <div id="dashboard" class="container my-5">
    <h1>DASHBOARD</h1>
    <div v-if="user === 'renter'">
      <RenterAvailableVehicle/>
      <RenterPendingVehicle/>
      <RenterPayingVehicle/>
      <RenterRentingVehicle/>
      <RenterHistory/>
    </div>
    <div v-else>
      <LenderAvailableVehicle/>
      <LenderPendingVehicle/>
      <LenderPayingVehicle/>
      <LenderRentingVehicle/>
      <LenderHistory/>
    </div>
  </div>
</template>

<script>
import vuecookies from 'vue-cookies'
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

export default {
  name: 'dashboard',
  components: {
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
    return { user: '', id: '' }
  },
  mounted: async function() {
    try {
      this.user = await vuecookies.get('account-type')
      this.id = await vuecookies.get('id')
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
