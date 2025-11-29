// Global variables
let deleteCategoryId = null;
let editMode = false;

// Search function
function searchTable() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toUpperCase();
    const table = document.getElementById('categoryTable');
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

// Open add modal
function openAddModal() {
    editMode = false;
    document.getElementById('modalTitle').textContent = 'Tambah Kategori';
    document.getElementById('categoryId').value = '';
    document.getElementById('categoryName').value = '';
    document.getElementById('categoryDesc').value = '';
    document.getElementById('categoryModal').style.display = 'block';
}

// Edit category
function editCategory(id, name, items) {
    editMode = true;
    document.getElementById('modalTitle').textContent = 'Edit Kategori';
    document.getElementById('categoryId').value = id;
    document.getElementById('categoryName').value = name;
    document.getElementById('categoryDesc').value = '';
    document.getElementById('categoryModal').style.display = 'block';
}

// Close category modal
function closeCategoryModal() {
    document.getElementById('categoryModal').style.display = 'none';
    editMode = false;
}

// Save category
function saveCategory() {
    const id = document.getElementById('categoryId').value;
    const name = document.getElementById('categoryName').value;
    const desc = document.getElementById('categoryDesc').value;

    if (!name) {
        showToast('Nama kategori harus diisi!', 'error');
        return;
    }

    // Simulate save operation
    console.log('Saving category:', { id, name, desc });

    if (editMode) {
        showToast('Kategori berhasil diupdate!', 'success');
    } else {
        showToast('Kategori berhasil ditambahkan!', 'success');
    }

    closeCategoryModal();
    
    // Reload page after 1 second
    setTimeout(() => {
        location.reload();
    }, 1000);
}

// Confirm delete
function confirmDelete(id, name) {
    deleteCategoryId = id;
    document.getElementById('categoryName').textContent = name;
    document.getElementById('deleteModal').style.display = 'block';
}

// Close delete modal
function closeDeleteModal() {
    document.getElementById('deleteModal').style.display = 'none';
    deleteCategoryId = null;
}

// Delete category
function deleteCategory() {
    if (deleteCategoryId) {
        // Simulate delete operation
        console.log('Deleting category:', deleteCategoryId);
        
        // Remove row from table
        const table = document.getElementById('categoryTable');
        const rows = table.getElementsByTagName('tr');
        
        for (let i = 1; i < rows.length; i++) {
            const firstCell = rows[i].getElementsByTagName('td')[0];
            if (firstCell && firstCell.textContent == deleteCategoryId) {
                rows[i].remove();
                break;
            }
        }
        
        closeDeleteModal();
        showToast('Kategori berhasil dihapus!', 'success');
        deleteCategoryId = null;
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

// Handle form submit
function handleSubmit(event) {
    event.preventDefault();
    saveCategory();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const categoryModal = document.getElementById('categoryModal');
    const deleteModal = document.getElementById('deleteModal');
    
    if (event.target === categoryModal) {
        closeCategoryModal();
    }
    if (event.target === deleteModal) {
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
