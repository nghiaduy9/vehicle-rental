<template>
  <div class="container w-50" v-if="cookieCheck">
    <h4>Upload your vehicle and join our system</h4>
    <p class="text-center">{{noti}}</p>
    <form @submit.prevent="newVehicle" >
      <div class="form-group">
        <input class="form-control" placeholder="Vehicle Id you want" type="text" v-model="vehicleId">
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
        <input class="form-control" placeholder="Year of manufacture" type="number" v-model="yearOfManufacture">
      </div>
      <div class="form-group">
        <input class="form-control" placeholder="Skeleton Number" type="text" v-model="skeletonNumber">
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


  export default {
    name: 'Login',
    data: function() {
      return {
          noti: '',
          cookieCheck: '',
          ownerId: '',
          vehicleId: '',
          licensePlate: '',
          model: '',
          colour: '',
          state: '',
          yearOfManufacture: '',
          skeletonNumber: '',
          engineNumber: ''
      }
    },
    mounted: function(){
        let t = VueCookies.get('account-type');
        this.ownerId = VueCookies.get('id');
        this.cookieCheck = false;
        if (t ==='lender')
            this.cookieCheck = true;
    },
    methods: {
      newVehicle: function () {
          let h = this;
          axios.post('http://localhost:3000/api/Vehicle/', {
              "$class": "org.vehiclerental.Vehicle",
              "vehicleId": this.vehicleId,
              "licensePlate": this.licensePlate,
              "ownerId": this.ownerId,
              "identityCardNumber": this.ownerId,
              "model": this.model,
              "color": this.colour,
              "state": this.state,
              "yearOfManufacture": this.yearOfManufacture,
              "skeletonNumber": this.skeletonNumber,
              "engineNumber": this.engineNumber,
              "available": true,
              "renterId": "undefined",
              "timeBegin": "1970-01-01"
          }).then(function (response) {
              if (response.status === 200){
                  h.noti = 'Successful';
              }
              else h.noti = 'Unsuccessful';
              setTimeout(function() {
                  h.noti = '';
                  router.push('/dashboard');
              }, 500);
          })
              .catch(function (e) {
                  if (e){
                      h.noti = 'Unsuccessful';
                  }
                  setTimeout(function() {
                      h.noti = '';
                  })
              })
      }
    }
  }
</script>