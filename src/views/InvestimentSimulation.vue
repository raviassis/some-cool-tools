<template>
    <div class="investiment">
        <h1 class="h1">Investiment Simulation</h1>
        <p>Simulate how much an investment will return</p>
        <div class="container mt-5 mb-5">
            <div class="row">
                <div class="col-12 col-sm-6 border-groove">
                    <form action="" id="investment_simulation" ref="investment_simulation">
                        <div class="form-group">
                            <label for="initial_deposit">Initial deposit</label>
                            <input type="number" step="any" class="form-control" name="initial_deposit">
                        </div>                            
                        <div class="form-group">
                            <label for="monthly_deposit">Monthly deposit</label>
                            <input type="number" step="any" name="monthly_deposit" class="form-control">
                        </div>                            
                        <div class="form-group">
                            <label for="investment_time">Investment time</label>
                            <input type="number" step="any" name="investment_time" class="form-control">
                        </div>                            
                        <div class="form-group">
                            <label for="interest_rate">Interest rate <sub>same period of Investiment time</sub></label>
                            <div class="input-group">
                                <input type="number" step="any" class="form-control" name="interest_rate" value="0.2466" aria-label="Percent Label" aria-describedby="percent">
                                <div class="input-group-append">
                                    <span class="input-group-text" id="percent">%</span>
                                </div>
                            </div>
                            
                        </div>    
                    </form>                        
                </div>
                <div class="col-12 col-sm-6">
                    <p class="h3">Total Invested</p>
                    <p class="h4"><span id="invested">$0.00</span></p>
                        
                    <p class="h3">Estimated Amount</p>
                    <p class="h4"><span id="amount">$0.00</span></p>                        
                </div>                    
            </div>            
        </div>
        
    </div>
</template>

<script>

// TODO: Refact this component for use vue tools
export default {
    name: 'InvestimentSimulation',
    data: function() {
        return {
            spanInvested: null,
            amount: null,
            formatter: new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }),
        };
    },
    mounted: function () {
        [...document.getElementById('investment_simulation')
            .elements]
            .filter(e => e instanceof HTMLInputElement)
            .forEach(e => {
                e.oninput = (event) => this.calcularForm(event.target.form);
            });
        var a = document.getElementById('investment_simulation');
        console.log(a.elements);
        this.spanInvested = document.getElementById('invested');
        this.amount = document.getElementById('amount');
    },
    methods: {
        futureValue(initialDeposit, monthlyDeposit, investmentTime, interestRate) {
            let multiplicador = 0;
            if (investmentTime && interestRate)
                multiplicador = (Math.pow(1+interestRate,investmentTime) - 1)/interestRate;
            else if (investmentTime && !interestRate)
                multiplicador = investmentTime;
            return initialDeposit * Math.pow(1+interestRate,investmentTime) 
                    + monthlyDeposit * multiplicador;
        },
        totalInvested(initialDeposit, monthlyDeposit, investmentTime) {
            return initialDeposit + monthlyDeposit * investmentTime;
        },
        calcularForm(form) {
            console.log(form);
            let initialDeposit = Number(form.initial_deposit.value);
            let monthlyDeposit = Number(form.monthly_deposit.value);
            let investmentTime = Number(form.investment_time.value);
            let interestRate = Number(form.interest_rate.value);

            initialDeposit = isFinite(initialDeposit) ? initialDeposit : 0;
            monthlyDeposit = isFinite(monthlyDeposit) ? monthlyDeposit : 0;
            investmentTime = isFinite(investmentTime) ? investmentTime : 0;
            interestRate = isFinite(interestRate) ? interestRate / 100 : 0;

            this.spanInvested.innerHTML = this.formatter.format( 
                this.totalInvested(initialDeposit, monthlyDeposit, investmentTime) 
            );
            this.amount.innerHTML = this.formatter.format(
                this.futureValue(initialDeposit, monthlyDeposit, investmentTime, interestRate)
            );
        }
    }

}
</script>
<style scoped>
.border-groove {
    border: none;
    border-right: groove;
}

@media only screen and (max-width: 576px) {
    .border-groove {
        border: none;
        border-bottom: groove;
    }
}
</style>