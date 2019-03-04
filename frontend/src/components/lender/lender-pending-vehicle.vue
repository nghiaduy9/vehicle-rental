<template>
  <div class="card my-3">
    <div class="card-header">
      <h5 class="mb-0">PENDING VEHICLES</h5>
    </div>
    <div class="card-body">
      <template v-for="vehicle of ownerPendingVehicles">
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
          </ul>
          <button type="button" class="btn btn-success" @click="accept(vehicle.vehicleId)">Accept</button>
          <button type="button" class="btn btn-danger" @click="decline(vehicle.vehicleId)">Decline</button>
          <hr>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import toastr from 'toastr'
import VueCookies from 'vue-cookies'
toastr.options.toastClass = 'toastr'

export default {
  name: 'lender-pending-vehicle',
  data: function() {
    return {
      id: '',
      ownerPendingVehicles: []
    }
  },
  methods: {
    accept: async function(id) {
      let url = 'http://localhost:3000/api/Vehicle/' + id
      let response = await axios.get(url)
      let vehicle = response.data
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
        vehicleStatus: 'inUse',
        renter: vehicle.renter,
        pricePerDay: vehicle.pricePerDay,
        timeBegin: new Date(),
      }
      await axios.put(url, _vehicle)
      toastr.success('Accepted')
    },
    decline: async function(id) {
      let url = 'http://localhost:3000/api/Vehicle/' + id
      let response = await axios.get(url)
      let vehicle = response.data
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
        vehicleStatus: 'available',
        renter: vehicle.renter,
        pricePerDay: vehicle.pricePerDay,
        timeBegin: _timeBegin,
      }
      await axios.put(url, _vehicle)
      toastr.success('Declined')
    },
    fetchOPV: async function(id) {
      let url = 'http://localhost:3000/api/queries/getOwnerPendingVehicles?ownerId=' + id
      let res = await axios.get(url)
      this.ownerPendingVehicles = []
      this.ownerPendingVehicles = res.data
    }
  },
  mounted: async function() {
    try {
      this.id = VueCookies.get('id')
      setTimeout(await this.fetchOPV(this.id), 3000);
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
