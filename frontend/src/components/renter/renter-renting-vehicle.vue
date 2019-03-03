<template>
  <div class="card">
    <div class="card-header">
      <h1>RENTING VEHICLES</h1>
    </div>
    <div class="card-body">
      <template v-for="ownerRentingVehicle of ownerRentingVehicles">
        <div :key="ownerRentingVehicle.vehicleId">
          <h4 class="card-title">ID: {{ ownerRentingVehicle.vehicleId }}</h4>
          <ul>
            <li>Vehicle ID: {{ ownerRentingVehicle.vehicleId }}</li>
            <li>License plate: {{ ownerRentingVehicle.licensePlate }}</li>
            <li>Identity card number: {{ ownerRentingVehicle.identityCardNumber }}</li>
            <li>Model: {{ ownerRentingVehicle.model }}</li>
            <li>Color: {{ ownerRentingVehicle.color }}</li>
            <li>State: {{ ownerRentingVehicle.state }}</li>
            <li>Year of manufacture: {{ ownerRentingVehicle.yearOfManufacture }}</li>
            <li>Skeleton number: {{ ownerRentingVehicle.skeletonNumber }}</li>
            <li>Engine number: {{ ownerRentingVehicle.engineNumber }}</li>
            <li>Price per day: {{ ownerRentingVehicle.pricePerDay }}</li>
            <li>Owner identity card number: {{ ownerRentingVehicle.lender.RenterIdentityCardNumber }}</li>
            <li>Owner name: {{ ownerRentingVehicle.lender.name }}</li>
            <li>Owner phone: {{ ownerRentingVehicle.lender.phone }}</li>
            <li>Owner address: {{ ownerRentingVehicle.lender.address }}</li>
            <li>Begin: {{ ownerRentingVehicle.timeBegin }}</li>
          </ul>
          <button
            type="button"
            class="btn btn-primary"
            @click="pay(ownerRentingVehicle.vehicleId)"
          >Pay</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import router from '../router.js'
import shortid from 'shortid'
import axios from 'axios'
import toastr from 'toastr'

toastr.options.toastClass = 'toastr'

export default {
  name: 'lender-renting-vehicle',
  props: {
    ownerRentingVehicles: []
  },
  methods: {
    pay: async function(vehicleId) {
      let vehicleResponse = await axios.get(
        'http://localhost:3000/api/Vehicle/' + vehicleId
      )
      let vehicle = vehicleResponse.data
      let _timeEnd = Date.now()
      let timeRent = _timeEnd.getDate() - vehicle.timeBegin.getDate()
      let _totalPrice = timeRent*vehicle.pricePerDay
      let newRental = {
        $class: 'org.vehiclerental.RentalAgreement',
        rentalId: shortid.generate(),
        lender: vehicle.lender,
        renter: vehicle.renter,
        vehicle: vehicle,
        timeBegin: vehicle.timeBegin,
        timeEnd: Date.now(),
        totalPrice: _totalPrice,
        currency: 'USD',
        paid: 'false'
      }
      await axios.post('http://localhost:3000/api/RentalAgreement', newRental)
      toastr.success('Success')
    }
  }
}
</script>

