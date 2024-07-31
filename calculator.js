document.addEventListener("DOMContentLoaded", function () {
    const screen = document.getElementById("screen")
    let firstOperand = ""
    let secondOperand = ""
    let operator = null
    let resultCalculated = false // Flag to check if the result was just calculated

    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", () => {
            if (button.dataset.number) {
                handleNumber(button.dataset.number)
            } else if (button.dataset.operator) {
                handleOperator(button.dataset.operator)
            } else if (button.dataset.equals) {
                calculate()
                resultCalculated = true // Set the flag after calculation
            } else if (button.dataset.action === "reset") {
                resetCalculator()
            }
            updatedScreen()
        })
    })

    function handleNumber(number) {
        if (resultCalculated) {
            // If a result was just calculated and a number is pressed, start a new operation
            firstOperand = number
            secondOperand = ""
            operator = null
            resultCalculated = false
        } else if (operator) {
            secondOperand += number
        } else {
            firstOperand += number
        }
    }

    function handleOperator(operatorSymbol) {
        if (firstOperand && operator && secondOperand) {
            calculate()
        }
        operator = operatorSymbol
        resultCalculated = false // Reset the flag as we're continuing with another operation
    }

    function calculate() {
        if (operator === null || secondOperand === "") return
        const first = parseFloat(firstOperand)
        const second = parseFloat(secondOperand)
        let result

        switch (operator) {
            case "+":
                result = first + second
                break
            case "-":
                result = first - second
                break
            case "*":
                result = first * second
                break
            case "/":
                if (second === 0) {
                    result = "Error"
                } else {
                    result = first / second
                }
                break
            default:
                return // Exit if the operator is not recognized
        }

        screen.textContent = result
        firstOperand = result.toString() // Use result for next operation
        secondOperand = "" // Reset secondOperand
        operator = null // Reset operator for next potential operation
    }

    function updatedScreen() {
        screen.textContent = secondOperand || firstOperand || "0"
    }

    function resetCalculator() {
        firstOperand = ""
        secondOperand = ""
        operator = null
        resultCalculated = false
        updatedScreen()
    }
})
