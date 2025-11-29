// Profile Dropdown Toggle
function toggleProfileDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    const trigger = document.querySelector('.profile-trigger');
    
    dropdown.classList.toggle('show');
    trigger.classList.toggle('active');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('profileDropdown');
    const trigger = document.querySelector('.profile-trigger');
    
    if (dropdown && trigger) {
        if (!trigger.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.remove('show');
            trigger.classList.remove('active');
        }
    }
});

// Handle logout
function handleLogout(event) {
    event.preventDefault();
    
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        // Simulate logout
        console.log('Logging out...');
        
        // Clear session/localStorage if needed
        // localStorage.clear();
        // sessionStorage.clear();
        
        // Redirect to login page
        window.location.href = '../index.html';
    }
}

// Close dropdown on ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const dropdown = document.getElementById('profileDropdown');
        const trigger = document.querySelector('.profile-trigger');
        
        if (dropdown && dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
            trigger.classList.remove('active');
        }
    }
});
