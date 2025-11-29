// Update report based on filters
function updateReport() {
    const reportType = document.getElementById('reportType').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const category = document.getElementById('categoryFilter').value;

    // Update report title
    let title = 'Laporan ';
    switch(reportType) {
        case 'stock':
            title += 'Stok Barang';
            break;
        case 'transaction':
            title += 'Transaksi';
            break;
        case 'profit':
            title += 'Keuntungan';
            break;
    }

    if (startDate && endDate) {
        title += ` (${formatDate(startDate)} - ${formatDate(endDate)})`;
    }

    document.getElementById('reportTitle').textContent = title;

    // Simulate data update
    console.log('Updating report:', {
        type: reportType,
        startDate,
        endDate,
        category
    });

    showToast('Laporan berhasil diperbarui', 'success');
}

// Format date
function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

// Generate report
function generateReport() {
    showToast('Memproses laporan...', 'warning');
    
    setTimeout(() => {
        showToast('Laporan berhasil digenerate!', 'success');
    }, 1500);
}

// Print report
function printReport() {
    window.print();
    showToast('Membuka dialog print...', 'success');
}

// Export to PDF
function exportPDF() {
    showToast('Mengexport ke PDF...', 'warning');
    
    setTimeout(() => {
        showToast('Laporan berhasil diexport ke PDF!', 'success');
        // In real app, trigger PDF download here
        console.log('Exporting to PDF...');
    }, 1500);
}

// Export to Excel
function exportExcel() {
    showToast('Mengexport ke Excel...', 'warning');
    
    setTimeout(() => {
        showToast('Laporan berhasil diexport ke Excel!', 'success');
        // In real app, trigger Excel download here
        console.log('Exporting to Excel...');
    }, 1500);
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show ' + type;
    
    setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    // Set default date range (last 30 days)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    document.getElementById('startDate').value = startDate.toISOString().split('T')[0];
    document.getElementById('endDate').value = endDate.toISOString().split('T')[0];
});

// Sidebar toggle
const sidebarToggle = document.querySelector('.sidebar-toggle');
if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('collapsed');
        document.querySelector('.main-content').classList.toggle('expanded');
        document.querySelector('.footer').classList.toggle('expanded');
    });
}

// Auto-update summary cards based on table data
function updateSummaryCards() {
    const table = document.getElementById('reportTable');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    
    let totalItems = 0;
    let totalValue = 0;
    let lowStock = 0;
    let outOfStock = 0;

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const stock = parseInt(cells[4].textContent);
        const value = cells[7].textContent.replace(/[^\d]/g, '');
        
        totalItems += stock;
        totalValue += parseInt(value);
        
        if (stock === 0) {
            outOfStock++;
        } else if (stock <= 5) {
            lowStock++;
        }
    }

    // Update cards (in real app)
    console.log('Summary:', {
        totalItems,
        totalValue,
        lowStock,
        outOfStock
    });
}

// Call on load
window.addEventListener('DOMContentLoaded', updateSummaryCards);
