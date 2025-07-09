const display = document.getElementById('display');

function append(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function toRadians(degrees) {
    return degrees * Math.PI / 180;
}


function calculate() {
    let expression = document.getElementById('display').value;

    expression = expression.replace(/\^/g, '**');
    expression = expression.replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)');
    expression = expression.replace(/%/g, '/100');

    expression = expression.replace(/cos\(([^)]+)\)/g, 'Math.cos($1)');
    expression = expression.replace(/sin\(([^)]+)\)/g, 'Math.sin($1)');
    expression = expression.replace(/tan\(([^)]+)\)/g, 'Math.tan($1)');

    expression = expression.replace(/cosh\(([^)]+)\)/g, 'Math.cosh($1)');
    expression = expression.replace(/sinh\(([^)]+)\)/g, 'Math.sinh($1)');
    expression = expression.replace(/tanh\(([^)]+)\)/g, 'Math.tanh($1)');

    expression = expression.replace(/e/g, 'Math.E');
    expression = expression.replace(/π/g, 'Math.PI');
    expression = expression.replace(/log\(([^)]+)\)/g, 'Math.log10($1)');

    expression = expression.replace(/(\d+)!/g, 'fatorial($1)');

    expression = expression.replace(/(\d+)x⁻¹/g, '(1/$1)');

    try {
        const result = eval(expression);
        document.getElementById('display').value = result;
    } catch (e) {
        document.getElementById('display').value = 'Erro';
    }
}

function fatorial(n) {
    n = parseInt(n);
    if (n < 0) return NaN;
    if (n === 0) return 1;
    return n * fatorial(n - 1);
}
