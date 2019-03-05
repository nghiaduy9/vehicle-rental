<template>
  <div class="card mb-5">
    <div class="card-header">
      <h5 class="mb-0">RENTING VEHICLES</h5>
    </div>
    <div class="card-body">
      <template v-for="vehicle of rentingVehicles">
        <div class="card vehicle-card" :key="vehicle.vehicleId">
          <div class="card-body">
            <ul class="list-unstyled">
              <li>License plate: {{ vehicle.licensePlate }}</li>
              <li>Model: {{ vehicle.model }}</li>
              <li>Color: {{ vehicle.color }}</li>
              <li>State: {{ vehicle.state }}</li>
              <li>Year of manufacture: {{ vehicle.yearOfManufacture }}</li>
              <li>Skeleton number: {{ vehicle.skeletonNumber }}</li>
              <li>Engine number: {{ vehicle.engineNumber }}</li>
              <li>Renting price: {{ vehicle.pricePerDay }} USD/day</li>
              <hr>
              <li>Lender ID card number: {{ vehicle.lender.OwnerIdentityCardNumber }}</li>
              <li>Lender name: {{ vehicle.lender.name }}</li>
              <li>Lender phone: {{ vehicle.lender.phone }}</li>
              <li>Lender address: {{ vehicle.lender.address }}</li>
              <li>Begin date: {{ vehicle.timeBegin }}</li>
            </ul>
            <button
              type="button"
              class="btn btn-primary"
              @click="pay(vehicle.vehicleId)"
            >Return the vehicle</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VueCookies from 'vue-cookies'
import toastr from 'toastr'
toastr.options.toastClass = 'toastr'

function IDGenerator() {
  this.length = 8
  this.timestamp = +new Date()
  var _getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  this.generate = function() {
    var ts = this.timestamp.toString()
    var parts = ts.split('').reverse()
    var id = ''
    for (var i = 0; i < this.length; ++i) {
      var index = _getRandomInt(0, parts.length - 1)
      id += parts[index]
    }
    return id
  }
}

export default {
  name: 'lender-renting-vehicle',
  data: function() {
    return {
      id: '',
      rentingVehicles: []
    }
  },
  methods: {
    pay: async function(vehicleId) {
      let vehicleResponse = await axios.get(
        'http://localhost:3000/api/Vehicle/' + vehicleId
      )
      let vehicle = vehicleResponse.data
      let _timeEnd = new Date()
      let _timeBegin = new Date(vehicle.timeBegin)
      let timeRent = _timeEnd.getDate() - _timeBegin.getDate() + 1
      let _totalPrice = timeRent * vehicle.pricePerDay
      let _vehicle = {
        $class: 'org.vehiclerental.VehicleConcept',
        vehicleId: vehicle.vehicleId,
        licensePlate: vehicle.licensePlate,
        identityCardNumber: vehicle.identityCardNumber,
        model: vehicle.model,
        color: vehicle.color,
        state: vehicle.state,
        yearOfManufacture: vehicle.yearOfManufacture,
        skeletonNumber: vehicle.skeletonNumber,
        engineNumber: vehicle.engineNumber, 
        pricePerDay: vehicle.pricePerDay
      }
      const generator = new IDGenerator()
      let _rentalId = generator.generate()
      let vehicle_ = {
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
        vehicleStatus: 'onPayment',
        renter: vehicle.renter,
        pricePerDay: vehicle.pricePerDay,
        timeBegin: vehicle.timeBegin
      }
      let newRental = {
        $class: 'org.vehiclerental.RentalAgreement',
        rentalId: _rentalId,
        lender: vehicle.lender,
        renter: vehicle.renter,
        vehicle: _vehicle,
        timeBegin: vehicle.timeBegin,
        timeEnd: _timeEnd,
        totalPrice: _totalPrice,
        currency: 'USD',
        paid: 'false'
      }
      await axios.put('http://localhost:3000/api/Vehicle/' + vehicleId, vehicle_)
      toastr.options.positionClass = 'toast-top-center'
      toastr.info(_totalPrice + '$', 'Total price')
      let test = await axios.post('http://localhost:3000/api/RentalAgreement', newRental)
    },
    fetchRRV: async function(id) {
      let url =
        'http://localhost:3000/api/queries/getRenterRentingVehicles?renterId=' + id
      let res = await axios.get(url)
      this.rentingVehicles = res.data
    }
  },
  mounted: async function() {
    try {
      this.id = VueCookies.get('id')
      await this.fetchRRV(this.id)
      setInterval(() => this.fetchRRV(this.id), 3000)
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
