// Handle avatar change
function handleAvatarChange(event) {
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
            const avatarPreview = document.getElementById('avatarPreview');
            avatarPreview.innerHTML = `<img src="${e.target.result}" alt="Avatar">`;
        };
        reader.readAsDataURL(file);
        
        showToast('Foto profil berhasil dipilih', 'success');
    }
}

// Toggle password visibility
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const button = field.parentElement.querySelector('.toggle-password');
    const icon = button.querySelector('i');
    
    if (field.type === 'password') {
        field.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        field.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
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
    
    // Validate passwords if changing
    const oldPassword = data.oldPassword;
    const newPassword = data.newPassword;
    const confirmPassword = data.confirmPassword;
    
    if (oldPassword || newPassword || confirmPassword) {
        // Check if all password fields are filled
        if (!oldPassword || !newPassword || !confirmPassword) {
            showToast('Lengkapi semua field password untuk mengubah kata sandi!', 'error');
            return;
        }
        
        // Check if new passwords match
        if (newPassword !== confirmPassword) {
            showToast('Kata sandi baru dan konfirmasi tidak cocok!', 'error');
            return;
        }
        
        // Check password strength
        if (newPassword.length < 6) {
            showToast('Kata sandi minimal 6 karakter!', 'error');
            return;
        }
    }
    
    // Validate required fields
    if (!data.fullName || !data.username) {
        showToast('Nama lengkap dan nama panggilan harus diisi!', 'error');
        return;
    }
    
    // Simulate save operation
    console.log('Saving profile:', data);
    
    // Show success message
    showToast('Profil berhasil diperbarui!', 'success');
    
    // Clear password fields
    setTimeout(() => {
        document.getElementById('oldPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
    }, 1000);
}

// Cancel edit
function cancelEdit() {
    if (confirm('Apakah Anda yakin ingin membatalkan perubahan?')) {
        // Reset form to original values
        document.getElementById('profileForm').reset();
        
        // Reset avatar
        const avatarPreview = document.getElementById('avatarPreview');
        avatarPreview.innerHTML = '<i class="fas fa-camera"></i>';
        
        showToast('Perubahan dibatalkan', 'warning');
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

// Load user data on page load
window.addEventListener('DOMContentLoaded', () => {
    // Simulate loading user data
    const userData = {
        fullName: 'John Doe',
        username: 'johndoe',
        address: 'Jl. Contoh No. 123, Jakarta',
        role: 'Administrator',
        avatar: null
    };
    
    // Populate form
    document.getElementById('fullName').value = userData.fullName;
    document.getElementById('username').value = userData.username;
    document.getElementById('address').value = userData.address;
    document.getElementById('role').value = userData.role;
    
    // Load avatar if exists
    if (userData.avatar) {
        const avatarPreview = document.getElementById('avatarPreview');
        avatarPreview.innerHTML = `<img src="${userData.avatar}" alt="Avatar">`;
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

// Auto-save draft (optional feature)
let autoSaveTimer;
const formInputs = document.querySelectorAll('#profileForm input, #profileForm select');

formInputs.forEach(input => {
    input.addEventListener('input', () => {
        clearTimeout(autoSaveTimer);
        autoSaveTimer = setTimeout(() => {
            // Save draft to localStorage
            const formData = new FormData(document.getElementById('profileForm'));
            const data = {};
            formData.forEach((value, key) => {
                if (key !== 'oldPassword' && key !== 'newPassword' && key !== 'confirmPassword') {
                    data[key] = value;
                }
            });
            localStorage.setItem('profileDraft', JSON.stringify(data));
            console.log('Draft saved');
        }, 2000);
    });
});

// Load draft on page load
window.addEventListener('DOMContentLoaded', () => {
    const draft = localStorage.getItem('profileDraft');
    if (draft) {
        const data = JSON.parse(draft);
        Object.keys(data).forEach(key => {
            const field = document.getElementById(key);
            if (field && data[key]) {
                field.value = data[key];
            }
        });
    }
});
