// Product prices in Philippine Pesos (PHP)
const productPrices = {
  'iPhone 12': 39900,
  'iPhone 12 mini': 34900,
  'iPhone 12 Pro': 52900,
  'iPhone 12 Pro Max': 59900,

  'iPhone 13': 45900,
  'iPhone 13 mini': 39900,
  'iPhone 13 Pro': 59900,
  'iPhone 13 Pro Max': 67900,

  'iPhone 14': 52900,
  'iPhone 14 Plus': 59900,
  'iPhone 14 Pro': 69900,
  'iPhone 14 Pro Max': 79900,

  'iPhone 15': 56990,
  'iPhone 15 Plus': 63990,
  'iPhone 15 Pro': 70990,
  'iPhone 15 Pro Max': 84990,
};

document.addEventListener('DOMContentLoaded', () => {
  const user = localStorage.getItem('user');
  const btnLogout = document.getElementById('btnLogout');
  if (btnLogout) {
    if (user) {
      btnLogout.style.display = 'inline-block';
    } else {
      btnLogout.style.display = 'none';
    }
    btnLogout.addEventListener('click', () => {
      localStorage.removeItem('user');
      alert('Logged out successfully.');
      window.location.href = 'index.html';
    });
  }
});

// series.html logic
if (window.location.pathname.includes('series.html')) {
  const urlParams = new URLSearchParams(window.location.search);
  const series = urlParams.get('series');

  const seriesModels = {
    '12': [
      { name: 'iPhone 12' },
      { name: 'iPhone 12 mini' },
      { name: 'iPhone 12 Pro' },
      { name: 'iPhone 12 Pro Max' },
    ],
    '13': [
      { name: 'iPhone 13' },
      { name: 'iPhone 13 mini' },
      { name: 'iPhone 13 Pro' },
      { name: 'iPhone 13 Pro Max' },
    ],
    '14': [
      { name: 'iPhone 14' },
      { name: 'iPhone 14 Plus' },
      { name: 'iPhone 14 Pro' },
      { name: 'iPhone 14 Pro Max' },
    ],
    '15': [
      { name: 'iPhone 15' },
      { name: 'iPhone 15 Plus' },
      { name: 'iPhone 15 Pro' },
      { name: 'iPhone 15 Pro Max' },
    ],
  };

  const models = seriesModels[series] || [];
  document.getElementById('seriesTitle').textContent = `iPhone ${series} Series`;

  const list = document.getElementById('modelList');
  models.forEach((model) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <a href="purchase.html?model=${encodeURIComponent(model.name)}">
        <div class="card-body">
          <h3>${model.name}</h3>
          <p>Price: ₱${productPrices[model.name].toLocaleString()}</p>
        </div>
      </a>
    `;
    list.appendChild(card);
  });
}

// purchase.html logic
if (window.location.pathname.includes('purchase.html')) {
  const urlParams = new URLSearchParams(window.location.search);
  const model = urlParams.get('model');
  const price = productPrices[model] || 0;

  document.getElementById('purchaseTitle').textContent = `Buy ${model}`;
  document.getElementById('details').textContent = `You selected: ${model}. Price: ₱${price.toLocaleString()}`;

  const user = localStorage.getItem('user');
  const loginCheck = document.getElementById('loginCheck');
  const btnPurchase = document.getElementById('btnPurchase');

  if (user) {
    loginCheck.innerHTML = `<p class="logged-in">Logged in as <strong>${user}</strong></p>`;
    btnPurchase.disabled = false;
  } else {
    loginCheck.innerHTML = `<p class="not-logged-in">Please <a href="login.html">login</a> to purchase.</p>`;
    btnPurchase.disabled = true;
  }

  btnPurchase.addEventListener('click', () => {
    if (!user) {
      alert('You must login first.');
      window.location.href = 'login.html';
      return;
    }
    const date = new Date();
    const receipt = `
=== RECEIPT ===
Date: ${date.toLocaleString()}
User: ${user}
Model: ${model}
Price: ₱${price.toLocaleString()}

Thank you for your purchase!
`;
    alert(receipt);
  });
}
