<template>
  <div class="card mb-5">
    <div class="card-header">
      <h5 class="mb-0">HISTORY</h5>
    </div>
    <div class="card-body">
      <template v-for="agreement of renterRentalAgreements">
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
            <li>Owner identity card number: {{ agreement.lender.OwnerIdentityCardNumber }}</li>
            <li>Owner name: {{ agreement.lender.name }}</li>
            <li>Owner phone: {{ agreement.lender.phone }}</li>
            <li>Owner address: {{ agreement.lender.address }}</li>
            <li>Begin: {{ agreement.timeBegin }}</li>
            <li>End: {{ agreement.timeEnd }}</li>
            <li>Total price: {{ agreement.totalPrice }}</li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies'
import Axios from 'axios'

export default {
  name: 'renter-history',
  data: function() {
    return {
      id: '',
      renterRentalAgreements: []
    }
  },
  methods: {
    fetchRRA: async function(id) {
      let url = 'http://localhost:3000/api/queries/getRenterHistory?renterId=' + id
      let res = await Axios.get(url)
      this.renterRentalAgreements = res.data
    }
  },
  mounted: async function() {
    try {
      this.id = VueCookies.get('id')
      setTimeout(await this.fetchRRA(this.id), 3000)
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
