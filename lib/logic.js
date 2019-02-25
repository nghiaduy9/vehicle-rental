'use strict'

/**
 * Rental transaction
 * @param {org.vehiclerental.Rental} rental
 * @transaction
 */
async function onRental(rental) {
  if (!rental.rentalAgreement.vehicle.available) {
    throw new Error('This vehicle is not available')
  }

  rental.rentalAgreement.vehicle.available = false
  rental.rentalAgreement.vehicle.renterId = rental.rentalAgreement.renter.RenterIdentityCardNumber
  rental.rentalAgreement.vehicle.timeBegin = rental.timeBegin
  const _vehicle = await getAssetRegistry('org.vehiclerental.Vehicle')
  await _vehicle.update(rental.rentalAgreement.vehicle)
}

/**
 * Payment transaction
 * @param {org.vehiclerental.Payment} payment
 * @transaction
 */
async function onPayment(payment) {
  if (payment.rentalAgreement.vehicle.available) {
    throw new Error('This vehicl is not on renting')
  }
  payment.rentalAgreement.vehicle.available = true
  payment.rentalAgreement.vehicle.renterId = 'undefined'
  payment.rentalAgreement.vehicle.timeBegin = '1970-01-01T00:00:00.000Z'
  const _vehicle = await getAssetRegistry('org.vehiclerental.Vehicle')
  await _vehicle.update(payment.rentalAgreement.vehicle)
}
