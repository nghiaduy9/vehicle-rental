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
              <li>Lender ID number: {{ agreement.lender.OwnerIdentityCardNumber }}</li>
              <li>Lender name: {{ agreement.lender.name }}</li>
              <li>Lender phone: {{ agreement.lender.phone }}</li>
              <li>Lender address: {{ agreement.lender.address }}</li>
              <hr>
              <li>Begin date: {{ (new Date(agreement.timeBegin)).toDateString() }}</li>
              <li>End date: {{ (new Date(agreement.timeEnd)).toDateString() }}</li>
              <li>Total price: {{ agreement.totalPrice }} USD</li>
            </ul>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import vuecookies from 'vue-cookies'
import Axios from 'axios'

export default {
  name: 'renter-paying-vehicle',
  data: function() {
    return {
      id: '',
      payingAgreements: []
    }
  },
  methods: {
    fetchRPA: async function(id) {
      let url = 'http://178.128.24.80:3000/api/queries/getRenterPayingRental?renterId=' + id
      let res = await Axios.get(url)
      this.payingAgreements = res.data
    }
  },
  mounted: async function() {
    try {
      this.id = vuecookies.get('id')
      await this.fetchRPA(this.id)
      setInterval(() => this.fetchRPA(this.id), 3000)
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
