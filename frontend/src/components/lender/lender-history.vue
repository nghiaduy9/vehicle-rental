<template>
  <div class="card">
    <div class="card-header">
      <h1>HISTORY</h1>
    </div>
    <div class="card-body">
      <template v-for="rentalAgreement of rentalAgreements">
        <div :key="rentalAgreement.rentalId">
          <h4 class="card-title">ID: {{ rentalAgreement.rentalId }}</h4>
          <ul>
            <li>Vehicle ID: {{ rentalAgreement.vehicle.vehicleId }}</li>
            <li>License plate: {{ rentalAgreement.vehicle.licensePlate }}</li>
            <li>Identity card number:  {{ rentalAgreement.vehicle.identityCardNumber }}</li>
            <li>Model: {{ rentalAgreement.vehicle.model }}</li>
            <li>Color: {{ rentalAgreement.vehicle.color }}</li>
            <li>State: {{ rentalAgreement.vehicle.state }}</li>
            <li>Year of manufacture: {{ rentalAgreement.vehicle.yearOfManufacture }}</li>
            <li>Skeleton number: {{ rentalAgreement.vehicle.skeletonNumber }}</li>
            <li>Engine number: {{ rentalAgreement.vehicle.engineNumber }}</li>
            <li>Price per day: {{ rentalAgreement.vehicle.pricePerDay }}</li>
            <li>Renter identity card number: {{ rentalAgreement.vehicle.renter.RenterIdentityCardNumber }}</li>
            <li>Renter name: {{ rentalAgreement.vehicle.renter.name }}</li>
            <li>Renter phone: {{ rentalAgreement.vehicle.renter.phone }}</li>
            <li>Renter address: {{ rentalAgreement.vehicle.renter.address }}</li>
            <li>Begin: {{ rentalAgreement.timeBegin }}</li>
            <li>End: {{ rentalAgreement.timeEnd }}</li>
            <li>Total price: {{ rentalAgreement.totalPrice }}</li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lender-history',
  props: {
    rentalAgreements: []
  }
}
</script>
