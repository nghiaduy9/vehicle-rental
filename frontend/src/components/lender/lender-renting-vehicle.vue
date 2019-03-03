<template>
  <div class="card">
    <div class="card-header">
      <h1>RENTING VEHICLES</h1>
    </div>
    <div class="card-body">
      <template v-for="renterRentingVehicle of renterRentingVehicles">
        <div :key="renterRentingVehicle.vehicleId">
          <h4 class="card-title">ID: {{ renterRentingVehicle.vehicleId }}</h4>
          <ul>
            <li>Vehicle ID: {{ renterRentingVehicle.vehicleId }}</li>
            <li>License plate: {{ renterRentingVehicle.licensePlate }}</li>
            <li>Identity card number:  {{ renterRentingVehicle.identityCardNumber }}</li>
            <li>Model: {{ renterRentingVehicle.model }}</li>
            <li>Color: {{ renterRentingVehicle.color }}</li>
            <li>State: {{ renterRentingVehicle.state }}</li>
            <li>Year of manufacture: {{ renterRentingVehicle.yearOfManufacture }}</li>
            <li>Skeleton number: {{ renterRentingVehicle.skeletonNumber }}</li>
            <li>Engine number: {{ renterRentingVehicle.engineNumber }}</li>
            <li>Price per day: {{ renterRentingVehicle.pricePerDay }}</li>
            <li>Renter identity card number: {{ renterRentingVehicle.renter.RenterIdentityCardNumber }}</li>
            <li>Renter name: {{ renterRentingVehicle.renter.name }}</li>
            <li>Renter phone: {{ renterRentingVehicle.renter.phone }}</li>
            <li>Renter address: {{ renterRentingVehicle.renter.address }}</li>
            <li>Begin: {{ renterRentingVehicle.timeBegin }}</li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import toastr from 'toastr'

export default {
  name: 'lender-renting-vehicle',
  props: {
    renterRentingVehicles: []
  },
}
</script>

