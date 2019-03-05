<template>
  <div class="card mb-5">
    <div class="card-header">
      <h5 class="mb-0">HISTORY</h5>
    </div>
    <div class="card-body">
      <template v-for="agreement of agreements">
        <div class="card vehicle-card" :key="agreement.rentalId">
          <div class="card-body">
            <ul class="list-unstyled mb-0">
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
  name: 'lender-history',
  data: function() {
    return {
      id: '',
      agreements: []
    }
  },
  methods: {
    fetchLA: async function(id) {
      let url = 'http://localhost:3000/api/queries/getOwnerHistory?ownerId=' + id
      let res = await Axios.get(url)
      this.agreements = res.data
    }
  },
  mounted: async function() {
    try {
      this.id = vuecookies.get('id')
      this.fetchLA(this.id)
      setInterval(() => this.fetchLA(this.id), 3000)
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
