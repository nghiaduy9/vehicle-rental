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
            <li>{{ ownerAvailableVehicle.vehicleId }}</li>
            <li>{{ ownerAvailableVehicle.licensePlate }}</li>
            <li>{{ ownerAvailableVehicle.identityCardNumber }}</li>
            <li>{{ ownerAvailableVehicle.model }}</li>
            <li>{{ ownerAvailableVehicle.color }}</li>
            <li>{{ ownerAvailableVehicle.state }}</li>
            <li>{{ ownerAvailableVehicle.yearOfManufacture }}</li>
            <li>{{ ownerAvailableVehicle.skeletonNumber }}</li>
            <li>{{ ownerAvailableVehicle.engineNumber }}</li>
            <li>{{ ownerAvailableVehicle.pricePerDay }}</li>
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
  name: 'available-vehicle',
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

