const display = document.getElementById('display');

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

function calculate() {
    let expression = document.getElementById('display').value;

    expression = expression.replace(/\^/g, '**');
    expression = expression.replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)');
    expression = expression.replace(/%/g, '/100');

    try {
        const result = eval(expression);
        document.getElementById('display').value = result;
    } catch (e) {
        document.getElementById('display').value = 'Erro';
    }
}

// Modal para Valor Presente
const btnAbrirVP = document.getElementById('abrirModalValorPresente');
const btnFecharVP = document.getElementById('fecharModalValorPresente');

btnAbrirVP.onclick = function() {
    const modal = document.getElementById('modalValorPresente');
    modal.style.display = 'block';
};

btnFecharVP.onclick = function() {
    const modal = document.getElementById('modalValorPresente');
    modal.style.display = 'none';
};

function calcularValorPresente() {
    const valorFuturo = parseFloat(document.getElementById('valorFuturo').value);
    const taxaJuros = parseFloat(document.getElementById('taxaJurosVP').value);
    const periodos = parseFloat(document.getElementById('periodosVP').value);

    const taxaDecimal = taxaJuros / 100;
    const valorPresente = valorFuturo / Math.pow(1 + taxaDecimal, periodos);

    console.log(`Valor Presente: ${valorPresente}`);
    document.getElementById('display').value = valorPresente.toFixed(2);
    document.getElementById('modalValorPresente').style.display = 'none';
}



// Modal para Valor futuro
const btnAbrirVF = document.getElementById('abrirModalValorFuturo');
const btnFecharVF = document.getElementById('fecharModalValorFuturo');

btnAbrirVF.onclick = function() {
    const modal = document.getElementById('modalValorFuturo');
    modal.style.display = 'block';
};

btnFecharVF.onclick = function() {
    const modal = document.getElementById('modalValorFuturo');
    modal.style.display = 'none';
};

function calcularValorFuturo() {
    const valorPresente = parseFloat(document.getElementById('valorPresente').value);
    const taxaJuros = parseFloat(document.getElementById('taxaJurosVF').value);
    const periodos = parseFloat(document.getElementById('periodosVF').value);

    const taxaDecimal = taxaJuros / 100;
    const valorFuturo = valorPresente * Math.pow(1 + taxaDecimal, periodos);

    console.log(`Valor Futuro: ${valorFuturo}`);
    document.getElementById('display').value = valorFuturo.toFixed(2);
    document.getElementById('modalValorFuturo').style.display = 'none';
}


// Modal para Juros simples
const btnAbrirJurosSimples = document.getElementById('abrirModalJurosSimples');
const btnFecharJurosSimples = document.getElementById('fecharModalJurosSimples');

btnAbrirJurosSimples.onclick = function() {
    const modal = document.getElementById('modalJurosSimples');
    modal.style.display = 'block';
}

btnFecharJurosSimples.onclick = function() {
    const modal = document.getElementById('modalJurosSimples');
    modal.style.display = 'none';
}

function calcularJurosSimples() {
    const valorInicial = parseFloat(document.getElementById('valorInicialSimples').value);
    const taxaJuros = parseFloat(document.getElementById('taxaJurosSimples').value);
    const periodos = parseFloat(document.getElementById('periodosSimples').value);

    const taxaDecimal = taxaJuros / 100;
    const jurosSimples = valorInicial + (valorInicial*taxaDecimal*periodos);

    console.log(`Juros Simples: ${jurosSimples}`);
    document.getElementById('display').value = jurosSimples.toFixed(2);
    document.getElementById('modalJurosSimples').style.display = 'none';
}


// Modal para Juros compostos
const btnAbrirJurosCompostos = document.getElementById('abrirModalJurosCompostos');
const btnFecharJurosCompostos = document.getElementById('fecharModalJurosCompostos');

btnAbrirJurosCompostos.onclick = function() {
    const modal = document.getElementById('modalJurosCompostos');
    modal.style.display = 'block';
}

btnFecharJurosCompostos.onclick = function() {
    const modal = document.getElementById('modalJurosCompostos');
    modal.style.display = 'none';
}

function calcularJurosCompostos() {
    const valorInicial = parseFloat(document.getElementById('valorInicialComposto').value);
    const taxaJuros = parseFloat(document.getElementById('taxaJurosCompostos').value);
    const periodos = parseFloat(document.getElementById('periodosCompostos').value);

    const taxaDecimal = taxaJuros / 100;
    const jurosCompostos = valorInicial * Math.pow(1 + taxaDecimal, periodos);

    console.log(`Juros Compostos: ${jurosCompostos}`);
    document.getElementById('display').value = jurosCompostos.toFixed(2);
    document.getElementById('modalJurosCompostos').style.display = 'none';
}