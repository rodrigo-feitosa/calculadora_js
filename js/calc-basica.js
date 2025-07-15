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

        // Substituições específicas
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

document.addEventListener('DOMContentLoaded', () => {
    const calc = new CalculadoraBasica('display');

    document.querySelectorAll('button[data-value]').forEach(btn => {
        btn.addEventListener('click', () => {
            calc.append(btn.getAttribute('data-value'));
        });
    });

    document.getElementById('btnIgual').addEventListener('click', () => {
        calc.calculate();
    });

    document.getElementById('btnLimparDisplay').addEventListener('click', () => {
        calc.limparDisplay();
    });

    document.getElementById('btnApagar').addEventListener('click', () => {
        calc.apagarDisplay();
    });

    document.getElementById('btnUltimoResultado').addEventListener('click', () => {
        calc.usarUltimoResultado();
    });
});