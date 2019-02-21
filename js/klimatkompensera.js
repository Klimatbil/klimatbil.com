let usingGasoline = true;

function UpdateTotal()
{
    const gasolineMultiplier = 0.00234769703; // converts liters of gasoline to co2 emission in tonnes
    const dieselMultiplier = 0.0026892715; // converts liters of diesel to co2 emission in tonnes
    const yearlyTreeCo2Consumption = 21.7724 // in kilograms
    const dollarToSek = 9.3 // value of 1 dollar in sek

    let literAmount = document.getElementById("js-liter-input").value;
    
    let emissionMultiplier = usingGasoline ? gasolineMultiplier : dieselMultiplier;

    document.getElementById("js-co2-emission").innerText = `${(literAmount * emissionMultiplier).toFixed(4)}`
    
    let customPaymentValue = document.getElementById("js-money-input").value;
    
    if (customPaymentValue !== "")
    {
        let finalAmount = Math.round(parseFloat(customPaymentValue) * 100) / 100;
        document.getElementById("js-total-amount").innerText = finalAmount;
        let form = document.getElementById("js-payment-form");
        form.action = `https://wt-a1a4d75d2e7f5a03df41a2e03b3cd9d7-0.sandbox.auth0-extend.com/stripe-payment?amount=${finalAmount * 100}&description=custom`;
    }
    else
    {
        let finalAmount = 0;

        if (literAmount === "") 
        { 
            document.getElementById("js-total-amount").innerText = finalAmount;
            return;
        }

        /*  Compensation fee
        ================================================== */
        finalAmount = literAmount * emissionMultiplier;     // Amount of co2 emissions in tonnes
        finalAmount *= 1000;                                // Amount of co2 in kg
        finalAmount /= yearlyTreeCo2Consumption;            // Amount of trees that need to be planted to offset the carbon emissions.
        finalAmount *= dollarToSek;                         // Amount of SEK required to buy those trees
        finalAmount = Math.ceil(finalAmount * 100) / 100;   // Ceil to the 2nd decimal

        /*  Service fee
        ================================================== */
        finalAmount /= 0.9;                                 // Add 10% service fee

        /*  Stripe fee
        ================================================== */
        finalAmount += 1.8;                                 // Add 1.8kr
        finalAmount /= 0.986;                               // Add 1.4%
        finalAmount = Math.ceil(finalAmount * 100) / 100;   // Ceil to the 2nd decimal
        
        document.getElementById("js-total-amount").innerText = finalAmount;
        let form = document.getElementById("js-payment-form");

        let fuelType = usingGasoline ? "Bensin" : "Diesel";
        form.action = `https://wt-a1a4d75d2e7f5a03df41a2e03b3cd9d7-0.sandbox.auth0-extend.com/stripe-payment?amount=${finalAmount * 100}&description=${literAmount}+liter+${fuelType}`;
    }
}

function ToggleFuelType(fuelTypeButton)
{
    if (usingGasoline && fuelTypeButton.id === "js-gasoline-button") { return; }
    if (!usingGasoline && fuelTypeButton.id === "js-diesel-button")  { return; }

    document.getElementById("js-gasoline-button").classList.toggle("toggled");
    document.getElementById("js-diesel-button").classList.toggle("toggled");
    usingGasoline = !usingGasoline;

    UpdateTotal();
}
