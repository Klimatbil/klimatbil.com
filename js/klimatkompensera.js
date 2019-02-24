const stripeHandler = StripeCheckout.configure({
    key: 'pk_test_bG7vG8DfCvej8dpMZMByDgPZ',
    name: "Klimatkompensation",
    description: "Klimatbil UF",
    image: "https://preview.ibb.co/iXbS7f/klimatbil-uf-logo.png",
    locale: "sv_SE",
    label: "Betala med kort",
    currency: "sek",
    token: function(token) {
        const amount = getTotalAmount()
        if (!isValidAmount(amount)) return

        fetch(`https:/wt-a1a4d75d2e7f5a03df41a2e03b3cd9d7-0.sandbox.auth0-extend.com/stripe-payment/stripe-payment?amount=${amount * 100}&description=${getDescription()}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            // Your server will need to be changed slightly to use body params and not the query params
            // Also you will want to return if the request was successful or not instead of redirecting in the server.
            body: JSON.stringify({
                stripeToken: token.id,
                stripeEmail: token.email,
                amount: amount * 100,
                description: getDescription()
            })
        }).then(() => {
            // Need to check error status here to determine if the request was successful or not
            window.location.href = '/tack.html'
        }).catch(() => {
            console.error('ERROR: Failed to POST payment')
        })
    }
})

// Conversion Constants
const LITERS_GASOLINE_TO_CO2_TONNES = 0.00234769703
const LITERS_DIESEL_TO_CO2_TONNES = 0.0026892715
const YEARLY_TREE_CO2_CONSUMPTION_KILOGRAMS = 21.7724
const DOLLAR_TO_SEK = 9.3
const SERVICE_FEE_MULTIPLIER = 1.1
const STRIPE_FEE_FLAT = 1.8
const STRIPE_FEE_MULTIPLIER = 1.014

// Elements
const customAmountInputElement = document.getElementById("js-money-input");
const literAmountInputElement = document.getElementById("js-liter-input");
const fuelTypeInputElements = document.getElementsByClassName('fuel-type-button')
const literAmountTextElements = document.getElementsByClassName('js-liter-amount')
const treeAmountTextElements = document.getElementsByClassName('js-tree-amount')
const emissionTextElement = document.getElementById('js-co2-emission')
const totalAmountElements = document.getElementsByClassName('js-total-amount')
const fuelTypeTextElements = document.getElementsByClassName('js-active-fuel-type')
const customTotalAmountTextElement = document.getElementById('js-custom-donation-amount')
const checkoutButtonElement = document.getElementById('js-checkout-button')

let usingGasoline = true;

// Add Event Listeners
literAmountInputElement.addEventListener('input', updateAllText)
customAmountInputElement.addEventListener('input', updateTotalAmountText)
checkoutButtonElement.addEventListener('click', () => {
    stripeHandler.open({
        amount: getTotalAmount()
    })
})
Array.from(fuelTypeInputElements).forEach(element => {
    element.addEventListener('click', ToggleFuelType)
})
 
function getTotalAmount() {
    if (isCustomAmount()) return parseFloat(customAmountInputElement.value)
    const treeAmount = getTreeAmount()
    // There appears to be a step missing that converts trees to dollars unless it is assumed a tree is worth one dollar
    // I also could have missed this step when I was refactoring
    const amountBeforeFees = treeAmount * DOLLAR_TO_SEK
    const amountWithServiceFee = amountBeforeFees * SERVICE_FEE_MULTIPLIER
    const totalAmount = (amountWithServiceFee + STRIPE_FEE_FLAT) * STRIPE_FEE_MULTIPLIER
    return Math.ceil(totalAmount * 100) / 100
}

function isCustomAmount() {
    return isValidAmount(parseFloat(customAmountInputElement.value))
}

function isValidAmount(amount) {
    return !isNaN(amount) && amount > 0
}

function getDescription() {
    if (isCustomAmount) return 'custom'
    const literAmount = parseFloat(literAmountInputElement.value)
    return `${literAmount}+liter+${getFuelType()}`
}

function getFuelType() {
    return usingGasoline ? "bensin" : "diesel";
}

function getEmissionMultiplier() {
    return usingGasoline ? LITERS_GASOLINE_TO_CO2_TONNES : LITERS_DIESEL_TO_CO2_TONNES
}

function getTreeAmount() {
    const literAmount = parseFloat(literAmountInputElement.value)
    const co2EmissionTonnes = literAmount * getEmissionMultiplier()
    const co2EmissionKg = co2EmissionTonnes * 1000
    return co2EmissionKg / YEARLY_TREE_CO2_CONSUMPTION_KILOGRAMS
}

function updateAllText() {
    updateLiterText()
    updateTreeText()
    updateEmissionText()
    updateTotalAmountText()
    updateFuelTypeText()
}

function updateLiterText() {
    const literAmount = parseFloat(literAmountInputElement.value).toFixed(2)
    Array.from(literAmountTextElements).forEach(element => {
        element.innerText = literAmount
    })
}

function updateTreeText() {
    const treeAmount = getTreeAmount().toFixed(1)
    Array.from(treeAmountTextElements).forEach(element => {
        element.innerText = treeAmount
    })
}

function updateEmissionText() {
    const literAmount = parseFloat(literAmountInputElement.value)
    emissionTextElement.innerText = (literAmount * getEmissionMultiplier()).toFixed(4)
}

function updateTotalAmountText(customOnly = false) {
    const amount = getTotalAmount()
    if (!isValidAmount(amount)) amount = 0
    if (customOnly) {
        customTotalAmountTextElement.innerText = amount
    } else {
        Array.from(totalAmountElements).forEach(element => {
            element.innerText = amount
        })
    }
}

function updateFuelTypeText() {
    const fuelType = getFuelType()
    Array.from(fuelTypeTextElements).forEach(element => {
        element.innerText = fuelType
    })
}

/**
 * Switches between using gasoline or diesel as fuel
 * @param {*} fuelTypeButton - The element that was clicked
 */
function ToggleFuelType(fuelTypeButton)
{
    if (usingGasoline && fuelTypeButton.id === "js-gasoline-button") { return; }
    if (!usingGasoline && fuelTypeButton.id === "js-diesel-button")  { return; }

    document.getElementById("js-gasoline-button").classList.toggle("toggled");
    document.getElementById("js-diesel-button").classList.toggle("toggled");
    usingGasoline = !usingGasoline;

    updateAllText()
}
