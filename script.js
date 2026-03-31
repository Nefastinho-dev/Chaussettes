const dbProducts = [
    { id: 1, name: "L'Émeraude", color: "vert", size: "S", height: "haute", price: 18.00, topSale: true, icon: "🌿", desc: "Notre signature. Un vert sapin profond tissé dans un coton bio d'une douceur absolue." },
    { id: 2, name: "Nuage de Lait", color: "blanc", size: "M", height: "basse", price: 15.50, topSale: false, icon: "☁️", desc: "La pureté incarnée. Une socquette légère, idéale pour vos moments de détente." },
    { id: 3, name: "Noir Fusain", color: "noir", size: "L", height: "haute", price: 16.00, topSale: true, icon: "🖋️", desc: "L'élégance intemporelle. Un noir mat élégant qui s'accorde avec toutes vos tenues." },
    { id: 4, name: "Fil d'Or", color: "doré", size: "XL", height: "haute", price: 22.00, topSale: false, icon: "✨", desc: "Pour les grandes occasions. De subtils fils dorés entrelacés." },
    { id: 5, name: "L'Automnale", color: "rouge", size: "M", height: "haute", price: 17.00, topSale: true, icon: "🍁", desc: "Un rouge bordeaux chaleureux, parfait pour l'hiver." },
    { id: 6, name: "Blanc Crème", color: "blanc", size: "L", height: "haute", price: 16.50, topSale: false, icon: "🕊️", desc: "Un classique revisité. Épaisse et confortable." },
    { id: 7, name: "Vert Sauge", color: "vert", size: "S", height: "basse", price: 14.00, topSale: false, icon: "🍵", desc: "Une teinte douce et apaisante." },
    { id: 8, name: "Nuit Étoilée", color: "noir", size: "XL", height: "haute", price: 20.00, topSale: false, icon: "🌃", desc: "Un noir-bleu profond pour les amateurs de belles matières." }
];

function createProductCard(product) {
    return `
        <div class="card" onclick="openModal(${product.id})">
            <div class="card-img">${product.icon}</div>
            <h4>${product.name}</h4>
            <div class="tags">${product.size} | ${product.height}</div>
            <div class="price">${product.price.toFixed(2)} €</div>
            <button class="btn-primary" style="width: 100%; padding: 0.6rem; font-size: 0.8rem;">DÉCOUVRIR</button>
        </div>
    `;
}

function renderProducts() {
    const productsContainer = document.getElementById('productsGrid');
    const topSalesGrid = document.getElementById('topSalesGrid');
    const topSalesSection = document.getElementById('topSalesSection');

    // Récupération des filtres
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const color = document.getElementById('colorFilter').value;
    const size = document.getElementById('sizeFilter').value;
    const height = document.getElementById('heightFilter').value;
    const sort = document.getElementById('priceSort').value;

    // 1. Filtrage
    let filtered = dbProducts.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(searchTerm) || p.color.includes(searchTerm);
        const matchColor = color === 'toutes' || p.color === color;
        const matchSize = size === 'toutes' || p.size === size;
        const matchHeight = height === 'toutes' || p.height === height;
        return matchSearch && matchColor && matchSize && matchHeight;
    });

    // 2. Tri
    if (sort === 'asc') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'desc') filtered.sort((a, b) => b.price - a.price);

    // 3. Affichage des Top Sales (seulement si on ne filtre rien)
    if (!searchTerm && color === 'toutes' && size === 'toutes' && height === 'toutes') {
        topSalesSection.style.display = 'block';
        topSalesGrid.innerHTML = filtered.filter(p => p.topSale).map(createProductCard).join('');
    } else {
        topSalesSection.style.display = 'none';
    }

    // 4. Groupement par Catégorie (Couleur)
    const categories = [...new Set(filtered.map(p => p.color))];
    let finalHtml = '';

    categories.forEach(cat => {
        const catProducts = filtered.filter(p => p.color === cat);
        finalHtml += `
            <div class="category-section">
                <h3 class="category-title">Nuance ${cat.charAt(0).toUpperCase() + cat.slice(1)}</h3>
                <div class="grid">${catProducts.map(createProductCard).join('')}</div>
            </div>
        `;
    });

    productsContainer.innerHTML = finalHtml || '<p style="text-align:center; color:var(--text-muted);">Aucun modèle ne correspond à votre recherche.</p>';
}

// Logique Modale
window.openModal = function(id) {
    const p = dbProducts.find(item => item.id === id);
    const modal = document.getElementById('productModal');
    document.getElementById('modalDetails').innerHTML = `
        <div style="font-size: 5rem; margin-bottom: 1rem;">${p.icon}</div>
        <h2 style="color: var(--primary-green); margin-bottom: 1rem;">${p.name}</h2>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">${p.desc}</p>
        <div class="price" style="font-size: 2rem; margin-bottom: 2rem;">${p.price.toFixed(2)} €</div>
        <button class="btn-primary" onclick="alert('Ajouté au panier !')">AJOUTER AU PANIER</button>
    `;
    modal.classList.add('show');
}

// Initialisation des écouteurs
document.querySelectorAll('select, input').forEach(el => el.addEventListener('change', renderProducts));
document.getElementById('searchInput').addEventListener('input', renderProducts);
document.querySelector('.close-btn').onclick = () => document.getElementById('productModal').classList.remove('show');

// Premier rendu
renderProducts();
    function renderProducts() {
        let filtered = [...dbProducts];

        // 1. Application des filtres
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm) || p.color.includes(searchTerm));
        }
        if (colorFilter.value !== 'toutes') filtered = filtered.filter(p => p.color === colorFilter.value);
        if (sizeFilter.value !== 'toutes') filtered = filtered.filter(p => p.size === sizeFilter.value);
        if (heightFilter.value !== 'toutes') filtered = filtered.filter(p => p.height === heightFilter.value);

        // 2. Tri par prix
        if (priceSort.value === 'asc') filtered.sort((a, b) => a.price - b.price);
        else if (priceSort.value === 'desc') filtered.sort((a, b) => b.price - a.price);

        // --- AFFICHAGE DES TOP SALES (Uniquement s'il n'y a pas de recherche active) ---
        if (!searchTerm && colorFilter.value === 'toutes') {
            const topSellers = filtered.filter(p => p.topSale);
            topSalesGrid.parentElement.style.display = 'block';
            topSalesGrid.innerHTML = topSellers.map(createProductCard).join('');
        } else {
            topSalesGrid.parentElement.style.display = 'none'; // On cache les coups de cœur si on filtre
        }

        // --- AFFICHAGE GROUPÉ PAR CATÉGORIE (COULEUR) ---
        // On récupère uniquement les produits qui ne sont pas dans "Top Sales" pour éviter les doublons
        // OU on affiche tout mais groupé (plus propre pour le luxe)
        
        const categories = [...new Set(filtered.map(p => p.color))]; // Liste des couleurs présentes
        let finalHtml = '';

        categories.forEach(cat => {
            const catProducts = filtered.filter(p => p.color === cat);
            const catName = cat.charAt(0).toUpperCase() + cat.slice(1);
            
            finalHtml += `
                <div class="category-section">
                    <h3 class="category-title">Nuance ${catName}</h3>
                    <div class="grid">${catProducts.map(createProductCard).join('')}</div>
                </div>
            `;
        });

        productsContainer.innerHTML = finalHtml || '<p style="color:var(--text-muted); text-align:center; padding: 2rem;">Aucune pièce ne correspond à votre sélection.</p>';
    }
    
    // ... (Code de la modale inchangé)
    window.openModal = function(productId) {
        const product = dbProducts.find(p => p.id === productId);
        modalDetails.innerHTML = `
            <div style="font-size: 5rem; margin-bottom: 1rem;">${product.icon}</div>
            <h2 style="margin: 1rem 0; font-size: 2rem; color: var(--primary-green); font-family: var(--font-heading);">${product.name}</h2>
            <div class="tags" style="margin-bottom: 1.5rem; color: var(--accent-gold);">
                Taille: ${product.size} | Style: ${product.height}
            </div>
            <p style="color: var(--text-muted); margin-bottom: 2rem; font-size: 0.95rem;">${product.desc}</p>
            <div style="font-size: 1.8rem; color: var(--primary-green); font-weight: 600; margin-bottom: 2rem;">${product.price.toFixed(2)} €</div>
            <button class="btn-primary" onclick="alert('🛍️ ${product.name} ajouté(e) !')" style="width: 100%;">Ajouter au panier</button>
        `;
        modal.classList.add('show');
    };

    closeBtn.onclick = () => modal.classList.remove('show');
    window.onclick = e => { if (e.target == modal) modal.classList.remove('show'); };
    searchInput.addEventListener('input', renderProducts);
    colorFilter.addEventListener('change', renderProducts);
    sizeFilter.addEventListener('change', renderProducts);
    heightFilter.addEventListener('change', renderProducts);
    priceSort.addEventListener('change', renderProducts);

    renderProducts();
}
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

        productsGrid.style.opacity = 0;
        if(topSalesGrid) topSalesGrid.style.opacity = 0;

        setTimeout(() => {
            productsGrid.innerHTML = filtered.map(createProductCard).join('') || '<p style="color:var(--text-muted); grid-column: 1/-1;">Aucune pièce ne correspond à votre recherche.</p>';
            
            if(topSalesGrid) {
                const topSellers = filtered.filter(p => p.topSale);
                topSalesGrid.innerHTML = topSellers.length ? topSellers.map(createProductCard).join('') : '<p style="color:var(--text-muted);">Aucune suggestion pour le moment.</p>';
                topSalesGrid.style.opacity = 1;
            }
            productsGrid.style.opacity = 1;
        }, 150);
    }
    
    window.openModal = function(productId) {
        const product = dbProducts.find(p => p.id === productId);
        modalDetails.innerHTML = `
            <div style="font-size: 5rem; margin-bottom: 1rem;">${product.icon}</div>
            <h2 style="margin: 1rem 0; font-size: 2rem; color: var(--primary-green); font-family: var(--font-heading);">${product.name}</h2>
            <div class="tags" style="margin-bottom: 1.5rem; color: var(--accent-gold);">
                Taille: ${product.size} | Style: ${product.height}
            </div>
            <p style="color: var(--text-muted); margin-bottom: 2rem; font-size: 0.95rem;">${product.desc}</p>
            <div style="font-size: 1.8rem; color: var(--primary-green); font-weight: 600; margin-bottom: 2rem;">${product.price.toFixed(2)} €</div>
            <button class="btn-primary" onclick="alert('🛍️ ${product.name} ajouté(e) à votre panier d\\'exception !')" style="width: 100%;">
                Ajouter au panier
            </button>
        `;
        modal.classList.add('show');
    };

    closeBtn.onclick = () => modal.classList.remove('show');
    window.onclick = e => { if (e.target == modal) modal.classList.remove('show'); };

    searchInput.addEventListener('input', renderProducts);
    colorFilter.addEventListener('change', renderProducts);
    sizeFilter.addEventListener('change', renderProducts);
    heightFilter.addEventListener('change', renderProducts);
    priceSort.addEventListener('change', renderProducts);

    renderProducts();
}

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

        productsGrid.style.opacity = 0;
        if(topSalesGrid) topSalesGrid.style.opacity = 0;

        setTimeout(() => {
            productsGrid.innerHTML = filtered.map(createProductCard).join('') || '<p style="color:var(--text-muted); grid-column: 1/-1;">Aucune pièce ne correspond à votre recherche.</p>';
            
            if(topSalesGrid) {
                const topSellers = filtered.filter(p => p.topSale);
                topSalesGrid.innerHTML = topSellers.length ? topSellers.map(createProductCard).join('') : '<p style="color:var(--text-muted);">Aucune suggestion pour le moment.</p>';
                topSalesGrid.style.opacity = 1;
            }
            productsGrid.style.opacity = 1;
        }, 150);
    }
    
    window.openModal = function(productId) {
        const product = dbProducts.find(p => p.id === productId);
        modalDetails.innerHTML = `
            <div style="font-size: 5rem; margin-bottom: 1rem;">${product.icon}</div>
            <h2 class="modal-title">${product.name}</h2>
            <div class="tags" style="margin-bottom: 1.5rem; color: var(--text-muted);">
                Taille: ${product.size} | Style: ${product.height}
            </div>
            <p class="modal-desc">${product.desc}</p>
            <div style="font-size: 1.8rem; color: var(--primary-green); font-weight: 600; margin-bottom: 2rem;">${product.price.toFixed(2)} €</div>
            <button class="btn-primary" onclick="alert('🛍️ ${product.name} ajouté(e) à votre panier d\\'exception !')" style="width: 100%;">
                Ajouter au panier
            </button>
        `;
        modal.classList.add('show');
    };

    closeBtn.onclick = () => modal.classList.remove('show');
    window.onclick = e => { if (e.target == modal) modal.classList.remove('show'); };

    searchInput.addEventListener('input', renderProducts);
    colorFilter.addEventListener('change', renderProducts);
    sizeFilter.addEventListener('change', renderProducts);
    heightFilter.addEventListener('change', renderProducts);
    priceSort.addEventListener('change', renderProducts);

    renderProducts();
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
