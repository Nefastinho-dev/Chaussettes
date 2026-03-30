// Constellation de données (Base de données simulée)
const dbProducts = [
    { id: 1, name: "Nuage Néo", color: "blanc", size: "S", height: "basse", price: 5.99, topSale: true, icon: "☁️🧦", desc: "La douceur d'un rêve numérique. Fibre ultra-légère pour vos moments de cocooning éthérés." },
    { id: 2, name: "Abysse", color: "bleu", size: "M", height: "haute", price: 8.50, topSale: false, icon: "🌊🧦", desc: "Une plongée dans un océan de confort avec ce bleu profond et mystérieux." },
    { id: 3, name: "Furtive Noire Mat", color: "noir", size: "L", height: "basse", price: 4.99, topSale: true, icon: "🥷🧦", desc: "Minimalisme furtif pour une discrétion absolue et un style épuré." },
    { id: 4, name: "Néo-Rouge Éclat", color: "rouge", size: "XL", height: "haute", price: 9.99, topSale: false, icon: "🔥🧦", desc: "L'énergie pure à vos pieds. Un rouge vif qui attire tous les regards." },
    { id: 5, name: "Pulsar Zèbre", color: "rayé", size: "M", height: "haute", price: 12.00, topSale: true, icon: "🦓🧦", desc: "L'audace graphique par excellence. Un motif pulsant pour les visionnaires." },
    { id: 6, name: "Pulsar Blanc Mat", color: "blanc", size: "XXL", height: "haute", price: 6.50, topSale: false, icon: "⚪🧦", desc: "Le classique indémodable réinventé avec une fibre ultra-blanche et résistante." },
    { id: 7, name: "Furtive Cyan Mat", color: "bleu", size: "S", height: "basse", price: 5.00, topSale: false, icon: "🔵🧦", desc: "Une touche de cyan discrète pour un style furtif et moderne." },
    { id: 8, name: "Abysse Noire Mat", color: "noir", size: "XL", height: "haute", price: 8.99, topSale: false, icon: "🌙🧦", desc: "L'élégance absolue de la nuit. Parfaites pour les soirées néo-chic." }
];

// Vérifier si on est sur la page boutique (shop.html)
if (document.getElementById('productsGrid')) {

    const productsGrid = document.getElementById('productsGrid');
    const topSalesGrid = document.getElementById('topSalesGrid');
    const searchInput = document.getElementById('searchInput');
    const colorFilter = document.getElementById('colorFilter');
    const sizeFilter = document.getElementById('sizeFilter');
    const heightFilter = document.getElementById('heightFilter');
    const priceSort = document.getElementById('priceSort');
    
    // Éléments de la modale
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.close-btn');
    const modalDetails = document.getElementById('modalDetails');

    // Générer la carte produit Néon
    function createProductCard(product) {
        return `
            <div class="card" onclick="openModal(${product.id})">
                <div class="card-img">${product.icon}</div>
                <h4>${product.name}</h4>
                <div class="tags">${product.size} | ${product.height}</div>
                <div class="price">${product.price.toFixed(2)} €</div>
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
