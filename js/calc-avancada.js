const display = document.getElementById('display');
let angleMode = 'rad';

function append(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function backspace() {
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

function alterarModoAngulo() {
    modoAngulo = modoAngulo === 'Rad' ? 'Deg' : 'Rad';
    document.getElementById('modoAngulo').textContent = modoAngulo;
}

function calculate() {
    let expression = document.getElementById('display').value;

    expression = expression.replace(/\^/g, '**');
    expression = expression.replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)');
    expression = expression.replace(/%/g, '/100');

    if (modoAngulo === 'Deg') {
        expression = expression.replace(/cos\(([^)]+)\)/g, 'Math.cos(toRadians($1))');
        expression = expression.replace(/sin\(([^)]+)\)/g, 'Math.sin(toRadians($1))');
        expression = expression.replace(/tan\(([^)]+)\)/g, 'Math.tan(toRadians($1))');
        expression = expression.replace(/cosh\(([^)]+)\)/g, 'Math.cosh(toRadians($1))');
        expression = expression.replace(/sinh\(([^)]+)\)/g, 'Math.sinh(toRadians($1))');
        expression = expression.replace(/tanh\(([^)]+)\)/g, 'Math.tanh(toRadians($1))');
    } else {
        expression = expression.replace(/cos\(([^)]+)\)/g, 'Math.cos($1)');
        expression = expression.replace(/sin\(([^)]+)\)/g, 'Math.sin($1)');
        expression = expression.replace(/tan\(([^)]+)\)/g, 'Math.tan($1)');
        expression = expression.replace(/cosh\(([^)]+)\)/g, 'Math.cosh($1)');
        expression = expression.replace(/sinh\(([^)]+)\)/g, 'Math.sinh($1)');
        expression = expression.replace(/tanh\(([^)]+)\)/g, 'Math.tanh($1)');
    }

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