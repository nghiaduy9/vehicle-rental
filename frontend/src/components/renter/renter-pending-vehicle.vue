<template>
  <div class="card">
    <div class="card-header">
      <h1>PENDING VEHICLES</h1>
    </div>
    <div class="card-body">
      <template v-for="renterPendingVehicle of renterPendingVehicles">
        <div :key="renterPendingVehicle.vehicleId">
          <h4 class="card-title">ID: {{ renterPendingVehicle.vehicleId }}</h4>
          <ul>
            <li>Vehicle ID: {{ renterPendingVehicle.vehicleId }}</li>
            <li>License plate: {{ renterPendingVehicle.licensePlate }}</li>
            <li>Identity card number:  {{ renterPendingVehicle.identityCardNumber }}</li>
            <li>Model: {{ renterPendingVehicle.model }}</li>
            <li>Color: {{ renterPendingVehicle.color }}</li>
            <li>State: {{ renterPendingVehicle.state }}</li>
            <li>Year of manufacture: {{ renterPendingVehicle.yearOfManufacture }}</li>
            <li>Skeleton number: {{ renterPendingVehicle.skeletonNumber }}</li>
            <li>Engine number: {{ renterPendingVehicle.engineNumber }}</li>
            <li>Price per day: {{ renterPendingVehicle.pricePerDay }}</li>
            <li>Owner identity card number: {{ renterPendingVehicle.lender.RenterIdentityCardNumber }}</li>
            <li>Owner name: {{ renterPendingVehicle.lender.name }}</li>
            <li>Owner phone: {{ renterPendingVehicle.lender.phone }}</li>
            <li>Owner address: {{ renterPendingVehicle.lender.address }}</li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import toastr from 'toastr'

toastr.options.toastClass = 'toastr'

export default {
  name: 'lender-pending-vehicle',
  props: {
    renterPendingVehicles: []
  }
}
</script>

