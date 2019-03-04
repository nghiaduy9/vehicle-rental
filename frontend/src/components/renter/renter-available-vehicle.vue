<template>
  <div class="card mb-5">
    <div class="card-header">
      <h5 class="mb-0">AVAILABLE VEHICLES</h5>
    </div>
    <div class="card-body">
      <template v-for="vehicle of availableVehicles">
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
            </ul>
            <button type="button" class="btn btn-primary" @click="rent(vehicle.vehicleId)">Rent</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import toastr from 'toastr'
import VueCookies from 'vue-cookies'
import Axios from 'axios'

toastr.options.toastClass = 'toastr'

export default {
  name: 'lender-available-vehicle',
  data: function() {
    return {
      availableVehicles: []
    }
  },
  methods: {
    rent: async function(vehicleId) {
      let renterId = await VueCookies.get('id')
      let renterResponse = await Axios.get('http://localhost:3000/api/Renter/' + renterId)
      let _renter = renterResponse.data
      let renter = {
        $class: 'org.vehiclerental.RenterConcept',
        RenterIdentityCardNumber: _renter.RenterIdentityCardNumber,
        name: _renter.name,
        address: _renter.address,
        phone: _renter.phone
      }
      let vehicleResponse = await Axios.get(
        'http://localhost:3000/api/Vehicle/' + vehicleId
      )
      let vehicle = vehicleResponse.data
      let _timeBegin = new Date()
      let _vehicle = {
        $class: 'org.vehiclerental.Vehicle',
        licensePlate: vehicle.licensePlate,
        lender: vehicle.lender,
        identityCardNumber: vehicle.identityCardNumber,
        model: vehicle.model,
        color: vehicle.color,
        state: vehicle.state,
        yearOfManufacture: vehicle.yearOfManufacture,
        skeletonNumber: vehicle.skeletonNumber,
        engineNumber: vehicle.engineNumber,
        vehicleStatus: 'pending',
        renter: renter,
        pricePerDay: vehicle.pricePerDay,
        timeBegin: _timeBegin
      }
      await Axios.put('http://localhost:3000/api/Vehicle/' + vehicleId, _vehicle)
      toastr.success('Success')
    },
    fetchRAV: async function() {
      let url = 'http://localhost:3000/api/queries/getAvailableVehicles'
      let res = await Axios.get(url)
      this.availableVehicles = []
      this.availableVehicles = res.data
    }
  },
  mounted: async function() {
    try {
      await this.fetchRAV()
      setInterval(this.fetchRAV, 3000)
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
