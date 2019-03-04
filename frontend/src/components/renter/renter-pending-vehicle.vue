<template>
  <div class="card my-3">
    <div class="card-header">
      <h5 class="mb-0">PENDING VEHICLES</h5>
    </div>
    <div class="card-body">
      <template v-for="vehicle of renterPendingVehicles">
        <div :key="vehicle.vehicleId">
          <h4 class="card-title">ID: {{ vehicle.vehicleId }}</h4>
          <ul>
            <li>Vehicle ID: {{ vehicle.vehicleId }}</li>
            <li>License plate: {{ vehicle.licensePlate }}</li>
            <li>Identity card number: {{ vehicle.identityCardNumber }}</li>
            <li>Model: {{ vehicle.model }}</li>
            <li>Color: {{ vehicle.color }}</li>
            <li>State: {{ vehicle.state }}</li>
            <li>Year of manufacture: {{ vehicle.yearOfManufacture }}</li>
            <li>Skeleton number: {{ vehicle.skeletonNumber }}</li>
            <li>Engine number: {{ vehicle.engineNumber }}</li>
            <li>Price per day: {{ vehicle.pricePerDay }}</li>
            <li>Owner identity card number: {{ vehicle.lender.RenterIdentityCardNumber }}</li>
            <li>Owner name: {{ vehicle.lender.name }}</li>
            <li>Owner phone: {{ vehicle.lender.phone }}</li>
            <li>Owner address: {{ vehicle.lender.address }}</li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies'
import Axios from 'axios'

export default {
  name: 'renter-pendinging-vehicle',
  data: function() {
    return {
      id: '',
      renterPendingVehicles: []
    }
  },
  methods: {
    fetchRPV: async function(id) {
      let url = 'http://localhost:3000/api/queries/getRenterPendingVehicles?renterId=' + id
      let res = await Axios.get(url)
      this.renterPendingVehicles = res.data
    }
  },
  mounted: async function() {
    try {
      this.id = VueCookies.get('id')
      setTimeout(await this.fetchRPV(this.id), 3000);
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
