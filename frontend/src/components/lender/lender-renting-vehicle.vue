<template>
  <div class="card my-3">
    <div class="card-header">
      <h5 class="mb-0">RENTING VEHICLES</h5>
    </div>
    <div class="card-body">
      <template v-for="vehicle of ownerRentingVehicles">
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
            <li>Renter identity card number: {{ vehicle.renter.RenterIdentityCardNumber }}</li>
            <li>Renter name: {{ vehicle.renter.name }}</li>
            <li>Renter phone: {{ vehicle.renter.phone }}</li>
            <li>Renter address: {{ vehicle.renter.address }}</li>
            <li>Begin: {{ vehicle.timeBegin }}</li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VueCookies from 'vue-cookies'

export default {
  name: 'lender-renting-vehicle',
  data: function() {
    return {
      id: '',
      ownerRentingVehicles: []
    }
  },
  methods: {
    fetchORV: async function(id) {
      let url = 'http://localhost:3000/api/queries/getOwnerRentingVehicles?ownerId=' + id
      let res = await axios.get(url)
      this.ownerRentingVehicles = res.data
    }
  },
  mounted: async function() {
    try {
      this.id = VueCookies.get('id')
      setTimeout(await this.fetchORV(this.id), 3000);
    } catch (err) {
      consolo.error(err)
    }
  }
}
</script>
