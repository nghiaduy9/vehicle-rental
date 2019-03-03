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
            <li>Owner identity card number: {{ vehicle.lender.OwnerIdentityCardNumber }}</li>
            <li>Owner name: {{ vehicle.lender.name }}</li>
            <li>Address: {{ vehicle.lender.address }}</li>
            <li>Phone: {{ vehicle.lender.phone }}</li>
          </ul>
          <button type="button" class="btn btn-primary" @click="rent(vehicle.vehicleId)">Rent</button>
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
  props: {
    availableVehicles: []
  },
  methods: {
    // rent: async function(vehicleId) {
    //   let renterId = await VueCookies.get('id')
    //   let renterResponse = await Axios.get('http://localhost:3000/api/Renter/' + renterid)
    //   let Renter = renterResponse.data
    //   let vehicleResponse = await Axios.get(
    //     'http://localhost:3000/api/Vehicle/' + vehicleId
    //   )
    //   let vehicle = vehicleResponse.data
    //   vehicle.renter = Renter
    //   await Axios.put('http://localhost:3000/api/Vehicle/' + vehicleId, vehicle)
    //   toastr.success('Success')
    // }
  }
}
</script>
