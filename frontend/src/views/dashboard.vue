<template>
  <div id="dashboard" class="container">
    <h1>DASHBOARD</h1>
    <div class="card" v-if="user === 'renter'">    
    </div>
    <hr>
    <div class="card" v-if="user === 'lender'">
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
  let url = 'http://localhost:3000/api/queries/getAvailableVehicles'
  let response = await Axios.get(url)
  return response.data
}

async function getRenterVehicles(id) {
  let url = 'http://localhost:3000/api/queries/getRenterVehicles?renterId=' + id
  let response = await Axios.get(url)
  return response.data
}

async function getOwnerVehicles(id) {
  let url = 'http://localhost:3000/api/queries/getOwnerVehicles?ownerId=' + id
  let response = await Axios.get(url)
  return response.data
}

async function getOwnerRental(id) {
  let url = 'http://localhost:3000/api/queries/getLenderRental?ownerId=' + id
  let response = await Axios.get(url)
  return response.data
}

async function getRenterRental(id) {
  let url = 'http://localhost:3000/api/queries/getRenterRental?renterId=' + id
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
      ownerHistory: [],
      renterHistory: [],
      ownerPayingRental: [],
      renterPayingRental: [],
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
        let renterRental = await getRenterRental(this.id)
        let _renterPayingRental = []
        let _renterHistory = []
        renterRental.forEach(element => {
          if (element.paid) _renterHistory.push(element)
          else _renterPayingRental.push(element)
        })
        this.renterHistory = _renterHistory
        this.renterPayingRental = _renterPayingRental
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
        let ownerRental = await getOwnerRental(this.id)
        let _ownerPayingRental = []
        let _ownerHistory = []
        ownerRental.forEach(element => {
          if (element.paid) _ownerHistory.push(element)
          else _ownerPayingRental.push(element)
        })
        this.ownerHistory = _ownerHistory
        this.ownerPayingRental = _ownerPayingRental
      }
    },
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
