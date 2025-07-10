const display = document.getElementById('display');
let myChart = null; // Variável para armazenar a instância do gráfico

function append(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
    const canvas = document.getElementById('grafico');
    canvas.style.display = 'none';
    if (myChart) {
        myChart.destroy();
        myChart = null;
    }
}

function calculate() {
    let expression = document.getElementById('display').value;

    // Substituições para operadores e funções matemáticas
    expression = expression.replace(/\^/g, '**');
    expression = expression.replace(/√/g, 'Math.sqrt');
    expression = expression.replace(/%/g, '/100');
    expression = expression.replace(/cos\(/g, 'Math.cos(');
    expression = expression.replace(/sin\(/g, 'Math.sin(');
    expression = expression.replace(/tan\(/g, 'Math.tan(');
    expression = expression.replace(/cosh\(/g, 'Math.cosh(');
    expression = expression.replace(/sinh\(/g, 'Math.sinh(');
    expression = expression.replace(/tanh\(/g, 'Math.tanh(');
    expression = expression.replace(/e/g, 'Math.E');
    expression = expression.replace(/π/g, 'Math.PI');
    expression = expression.replace(/log\(/g, 'Math.log10(');

    try {
        const result = eval(expression);
        if (typeof result === 'number' && isFinite(result)) {
            document.getElementById('display').value = result;
        } else {
            document.getElementById('display').value = 'Erro';
        }
    } catch (e) {
        document.getElementById('display').value = 'Erro';
    }
}

function plotarGrafico() {
    let expression = document.getElementById('display').value;
    const canvas = document.getElementById('grafico');
    const ctx = canvas.getContext('2d');

    // Mostrar o canvas
    canvas.style.display = 'block';

    // Destruir gráfico anterior, se existir
    if (myChart) {
        myChart.destroy();
    }

    // Preparar dados para o gráfico
    const xValues = [];
    const yValues = [];
    const step = 0.1;
    const xMin = -10;
    const xMax = 10;

    // Substituições para a expressão
    let plotExpression = expression
        .replace(/\^/g, '**')
        .replace(/√/g, 'Math.sqrt')
        .replace(/%/g, '/100')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/cosh\(/g, 'Math.cosh(')
        .replace(/sinh\(/g, 'Math.sinh(')
        .replace(/tanh\(/g, 'Math.tanh(')
        .replace(/e/g, 'Math.E')
        .replace(/π/g, 'Math.PI')
        .replace(/log\(/g, 'Math.log10(');

    // Gerar valores de x e y
    for (let x = xMin; x <= xMax; x += step) {
        try {
            // Substituir 'x' na expressão pelo valor atual
            let evalExpression = plotExpression.replace(/(\b)x(\b|$)/g, `(${x})`);
            let y = eval(evalExpression);
            if (typeof y === 'number' && isFinite(y)) {
                xValues.push(parseFloat(x.toFixed(2)));
                yValues.push(y);
            }
        } catch (e) {
            // Ignorar erros para valores específicos
        }
    }

    // Verificar se há dados válidos para plotar
    if (xValues.length === 0) {
        alert('Não foi possível plotar o gráfico. Verifique a expressão.');
        canvas.style.display = 'none';
        return;
    }

    // Configurar o gráfico com Chart.js
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xValues,
            datasets: [{
                label: `f(x) = ${expression}`,
                data: yValues,
                borderColor: '#4bc0c0',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                fill: false,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Permite que o gráfico se ajuste ao tamanho do canvas
            layout: {
                padding: 20 // Adiciona padding para evitar que o gráfico fique muito colado às bordas
            },
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'x'
                    },
                    ticks: {
                        stepSize: 1
                    },
                    min: xMin,
                    max: xMax
                },
                y: {
                    title: {
                        display: true,
                        text: 'f(x)'
                    },
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}