<template>
  <div class="card">
    <div class="card-header">
      <h1>AVAILABLE VEHICLES</h1>
    </div>
    <div class="card-body">
      <template v-for="renterAvailableVehicle of renterAvailableVehicles">
        <div :key="renterAvailableVehicle.vehicleId">
          <h4 class="card-title">ID: {{ renterAvailableVehicle.vehicleId }}</h4>
          <ul>
            <li>Vehicle ID: {{ renterAvailableVehicle.vehicleId }}</li>
            <li>License plate: {{ renterAvailableVehicle.licensePlate }}</li>
            <li>Identity card number:  {{ renterAvailableVehicle.identityCardNumber }}</li>
            <li>Model: {{ renterAvailableVehicle.model }}</li>
            <li>Color: {{ renterAvailableVehicle.color }}</li>
            <li>State: {{ renterAvailableVehicle.state }}</li>
            <li>Year of manufacture: {{ renterAvailableVehicle.yearOfManufacture }}</li>
            <li>Skeleton number: {{ renterAvailableVehicle.skeletonNumber }}</li>
            <li>Engine number: {{ renterAvailableVehicle.engineNumber }}</li>
            <li>Price per day: {{ renterAvailableVehicle.pricePerDay }}</li>
            <li>Owner identity card number: {{ renterAvailableVehicle.lender.OwnerIdentityCardNumber }}</li>
            <li>Owner name: {{ renterAvailableVehicle.lender.name }}</li>
            <li>Address: {{ renterAvailableVehicle.lender.address }}</li>
            <li>Phone: {{ renterAvailableVehicle.lender.phone }}</li>
          </ul>
          <button type="button" class="btn btn-primary" @click="rent(renterAvailableVehicle.vehicleId)">Rent</button>
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
    renterAvailableVehicles: []
  },
  methods: {
    rent: async function(vehicleId) {
      let renterId = await VueCookies.get('id')
      let renterResponse = await Axios.get('http://localhost:3000/api/Renter/' + renterid)
      let Renter = renterResponse.data
      let vehicleResponse = await Axios.get('http://localhost:3000/api/Vehicle/' + vehicleId)
      let vehicle = vehicleResponse.data
      vehicle.renter = Renter
      await Axios.put('http://localhost:3000/api/Vehicle/' + vehicleId, vehicle)
      toastr.success('Success')
    }
  }
}
</script>

