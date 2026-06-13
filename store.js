// Funny Bunny E-Commerce Store Shared JS State & Engine

// 1. Central Product Database (Prices in EGP)
const PRODUCTS_DATABASE = [
    {
        id: "floral-top",
        title: "Retro Bloom Floral Top",
        category: "women",
        season: "summer",
        price: 1450.00,
        originalPrice: 1950.00,
        image: "assets/floral-top-with-sunglasses-and-colorful-jewelry-2026-03-19-23-40-24-utc.webp",
        rating: 4.8,
        badge: "Hot",
        description: "An elegant, premium summer top featuring vibrant retro floral patterns. Made with high-quality breathable cotton fabric, perfect for sunny beach outings and warm evening gatherings.",
        specs: {
            "Material": "100% Breathable Cotton",
            "Fit": "Relaxed Fit",
            "Care Instructions": "Machine wash cold with like colors, tumble dry low.",
            "Manufacturer": "Funny Bunny Apparel Factory"
        },
        colors: ["#ffffff", "#ffc0cb", "#add8e6"],
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: "knit-sweater",
        title: "Urban Cozy Knit Sweater",
        category: "women",
        season: "autumn",
        price: 2250.00,
        originalPrice: 2950.00,
        image: "assets/stylish-outfit-with-sweater-purse-and-pink-jeans-2026-03-16-02-35-19-utc.webp",
        rating: 4.9,
        badge: "New",
        description: "This elegant pink knit sweater features an ultra-soft texture designed to keep you warm and stylish during cooler autumn days. Perfect for layering with denim or skirts.",
        specs: {
            "Material": "80% Organic Wool, 20% Recycled Acrylic",
            "Fit": "Oversized Fit",
            "Care Instructions": "Dry clean recommended or hand wash cold.",
            "Manufacturer": "Funny Bunny Apparel Factory"
        },
        colors: ["#ffc0cb", "#d3d3d3", "#808080"],
        sizes: ["S", "M", "L"]
    },
    {
        id: "winter-jacket",
        title: "Fleece Winter Trail Jacket",
        category: "men",
        season: "winter",
        price: 3950.00,
        originalPrice: 4950.00,
        image: "assets/winter-clothes-and-accessories-for-outdoor-adventu-2026-03-27-01-49-26-utc.webp",
        rating: 4.7,
        badge: "Sale",
        description: "Built for the outdoors, this heavy-duty winter jacket features multiple utility pockets, insulated lining, and windproof outer shell. Ideal for outdoor adventures and snowy peaks.",
        specs: {
            "Material": "100% Polyester Insulation, Nylon Shell",
            "Fit": "Regular Fit",
            "Care Instructions": "Machine wash gentle cycle, line dry.",
            "Manufacturer": "Funny Bunny Outdoor Division"
        },
        colors: ["#2f4f4f", "#000080", "#000000"],
        sizes: ["M", "L", "XL", "XXL"]
    },
    {
        id: "pastel-set",
        title: "Spring Meadow Pastel Set",
        category: "women",
        season: "spring",
        price: 2650.00,
        originalPrice: 3250.00,
        image: "assets/female-spring-clothing-glasses-and-flowers-on-blu-2026-01-09-08-04-11-utc.webp",
        rating: 4.6,
        badge: "Limited",
        description: "A delightful spring coordinate set in soft pastel colors, featuring breathable lightweight materials. Celebrate the spring season in full comfort and high style.",
        specs: {
            "Material": "60% Silk, 40% Organic Linen",
            "Fit": "Slim Fit",
            "Care Instructions": "Hand wash only, iron on low heat.",
            "Manufacturer": "Funny Bunny Luxury Lab"
        },
        colors: ["#add8e6", "#e0eee0", "#ffe4e1"],
        sizes: ["S", "M", "L"]
    },
    {
        id: "family-denim",
        title: "Classic Family Denim Shirt",
        category: "men",
        season: "spring",
        price: 1750.00,
        originalPrice: 2250.00,
        image: "assets/smiling-family-togetherness-love-and-support-on-w-2026-01-06-00-29-16-utc.webp",
        rating: 4.9,
        badge: "Trending",
        description: "Crafted for durability and style, this classic mid-wash denim shirt is perfect for family outings. Breathable cotton fabric with double breast pockets and signature copper buttons.",
        specs: {
            "Material": "100% Cotton Denim",
            "Fit": "Regular Fit",
            "Care Instructions": "Wash dark colors separately, tumble dry medium.",
            "Manufacturer": "Funny Bunny Denim Co."
        },
        colors: ["#4682b4", "#000080"],
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: "kids-essentials",
        title: "Junior Wardrobe Essentials Set",
        category: "kids",
        season: "autumn",
        price: 1950.00,
        originalPrice: 2450.00,
        image: "assets/big-wardrobe-in-clothing-store-for-children-and-ad-2026-01-05-23-38-01-utc.webp",
        rating: 4.8,
        badge: "Popular",
        description: "A complete bundle of kids wardrobe essentials, featuring premium quality shirts, jackets, and accessories designed for high-activity play and warm comfort.",
        specs: {
            "Material": "100% Organic Stretch Cotton",
            "Fit": "Comfort Active Fit",
            "Care Instructions": "Machine wash warm, tumble dry low.",
            "Manufacturer": "Funny Bunny Kids Division"
        },
        colors: ["#ffa500", "#ffc0cb", "#32cd32"],
        sizes: ["XS", "S", "M", "L"]
    }
];

// 2. Shopping Cart Actions
function getCart() {
    try {
        const stored = localStorage.getItem('fb_cart');
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Error reading cart from localStorage", e);
        return [];
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem('fb_cart', JSON.stringify(cart));
        updateCartBadge();
        window.dispatchEvent(new Event('storage'));
    } catch (e) {
        console.error("Error saving cart to localStorage", e);
    }
}

function addToCart(productId, quantity = 1, size = "M", color = "Default") {
    const product = PRODUCTS_DATABASE.find(p => p.id === productId);
    if (!product) return;

    let cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === productId && item.size === size && item.color === color);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += parseInt(quantity);
    } else {
        cart.push({
            id: productId,
            title: product.title,
            price: product.price,
            image: product.image,
            size: size,
            color: color,
            quantity: parseInt(quantity)
        });
    }

    saveCart(cart);
    showNotification(`Added ${quantity}x ${product.title} to your cart!`);
}

function removeFromCart(productId, size, color) {
    let cart = getCart();
    cart = cart.filter(item => !(item.id === productId && item.size === size && item.color === color));
    saveCart(cart);
}

function updateCartQuantity(productId, size, color, newQty) {
    let cart = getCart();
    const index = cart.findIndex(item => item.id === productId && item.size === size && item.color === color);
    if (index > -1) {
        cart[index].quantity = parseInt(newQty);
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        saveCart(cart);
    }
}

function clearCart() {
    saveCart([]);
}

function getCartSubtotal() {
    return getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
        const cart = getCart();
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = totalItems;
        if (totalItems > 0) {
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
}

// 3. Custom notification popup
function showNotification(msg) {
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = 'position:fixed;bottom:20px;left:20px;z-index:9999;display:flex;flex-direction:column;gap:10px;';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.style.cssText = 'background:rgba(10,10,10,0.9);border:1px solid #D4AF37;color:#f5f5f5;padding:12px 24px;border-radius:4px;backdrop-filter:blur(10px);box-shadow:0 0 10px rgba(212,175,55,0.2);animation:fadeInUp 0.3s ease;font-size:0.9rem;';
    toast.textContent = msg;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s ease';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// 4. Customizer Engine & LocalStorage Customizations
const CUSTOMIZER_STORAGE_KEY = 'fb_store_customizations';

function getCustomizations() {
    try {
        const stored = localStorage.getItem(CUSTOMIZER_STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch (e) {
        return {};
    }
}

function saveCustomization(key, value) {
    try {
        const customs = getCustomizations();
        customs[key] = value;
        localStorage.setItem(CUSTOMIZER_STORAGE_KEY, JSON.stringify(customs));
    } catch (e) {
        console.error(e);
    }
}

function applyCustomizations() {
    const customs = getCustomizations();
    document.querySelectorAll('[data-edit-key]').forEach(el => {
        const key = el.getAttribute('data-edit-key');
        if (customs[key]) {
            if (el.tagName === 'IMG') {
                el.src = customs[key];
            } else if (el.tagName === 'VIDEO' || el.tagName === 'SOURCE') {
                el.src = customs[key];
                if (el.tagName === 'SOURCE') {
                    const videoEl = el.parentElement;
                    if (videoEl && videoEl.load) {
                        videoEl.load();
                    }
                }
            } else {
                el.textContent = customs[key];
            }
        }
    });
}

// 5. Admin Customizer Panel Logic
let isAdminAuthenticated = false;

function initAdminPortal() {
    if (!document.getElementById('customizer-sidebar')) {
        const panel = document.createElement('div');
        panel.id = 'customizer-sidebar';
        panel.className = 'customizer-panel';
        panel.innerHTML = `
            <div class="customizer-header">
                <h3>Store Customizer</h3>
                <span class="modal-close" onclick="toggleCustomizerSidebar()">&times;</span>
            </div>
            <div class="customizer-scrollable">
                <p style="font-size: 0.85rem; color: var(--text-muted);">
                    Modify page text or image URLs live. Click any element marked with a border on the page, or use the controls below.
                </p>
                <div class="form-group">
                    <label>Selected Element Key</label>
                    <input type="text" id="cust-elem-key" readonly placeholder="Click an element to edit">
                </div>
                <div class="form-group">
                    <label>Value (Text Content or Image URL)</label>
                    <textarea id="cust-elem-val" rows="4" placeholder="Enter new text or image file path..."></textarea>
                </div>
                <button class="btn btn-primary" onclick="applySelectedCustomization()">Apply Change</button>
                <div style="border-top: 1px solid var(--border-color); margin: 15px 0;"></div>
                <button class="btn btn-outline" style="width: 100%;" onclick="exportCleanHTML()">Export Clean HTML</button>
            </div>
        `;
        document.body.appendChild(panel);
    }

    if (!document.getElementById('admin-login-modal')) {
        const modal = document.createElement('div');
        modal.id = 'admin-login-modal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Admin Portal Login</h3>
                    <span class="modal-close" onclick="closeAdminLoginModal()">&times;</span>
                </div>
                <div class="form-group" style="margin-bottom:15px;">
                    <label>Username</label>
                    <input type="text" id="admin-user" value="admin">
                </div>
                <div class="form-group" style="margin-bottom:20px;">
                    <label>Password</label>
                    <input type="password" id="admin-pass" value="">
                </div>
                <div id="login-error" style="color:#ff4d4d; font-size:0.85rem; margin-bottom:15px; display:none;">
                    Invalid username or password.
                </div>
                <button class="btn btn-primary" style="width:100%;" onclick="handleAdminLogin()">Log In</button>
            </div>
        `;
        document.body.appendChild(modal);
    }

    const trigger = document.getElementById('admin-portal-btn');
    if (trigger) {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            if (isAdminAuthenticated) {
                toggleCustomizerSidebar();
            } else {
                openAdminLoginModal();
            }
        });
    }
}

function openAdminLoginModal() {
    const modal = document.getElementById('admin-login-modal');
    if (modal) {
        modal.classList.add('active');
        document.getElementById('admin-pass').focus();
    }
}

function closeAdminLoginModal() {
    const modal = document.getElementById('admin-login-modal');
    if (modal) modal.classList.remove('active');
}

function handleAdminLogin() {
    const user = document.getElementById('admin-user').value;
    const pass = document.getElementById('admin-pass').value;
    const err = document.getElementById('login-error');

    if (user === 'admin' && pass === 'admin') {
        isAdminAuthenticated = true;
        err.style.display = 'none';
        closeAdminLoginModal();
        enableCustomizerMode();
        showNotification("Welcome Admin! Customizer mode activated.");
    } else {
        err.style.display = 'block';
    }
}

function enableCustomizerMode() {
    document.body.classList.add('admin-mode');
    toggleCustomizerSidebar();

    document.querySelectorAll('[data-edit-key]').forEach(el => {
        el.classList.add('editable-highlight');
        el.addEventListener('click', handleEditableElementClick);
    });
}

function toggleCustomizerSidebar() {
    const panel = document.getElementById('customizer-sidebar');
    if (panel) panel.classList.toggle('active');
}

function handleEditableElementClick(e) {
    if (!isAdminAuthenticated) return;
    e.preventDefault();
    e.stopPropagation();

    const el = e.currentTarget;
    const key = el.getAttribute('data-edit-key');
    let val = '';

    if (el.tagName === 'IMG' || el.tagName === 'VIDEO' || el.tagName === 'SOURCE') {
        val = el.src;
    } else {
        val = el.textContent.trim();
    }

    document.getElementById('cust-elem-key').value = key;
    document.getElementById('cust-elem-val').value = val;

    const panel = document.getElementById('customizer-sidebar');
    if (panel && !panel.classList.contains('active')) {
        panel.classList.add('active');
    }
}

function applySelectedCustomization() {
    const key = document.getElementById('cust-elem-key').value;
    const val = document.getElementById('cust-elem-val').value;

    if (!key) {
        alert("Please click on an editable element first!");
        return;
    }

    saveCustomization(key, val);
    applyCustomizations();
    showNotification("Customization applied successfully!");
}

function exportCleanHTML() {
    const docClone = document.documentElement.cloneNode(true);

    const sidebar = docClone.querySelector('#customizer-sidebar');
    if (sidebar) sidebar.remove();
    const loginModal = docClone.querySelector('#admin-login-modal');
    if (loginModal) loginModal.remove();
    const toast = docClone.querySelector('#notification-container');
    if (toast) toast.remove();

    const body = docClone.querySelector('body');
    if (body) {
        body.classList.remove('admin-mode');
    }

    docClone.querySelectorAll('.editable-highlight').forEach(el => {
        el.classList.remove('editable-highlight');
    });

    const customs = getCustomizations();
    docClone.querySelectorAll('[data-edit-key]').forEach(el => {
        const key = el.getAttribute('data-edit-key');
        if (customs[key]) {
            if (el.tagName === 'IMG') {
                el.setAttribute('src', customs[key]);
            } else if (el.tagName === 'VIDEO' || el.tagName === 'SOURCE') {
                el.setAttribute('src', customs[key]);
            } else {
                el.textContent = customs[key];
            }
        }
    });

    const htmlString = '<!DOCTYPE html>\n' + docClone.outerHTML;
    const filename = window.location.pathname.split('/').pop() || 'index.html';
    
    const blob = new Blob([htmlString], { type: 'text/html;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification(`Downloaded clean ${filename}!`);
}

// 7. General Initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Sticky Header background toggle
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Mobile nav toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Theme Toggle Handler (Light/Dark Mode)
    const savedTheme = localStorage.getItem('fb_theme') || 'dark';
    const themeBtn = document.getElementById('theme-toggle-btn');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    } else {
        document.body.classList.remove('light-mode');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            localStorage.setItem('fb_theme', isLight ? 'light' : 'dark');
            themeBtn.innerHTML = isLight ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
            showNotification(`Theme switched to ${isLight ? 'Light' : 'Dark'} mode!`);
        });
    }

    // Apply any customized content saved locally
    applyCustomizations();

    // Update cart badge initially
    updateCartBadge();

    // Init admin portal triggers
    initAdminPortal();

    // Watch for storage changes from other tabs to sync cart
    window.addEventListener('storage', () => {
        updateCartBadge();
    });
});
