// Notre base de données simulée
const dbProducts = [
    { id: 1, name: "Chaussettes Nuage", color: "blanc", size: "S", height: "basse", price: 5.99, topSale: true, icon: "☁️🧦" },
    { id: 2, name: "Chaussettes Océan", color: "bleu", size: "M", height: "haute", price: 8.50, topSale: false, icon: "🌊🧦" },
    { id: 3, name: "Socquettes Furtives", color: "noir", size: "L", height: "basse", price: 4.99, topSale: true, icon: "🥷🧦" },
    { id: 4, name: "Chaussettes Feu", color: "rouge", size: "XL", height: "haute", price: 9.99, topSale: false, icon: "🔥🧦" },
    { id: 5, name: "Chaussettes Zèbre", color: "rayé", size: "M", height: "haute", price: 12.00, topSale: true, icon: "🦓🧦" },
    { id: 6, name: "Basiques Blanches", color: "blanc", size: "XXL", height: "haute", price: 6.50, topSale: false, icon: "⚪🧦" },
    { id: 7, name: "Socquettes Bleues", color: "bleu", size: "S", height: "basse", price: 5.00, topSale: false, icon: "🔵🧦" },
    { id: 8, name: "Chaussettes Nuit", color: "noir", size: "XL", height: "haute", price: 8.99, topSale: false, icon: "🌙🧦" }
];

// Si on n'est pas sur la page boutique, on ne lance pas ce script
if (document.getElementById('productsGrid')) {

    // Éléments du DOM
    const productsGrid = document.getElementById('productsGrid');
    const topSalesGrid = document.getElementById('topSalesGrid');
    const searchInput = document.getElementById('searchInput');
    const colorFilter = document.getElementById('colorFilter');
    const sizeFilter = document.getElementById('sizeFilter');
    const heightFilter = document.getElementById('heightFilter');
    const priceSort = document.getElementById('priceSort');

    // Fonction pour générer le HTML d'une carte produit
    function createProductCard(product) {
        return `
            <div class="card">
                <div class="card-img">${product.icon}</div>
                <h4>${product.name}</h4>
                <div class="tags">Taille: ${product.size} | ${product.height}</div>
                <div class="price">${product.price.toFixed(2)} €</div>
                <button class="btn" onclick="alert('Ajouté au panier !')">Acheter</button>
            </div>
        `;
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
