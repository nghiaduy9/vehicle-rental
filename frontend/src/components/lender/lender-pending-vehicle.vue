<template>
  <div class="card my-3">
    <div class="card-header">
      <h5 class="mb-0">PENDING VEHICLES</h5>
    </div>
    <div class="card-body">
      <template v-for="vehicle of pendingVehicles">
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
          <button type="button" class="btn btn-success" @click="accpet(vehicle.vehicleId)">Accept</button>
          <button type="button" class="btn btn-danger" @click="decline(vehicle.vehicleId)">Decline</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import toastr from 'toastr'
toastr.options.toastClass = 'toastr'

export default {
  name: 'lender-pending-vehicle',
  props: {
    pendingVehicles: []
  },
  methods: {
    accept: async function(id) {
      let url = 'http://localhost:3000/api/Vehicle/' + id
      let response = await axios.get(url)
      let vehicle = response.data
      vehicle.vehicleStatus = 'inUse'
      await axios.put(url, vehicle)
      toastr.success('Accepted')
    },
    decline: async function(id) {
      let url = '1970-01-01T00:00:00.000Z'
      let response = await axios.get(url)
      let vehicle = response.data
      vehicle.vehicleStatus = 'available'
      vehicle.renter = 'undefined'
      await axios.put(url, vehicle)
      toastr.success('Declined')
    }
  }
}
</script>
