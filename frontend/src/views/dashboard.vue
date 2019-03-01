<template>
  <div id="dashboard" class="container">
    <h1>DASHBOARD</h1>
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
              <th scope="col">Pay</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="rentingVehicle of rentingVehicles">
              <tr :key="rentingVehicle.id">
                <td scope="row">{{ rentingVehicle.id }}</td>
                <td>{{ rentingVehicle.vehicleOwner.ownerName }}</td>
                <td>{{ rentingVehicle.licensePlate }}</td>
                <td>{{ rentingVehicle.model }}</td>
                <td>{{ rentingVehicle.color }}</td>
                <td>{{ rentingVehicle.timeBegin }}</td>
                <td>
                  <button class="btn btn-link" @click="payment(rentingVehicle.id)">
                    <i class="fas fa-donate"></i>
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <hr>
    <div class="card" v-if="user === 'renter'">
      <div class="card-header">Pening</div>
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
            <template v-for="pendingVehicle of pendingVehicles">
              <tr :key="pendingVehicle.id">
                <td scope="row">{{ pendingVehicle.id }}</td>
                <td>{{ pendingVehicle.vehicleOwner.ownerName }}</td>
                <td>{{ pendingVehicle.licensePlate }}</td>
                <td>{{ pendingVehicle.model }}</td>
                <td>{{ pendingVehicle.color }}</td>
                <td>{{ pendingVehicle.timeBegin }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <hr>
    <div class="card" v-if="user === 'renter'">
      <div class="card-header">Waiting accept payment</div>
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
                <td>{{ rentingVehicle.vehicleOwner.ownerName }}</td>
                <td>{{ rentingVehicle.licensePlate }}</td>
                <td>{{ rentingVehicle.model }}</td>
                <td>{{ rentingVehicle.color }}</td>
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
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <template v-for="availableVehicle of availableVehicles">
              <tr :key="availableVehicle.id">
                <td scope="row">{{ availableVehicle.id }}</td>
                <td>{{ availableVehicle.licensePlate }}</td>
                <td>{{ availableVehicle.model }}</td>
                <td>{{ availableVehicle.color }}</td>
                <td>{{ availableVehicle.state }}</td>
                <td>{{ availableVehicle.yearOfManufacture }}</td>
                <td>
                  <button class="btn btn-link">
                    <i class="fas fa-truck-moving" @click="rent(availableVehicle.id)"></i>
                  </button>
                </td>
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
              <th scope="col">Renter</th>
              <th scope="col">Time begin</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <template v-for="myVehicle of myVehicles">
              <tr :key="myVehicle.id">
                <td scope="row">{{ myVehicle.vehicleId }}</td>
                <td>{{ myVehicle.licensePlate }}</td>
                <td>{{ myVehicle.model }}</td>
                <td>{{ myVehicle.color }}</td>
                <td>{{ myVehicle.state }}</td>
                <td>{{ myVehicle.yearOfManufacture }}</td>
                <td>{{ myVehicle.renterId }}</td>
                <td>{{ myVehicle.timeBegin }}</td>
                <td>
                  <button class="btn btn-link">
                    <i class="far fa-times-circle" @click="removeVehicle(myVehicle.vehicleId)"></i>
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <div class="card-footer">
          <button type="button" class="btn btn-primary" @click="addNewVehicle">Add new vehicle</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
import VueCookies from 'vue-cookies'
import router from '../router.js'
import toastr from 'toastr'

toastr.options.toastClass = 'toastr'

async function getAvailableVehicles() {
  let url = ''
  let response = await Axios.get(url)
  return response.data
}

async function getRenterVehicles(id) {
  let url = '' + id
  let response = await Axios.get(url)
  return response.data
}

async function getOwnerVehicles(id) {
  let url = '' + id
  let response = await Axios.get(url)
  return response.data
}

export default {
  name: 'dashboard',
  data: function() {
    return {
      renterRentingVehicles: [],
      availableVehicles: [],
      renterPendingVehicles: [],
      renterPayingVehicles: [],
      ownerAvailableVehicles: [],
      ownerRentingVehicles: [],
      ownerPendingVehicles: [],
      ownerPayingVehicles: [],
      user: '',
      id: ''
    }
  },
  methods: {
    fetchData: async function() {
      if (this.user === 'lender') {
        let _ownerAvailableVehicles = []
        let _ownerRentingVehicles = []
        let _ownerPendingVehicles = []
        let _ownerPayingVehicles = []
        let ownerVehicles = await getOwnerVehicles(this.id)
        ownerVehicles.forEach(element => {
          switch (element.vehicleStatus) {
            case 'inUse':
              _ownerRentingVehicles.push(element)
              break
            case 'available':
              _ownerAvailableVehicles.push(element)
              break
            case 'pending':
              _ownerPendingVehicles.push(element)
              break
            case 'onPayment':
              _ownerPayingVehicles.push(element)
              break
          }
        })
        this.ownerPendingVehicles = _ownerPendingVehicles
        this.ownerPayingVehicles = _ownerPayingVehicles
        this.ownerAvailableVehicles = _ownerAvailableVehicles
        this.ownerRentingVehicles = _ownerRentingVehicles
      } else {
        this.availableVehicles = await getAvailableVehicles()
        let _renterRentingVehicles = []
        let _renterPendingVehicles = []
        let _renterPayingVehicles = []
        let renterVehicles = await getRenterVehicles(this.id)
        renterVehicles.forEach(element => {
          switch (element.vehicleStatus) {
            case 'inUse':
              _renterRentingVehicles.push(element)
              break
            case 'pending':
              _renterPendingVehicles.push(element)
              break
            case 'onPayment':
              _renterPayingVehicles.push(element)
              break
          }
        })
        this.renterPendingVehicles = _renterPendingVehicles
        this.renterPayingVehicles = _renterPayingVehicles
        this.renterRentingVehicles = _renterRentingVehicles
      }
    },
    addNewVehicle: function() {
      router.push('/new-vehicle')
    },
    removeVehicle: async function(id) {
      let url = 'http://localhost:3000/api/Vehicle/' + id
      let response = await Axios.delete(url)
      toastr
    }
  },
  mounted: async function() {
    try {
      this.user = await VueCookies.get('account-type')
      this.id = await VueCookies.get('id')
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
