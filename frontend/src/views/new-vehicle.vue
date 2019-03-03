<template>
  <div class="container w-50" v-if="cookieCheck">
    <h4>Upload your vehicle and join our system</h4>
    <form @submit.prevent="newVehicle">
      <div class="form-group">
        <input
          class="form-control"
          placeholder="Vehicle Id you want"
          type="text"
          v-model="vehicleId"
        >
      </div>
      <div class="form-group">
        <input class="form-control" placeholder="License plate" type="text" v-model="licensePlate">
      </div>
      <div class="form-group">
        <input class="form-control" placeholder="Model" type="text" v-model="model">
      </div>
      <div class="form-group">
        <input class="form-control" placeholder="Color" type="text" v-model="colour">
      </div>
      <div class="form-group">
        <input class="form-control" placeholder="State" type="text" v-model="state">
      </div>
      <div class="form-group">
        <input class="form-control" placeholder="Price per day" type="number" v-model="pricePerDay">
      </div>
      <div class="form-group">
        <input
          class="form-control"
          placeholder="Year of manufacture"
          type="number"
          v-model="yearOfManufacture"
        >
      </div>
      <div class="form-group">
        <input
          class="form-control"
          placeholder="Skeleton Number"
          type="text"
          v-model="skeletonNumber"
        >
      </div>
      <div class="form-group">
        <input class="form-control" placeholder="Engine Number" type="text" v-model="engineNumber">
      </div>
      <button class="btn btn-primary" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import VueCookies from 'vue-cookies'
import router from '../router.js'
import toastr from 'toastr'

toastr.options.toastClass = 'toastr'

export default {
  name: 'NewVehicle',
  data: function() {
    return {
      cookieCheck: '',
      ownerId: '',
      vehicleId: '',
      licensePlate: '',
      model: '',
      colour: '',
      state: '',
      yearOfManufacture: '',
      skeletonNumber: '',
      engineNumber: '',
      pricePerDay: ''
    }
  },
  mounted: function() {
    let t = VueCookies.get('account-type')
    this.ownerId = VueCookies.get('id')
    this.cookieCheck = false
    if (t === 'lender') this.cookieCheck = true
  },
  methods: {
    newVehicle: async function() {
      let h = this
      let url = 'http://localhost:3000/api/VehicleOwner/' + this.ownerId
      let owner = await axios.get(url)
      axios
        .post('http://localhost:3000/api/Vehicle/', {
          $class: 'org.vehiclerental.Vehicle',
          vehicleId: this.vehicleId,
          licensePlate: this.licensePlate,
          lender: owner,
          identityCardNumber: this.ownerId,
          model: this.model,
          color: this.colour,
          state: this.state,
          yearOfManufacture: this.yearOfManufacture,
          skeletonNumber: this.skeletonNumber,
          engineNumber: this.engineNumber,
          vehicleStatus: 'available',
          renter: 'undefined',
          pricePerDay: this.pricePerDay,
          timeBegin: '1970-01-01T00:00:00.000Z'
        })
        .then(function(response) {
          if (response.status === 200) {
            toastr.success('Successful')
          } else toastr.error('Unsuccessful')
          setTimeout(function() {
            router.push('/dashboard')
          }, 3000)
        })
        .catch(function(e) {
          console.error(e)
          toastr.error('Unsuccessful')      
        })
    }
  }
}
</script>
