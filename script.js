const products = [
    { id: 1, name: "VOID BLACK", color: "noir", price: 15, icon: "🌑", desc: "Le noir absolu pour une discrétion totale." },
    { id: 2, name: "NEON BLUE", color: "bleu", price: 18, icon: "💠", desc: "Fibre luminescente pour les explorateurs urbains." },
    { id: 3, name: "PURE WHITE", color: "blanc", price: 12, icon: "⚪", desc: "Minimalisme technologique pur." },
    { id: 4, name: "CYBER RED", color: "rouge", price: 22, icon: "🧧", desc: "Énergie maximale et compression sport." },
    { id: 5, name: "STEALTH", color: "noir", price: 25, icon: "🕶️", desc: "Édition limitée renforcée au carbone." }
];

const grid = document.getElementById('productsGrid');
const modal = document.getElementById('productModal');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close');

let activeFilters = { color: 'toutes', sort: 'aucun' };

function displayProducts() {
    let filtered = products.filter(p => activeFilters.color === 'toutes' || p.color === activeFilters.color);
    
    if (activeFilters.sort === 'asc') filtered.sort((a,b) => a.price - b.price);
    else if (activeFilters.sort === 'desc') filtered.sort((a,b) => b.price - a.price);

    grid.innerHTML = filtered.map(p => `
        <div class="card" onclick="openModal(${p.id})">
            <span class="card-icon">${p.icon}</span>
            <h3>${p.name}</h3>
            <div class="price">${p.price} €</div>
            <button class="btn-buy" style="padding:8px">DÉTAILS</button>
        </div>
    `).join('');
}

// Gestion des Chips (Filtres)
function initChips(containerId, filterKey) {
    const container = document.getElementById(containerId);
    const chips = container.querySelectorAll('.chip');

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            container.querySelector('.chip.active').classList.remove('active');
            chip.classList.add('active');
            activeFilters[filterKey] = chip.dataset.value;
            displayProducts();
        });
    });
}

window.openModal = (id) => {
    const p = products.find(x => x.id === id);
    modalBody.innerHTML = `
        <div style="font-size:5rem">${p.icon}</div>
        <h2 style="font-family:Orbitron; color:var(--accent); margin:1rem 0">${p.name}</h2>
        <p style="color:#aaa; margin-bottom:1.5rem">${p.desc}</p>
        <div class="price">${p.price} €</div>
        <button class="btn-buy" onclick="alert('Transaction initiée...')">AJOUTER AU PANIER</button>
    `;
    modal.classList.add('show');
};

closeBtn.onclick = () => modal.classList.remove('show');
window.onclick = (e) => { if(e.target == modal) modal.classList.remove('show'); };

// Lancement
if (grid) {
    initChips('colorChips', 'color');
    initChips('priceChips', 'sort');
    displayProducts();
}
                document.querySelector(`#${containerId} .chip.active`).classList.remove('active');
                chip.classList.add('active');
                currentFilters[key] = chip.getAttribute('data-value');
                render();
            });
        });
    }

    window.openModal = (id) => {
        const p = dbProducts.find(x => x.id === id);
        modalDetails.innerHTML = `
            <div style="font-size:5rem; margin-bottom:1rem;">${p.icon}</div>
            <h2 style="margin-bottom:1rem;">${p.name}</h2>
            <p style="color:var(--text-muted); margin-bottom:2rem;">${p.desc}</p>
            <div class="price" style="font-size:2rem; margin-bottom:2rem;">${p.price.toFixed(2)} €</div>
            <button class="btn-primary" onclick="alert('Ajouté au panier !')">Acheter maintenant</button>
        `;
        modal.classList.add('show');
    };

    closeBtn.onclick = () => modal.classList.remove('show');
    window.onclick = e => { if(e.target == modal) modal.classList.remove('show'); };

    setupChips('colorChips', 'color');
    setupChips('priceChips', 'sort');
    render();
}
            const matchColor = filters.color === 'toutes' || p.color === filters.color;
            const matchSize = filters.size === 'toutes' || p.size === filters.size;
            return matchSearch && matchColor && matchSize;
        });

        if (filters.sort === 'asc') list.sort((a,b) => a.price - b.price);
        else if (filters.sort === 'desc') list.sort((a,b) => b.price - a.price);

        const cardHtml = p => `
            <div class="card" onclick="openModal(${p.id})">
                <span class="card-img">${p.icon}</span>
                <h3>${p.name}</h3>
                <p style="color:var(--text-muted); font-size:0.8rem;">${p.size} | ${p.color}</p>
                <div class="price">${p.price.toFixed(2)} €</div>
                <button class="btn-primary">VOIR</button>
            </div>
        `;

        productsGrid.innerHTML = list.map(cardHtml).join('');
        topSalesGrid.innerHTML = list.filter(p => p.topSale).map(cardHtml).join('') || '<p>Aucun top vente.</p>';
    }

    window.openModal = (id) => {
        const p = dbProducts.find(x => x.id === id);
        modalDetails.innerHTML = `
            <div style="font-size:5rem;">${p.icon}</div>
            <h2 style="color:var(--accent-violet); margin:1rem 0;">${p.name}</h2>
            <p style="color:var(--text-muted); margin-bottom:2rem;">${p.desc}</p>
            <div class="price">${p.price.toFixed(2)} €</div>
            <button class="btn-primary" onclick="alert('Synchronisé !')">AJOUTER AU PANIER</button>
        `;
        modal.classList.add('show');
    };

    closeBtn.onclick = () => modal.classList.remove('show');
    window.onclick = e => { if(e.target == modal) modal.classList.remove('show'); };

    setupChips('colorChips', 'color');
    setupChips('sizeChips', 'size');
    setupChips('priceChips', 'sort');
    searchInput.addEventListener('input', render);
    render();
}
                <button class="btn-primary" style="width: 100%; padding: 0.6rem; font-size: 0.95rem;">Synchroniser</button>
            </div>
        `;
    }

    // Affichage et filtrage avec animations douces
    function renderProducts() {
        let filtered = [...dbProducts];

        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm) || p.color.includes(searchTerm));
        }

        if (colorFilter.value !== 'toutes') filtered = filtered.filter(p => p.color === colorFilter.value);
        if (sizeFilter.value !== 'toutes') filtered = filtered.filter(p => p.size === sizeFilter.value);
        if (heightFilter.value !== 'toutes') filtered = filtered.filter(p => p.height === heightFilter.value);

        if (priceSort.value === 'asc') filtered.sort((a, b) => a.price - b.price);
        else if (priceSort.value === 'desc') filtered.sort((a, b) => b.price - a.price);

        // Appliquer un effet de fondu pendant la mise à jour
        productsGrid.style.opacity = 0;
        topSalesGrid.style.opacity = 0;

        setTimeout(() => {
            productsGrid.innerHTML = filtered.map(createProductCard).join('');
            const topSellers = filtered.filter(p => p.topSale);
            topSalesGrid.innerHTML = topSellers.length ? topSellers.map(createProductCard).join('') : '<p style="color:var(--text-muted); padding: 1rem;">Aucune pulsar pour ces critères.</p>';
            
            productsGrid.style.opacity = 1;
            topSalesGrid.style.opacity = 1;
        }, 150); // Petit délai pour le fondu
    }

    // --- Gestion de la Modale Pulsar ---
    
    // Fonction globale pour ouvrir la modale
    window.openModal = function(productId) {
        const product = dbProducts.find(p => p.id === productId);
        
        modalDetails.innerHTML = `
            <div class="modal-img">${product.icon}</div>
            <h2 class="modal-title">${product.name}</h2>
            <div class="tags" style="margin-bottom: 2rem; background:rgba(0,0,0,0.5)">
                Calibre: ${product.size} | Coupe: ${product.height} | Vibe: ${product.color}
            </div>
            <p class="modal-desc">${product.desc}</p>
            <div class="modal-price">${product.price.toFixed(2)} €</div>
            <button class="btn-primary" onclick="alert('🛍️ ${product.name} synchronisée(s) !')" style="font-size: 1.1rem; padding: 1.1rem 2.5rem;">
                Ajouter au panier
            </button>
        `;
        
        modal.classList.add('show');
    };

    closeBtn.onclick = function() {
        modal.classList.remove('show');
    };

    // Fermer la modale si on clique en dehors du contenu
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.classList.remove('show');
        }
    };

    // Écouteurs d'événements
    searchInput.addEventListener('input', renderProducts);
    colorFilter.addEventListener('change', renderProducts);
    sizeFilter.addEventListener('change', renderProducts);
    heightFilter.addEventListener('change', renderProducts);
    priceSort.addEventListener('change', renderProducts);

    // Premier affichage
    renderProducts();
}
                <div class="price">${product.price.toFixed(2)} €</div>
                <button class="btn-primary" style="width: 100%; padding: 0.5rem; font-size: 0.9rem;">Voir détails</button>
            </div>
        `;
    }

    // Affichage et filtrage
    function renderProducts() {
        let filtered = [...dbProducts];

        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm) || p.color.includes(searchTerm));
        }

        if (colorFilter.value !== 'toutes') filtered = filtered.filter(p => p.color === colorFilter.value);
        if (sizeFilter.value !== 'toutes') filtered = filtered.filter(p => p.size === sizeFilter.value);
        if (heightFilter.value !== 'toutes') filtered = filtered.filter(p => p.height === heightFilter.value);

        if (priceSort.value === 'asc') filtered.sort((a, b) => a.price - b.price);
        else if (priceSort.value === 'desc') filtered.sort((a, b) => b.price - a.price);

        productsGrid.innerHTML = filtered.map(createProductCard).join('');

        const topSellers = filtered.filter(p => p.topSale);
        topSalesGrid.innerHTML = topSellers.length ? topSellers.map(createProductCard).join('') : '<p style="color:var(--text-muted)">Aucun top vente pour ces critères.</p>';
    }

    // --- Gestion de la Modale (Pop-up) ---
    
    // On rend la fonction globale pour qu'elle puisse être appelée par le onclick dans le HTML
    window.openModal = function(productId) {
        const product = dbProducts.find(p => p.id === productId);
        
        modalDetails.innerHTML = `
            <div class="modal-img">${product.icon}</div>
            <h2 class="modal-title">${product.name}</h2>
            <div class="tags" style="margin-bottom: 1.5rem;">Taille: ${product.size} | Coupe: ${product.height} | Couleur: ${product.color}</div>
            <p class="modal-desc">${product.desc}</p>
            <div class="modal-price">${product.price.toFixed(2)} €</div>
            <button class="btn-primary" onclick="alert('🛍️ ${product.name} ajouté(es) au panier !')" style="font-size: 1.1rem; padding: 1rem 2rem;">
                Ajouter au panier
            </button>
        `;
        
        modal.classList.add('show');
    };

    closeBtn.onclick = function() {
        modal.classList.remove('show');
    };

    // Fermer la modale si on clique en dehors du contenu
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.classList.remove('show');
        }
    };

    // Écouteurs d'événements
    searchInput.addEventListener('input', renderProducts);
    colorFilter.addEventListener('change', renderProducts);
    sizeFilter.addEventListener('change', renderProducts);
    heightFilter.addEventListener('change', renderProducts);
    priceSort.addEventListener('change', renderProducts);

    renderProducts();
}

    // Fonction principale pour afficher et filtrer
    function renderProducts() {
        let filtered = [...dbProducts];

        // 1. Recherche texte
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm) || p.color.includes(searchTerm));
        }

        // 2. Filtre Couleur
        if (colorFilter.value !== 'toutes') {
            filtered = filtered.filter(p => p.color === colorFilter.value);
        }

        // 3. Filtre Taille
        if (sizeFilter.value !== 'toutes') {
            filtered = filtered.filter(p => p.size === sizeFilter.value);
        }

        // 4. Filtre Hauteur
        if (heightFilter.value !== 'toutes') {
            filtered = filtered.filter(p => p.height === heightFilter.value);
        }

        // 5. Tri par Prix
        if (priceSort.value === 'asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (priceSort.value === 'desc') {
            filtered.sort((a, b) => b.price - a.price);
        }

        // Affichage Toute la collection
        productsGrid.innerHTML = filtered.map(createProductCard).join('');

        // Affichage Top Ventes (Uniquement les best-sellers parmi ceux filtrés, ou juste tous les best-sellers)
        const topSellers = filtered.filter(p => p.topSale);
        topSalesGrid.innerHTML = topSellers.length ? topSellers.map(createProductCard).join('') : '<p>Aucun top vente pour ces critères.</p>';
    }

    // Écouteurs d'événements pour mettre à jour la page en temps réel
    searchInput.addEventListener('input', renderProducts);
    colorFilter.addEventListener('change', renderProducts);
    sizeFilter.addEventListener('change', renderProducts);
    heightFilter.addEventListener('change', renderProducts);
    priceSort.addEventListener('change', renderProducts);

    // Premier affichage au chargement de la page
    renderProducts();
}
