'use strict'

/**
 * Rental transaction
 * @param {org.vehiclerental.Rental} rental
 * @transaction
 */
async function onRental(rental) {
  rental.rentalAgreement.vehicle.vehicleStatus = 'pending'
  rental.rentalAgreement.vehicle.renterId = rental.rentalAgreement.renter.RenterIdentityCardNumber
  const _vehicle = await getAssetRegistry('org.vehiclerental.Vehicle')
  await _vehicle.update(rental.rentalAgreement.vehicle)
}

/**
 * Accept Rental transaction
 * @param {org.vehiclerental.AcceptRental} acceptRental
 * @transaction
 */
async function onAcceptRental(acceptRental) {
  acceptRental.rentalAgreement.vehicle.timeBegin = acceptRental.timeBegin
  acceptRental.rentalAgreement.vehicle.vehicleStatus = 'inUse'
  const _vehicle = await getAssetRegistry('org.vehiclerental.Vehicle')
  await _vehicle.update(acceptRental.rentalAgreement.vehicle)
}

/**
 * Payment transaction
 * @param {org.vehiclerental.Payment} payment
 * @transaction
 */
async function onPayment(payment) {
  payment.rentalAgreement.vehicle.vehicleStatus = 'onPayment'
  const _vehicle = await getAssetRegistry('org.vehiclerental.Vehicle')
  await _vehicle.update(payment.rentalAgreement.vehicle)
}

/**
 * Confirm Payment transaction
 * @param {org.vehiclerental.ConfirmPayment} confirmPayment
 * @transaction
 */
async function onConfirmPayment(confirmPayment) {
  confirmPayment.rentalAgreement.vehicle.vehicleStatus = 'available'
  confirmPayment.rentalAgreement.vehicle.timeBegin = new Date(0)
  confirmPayment.rentalAgreement.vehicle.renterId = 'undefined'
  confirmPayment.rentalAgreement.paid = true
  const _vehicle = await getAssetRegistry('org.vehiclerental.Vehicle')
  await _vehicle.update(confirmPayment.rentalAgreement.vehicle)
  const _rental = await getAssetRegistry('org.vehiclerental.RentalAgreement')
  await _rental.update(confirmPayment.rentalAgreement)
}
