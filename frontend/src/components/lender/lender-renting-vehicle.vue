<template>
  <div class="card mb-5">
    <div class="card-header">
      <h5 class="mb-0">RENTING VEHICLES</h5>
    </div>
    <div class="card-body">
      <template v-for="vehicle of rentingVehicles">
        <div class="card vehicle-card" :key="vehicle.vehicleId">
          <div class="card-body">
            <ul class="list-unstyled">
              <li>License plate: {{ vehicle.licensePlate }}</li>
              <li>Model: {{ vehicle.model }}</li>
              <li>Color: {{ vehicle.color }}</li>
              <li>State: {{ vehicle.state }}</li>
              <li>Year of manufacture: {{ vehicle.yearOfManufacture }}</li>
              <li>Skeleton number: {{ vehicle.skeletonNumber }}</li>
              <li>Engine number: {{ vehicle.engineNumber }}</li>
              <li>Renting price: {{ vehicle.pricePerDay }} USD/day</li>
              <hr>
              <li>Renter ID card number: {{ vehicle.renter.RenterIdentityCardNumber }}</li>
              <li>Renter name: {{ vehicle.renter.name }}</li>
              <li>Renter phone: {{ vehicle.renter.phone }}</li>
              <li>Renter address: {{ vehicle.renter.address }}</li>
              <hr>
              <li>Begin date: {{ (new Date(vehicle.timeBegin)).toDateString() }}</li>
            </ul>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import vuecookies from 'vue-cookies'

export default {
  name: 'lender-renting-vehicle',
  data: function() {
    return {
      id: '',
      rentingVehicles: []
    }
  },
  methods: {
    fetchORV: async function(id) {
      let url = 'http://178.128.24.80:3000/api/queries/getOwnerRentingVehicles?ownerId=' + id
      let res = await axios.get(url)
      this.rentingVehicles = res.data
    }
  },
  mounted: async function() {
    try {
      this.id = vuecookies.get('id')
      await this.fetchORV(this.id)
      setInterval(() => this.fetchORV(this.id), 3000)
    } catch (err) {
      consolo.error(err)
    }
  }
}
</script>
