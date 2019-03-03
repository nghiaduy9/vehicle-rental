<template>
  <div class="card">
    <div class="card-header">
      <h1>AVAILABLE VEHICLES</h1>
    </div>
    <div class="card-body">
      <template v-for="ownerAvailableVehicle of ownerAvailableVehicles">
        <div :key="ownerAvailableVehicle.vehicleId">
          <h4 class="card-title">ID: {{ ownerAvailableVehicle.vehicleId }}</h4>
          <ul>
            <li>Vehicle ID: {{ ownerAvailableVehicle.vehicleId }}</li>
            <li>License plate: {{ ownerAvailableVehicle.licensePlate }}</li>
            <li>Identity card number:  {{ ownerAvailableVehicle.identityCardNumber }}</li>
            <li>Model: {{ ownerAvailableVehicle.model }}</li>
            <li>Color: {{ ownerAvailableVehicle.color }}</li>
            <li>State: {{ ownerAvailableVehicle.state }}</li>
            <li>Year of manufacture: {{ ownerAvailableVehicle.yearOfManufacture }}</li>
            <li>Skeleton number: {{ ownerAvailableVehicle.skeletonNumber }}</li>
            <li>Engine number: {{ ownerAvailableVehicle.engineNumber }}</li>
            <li>Price per day: {{ ownerAvailableVehicle.pricePerDay }}</li>
          </ul>
          <button type="button" class="btn btn-danger" @click="removeVehicle(ownerAvailableVehicle.vehicleId)">Remove</button>
        </div>
      </template>
    </div>
    <div class="card-footer">
      <button type="button" class="btn btn-primary" @click="addNewVehicle">Add new vehicle</button>
    </div>
  </div>
</template>

<script>
import router from '../router.js'
import toastr from 'toastr'

toastr.options.toastClass = 'toastr'

export default {
  name: 'lender-available-vehicle',
  props: {
    ownerAvailableVehicles: []
  },
  methods: {
    addNewVehicle: function() {
      router.push('/new-vehicle')
    },
    removeVehicle: async function(id) {
      let url = 'http://localhost:3000/api/Vehicle/' + id
      await Axios.delete(url)
      toastr.success('Remove completed')
    }
  }
}
</script>

