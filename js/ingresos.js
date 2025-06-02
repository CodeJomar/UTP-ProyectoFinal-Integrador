// Datos de ejemplo para los gráficos
const revenueData = {
  categories: {
    month: {
      labels: ['Electrónicos', 'Ropa', 'Hogar', 'Deportes', 'Libros', 'Otros'],
      data: [25400, 18200, 12800, 9600, 6400, 4200]
    },
    quarter: {
      labels: ['Electrónicos', 'Ropa', 'Hogar', 'Deportes', 'Libros', 'Otros'],
      data: [76200, 54600, 38400, 28800, 19200, 12600]
    }
  },
  trends: {
    week: {
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      data: [1200, 1450, 1380, 1620, 1890, 2100, 1750]
    },
    month: {
      labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
      data: [8500, 9200, 8800, 9800]
    }
  },
  distribution: {
    labels: ['Productos Físicos', 'Servicios', 'Suscripciones', 'Comisiones'],
    data: [45, 25, 20, 10],
    colors: ['#7380ec', '#41f1b6', '#ffbb55', '#ff7782']
  }
};

const transactions = [
  {
    date: '2024-01-15',
    client: 'Juan Pérez',
    product: 'Smartphone Galaxy Pro',
    amount: 899.99,
    status: 'completed'
  },
  {
    date: '2024-01-15',
    client: 'María García',
    product: 'Laptop Gaming X1',
    amount: 1299.99,
    status: 'completed'
  },
  {
    date: '2024-01-14',
    client: 'Carlos López',
    product: 'Auriculares Wireless',
    amount: 199.99,
    status: 'pending'
  },
  {
    date: '2024-01-14',
    client: 'Ana Martínez',
    product: 'Smartwatch Series 5',
    amount: 399.99,
    status: 'failed'
  },
  {
    date: '2024-01-13',
    client: 'Luis Rodríguez',
    product: 'Tablet Pro 12"',
    amount: 649.99,
    status: 'completed'
  }
];

let barChart, lineChart, donutChart;

document.addEventListener('DOMContentLoaded', function () {
  // Inicializar gráficos
  initBarChart();
  initLineChart();
  initDonutChart();

  // Cargar tabla de transacciones
  loadTransactionsTable();

  // Inicializar eventos
  initEvents();
});

function initEvents() {
  // Controles de período para gráficos
  document.querySelectorAll('.chart-btn-JE').forEach(btn => {
    btn.addEventListener('click', function () {
      const chartType = this.getAttribute('data-chart');
      const period = this.getAttribute('data-period');

      // Actualizar botones activos
      const parentControls = this.parentElement;
      parentControls.querySelectorAll('.chart-btn-JE').forEach(b => b.classList.remove('active-JE'));
      this.classList.add('active-JE');

      // Actualizar gráfico correspondiente
      if (chartType === 'bar') {
        updateBarChart(period);
      } else if (chartType === 'line') {
        updateLineChart(period);
      }
    });
  });

  // Selector de período global
  document.getElementById('periodSelector').addEventListener('change', function () {
    updateAllCharts();
  });

  // Botón de exportar reporte
  document.getElementById('exportReportBtn').addEventListener('click', function () {
    exportReport();
  });
}

function initBarChart() {
  const ctx = document.getElementById('barChart').getContext('2d');

  barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: revenueData.categories.month.labels,
      datasets: [{
        label: 'Ingresos ($)',
        data: revenueData.categories.month.data,
        backgroundColor: [
          '#7380ec',
          '#41f1b6',
          '#ffbb55',
          '#ff7782',
          '#a78bfa',
          '#fb7185'
        ],
        borderColor: [
          '#6366f1',
          '#10b981',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6',
          '#f43f5e'
        ],
        borderWidth: 1,
        borderRadius: 8,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#7380ec',
          borderWidth: 1,
          callbacks: {
            label: function (context) {
              return `$${context.parsed.y.toLocaleString()}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: '#f3f4f6'
          },
          ticks: {
            callback: function (value) {
              return '$' + value.toLocaleString();
            }
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });
}

function initLineChart() {
  const ctx = document.getElementById('lineChart').getContext('2d');

  lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: revenueData.trends.week.labels,
      datasets: [{
        label: 'Ingresos Diarios',
        data: revenueData.trends.week.data,
        borderColor: '#7380ec',
        backgroundColor: 'rgba(115, 128, 236, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#7380ec',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#7380ec',
          borderWidth: 1,
          callbacks: {
            label: function (context) {
              return `$${context.parsed.y.toLocaleString()}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: '#f3f4f6'
          },
          ticks: {
            callback: function (value) {
              return '$' + value.toLocaleString();
            }
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    }
  });
}

function initDonutChart() {
  const ctx = document.getElementById('donutChart').getContext('2d');

  donutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: revenueData.distribution.labels,
      datasets: [{
        data: revenueData.distribution.data,
        backgroundColor: revenueData.distribution.colors,
        borderColor: '#fff',
        borderWidth: 3,
        hoverBorderWidth: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#7380ec',
          borderWidth: 1,
          callbacks: {
            label: function (context) {
              return `${context.label}: ${context.parsed}%`;
            }
          }
        }
      }
    }
  });

  // Generar leyenda personalizada
  generateDonutLegend();
}

function generateDonutLegend() {
  const legendContainer = document.getElementById('donutLegend');
  legendContainer.innerHTML = '';

  revenueData.distribution.labels.forEach((label, index) => {
    const legendItem = document.createElement('div');
    legendItem.className = 'legend-item-JE';

    legendItem.innerHTML = `
      <div class="legend-label-JE">
        <div class="legend-color-JE" style="background-color: ${revenueData.distribution.colors[index]}"></div>
        <span class="legend-text-JE">${label}</span>
      </div>
      <span class="legend-value-JE">${revenueData.distribution.data[index]}%</span>
    `;

    legendContainer.appendChild(legendItem);
  });
}

function updateBarChart(period) {
  const data = revenueData.categories[period];
  barChart.data.labels = data.labels;
  barChart.data.datasets[0].data = data.data;
  barChart.update();
}

function updateLineChart(period) {
  const data = revenueData.trends[period];
  lineChart.data.labels = data.labels;
  lineChart.data.datasets[0].data = data.data;
  lineChart.update();
}

function updateAllCharts() {
  // Aquí se actualizarían todos los gráficos según el período seleccionado
  // Por ahora solo mostramos un mensaje
  console.log('Actualizando gráficos para período:', document.getElementById('periodSelector').value);
}

function loadTransactionsTable() {
  const tbody = document.getElementById('transactionsTableBody');
  tbody.innerHTML = '';

  transactions.forEach(transaction => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${formatDate(transaction.date)}</td>
      <td>${transaction.client}</td>
      <td>${transaction.product}</td>
      <td>$${transaction.amount.toFixed(2)}</td>
      <td>
        <span class="status-badge-JE ${transaction.status}">
          ${getStatusText(transaction.status)}
        </span>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

function getStatusText(status) {
  const statusMap = {
    'completed': 'Completado',
    'pending': 'Pendiente',
    'failed': 'Fallido'
  };
  return statusMap[status] || status;
}

function exportReport() {
  // Simular exportación de reporte
  alert('Exportando reporte... Esta funcionalidad se implementará con el backend.');
}

// Función para actualizar los valores en tiempo real (para futuro uso con backend)
function updateRevenueValues(totalRevenue, dailyAverage, totalTrend, dailyTrend) {
  document.getElementById('totalRevenue').textContent = `$${totalRevenue.toLocaleString()}`;
  document.getElementById('dailyAverage').textContent = `$${dailyAverage.toLocaleString()}`;

  // Actualizar tendencias
  const totalTrendElement = document.querySelector('.summary-card-JE:nth-child(1) .card-content-JE p');
  const dailyTrendElement = document.querySelector('.summary-card-JE:nth-child(2) .card-content-JE p');

  totalTrendElement.className = `p-JE ${totalTrend >= 0 ? 'trend-positive-JE' : 'trend-negative-JE'}`;
  dailyTrendElement.className = `p-JE ${dailyTrend >= 0 ? 'trend-positive-JE' : 'trend-negative-JE'}`;

  const totalIcon = totalTrend >= 0 ? 'trending_up' : 'trending_down';
  const dailyIcon = dailyTrend >= 0 ? 'trending_up' : 'trending_down';

  totalTrendElement.innerHTML = `
    <span class="material-icons-sharp">${totalIcon}</span>
    ${Math.abs(totalTrend)}% vs mes anterior
  `;

  dailyTrendElement.innerHTML = `
    <span class="material-icons-sharp">${dailyIcon}</span>
    ${Math.abs(dailyTrend)}% vs mes anterior
  `;
}