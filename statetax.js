for (let bracket of brackets) {
    if (income > bracket.min) {
        const taxableIncome = Math.min(income, bracket.max) - bracket.min;
        totalTax += taxableIncome * bracket.rate;
    }
    if (income <= bracket.max) break;  // Exit the loop early once we've processed the relevant brackets
}
async function fetchTaxBrackets(state) {
    const response = await fetch('tax_brackets.json');
    const taxBrackets = await response.json();
    return taxBrackets[state];
}

function calculateProgressiveTax(income, brackets) {
    let totalTax = 0;
    for (let bracket of brackets) {
        if (income > bracket.min) {
            const taxableIncome = Math.min(income, bracket.max) - bracket.min;
            totalTax += taxableIncome * bracket.rate;
        }
        if (income <= bracket.max) break;  // Break early
    }
    return totalTax;
}

async function calculateTax() {
    const state = document.getElementById('state').value;
    const income = parseFloat(document.getElementById('income').value);

    const brackets = await fetchTaxBrackets(state);
    const totalTax = calculateProgressiveTax(income, brackets);

    document.getElementById('totalTax').textContent = `$${totalTax.toFixed(2)}`;
}
