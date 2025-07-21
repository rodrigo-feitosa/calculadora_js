class CalculadoraBasica {
    constructor(display) {
        this.display = document.getElementById(display);
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
    constructor(display) {
        super(display);
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


class CalculadoraFinanceira extends CalculadoraAvancada {
    constructor(displayId) {
        super(displayId);
    }
    
    abrirModalValorPresente() {
        const modal = document.getElementById('modalValorPresente');
        modal.style.display = 'block';
    }

    fecharModalValorPresente() {
        const modal = document.getElementById('modalValorPresente');
        modal.style.display = 'none';
    }


    calcularValorPresente() {
        const valorFuturo = parseFloat(document.getElementById('valorFuturo').value);
        const taxaJuros = parseFloat(document.getElementById('taxaJurosVP').value);
        const periodos = parseFloat(document.getElementById('periodosVP').value);
        const modal = document.getElementById('modalValorPresente');

        const valorPresente = valorFuturo / Math.pow(1 + (taxaJuros / 100), periodos);

        this.display.value = valorPresente;
        modal.style.display = 'none';
    }

    abrirModalValorFuturo() {
        const modal = document.getElementById('modalValorFuturo');
        modal.style.display = 'block';
    }

    fecharModalValorFuturo() {
        const modal = document.getElementById('modalValorFuturo');
        modal.style.display = 'none';
    }

    calcularValorFuturo() {
        const valorPresente = parseFloat(document.getElementById('valorPresente').value);
        const taxaJuros = parseFloat(document.getElementById('taxaJurosVF').value);
        const periodos = parseFloat(document.getElementById('periodosVF').value);
        const modal = document.getElementById('modalValorFuturo');

        const valorFuturo = valorPresente * Math.pow(1 + (taxaJuros / 100), periodos);

        this.display.value = valorFuturo;
        modal.style.display = 'none';
    }

    abrirModalJurosSimples() {
        const modal = document.getElementById('modalJurosSimples');
        modal.style.display = 'block';
    }

    fecharModalJurosSimples() {
        const modal = document.getElementById('modalJurosSimples');
        modal.style.display = 'none';
    }

    calcularJurosSimples() {
        const valorInicialSimples = parseFloat(document.getElementById('valorInicialSimples').value);
        const taxaJuros = parseFloat(document.getElementById('taxaJurosSimples').value);
        const periodos = parseFloat(document.getElementById('periodosSimples').value);
        const modal = document.getElementById('modalJurosSimples');

        const jurosSimples = valorInicialSimples + (valorInicialSimples * (taxaJuros / 100) * periodos);

        this.display.value = jurosSimples;
        modal.style.display = 'none';
    }

    abrirModalJurosCompostos() {
        const modal = document.getElementById('modalJurosCompostos');
        modal.style.display = 'block';
    }

    fecharModalJurosCompostos() {
        const modal = document.getElementById('modalJurosCompostos');
        modal.style.display = 'none';
    }

    calcularJurosCompostos() {
        const valorInicialComposto = parseFloat(document.getElementById('valorInicialComposto').value);
        const taxaJuros = parseFloat(document.getElementById('taxaJurosCompostos').value);
        const periodos = parseFloat(document.getElementById('periodosCompostos').value);
        const modal = document.getElementById('modalJurosCompostos');

        const jurosCompostos = valorInicialComposto * Math.pow(1 + (taxaJuros / 100), periodos);

        this.display.value = jurosCompostos;
        modal.style.display = 'none';
    }
}

function inicializarCalculadora(CalculadoraClasse, displayId = 'display') {
    const calc = new CalculadoraClasse(displayId);

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
        calc.usarUltimoResultado?.();
    });

    document.getElementById('btnModoAngulo')?.addEventListener('click', () => {
        calc.alterarModoAngulo?.();
    });

    // Se for uma calculadora financeira
    if (calc instanceof CalculadoraFinanceira) {
        document.getElementById('btnAbrirValorPresente')?.addEventListener('click', () => {
            calc.abrirModalValorPresente();
        });

        document.getElementById('btnFecharValorPresente')?.addEventListener('click', () => {
            calc.fecharModalValorPresente();
        });

        document.getElementById('btnCalcularValorPresente')?.addEventListener('click', () => {
            calc.calcularValorPresente();
        });

        document.getElementById('btnAbrirValorFuturo')?.addEventListener('click', () => {
            calc.abrirModalValorFuturo();
        });

        document.getElementById('btnFecharValorFuturo')?.addEventListener('click', () => {
            calc.fecharModalValorFuturo();
        });

        document.getElementById('btnCalcularValorFuturo')?.addEventListener('click', () => {
            calc.calcularValorFuturo();
        });

        document.getElementById('btnAbrirJurosSimples')?.addEventListener('click', () => {
            calc.abrirModalJurosSimples();
        });

        document.getElementById('btnFecharJurosSimples')?.addEventListener('click', () => {
            calc.fecharModalJurosSimples();
        });

        document.getElementById('btnCalcularJurosSimples')?.addEventListener('click', () => {
            calc.calcularJurosSimples();
        });

        document.getElementById('btnAbrirJurosCompostos')?.addEventListener('click', () => {
            calc.abrirModalJurosCompostos();
        });

        document.getElementById('btnFecharJurosCompostos')?.addEventListener('click', () => {
            calc.fecharModalJurosCompostos();
        });

        document.getElementById('btnCalcularJurosCompostos')?.addEventListener('click', () => {
            calc.calcularJurosCompostos();
        });
    }
}
