<template>
  <div class="card my-3">
    <div class="card-header">
      <h5 class="mb-0">AVAILABLE VEHICLES</h5>
    </div>
    <div class="card-body">
      <template v-for="vehicle of renterAvailableVehicles">
        <div :key="vehicle.vehicleId">
          <h4 class="card-title">ID: {{ vehicle.vehicleId }}</h4>
          <ul>
            <li>License plate: {{ vehicle.licensePlate }}</li>
            <li>Identity card number: {{ vehicle.identityCardNumber }}</li>
            <li>Model: {{ vehicle.model }}</li>
            <li>Color: {{ vehicle.color }}</li>
            <li>State: {{ vehicle.state }}</li>
            <li>Year of manufacture: {{ vehicle.yearOfManufacture }}</li>
            <li>Skeleton number: {{ vehicle.skeletonNumber }}</li>
            <li>Engine number: {{ vehicle.engineNumber }}</li>
            <li>Price per day: {{ vehicle.pricePerDay }}</li>
            <li>Owner identity card number: {{ vehicle.lender.OwnerIdentityCardNumber }}</li>
            <li>Owner name: {{ vehicle.lender.name }}</li>
            <li>Address: {{ vehicle.lender.address }}</li>
            <li>Phone: {{ vehicle.lender.phone }}</li>
          </ul>
          <button type="button" class="btn btn-primary" @click="rent(vehicle.vehicleId)">Rent</button>
          <hr>
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
      renterAvailableVehicles: []
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
      let vehicleResponse = await Axios.get('http://localhost:3000/api/Vehicle/' + vehicleId)
      let vehicle = vehicleResponse.data
      let _timeBegin = new Date()
      let _vehicle = {
        $class: "org.vehiclerental.Vehicle",
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
        timeBegin: _timeBegin,
      }
      await Axios.put('http://localhost:3000/api/Vehicle/' + vehicleId, _vehicle)
      toastr.success('Success')
    },
    fetchRAV: async function() {
      let url = 'http://localhost:3000/api/queries/getAvailableVehicles'
      let res = await Axios.get(url)
      this.renterAvailableVehicles = []
      this.renterAvailableVehicles = res.data
    }
  },
  mounted: async function() {
    try {
      setTimeout(await this.fetchRAV(), 3000);
    } catch (err) {
      console.error(err)
    }
  }
}
</script>

