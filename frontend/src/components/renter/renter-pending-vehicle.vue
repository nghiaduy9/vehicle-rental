<template>
  <div class="card mb-5">
    <div class="card-header">
      <h5 class="mb-0">PENDING VEHICLES</h5>
    </div>
    <div class="card-body">
      <template v-for="vehicle of pendingVehicles">
        <div class="card vehicle-card" :key="vehicle.vehicleId">
          <div class="card-body">
            <ul class="list-unstyled mb-0">
              <li>License plate: {{ vehicle.licensePlate }}</li>
              <li>Model: {{ vehicle.model }}</li>
              <li>Color: {{ vehicle.color }}</li>
              <li>State: {{ vehicle.state }}</li>
              <li>Year of manufacture: {{ vehicle.yearOfManufacture }}</li>
              <li>Skeleton number: {{ vehicle.skeletonNumber }}</li>
              <li>Engine number: {{ vehicle.engineNumber }}</li>
              <li>Renting price: {{ vehicle.pricePerDay }} USD/day</li>
              <hr>
              <li>Lender ID card number: {{ vehicle.lender.OwnerIdentityCardNumber }}</li>
              <li>Lender name: {{ vehicle.lender.name }}</li>
              <li>Lender phone: {{ vehicle.lender.phone }}</li>
              <li>Lender address: {{ vehicle.lender.address }}</li>
            </ul>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import vuecookies from 'vue-cookies'
import Axios from 'axios'

export default {
  name: 'renter-pendinging-vehicle',
  data: function() {
    return {
      id: '',
      pendingVehicles: []
    }
  },
  methods: {
    fetchRPV: async function(id) {
      let url =
        'http://178.128.24.80:3000/api/queries/getRenterPendingVehicles?renterId=' + id
      let res = await Axios.get(url)
      this.pendingVehicles = res.data
    }
  },
  mounted: async function() {
    try {
      this.id = vuecookies.get('id')
      await this.fetchRPV(this.id)
      setInterval(() => this.fetchRPV(this.id), 3000)
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
