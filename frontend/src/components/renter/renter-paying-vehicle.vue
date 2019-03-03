<template>
  <div class="card my-3">
    <div class="card-header">
      <h5 class="mb-0">PAYING VEHICLES</h5>
    </div>
    <div class="card-body">
      <template v-for="agreement of rentalAgreements">
        <div :key="agreement.rentalId">
          <h4 class="card-title">ID: {{ agreement.rentalId }}</h4>
          <ul>
            <li>Vehicle ID: {{ agreement.vehicle.vehicleId }}</li>
            <li>License plate: {{ agreement.vehicle.licensePlate }}</li>
            <li>Identity card number: {{ agreement.vehicle.identityCardNumber }}</li>
            <li>Model: {{ agreement.vehicle.model }}</li>
            <li>Color: {{ agreement.vehicle.color }}</li>
            <li>State: {{ agreement.vehicle.state }}</li>
            <li>Year of manufacture: {{ agreement.vehicle.yearOfManufacture }}</li>
            <li>Skeleton number: {{ agreement.vehicle.skeletonNumber }}</li>
            <li>Engine number: {{ agreement.vehicle.engineNumber }}</li>
            <li>Price per day: {{ agreement.vehicle.pricePerDay }}</li>
            <li>Owner identity card number: {{ agreement.vehicle.lender.OwnerIdentityCardNumber }}</li>
            <li>Owner name: {{ agreement.vehicle.lender.name }}</li>
            <li>Owner phone: {{ agreement.vehicle.lender.phone }}</li>
            <li>Owner address: {{ agreement.vehicle.lender.address }}</li>
            <li>Begin: {{ agreement.timeBegin }}</li>
            <li>End: {{ agreement.timeEnd }}</li>
            <li>Total price: {{ agreement.totalPrice }}</li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'render-paying-vehicle',
  props: {
    rentalAgreements: []
  }
}
</script>
