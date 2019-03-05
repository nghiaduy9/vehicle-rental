<template>
  <div class="card mb-5">
    <div class="card-header">
      <h5 class="mb-0">HISTORY</h5>
    </div>
    <div class="card-body">
      <template v-for="agreement of lenderAgreements">
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
            <li>Renter identity card number: {{ agreement.renter.RenterIdentityCardNumber }}</li>
            <li>Renter name: {{ agreement.renter.name }}</li>
            <li>Renter phone: {{ agreement.renter.phone }}</li>
            <li>Renter address: {{ agreement.renter.address }}</li>
            <li>Begin: {{ agreement.timeBegin }}</li>
            <li>End: {{ agreement.timeEnd }}</li>
            <li>Total price: {{ agreement.totalPrice }}</li>
          </ul>
          <hr>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies'
import Axios from 'axios'

export default {
  name: 'lender-history',
  data: function() {
    return {
      id: '',
      lenderAgreements: []
    }
  },
  methods: {
    fetchLA: async function(id) {
      let url = 'http://localhost:3000/api/queries/getOwnerHistory?ownerId=' + id
      let res = await Axios.get(url)
      this.lenderAgreements = res.data
    }
  },
  mounted: async function() {
    try {
      this.id = VueCookies.get('id')
      this.fetchLA(this.id)
      setInterval(() => this.fetchLA(this.id), 3000)
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
