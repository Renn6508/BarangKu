// Pie Chart - Kategori Barang
const pieCtx = document.getElementById('pieChart');
if (pieCtx) {
    new Chart(pieCtx, {
        type: 'doughnut',
        data: {
            labels: ['Elektronik', 'Aksesoris', 'Furniture', 'Alat Tulis', 'Lainnya'],
            datasets: [{
                data: [35, 28, 18, 12, 7],
                backgroundColor: [
                    '#1a3a6b',
                    '#4a90e2',
                    '#50c878',
                    '#f5a623',
                    '#e94b3c'
                ],
                borderWidth: 3,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12,
                            family: 'Poppins'
                        },
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    padding: 12,
                    titleFont: {
                        size: 14,
                        family: 'Poppins'
                    },
                    bodyFont: {
                        size: 13,
                        family: 'Poppins'
                    },
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

// Line Chart - Barang Masuk & Keluar
const lineCtx = document.getElementById('lineChart');
if (lineCtx) {
    new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
            datasets: [
                {
                    label: 'Barang Masuk',
                    data: [120, 150, 180, 140, 200, 170, 190, 210, 185, 220, 195, 230],
                    borderColor: '#50c878',
                    backgroundColor: 'rgba(80, 200, 120, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: '#50c878',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                },
                {
                    label: 'Barang Keluar',
                    data: [100, 130, 160, 120, 180, 150, 170, 190, 165, 200, 175, 210],
                    borderColor: '#e94b3c',
                    backgroundColor: 'rgba(233, 75, 60, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: '#e94b3c',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12,
                            family: 'Poppins'
                        },
                        usePointStyle: true,
                        pointStyle: 'circle',
                        boxWidth: 8,
                        boxHeight: 8
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    padding: 12,
                    titleFont: {
                        size: 14,
                        family: 'Poppins'
                    },
                    bodyFont: {
                        size: 13,
                        family: 'Poppins'
                    },
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + ' unit';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            family: 'Poppins',
                            size: 11
                        },
                        padding: 10,
                        callback: function(value) {
                            return value + ' unit';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            family: 'Poppins',
                            size: 11
                        },
                        padding: 10
                    }
                }
            }
        }
    });
}

// Sidebar Toggle
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');
const footer = document.querySelector('.footer');

if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
        footer.classList.toggle('expanded');
    });
}
