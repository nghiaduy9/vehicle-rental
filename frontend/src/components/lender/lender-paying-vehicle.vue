<template>
  <div class="card">
    <div class="card-header">
      <h1>PAYING VEHICLES</h1>
    </div>
    <div class="card-body">
      <template v-for="rentalAgreement of rentalAgreements">
        <div :key="rentalAgreement.rentalId">
          <h4 class="card-title">ID: {{ rentalAgreement.rentalId }}</h4>
          <ul>
            <li>Vehicle ID: {{ rentalAgreement.vehicle.vehicleId }}</li>
            <li>License plate: {{ rentalAgreement.vehicle.licensePlate }}</li>
            <li>Identity card number:  {{ rentalAgreement.vehicle.identityCardNumber }}</li>
            <li>Model: {{ rentalAgreement.vehicle.model }}</li>
            <li>Color: {{ rentalAgreement.vehicle.color }}</li>
            <li>State: {{ rentalAgreement.vehicle.state }}</li>
            <li>Year of manufacture: {{ rentalAgreement.vehicle.yearOfManufacture }}</li>
            <li>Skeleton number: {{ rentalAgreement.vehicle.skeletonNumber }}</li>
            <li>Engine number: {{ rentalAgreement.vehicle.engineNumber }}</li>
            <li>Price per day: {{ rentalAgreement.vehicle.pricePerDay }}</li>
            <li>Renter identity card number: {{ rentalAgreement.vehicle.renter.RenterIdentityCardNumber }}</li>
            <li>Renter name: {{ rentalAgreement.vehicle.renter.name }}</li>
            <li>Renter phone: {{ rentalAgreement.vehicle.renter.phone }}</li>
            <li>Renter address: {{ rentalAgreement.vehicle.renter.address }}</li>
            <li>Begin: {{ rentalAgreement.timeBegin }}</li>
            <li>End: {{ rentalAgreement.timeEnd }}</li>
            <li>Total price: {{ rentalAgreement.totalPrice }}</li>
          </ul>
          <button type="button" class="btn btn-success" @click="accpet(rentalAgreement.rentalId)">Accept</button>
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
  name: 'lender-paying-vehicle',
  props: {
    rentalAgreements: []
  },
  methods: {
    accept: async function(id) {
      let url = 'http://localhost:3000/api/RentalAgreement/' + id
      let response = await axios.get(url)
      let rental = response.data
      rental.paid = true
      rental.vehicle.vehicleStatus = 'available'
      rental.vehicle.renter = 'undefined'
      rental.vehicle.timeBegin = '1970-01-01T00:00:00.000Z'
      await axios.put('http://localhost:3000/api/Vehicle/' + rental.vehicle.vehicleId, rental.vehicle)
      await axios.put(url, rental)
      toastr.success('Success')
    }
  }
}
</script>
