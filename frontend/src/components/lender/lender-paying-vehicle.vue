<template>
  <div class="card mb-5">
    <div class="card-header">
      <h5 class="mb-0">PAYING VEHICLES</h5>
    </div>
    <div class="card-body">
      <template v-for="agreement of payingAgreements">
        <div class="card vehicle-card" :key="agreement.rentalId">
          <div class="card-body">
            <ul class="list-unstyled">
              <li>License plate: {{ agreement.vehicle.licensePlate }}</li>
              <li>Model: {{ agreement.vehicle.model }}</li>
              <li>Color: {{ agreement.vehicle.color }}</li>
              <li>State: {{ agreement.vehicle.state }}</li>
              <li>Year of manufacture: {{ agreement.vehicle.yearOfManufacture }}</li>
              <li>Skeleton number: {{ agreement.vehicle.skeletonNumber }}</li>
              <li>Engine number: {{ agreement.vehicle.engineNumber }}</li>
              <li>Renting price: {{ agreement.vehicle.pricePerDay }} USD/day</li>
              <hr>
              <li>Renter ID card number: {{ agreement.renter.RenterIdentityCardNumber }}</li>
              <li>Renter name: {{ agreement.renter.name }}</li>
              <li>Renter phone: {{ agreement.renter.phone }}</li>
              <li>Renter address: {{ agreement.renter.address }}</li>
              <hr>
              <li>Begin date: {{ (new Date(agreement.timeBegin)).toDateString() }}</li>
              <li>End date: {{ (new Date(agreement.timeEnd)).toDateString() }}</li>
              <li>Total price: {{ agreement.totalPrice }} USD</li>
            </ul>
            <button
              type="button"
              class="btn btn-success"
              @click="accept(agreement.rentalId)"
            >Confirm</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import vuecookies from 'vue-cookies'
import axios from 'axios'
import toastr from 'toastr'
toastr.options.toastClass = 'toastr'

export default {
  name: 'lender-paying-vehicle',
  data: function() {
    return {
      id: '',
      payingAgreements: []
    }
  },
  methods: {
    accept: async function(id) {
      const url = 'http://localhost:3000/api/RentalAgreement/' + id
      const response = await axios.get(url)
      const rental = response.data
      let _rental = {
        $class: 'org.vehiclerental.RentalAgreement',
        lender: rental.lender,
        renter: rental.renter,
        vehicle: rental.vehicle,
        timeBegin: rental.timeBegin,
        timeEnd: rental.timeEnd,
        totalPrice: rental.totalPrice,
        currency: rental.currency,
        paid: 'true'
      }
      await axios.put(url, _rental)
      let res = await axios.get(
        'http://localhost:3000/api/Vehicle/' + rental.vehicle.vehicleId
      )
      let vehicle = res.data
      let _vehicle = {
        $class: 'org.vehiclerental.Vehicle',
        licensePlate: vehicle.licensePlate,
        lender: vehicle.lender,
        identityCardNumber: vehicle.identityCardNumber,
        model: vehicle.model,
        color: vehicle.color,
        state: vehicle.state,
        yearOfManufacture: vehicle.yearOfManufacture,
        skeletonNumber: vehicle.skeletonNumber,
        engineNumber: vehicle.engineNumber,
        vehicleStatus: 'available',
        renter: vehicle.renter,
        pricePerDay: vehicle.pricePerDay,
        timeBegin: vehicle.timeBegin
      }
      await axios.put('http://localhost:3000/api/Vehicle/' + vehicle.vehicleId, _vehicle)
      toastr.success('Success')
    },
    fetchLPA: async function(id) {
      let url = 'http://localhost:3000/api/queries/getOwnerPayingRental?ownerId=' + id
      let res = await axios.get(url)
      this.payingAgreements = res.data
    }
  },
  mounted: async function() {
    try {
      this.id = vuecookies.get('id')
      await this.fetchLPA(this.id)
      setInterval(() => this.fetchLPA(this.id), 3000)
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
