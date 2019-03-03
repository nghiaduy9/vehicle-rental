<template>
  <div class="card">
    <div class="card-header">
      <h1>PENDING VEHICLES</h1>
    </div>
    <div class="card-body">
      <template v-for="ownerPendingVehicle of ownerPendingVehicles">
        <div :key="ownerPendingVehicle.vehicleId">
          <h4 class="card-title">ID: {{ ownerPendingVehicle.vehicleId }}</h4>
          <ul>
            <li>Vehicle ID: {{ ownerPendingVehicle.vehicleId }}</li>
            <li>License plate: {{ ownerPendingVehicle.licensePlate }}</li>
            <li>Identity card number:  {{ ownerPendingVehicle.identityCardNumber }}</li>
            <li>Model: {{ ownerPendingVehicle.model }}</li>
            <li>Color: {{ ownerPendingVehicle.color }}</li>
            <li>State: {{ ownerPendingVehicle.state }}</li>
            <li>Year of manufacture: {{ ownerPendingVehicle.yearOfManufacture }}</li>
            <li>Skeleton number: {{ ownerPendingVehicle.skeletonNumber }}</li>
            <li>Engine number: {{ ownerPendingVehicle.engineNumber }}</li>
            <li>Price per day: {{ ownerPendingVehicle.pricePerDay }}</li>
            <li>Renter identity card number: {{ ownerPendingVehicle.renter.RenterIdentityCardNumber }}</li>
            <li>Renter name: {{ ownerPendingVehicle.renter.name }}</li>
            <li>Renter phone: {{ ownerPendingVehicle.renter.phone }}</li>
            <li>Renter address: {{ ownerPendingVehicle.renter.address }}</li>
          </ul>
          <button type="button" class="btn btn-success" @click="accpet(ownerPendingVehicle.vehicleId)">Accept</button>
          <button type="button" class="btn btn-danger" @click="decline(ownerPendingVehicle.vehicleId)">Decline</button>
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
    ownerPendingVehicles: []
  },
  methods: {
    accept: function(id) {
      let url = 'http://localhost:3000/api/Vehicle/' + id
      let response = await axios.get(url)
      let vehicle = response.data
      vehicle.vehicleStatus = 'inUse'
      await axios.put(url,vehicle)
      toastr.success('Accepted')
    },
    decline: function(id) {
      let url = '1970-01-01T00:00:00.000Z'
      let response = await axios.get(url)
      let vehicle = response.data
      vehicle.vehicleStatus = 'available'
      vehicle.renter = 'undefined'
      await axios.put(url,vehicle)
      toastr.success('Declined')
    }
  }
}
</script>

