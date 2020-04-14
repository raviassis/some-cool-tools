[...document.getElementById('investment_simulation')
        .elements]
        .filter(e => e instanceof HTMLInputElement)
        .forEach(e => {
            e.oninput = (event) => calcularForm(event.target.form);
        });

const spanInvested = document.getElementById('invested');
const amount = document.getElementById('amount');

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

function calcularForm(form) {
    let initialDeposit = Number(form.initial_deposit.value);
    let monthlyDeposit = Number(form.monthly_deposit.value);
    let investmentTime = Number(form.investment_time.value);
    let interestRate = Number(form.interest_rate.value);

    initialDeposit = isFinite(initialDeposit) ? initialDeposit : 0;
    monthlyDeposit = isFinite(monthlyDeposit) ? monthlyDeposit : 0;
    investmentTime = isFinite(investmentTime) ? investmentTime : 0;
    interestRate = isFinite(interestRate) ? interestRate : 0;

    spanInvested.innerHTML = formatter.format( totalInvested(initialDeposit, monthlyDeposit, investmentTime) );
    amount.innerHTML = formatter.format( futureValue(initialDeposit, monthlyDeposit, investmentTime, interestRate) );
}

function futureValue(initialDeposit, monthlyDeposit, investmentTime, interestRate) {
    let multiplicador = 0;
    if (investmentTime && interestRate)
        multiplicador = (Math.pow(1+interestRate,investmentTime) - 1)/interestRate;
    else if (investmentTime && !interestRate)
        multiplicador = investmentTime;
    return initialDeposit * Math.pow(1+interestRate,investmentTime) 
            + monthlyDeposit * multiplicador;
}

function totalInvested(initialDeposit, monthlyDeposit, investmentTime) {
    return initialDeposit + monthlyDeposit * investmentTime;
}