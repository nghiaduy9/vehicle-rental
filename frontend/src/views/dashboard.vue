<template>
  <div id="dashboard" class="container">
    <div class="card" v-if="user === 'renter'">
      <div class="card-header">Renting</div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Owner</th>
              <th scope="col">License plate</th>
              <th scope="col">Model</th>
              <th scope="col">Color</th>
              <th scope="col">Time begin</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="rentingVehicle of rentingVehicles">
              <tr :key="rentingVehicle.id">
                <td scope="row">{{ rentingVehicle.id }}</td>
                <td>{{ rentingVehicle.description.vehicleOwner.ownerName }}</td>
                <td>{{ rentingVehicle.description.licensePlate }}</td>
                <td>{{ rentingVehicle.description.model }}</td>
                <td>{{ rentingVehicle.description.color }}</td>
                <td>{{ rentingVehicle.timeBegin }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <hr>
    <div class="card" v-if="user === 'renter'">
      <div class="card-header">Available</div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">License plate</th>
              <th scope="col">Model</th>
              <th scope="col">Color</th>
              <th scope="col">State</th>
              <th scope="col">Year of manufacture</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="availableVehicle of availableVehicles">
              <tr :key="availableVehicle.id">
                <td scope="row">{{ availableVehicle.id }}</td>
                <td>{{ availableVehicle.description.licensePlate }}</td>
                <td>{{ availableVehicle.description.model }}</td>
                <td>{{ availableVehicle.description.color }}</td>
                <td>{{ availableVehicle.description.state }}</td>
                <td>{{ availableVehicle.description.yearOfManufacture }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <div class="card" v-if="user === 'lender'">
      <div class="card-header">My vehicles</div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">License plate</th>
              <th scope="col">Model</th>
              <th scope="col">Color</th>
              <th scope="col">State</th>
              <th scope="col">Year of manufacture</th>
              <th scope="col">Available</th>
              <th scope="col">Renter</th>
              <th scope="col">Time begin</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="myVehicle of myVehicles">
              <tr :key="myVehicle.id">
                <td scope="row">{{ myVehicle.id }}</td>
                <td>{{ myVehicle.description.licensePlate }}</td>
                <td>{{ myVehicle.description.model }}</td>
                <td>{{ myVehicle.description.color }}</td>
                <td>{{ myVehicle.description.state }}</td>
                <td>{{ myVehicle.description.yearOfManufacture }}</td>
                <td>{{ myVehicle.available }}</td>
                <td>{{ myVehicle.renterId }}</td>
                <td>{{ myVehicle.timeBegin }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from 'axios'
import VueCookies from 'vue-cookies'
import { functionExpression } from 'babel-types'

function getAllVehicles() {
  Axios.get('http://localhost:3000/api/Vehicle').then((vehicles) => {
    return vehicles
  })
}

function getAvailableVehicles() {
  Axios.get('http://localhost:3000/api/Vehicle?filter=(%7B%22available%22%3A%20true%7D)').then((availableVehicles) => {
    return availableVehicles
  })
}

function getRentingVehicles(id) {
  let url = Axios.get(url).then((rentingVehicles) => {
    return rentingVehicles
  })
}

function getMyVehicles(id) {
  let url = Axios.get(url).then((myVehicles) => {
    return myVehicles
  })
}

export default {
  name: 'dashboard',
  data: function() {
    return {
      rentingVehicles: [],
      availableVehicles: [],
      myVehicles: [],
      user: '',
      id: ''
    }
  },
  mounted: async function() {
    try {
      this.user = await VueCookies.get('account-type')
      this.id = await VueCookies.get('id')
      if (this.user === 'lender') {
        myVehicles = await getMyVehicles(this.id)
      } else {
        availableVehicles = await getAvailableVehicles()
        rentingVehicles = await getRentingVehicles(this.id)
      }
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
