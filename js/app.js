import { getCryptoData } from './api.js';

const container = document.getElementById('cryptoContainer');

async function renderDisplay() {
    const coins = await getCryptoData();
    
    if (!coins) {
        container.innerHTML = `
            <div class="error-msg">
                <p>⚠️ API limit reached. Please wait a minute and refresh.</p>
            </div>`;
        return;
    }
    
    container.innerHTML = ''; // Clear loader

    coins.forEach(coin => {
        const card = document.createElement('div');
        card.className = 'crypto-card';
        
        // Logic for price color (green for up, red for down)
        const priceColor = coin.price_change_percentage_24h > 0 ? 'text-green' : 'text-red';

        card.innerHTML = `
            <img src="${coin.image}" alt="${coin.name}" width="50">
            <h3>${coin.name} <span>(${coin.symbol.toUpperCase()})</span></h3>
            <p class="price">$${coin.current_price.toLocaleString()}</p>
            <p class="${priceColor}">${coin.price_change_percentage_24h.toFixed(2)}%</p>
        `;
        container.appendChild(card);
    });
}

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.crypto-card');

    cards.forEach(card => {
        // Look at the H3 tag inside each card
        const coinName = card.querySelector('h3').innerText.toLowerCase();
        
        if (coinName.includes(searchValue)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Initial fetch
renderDisplay();

// Refresh data every 60 seconds
setInterval(renderDisplay, 60000);