// Global variables
let deleteItemId = null;

// Search function
function searchTable() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toUpperCase();
    const table = document.getElementById('barangTable');
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

// Filter by category
function filterByCategory() {
    const select = document.getElementById('categoryFilter');
    const filter = select.value;
    const table = document.getElementById('barangTable');
    const tr = table.getElementsByTagName('tr');

    for (let i = 1; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName('td')[3]; // Kategori column
        
        if (td) {
            const txtValue = td.textContent || td.innerText;
            if (filter === '' || txtValue === filter) {
                tr[i].style.display = '';
            } else {
                tr[i].style.display = 'none';
            }
        }
    }
}

// View item details
function viewItem(id) {
    showToast('Menampilkan detail barang ID: ' + id, 'success');
    // Implement view logic here
    console.log('View item:', id);
}

// Edit item
function editItem(id) {
    showToast('Mengedit barang ID: ' + id, 'warning');
    // Redirect to edit page
    window.location.href = 'add-barang.html?id=' + id;
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
        console.log('Deleting item:', deleteItemId);
        
        // Remove row from table
        const table = document.getElementById('barangTable');
        const rows = table.getElementsByTagName('tr');
        
        for (let i = 1; i < rows.length; i++) {
            const firstCell = rows[i].getElementsByTagName('td')[0];
            if (firstCell && firstCell.textContent == deleteItemId) {
                rows[i].remove();
                break;
            }
        }
        
        closeDeleteModal();
        showToast('Barang berhasil dihapus!', 'success');
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
    const modal = document.getElementById('deleteModal');
    if (event.target === modal) {
        closeDeleteModal();
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
