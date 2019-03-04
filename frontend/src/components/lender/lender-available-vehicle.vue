<template>
  <div class="card mb-5">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h5 class="mb-0">AVAILABLE VEHICLES</h5>
      <button type="button" class="btn btn-primary" @click="addNewVehicle">Add vehicle</button>
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
            <button
              type="button"
              class="btn btn-danger"
              @click="removeVehicle(vehicle.vehicleId)"
            >Remove</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import router from '../../router.js'
import toastr from 'toastr'
import VueCookies from 'vue-cookies'
import Axios from 'axios'
toastr.options.toastClass = 'toastr'

export default {
  name: 'lender-available-vehicle',
  data: function() {
    return {
      id: '',
      availableVehicles: []
    }
  },
  methods: {
    addNewVehicle: function() {
      router.push('/new-vehicle')
    },
    removeVehicle: async function(id) {
      let url = 'http://localhost:3000/api/Vehicle/' + id
      await Axios.delete(url)
      toastr.success('Remove completed')
    },
    fetchOAV: async function(id) {
      let url =
        'http://localhost:3000/api/queries/getOwnerAvailableVehicles?ownerId=' + id
      let res = await Axios.get(url)
      this.availableVehicles = res.data
    }
  },
  mounted: async function() {
    try {
      this.id = VueCookies.get('id')
      await this.fetchOAV(this.id)
      setInterval(async () => this.fetchOAV(this.id), 3000)
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
