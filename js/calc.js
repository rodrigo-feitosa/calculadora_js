class CalculadoraBasica {
    constructor(displayId) {
        this.display = document.getElementById(displayId);
        this.ultimoResultado = null;
    }

    append(value) {
        this.display.value += value;
    }

    limparDisplay() {
        this.display.value = '';
    }

    apagarDisplay() {
        this.display.value = this.display.value.slice(0, -1);
    }

    calculate() {
        let expression = this.display.value;

        expression = expression.replace(/\^/g, '**');
        expression = expression.replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)');
        expression = expression.replace(/%/g, '/100');

        try {
            const result = eval(expression);
            this.display.value = result;
            this.ultimoResultado = result;
        } catch (e) {
            this.display.value = 'Erro';
        }
    }

    armazenarUltimoResultado() {
        return this.ultimoResultado;
    }

    usarUltimoResultado() {
        if (this.ultimoResultado !== null) {
            this.display.value += this.ultimoResultado;
        }
    }
}

class CalculadoraAvancada extends CalculadoraBasica {
    constructor(displayId) {
        super(displayId);
        this.modoAngulo = 'Rad';
    }

    toRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    alterarModoAngulo() {
        this.modoAngulo = this.modoAngulo === 'Rad' ? 'Deg' : 'Rad';
        document.getElementById('modoAngulo').textContent = this.modoAngulo;
    }

    fatorial(n) {
        n = parseInt(n);
        if (n < 0) return NaN;
        if (n === 0) return 1;
        return n * this.fatorial(n - 1);
    }

    calculate() {
        let expression = this.display.value;

        expression = expression.replace(/\^/g, '**');
        expression = expression.replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)');
        expression = expression.replace(/%/g, '/100');

        if (this.modoAngulo === 'Deg') {
            expression = expression.replace(/cos\(([^)]+)\)/g, (_, val) => `Math.cos(${this.toRadians(val)})`);
            expression = expression.replace(/sin\(([^)]+)\)/g, (_, val) => `Math.sin(${this.toRadians(val)})`);
            expression = expression.replace(/tan\(([^)]+)\)/g, (_, val) => `Math.tan(${this.toRadians(val)})`);
            expression = expression.replace(/cosh\(([^)]+)\)/g, (_, val) => `Math.cosh(${this.toRadians(val)})`);
            expression = expression.replace(/sinh\(([^)]+)\)/g, (_, val) => `Math.sinh(${this.toRadians(val)})`);
            expression = expression.replace(/tanh\(([^)]+)\)/g, (_, val) => `Math.tanh(${this.toRadians(val)})`);
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
        expression = expression.replace(/(\d+)!/g, (_, val) => this.fatorial(val));
        expression = expression.replace(/(\d+)x⁻¹/g, '1/$1');

        try {
            const result = eval(expression);
            this.display.value = result;
            this.ultimoResultado = result;
        } catch (e) {
            this.display.value = 'Erro';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const calc = new CalculadoraAvancada('display');

    document.querySelectorAll('button[data-value]').forEach(btn => {
        btn.addEventListener('click', () => {
            calc.append(btn.getAttribute('data-value'));
        });
    });

    document.getElementById('btnIgual')?.addEventListener('click', () => {
        calc.calculate();
    });

    document.getElementById('btnLimparDisplay')?.addEventListener('click', () => {
        calc.limparDisplay();
    });

    document.getElementById('btnApagar')?.addEventListener('click', () => {
        calc.apagarDisplay();
    });

    document.getElementById('btnUltimoResultado')?.addEventListener('click', () => {
        calc.usarUltimoResultado();
    });

    document.getElementById('btnModoAngulo')?.addEventListener('click', () => {
        calc.alterarModoAngulo();
    });
});
