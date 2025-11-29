// Format currency input
function formatCurrency(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value) {
        value = parseInt(value).toLocaleString('id-ID');
    }
    
    input.value = value;
    calculateMargin();
}

// Calculate profit margin
function calculateMargin() {
    const hargaBeli = document.getElementById('hargaBeli').value.replace(/\D/g, '');
    const hargaJual = document.getElementById('hargaJual').value.replace(/\D/g, '');
    
    if (hargaBeli && hargaJual) {
        const beli = parseInt(hargaBeli);
        const jual = parseInt(hargaJual);
        const margin = jual - beli;
        const marginPercent = ((margin / beli) * 100).toFixed(2);
        
        document.getElementById('marginAmount').textContent = 
            'Rp ' + margin.toLocaleString('id-ID');
        document.getElementById('marginPercent').textContent = 
            '(' + marginPercent + '%)';
        
        // Change color based on margin
        const marginAmountEl = document.getElementById('marginAmount');
        if (margin > 0) {
            marginAmountEl.style.color = '#28a745';
        } else if (margin < 0) {
            marginAmountEl.style.color = '#dc3545';
        } else {
            marginAmountEl.style.color = '#666';
        }
    }
}

// Handle file selection
function handleFileSelect(event) {
    const file = event.target.files[0];
    
    if (file) {
        // Validate file type
        if (!file.type.match('image.*')) {
            showToast('File harus berupa gambar!', 'error');
            return;
        }
        
        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            showToast('Ukuran file maksimal 2MB!', 'error');
            return;
        }
        
        // Preview image
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('imagePreview');
            preview.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <button type="button" class="remove-image" onclick="removeImage()">
                    <i class="fas fa-times"></i>
                </button>
            `;
            preview.classList.add('show');
        };
        reader.readAsDataURL(file);
    }
}

// Remove image
function removeImage() {
    document.getElementById('fileInput').value = '';
    const preview = document.getElementById('imagePreview');
    preview.innerHTML = '';
    preview.classList.remove('show');
}

// Drag and drop functionality
const uploadArea = document.getElementById('uploadArea');

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#1a3a6b';
    uploadArea.style.background = 'rgba(26, 58, 107, 0.05)';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = '#d0d0d0';
    uploadArea.style.background = 'transparent';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#d0d0d0';
    uploadArea.style.background = 'transparent';
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        document.getElementById('fileInput').files = files;
        handleFileSelect({ target: { files: files } });
    }
});

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
    if (!data.kodeBarang || !data.namaBarang || !data.kategori || 
        !data.stok || !data.satuan || !data.hargaBeli || !data.hargaJual) {
        showToast('Mohon lengkapi semua field yang wajib diisi!', 'error');
        return;
    }
    
    // Simulate save operation
    console.log('Saving data:', data);
    
    // Show success message
    showToast('Barang berhasil ditambahkan!', 'success');
    
    // Redirect after 2 seconds
    setTimeout(() => {
        window.location.href = 'barang.html';
    }, 2000);
}

// Reset form
function resetForm() {
    if (confirm('Apakah Anda yakin ingin mereset form?')) {
        document.getElementById('addBarangForm').reset();
        removeImage();
        document.getElementById('marginAmount').textContent = 'Rp 0';
        document.getElementById('marginPercent').textContent = '(0%)';
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

// Auto-generate kode barang
window.addEventListener('DOMContentLoaded', () => {
    const kodeBarang = document.getElementById('kodeBarang');
    if (!kodeBarang.value) {
        // Generate random code
        const randomNum = Math.floor(Math.random() * 9000) + 1000;
        kodeBarang.value = 'BRG' + randomNum;
    }
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

// Add event listeners for price inputs
document.getElementById('hargaBeli').addEventListener('input', function() {
    formatCurrency(this);
});

document.getElementById('hargaJual').addEventListener('input', function() {
    formatCurrency(this);
});
