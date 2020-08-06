// get avg gas price via api and set as a constant to use in the calculation
const GAS_PRICE = 2

export const calculateEstCost = (distance, gasMileage) => {
    // distance is received in metres--convert to miles
    let distanceInMiles = distance / 1609.34

    let cost = ( distanceInMiles / gasMileage ) * GAS_PRICE
    return cost.toFixed(2)
}
