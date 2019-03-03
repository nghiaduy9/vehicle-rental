<template>
  <div class="card my-3">
    <div class="card-header">
      <h5 class="mb-0">AVAILABLE VEHICLES</h5>
    </div>
    <div class="card-body">
      <template v-for="vehicle of availableVehicles">
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
          </ul>
          <button
            type="button"
            class="btn btn-danger"
            @click="removeVehicle(vehicle.vehicleId)"
          >Remove</button>
        </div>
      </template>
    </div>
    <div class="card-footer">
      <button type="button" class="btn btn-primary" @click="addNewVehicle">New vehicle</button>
    </div>
  </div>
</template>

<script>
import router from '../../router.js'
import toastr from 'toastr'
toastr.options.toastClass = 'toastr'

export default {
  name: 'lender-available-vehicle',
  props: {
    availableVehicles: []
  },
  methods: {
    addNewVehicle: function() {
      router.push('/new-vehicle')
    },
    removeVehicle: async function(id) {
      const url = 'http://localhost:3000/api/Vehicle/' + id
      await Axios.delete(url)
      toastr.success('Remove completed')
    }
  }
}
</script>
