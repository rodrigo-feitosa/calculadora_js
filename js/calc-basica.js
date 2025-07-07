const display = document.getElementById('display');

function append(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function calculate() {
    let expression = document.getElementById('display').value;

    expression = expression.replace(/\^/g, '**');
    expression = expression.replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)');

    try {
        const result = eval(expression);
        document.getElementById('display').value = result;
    } catch (e) {
        document.getElementById('display').value = 'Erro';
    }
}

