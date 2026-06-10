
const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false';


async function fetchCryptoData() {
    const container = document.getElementById('crypto-container');

    try {

        const response = await fetch(apiUrl);


        if (!response.ok) {
            throw new Error(`Помилка мережі: ${response.status}`);
        }


        const data = await response.json();


        renderData(data, container);

    } catch (error) {

        console.error('Помилка fetch:', error);
        container.innerHTML = `<p class="error">Не вдалося завантажити дані. Спробуйте пізніше.</p>`;
    }
}


function renderData(coins, container) {

    container.innerHTML = '';


    coins.forEach(coin => {
        const card = document.createElement('div');
        card.className = 'crypto-card';


        const isPositive = coin.price_change_percentage_24h >= 0;
        const changeClass = isPositive ? 'positive' : 'negative';


        card.innerHTML = `
            <div class="coin-info">
                <img src="${coin.image}" alt="${coin.name}" class="coin-icon">
                <div class="coin-name">
                    <h2>${coin.name}</h2>
                    <span>${coin.symbol.toUpperCase()}</span>
                </div>
            </div>
            <div class="coin-price">
                <p class="price">$${coin.current_price.toLocaleString()}</p>
                <p class="change ${changeClass}">
                    ${coin.price_change_percentage_24h.toFixed(2)}%
                </p>
            </div>
        `;

        container.appendChild(card);
    });
}


document.addEventListener('DOMContentLoaded', fetchCryptoData);