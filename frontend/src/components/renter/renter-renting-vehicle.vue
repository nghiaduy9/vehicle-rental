<template>
  <div class="card my-3">
    <div class="card-header">
      <h5 class="mb-0">RENTING VEHICLES</h5>
    </div>
    <div class="card-body">
      <template v-for="vehicle of renterRentingVehicles">
        <div :key="vehicle.vehicleId">
          <h4 class="card-title">ID: {{ vehicle.vehicleId }}</h4>
          <ul>
            <li>Vehicle ID: {{ vehicle.vehicleId }}</li>
            <li>License plate: {{ vehicle.licensePlate }}</li>
            <li>Identity card number: {{ vehicle.identityCardNumber }}</li>
            <li>Model: {{ vehicle.model }}</li>
            <li>Color: {{ vehicle.color }}</li>
            <li>State: {{ vehicle.state }}</li>
            <li>Year of manufacture: {{ vehicle.yearOfManufacture }}</li>
            <li>Skeleton number: {{ vehicle.skeletonNumber }}</li>
            <li>Engine number: {{ vehicle.engineNumber }}</li>
            <li>Price per day: {{ vehicle.pricePerDay }}</li>
            <li>Owner identity card number: {{ vehicle.lender.RenterIdentityCardNumber }}</li>
            <li>Owner name: {{ vehicle.lender.name }}</li>
            <li>Owner phone: {{ vehicle.lender.phone }}</li>
            <li>Owner address: {{ vehicle.lender.address }}</li>
            <li>Begin: {{ new Date(vehicle.timeBegin) }}</li>
          </ul>
          <button type="button" class="btn btn-primary" @click="pay(vehicle.vehicleId)">Pay</button>
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
	this.timestamp = +new Date	 
	var _getRandomInt = function( min, max ) {
		return Math.floor( Math.random() * ( max - min + 1 ) ) + min
	}	 
	this.generate = function() {
		var ts = this.timestamp.toString()
		var parts = ts.split( "" ).reverse()
		var id = ""	 
		for( var i = 0; i < this.length; ++i ) {
			var index = _getRandomInt( 0, parts.length - 1 )
		  id += parts[index]
		}	 
	  return id
  }
}

export default {
  name: 'lender-renting-vehicle',
  data: function(){
    return {
      id: '',
      renterRentingVehicles: []
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
      let _totalPrice = timeRent*vehicle.pricePerDay
      let _vehicle = {
        $class: "org.vehiclerental.VehicleConcept",
        vehicleId: vehicle.vehicleId,
        licensePlate: vehicle.licensePlate,
        identityCardNumber: vehicle.identityCardNumber,
        model: vehicle.model,
        color: vehicle.color,
        state: vehicle.state,
        yearOfManufacture: vehicle.yearOfManufacture,
        skeletonNumber: vehicle.skeletonNumber,
        engineNumber: vehicle.engineNumber,
      }
      const generator = new IDGenerator()
      let _rentalId = generator.generate()
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
      let vehicle_ = {
        $class: "org.vehiclerental.Vehicle",
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
        timeBegin: vehicle.timeBegin,
      }
      console.log(vehicle_)
      
      await axios.put(
        'http://localhost:3000/api/Vehicle/' + vehicleId,
        vehicle_
      )
      toastr.options.positionClass = 'toast-top-center'
      toastr.info(_totalPrice + '$', 'Total price')
      let test = await axios.post('http://localhost:3000/api/RentalAgreement', newRental)
    },
    fetchRRV: async function(id) {
      let url = 'http://localhost:3000/api/queries/getRenterRentingVehicles?renterId=' + id
      let res = await axios.get(url)
      this.renterRentingVehicles = res.data
    }
  },
  mounted: async function() {
    try {
      this.id = VueCookies.get('id')
      setTimeout(await this.fetchRRV(this.id), 3000)
    } catch (err) {
      console.error(err)
    }
  }
}
</script>

