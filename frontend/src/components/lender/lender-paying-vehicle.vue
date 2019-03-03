<template>
  <div class="card my-3">
    <div class="card-header">
      <h5 class="mb-0">PAYING VEHICLES</h5>
    </div>
    <div class="card-body">
      <template v-for="agreement of rentalAgreements">
        <div :key="agreement.rentalId">
          <h4 class="card-title">ID: {{ agreement.rentalId }}</h4>
          <ul>
            <li>Vehicle ID: {{ agreement.vehicle.vehicleId }}</li>
            <li>License plate: {{ agreement.vehicle.licensePlate }}</li>
            <li>Identity card number: {{ agreement.vehicle.identityCardNumber }}</li>
            <li>Model: {{ agreement.vehicle.model }}</li>
            <li>Color: {{ agreement.vehicle.color }}</li>
            <li>State: {{ agreement.vehicle.state }}</li>
            <li>Year of manufacture: {{ agreement.vehicle.yearOfManufacture }}</li>
            <li>Skeleton number: {{ agreement.vehicle.skeletonNumber }}</li>
            <li>Engine number: {{ agreement.vehicle.engineNumber }}</li>
            <li>Price per day: {{ agreement.vehicle.pricePerDay }}</li>
            <li>Renter identity card number: {{ agreement.vehicle.renter.RenterIdentityCardNumber }}</li>
            <li>Renter name: {{ agreement.vehicle.renter.name }}</li>
            <li>Renter phone: {{ agreement.vehicle.renter.phone }}</li>
            <li>Renter address: {{ agreement.vehicle.renter.address }}</li>
            <li>Begin: {{ agreement.timeBegin }}</li>
            <li>End: {{ agreement.timeEnd }}</li>
            <li>Total price: {{ agreement.totalPrice }}</li>
          </ul>
          <button type="button" class="btn btn-success" @click="accpet(agreement.rentalId)">Accept</button>
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
      const url = 'http://localhost:3000/api/RentalAgreement/' + id
      const response = await axios.get(url)
      const rental = response.data
      rental.paid = true
      rental.vehicle.vehicleStatus = 'available'
      rental.vehicle.renter = 'undefined'
      rental.vehicle.timeBegin = '1970-01-01T00:00:00.000Z'
      await axios.put(
        'http://localhost:3000/api/Vehicle/' + rental.vehicle.vehicleId,
        rental.vehicle
      )
      await axios.put(url, rental)
      toastr.success('Success')
    }
  }
}
</script>
