document.addEventListener('DOMContentLoaded', function () {
    const screen = document.getElementById('screen');
    let firstOperand = '';
    let secondOperand = '';
    let operator = null;

    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            if (button.dataset.number) {
                handleNumber(button.dataset.number)
            } else if (button.dataset.operator) {
                handleOperator(button.dataset.operator)
            } else if (button.dataset.equals) {
                calculate()
            } else if (button.dataset.action === 'reset') {
                resetCalculator()
            }
            updatedScreen()
        })
    })

    function handleNumber(number) {
        if (operator && firstOperand !== '' && secondOperand === '') {
            secondOperand += number
        } else if (operator && secondOperand) {
            secondOperand += number
        } else {
            firstOperand += number
        }
        }

   function  handleOperator(operatorSymbol) {
        if (firstOperand && operator && secondOperand){
            calculate()
        }
        operator = operatorSymbol
    }

    function calculate() {
        if (operator === null || secondOperand === '') return;
        let result = '';
        const first = parseFloat(firstOperand);
        const second = parseFloat(secondOperand);
        switch (operator) {
            case '+':
                result = first + second
                break
            case '-':
                result = first - second
                break
            case '*':
                result = first * second
                break
            case '/':
                console.log('first / second', first, second, result)
                result = first / second
                console.log('result is', result)
                if (second === 0) result = 'Error'
                else result = first / second
                break
            default:
                return
        }
        screen.textContent = result
        firstOperand = result // consecutive operations
        secondOperand = '' // reset secondOperand
    }
    function updatedScreen() {
        screen.textContent = secondOperand || firstOperand || '0'
    }

    function resetCalculator() {
        firstOperand = '';
        secondOperand = '';
        operator = null;
        updatedScreen();
    }
})