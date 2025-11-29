// Global variables
let deleteItemId = null;

// Search function
function searchTable() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toUpperCase();
    const table = document.getElementById('stockTable');
    const tr = table.getElementsByTagName('tr');

    for (let i = 1; i < tr.length; i++) {
        let found = false;
        const td = tr[i].getElementsByTagName('td');
        
        for (let j = 0; j < td.length - 1; j++) {
            if (td[j]) {
                const txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }
        }
        
        tr[i].style.display = found ? '' : 'none';
    }
}

// Filter by type
function filterByType() {
    const select = document.getElementById('typeFilter');
    const filter = select.value;
    const table = document.getElementById('stockTable');
    const tr = table.getElementsByTagName('tr');

    for (let i = 1; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName('td')[2]; // Tipe column
        
        if (td) {
            const badge = td.querySelector('.badge');
            const txtValue = badge ? badge.textContent : '';
            
            if (filter === '' || txtValue === filter) {
                tr[i].style.display = '';
            } else {
                tr[i].style.display = 'none';
            }
        }
    }
}

// Filter by status
function filterByStatus() {
    const select = document.getElementById('statusFilter');
    const filter = select.value;
    // Implement status filter logic here
    console.log('Filter by status:', filter);
}

// Filter by date
function filterByDate() {
    const dateInput = document.getElementById('dateFilter');
    const filterDate = dateInput.value;
    
    if (!filterDate) return;
    
    const table = document.getElementById('stockTable');
    const tr = table.getElementsByTagName('tr');
    const [year, month, day] = filterDate.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    for (let i = 1; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName('td')[6]; // Tanggal column
        
        if (td) {
            const txtValue = td.textContent || td.innerText;
            tr[i].style.display = txtValue === formattedDate ? '' : 'none';
        }
    }
}

// View item details
function viewItem(id) {
    // Sample data - in real app, fetch from database
    const data = {
        'TRX001': {
            id: 'TRX001',
            nama: 'Laptop Asus ROG',
            tipe: 'Masuk',
            qty: '15 Unit',
            tanggal: '15/01/2025',
            waktu: '10:30 AM'
        },
        'TRX002': {
            id: 'TRX002',
            nama: 'Mouse Logitech',
            tipe: 'Keluar',
            qty: '8 Unit',
            tanggal: '15/01/2025',
            waktu: '11:45 AM'
        }
    };

    const item = data[id] || data['TRX001'];
    
    document.getElementById('detailId').textContent = item.id;
    document.getElementById('detailNama').textContent = item.nama;
    document.getElementById('detailTipe').textContent = item.tipe;
    document.getElementById('detailQty').textContent = item.qty;
    document.getElementById('detailTanggal').textContent = item.tanggal;
    document.getElementById('detailWaktu').textContent = item.waktu;
    
    document.getElementById('viewModal').style.display = 'block';
}

// Close view modal
function closeViewModal() {
    document.getElementById('viewModal').style.display = 'none';
}

// Edit item
function editItem(id) {
    showToast('Mengedit transaksi ID: ' + id, 'warning');
    // Redirect to edit page
    window.location.href = 'stock-berjalan-add.html?id=' + id;
}

// Confirm delete
function confirmDelete(id, name) {
    deleteItemId = id;
    document.getElementById('itemName').textContent = name;
    document.getElementById('deleteModal').style.display = 'block';
}

// Close delete modal
function closeDeleteModal() {
    document.getElementById('deleteModal').style.display = 'none';
    deleteItemId = null;
}

// Delete item
function deleteItem() {
    if (deleteItemId) {
        // Simulate delete operation
        console.log('Deleting transaction:', deleteItemId);
        
        // Remove row from table
        const table = document.getElementById('stockTable');
        const rows = table.getElementsByTagName('tr');
        
        for (let i = 1; i < rows.length; i++) {
            const firstCell = rows[i].getElementsByTagName('td')[0];
            if (firstCell && firstCell.textContent === deleteItemId) {
                rows[i].remove();
                break;
            }
        }
        
        closeDeleteModal();
        showToast('Transaksi berhasil dihapus!', 'success');
        deleteItemId = null;
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

// Close modal when clicking outside
window.onclick = function(event) {
    const deleteModal = document.getElementById('deleteModal');
    const viewModal = document.getElementById('viewModal');
    
    if (event.target === deleteModal) {
        closeDeleteModal();
    }
    if (event.target === viewModal) {
        closeViewModal();
    }
}

// Sidebar toggle
const sidebarToggle = document.querySelector('.sidebar-toggle');
if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('collapsed');
        document.querySelector('.main-content').classList.toggle('expanded');
        document.querySelector('.footer').classList.toggle('expanded');
    });
}
