/**
 * D'Agostino - Catalogo Scripts
 */

// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const filters = document.getElementById('filters');
const filterToggle = document.getElementById('filterToggle');
const filtersClose = document.getElementById('filtersClose');
const productsGrid = document.getElementById('productsGrid');

// State
let filtersOpen = false;
let mobileMenuOpen = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initFilters();
    initFilterGroups();
    initProductFiltering();
});

// Mobile Menu
function initMobileMenu() {
    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuOpen = !mobileMenuOpen;
        mobileMenuBtn.classList.toggle('active', mobileMenuOpen);
        mobileMenu.classList.toggle('open', mobileMenuOpen);
        document.body.classList.toggle('menu-open', mobileMenuOpen);
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuOpen = false;
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.classList.remove('menu-open');
        });
    });
}

// Filters
function initFilters() {
    if (!filters) return;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'filters-overlay';
    document.body.appendChild(overlay);

    // Toggle filters on mobile
    if (filterToggle) {
        filterToggle.addEventListener('click', openFilters);
    }

    if (filtersClose) {
        filtersClose.addEventListener('click', closeFilters);
    }

    overlay.addEventListener('click', closeFilters);

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && filtersOpen) {
            closeFilters();
        }
    });
}

function openFilters() {
    filtersOpen = true;
    filters.classList.add('open');
    document.querySelector('.filters-overlay').classList.add('active');
    document.body.classList.add('menu-open');
}

function closeFilters() {
    filtersOpen = false;
    filters.classList.remove('open');
    document.querySelector('.filters-overlay').classList.remove('active');
    document.body.classList.remove('menu-open');
}

// Filter Groups Toggle
function initFilterGroups() {
    document.querySelectorAll('.filter-title').forEach(title => {
        title.addEventListener('click', () => {
            const group = title.closest('.filter-group');
            group.classList.toggle('collapsed');
        });
    });
}

// Product Filtering Logic
function initProductFiltering() {
    const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    const productCards = document.querySelectorAll('.product-card');
    const resultsCount = document.querySelector('.results-count strong');
    const emptyState = document.querySelector('.empty-state');
    const resetBtn = document.querySelector('.filters-reset');
    const emptyResetBtn = document.querySelector('.empty-state .btn');

    if (!filterCheckboxes.length || !productCards.length) return;

    // Get active filters
    function getActiveFilters() {
        const activeFilters = {
            category: [],
            brand: [],
            power: [],
            energy: []
        };

        filterCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const filterType = checkbox.name;
                const filterValue = checkbox.value;
                if (activeFilters[filterType] !== undefined) {
                    activeFilters[filterType].push(filterValue);
                }
            }
        });

        return activeFilters;
    }

    // Check if any filters are active
    function hasActiveFilters(activeFilters) {
        return Object.values(activeFilters).some(arr => arr.length > 0);
    }

    // Check if product matches filters
    function productMatchesFilters(product, activeFilters) {
        // Coming soon products only match by category
        const isComingSoon = product.classList.contains('coming-soon');

        const category = product.dataset.category || '';
        const brand = product.dataset.brand || '';
        const power = product.dataset.power || '';
        const energy = product.dataset.energy || '';

        // If no filters active, show all
        if (!hasActiveFilters(activeFilters)) return true;

        // For coming-soon products, only check category
        if (isComingSoon) {
            // If category filter is active, check if matches
            if (activeFilters.category.length > 0) {
                return activeFilters.category.includes(category);
            }
            // If other filters are active but not category, hide coming-soon
            return false;
        }

        // For real products, check all filters (AND between types, OR within type)
        let matchesCategory = activeFilters.category.length === 0 || activeFilters.category.includes(category);
        let matchesBrand = activeFilters.brand.length === 0 || activeFilters.brand.includes(brand);
        let matchesPower = activeFilters.power.length === 0 || activeFilters.power.includes(power);
        let matchesEnergy = activeFilters.energy.length === 0 || activeFilters.energy.includes(energy);

        return matchesCategory && matchesBrand && matchesPower && matchesEnergy;
    }

    // Apply filters
    function applyFilters() {
        const activeFilters = getActiveFilters();
        let visibleCount = 0;
        let realProductCount = 0;

        productCards.forEach(card => {
            const matches = productMatchesFilters(card, activeFilters);
            const isComingSoon = card.classList.contains('coming-soon');

            if (matches) {
                card.style.display = '';
                visibleCount++;
                if (!isComingSoon) {
                    realProductCount++;
                }
            } else {
                card.style.display = 'none';
            }
        });

        // Update count
        if (resultsCount) {
            resultsCount.textContent = realProductCount;
        }

        // Show/hide empty state
        if (emptyState && productsGrid) {
            if (visibleCount === 0) {
                emptyState.style.display = 'block';
                productsGrid.style.display = 'none';
            } else {
                emptyState.style.display = 'none';
                productsGrid.style.display = '';
            }
        }
    }

    // Add event listeners to checkboxes
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    // Reset filters
    function resetFilters() {
        filterCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        applyFilters();
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }

    if (emptyResetBtn) {
        emptyResetBtn.addEventListener('click', resetFilters);
    }

    // Initial apply
    applyFilters();
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Product card hover effect
document.querySelectorAll('.product-card:not(.coming-soon)').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Animation on scroll
if ('IntersectionObserver' in window) {
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                animateObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.product-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`;
        animateObserver.observe(el);
    });
}
