// Auto-generate transaction ID
function generateTransactionId() {
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    return 'TRX' + randomNum;
}

// Update tipe indicator
function updateTipeIcon() {
    const tipe = document.getElementById('tipeTransaksi').value;
    const indicator = document.getElementById('tipeIndicator');
    
    if (tipe === 'Masuk') {
        indicator.className = 'tipe-indicator show masuk';
        indicator.innerHTML = '<i class="fas fa-arrow-down"></i> Barang akan ditambahkan ke stok';
    } else if (tipe === 'Keluar') {
        indicator.className = 'tipe-indicator show keluar';
        indicator.innerHTML = '<i class="fas fa-arrow-up"></i> Barang akan dikurangi dari stok';
    } else {
        indicator.className = 'tipe-indicator';
    }
    
    calculateNewStock();
    updateSummary();
}

// Update barang info
function updateBarangInfo() {
    const select = document.getElementById('barang');
    const selectedOption = select.options[select.selectedIndex];
    
    if (select.value) {
        const stok = selectedOption.getAttribute('data-stok');
        const satuan = selectedOption.getAttribute('data-satuan');
        
        document.getElementById('currentStock').textContent = stok + ' ' + satuan;
        document.getElementById('currentSatuan').textContent = satuan;
        
        document.getElementById('stockInfo').classList.add('show');
        
        // Check if stock is low
        if (parseInt(stok) <= 5) {
            showAlert('warning', 'Perhatian! Stok barang ini sudah menipis.');
        }
        
        // Check if trying to remove from empty stock
        const tipe = document.getElementById('tipeTransaksi').value;
        if (tipe === 'Keluar' && parseInt(stok) === 0) {
            showAlert('danger', 'Tidak dapat mengeluarkan barang! Stok kosong.');
        }
    } else {
        document.getElementById('stockInfo').classList.remove('show');
    }
    
    calculateNewStock();
    updateSummary();
}

// Calculate new stock
function calculateNewStock() {
    const select = document.getElementById('barang');
    const selectedOption = select.options[select.selectedIndex];
    const tipe = document.getElementById('tipeTransaksi').value;
    const quantity = parseInt(document.getElementById('quantity').value) || 0;
    
    if (select.value && tipe && quantity > 0) {
        const currentStock = parseInt(selectedOption.getAttribute('data-stok'));
        const satuan = selectedOption.getAttribute('data-satuan');
        let newStock;
        
        if (tipe === 'Masuk') {
            newStock = currentStock + quantity;
        } else if (tipe === 'Keluar') {
            newStock = currentStock - quantity;
            
            // Validate if enough stock
            if (newStock < 0) {
                showToast('Quantity melebihi stok yang tersedia!', 'error');
                document.getElementById('quantity').value = currentStock;
                newStock = 0;
            }
        }
        
        document.getElementById('newStock').textContent = newStock + ' ' + satuan;
        document.getElementById('stockPreview').classList.add('show');
        
        // Change color based on stock level
        const newStockEl = document.getElementById('newStock');
        if (newStock === 0) {
            newStockEl.style.color = '#dc3545';
        } else if (newStock <= 5) {
            newStockEl.style.color = '#ffc107';
        } else {
            newStockEl.style.color = 'white';
        }
    } else {
        document.getElementById('stockPreview').classList.remove('show');
    }
    
    updateSummary();
}

// Update summary
function updateSummary() {
    const barangSelect = document.getElementById('barang');
    const tipe = document.getElementById('tipeTransaksi').value;
    const quantity = document.getElementById('quantity').value;
    const tanggal = document.getElementById('tanggal').value;
    const waktu = document.getElementById('waktu').value;
    
    // Update barang
    if (barangSelect.value) {
        const barangText = barangSelect.options[barangSelect.selectedIndex].text;
        document.getElementById('summaryBarang').textContent = barangText.split('(')[0].trim();
    } else {
        document.getElementById('summaryBarang').textContent = '-';
    }
    
    // Update tipe
    document.getElementById('summaryTipe').textContent = tipe || '-';
    
    // Update quantity
    if (quantity && barangSelect.value) {
        const satuan = barangSelect.options[barangSelect.selectedIndex].getAttribute('data-satuan');
        document.getElementById('summaryQty').textContent = quantity + ' ' + satuan;
    } else {
        document.getElementById('summaryQty').textContent = '-';
    }
    
    // Update date time
    if (tanggal && waktu) {
        const [year, month, day] = tanggal.split('-');
        const formattedDate = `${day}/${month}/${year} ${waktu}`;
        document.getElementById('summaryDateTime').textContent = formattedDate;
    } else {
        document.getElementById('summaryDateTime').textContent = '-';
    }
}

// Show alert
function showAlert(type, message) {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Create new alert
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
    `;
    
    const formContainer = document.querySelector('.form-container');
    formContainer.insertBefore(alert, formContainer.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// Handle form submit
function handleSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = {};
    
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Validate required fields
    if (!data.tipeTransaksi || !data.barang || !data.quantity || 
        !data.tanggal || !data.waktu) {
        showToast('Mohon lengkapi semua field yang wajib diisi!', 'error');
        return;
    }
    
    // Validate quantity
    const quantity = parseInt(data.quantity);
    if (quantity <= 0) {
        showToast('Quantity harus lebih dari 0!', 'error');
        return;
    }
    
    // Additional validation for stock out
    if (data.tipeTransaksi === 'Keluar') {
        const select = document.getElementById('barang');
        const selectedOption = select.options[select.selectedIndex];
        const currentStock = parseInt(selectedOption.getAttribute('data-stok'));
        
        if (quantity > currentStock) {
            showToast('Quantity melebihi stok yang tersedia!', 'error');
            return;
        }
    }
    
    // Simulate save operation
    console.log('Saving transaction:', data);
    
    // Show success message
    showToast('Transaksi berhasil ditambahkan!', 'success');
    
    // Redirect after 2 seconds
    setTimeout(() => {
        window.location.href = 'stock-berjalan.html';
    }, 2000);
}

// Reset form
function resetForm() {
    if (confirm('Apakah Anda yakin ingin mereset form?')) {
        document.getElementById('addStockForm').reset();
        document.getElementById('stockInfo').classList.remove('show');
        document.getElementById('stockPreview').classList.remove('show');
        document.getElementById('tipeIndicator').className = 'tipe-indicator';
        
        // Reset summary
        document.getElementById('summaryBarang').textContent = '-';
        document.getElementById('summaryTipe').textContent = '-';
        document.getElementById('summaryQty').textContent = '-';
        document.getElementById('summaryDateTime').textContent = '-';
        
        // Generate new ID
        document.getElementById('idTransaksi').value = generateTransactionId();
        
        showToast('Form berhasil direset', 'warning');
    }
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
    // Generate transaction ID
    document.getElementById('idTransaksi').value = generateTransactionId();
    
    // Set current date and time
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().slice(0, 5);
    
    document.getElementById('tanggal').value = date;
    document.getElementById('waktu').value = time;
    
    // Add event listeners
    document.getElementById('quantity').addEventListener('input', calculateNewStock);
    document.getElementById('tanggal').addEventListener('change', updateSummary);
    document.getElementById('waktu').addEventListener('change', updateSummary);
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
