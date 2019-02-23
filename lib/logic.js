'use strict'

/**
 * Sample transaction
 * @param {org.vehiclerental.Rental} rental 
 * @transaction
 */
async function onRental(rental) {
  if (rental.rentalAgreement.vehicle.available == false)
  throw new Error('This vehicl is not available');

  rental.rentalAgreement.vehicle.available == false;
  const temp = await getAssetRegistry('org.vehiclerental.Vehicle');
  await temp.update(rental.rentalAgreement.vehicle);
}

/**
 * Sample transaction
 * @param {org.vehiclerental.Payment} payment 
 * @transaction
 */
async function onPayment(payment) {
  payment.rentalAgreement.vehicle.available == true;
  const temp = await getAssetRegistry('org.vehiclerental.Vehicle');
  await temp.update(payment.rentalAgreement.vehicle);
}
