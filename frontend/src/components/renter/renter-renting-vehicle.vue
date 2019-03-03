<template>
  <div class="card my-3">
    <div class="card-header">
      <h5 class="mb-0">RENTING VEHICLES</h5>
    </div>
    <div class="card-body">
      <template v-for="vehicle of rentingVehicles">
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
            <li>Owner identity card number: {{ vehicle.lender.RenterIdentityCardNumber }}</li>
            <li>Owner name: {{ vehicle.lender.name }}</li>
            <li>Owner phone: {{ vehicle.lender.phone }}</li>
            <li>Owner address: {{ vehicle.lender.address }}</li>
            <li>Begin: {{ vehicle.timeBegin }}</li>
          </ul>
          <button type="button" class="btn btn-primary" @click="pay(vehicle.vehicleId)">Pay</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import router from '../../router.js'
import shortid from 'shortid'
import axios from 'axios'
import toastr from 'toastr'
toastr.options.toastClass = 'toastr'

export default {
  name: 'lender-renting-vehicle',
  props: {
    rentingVehicles: []
  },
  methods: {
    // pay: async function(vehicleId) {
    //   let vehicleResponse = await axios.get(
    //     'http://localhost:3000/api/Vehicle/' + vehicleId
    //   )
    //   let vehicle = vehicleResponse.data
    //   let _timeEnd = Date.now()
    //   let timeRent = _timeEnd.getDate() - vehicle.timeBegin.getDate()
    //   let _totalPrice = timeRent * vehicle.pricePerDay
    //   let newRental = {
    //     $class: 'org.vehiclerental.RentalAgreement',
    //     rentalId: shortid.generate(),
    //     lender: vehicle.lender,
    //     renter: vehicle.renter,
    //     vehicle: vehicle,
    //     timeBegin: vehicle.timeBegin,
    //     timeEnd: Date.now(),
    //     totalPrice: _totalPrice,
    //     currency: 'USD',
    //     paid: 'false'
    //   }
    //   await axios.post('http://localhost:3000/api/RentalAgreement', newRental)
    //   toastr.success('Success')
    // }
  }
}
</script>
