// Search dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchToggle = document.getElementById('search-toggle');
    const searchDropdown = document.getElementById('search-dropdown');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');
    
    let isOpen = false;
    
    function openSearch() {
        if (isOpen) return;
        isOpen = true;
        searchDropdown.classList.add('active');
        setTimeout(() => {
            searchInput?.focus();
        }, 100);
    }
    
    function closeSearch() {
        if (!isOpen) return;
        isOpen = false;
        searchDropdown.classList.remove('active');
        if (searchInput) {
            searchInput.value = '';
            searchInput.blur();
        }
    }
    
    searchToggle?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isOpen) {
            closeSearch();
        } else {
            openSearch();
        }
    });
    
    searchClose?.addEventListener('click', (e) => {
        e.stopPropagation();
        closeSearch();
    });
    
    document.addEventListener('click', (e) => {
        if (!searchDropdown?.contains(e.target) && !searchToggle?.contains(e.target)) {
            closeSearch();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) {
            closeSearch();
        }
    });
    
    searchInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const searchTerm = e.target.value.trim();
            if (searchTerm) {
                console.log('Searching for:', searchTerm);
                closeSearch();
            }
        }
    });
});