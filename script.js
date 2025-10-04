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
  const navBar = document.getElementById('navBar');
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');

  if (user) {
    // Hide login and signup buttons
    if (loginBtn) loginBtn.style.display = 'none';
    if (signupBtn) signupBtn.style.display = 'none';

    // Create greeting span
    const greeting = document.createElement('span');
    greeting.className = 'nav-greeting';
    greeting.textContent = `Welcome, ${user}!`;

    // Create logout button
    const btnLogout = document.createElement('button');
    btnLogout.className = 'btn-logout';
    btnLogout.textContent = 'Logout';

    btnLogout.addEventListener('click', () => {
      localStorage.removeItem('user');
      alert('Logged out successfully.');
      window.location.reload();
    });

    // Append greeting and logout button
    navBar.appendChild(greeting);
    navBar.appendChild(btnLogout);
  }

  // Series page model listing logic
  if (window.location.pathname.includes('series.html')) {
    // Get series param from URL or default to '12'
    const urlParams = new URLSearchParams(window.location.search);
    const series = urlParams.get('series') || '12';

    const seriesModels = {
      '12': [
        { name: 'iPhone 12', image: 'images/iphone12.jpg' },
        { name: 'iPhone 12 mini', image: 'images/iphone12mini.jpg' },
        { name: 'iPhone 12 Pro', image: 'images/iphone12pro.jpg' },
        { name: 'iPhone 12 Pro Max', image: 'images/iphone12promax.jpg' },
      ],
      '13': [
        { name: 'iPhone 13', image: 'images/iphone13.jpg' },
        { name: 'iPhone 13 mini', image: 'images/iphone13mini.jpg' },
        { name: 'iPhone 13 Pro', image: 'images/iphone13pro.jpg' },
        { name: 'iPhone 13 Pro Max', image: 'images/iphone13promax.jpg' },
      ],
      '14': [
        { name: 'iPhone 14', image: 'images/iphone14.jpg' },
        { name: 'iPhone 14 Plus', image: 'images/iphone14plus.jpg' },
        { name: 'iPhone 14 Pro', image: 'images/iphone14pro.jpg' },
        { name: 'iPhone 14 Pro Max', image: 'images/iphone14promax.jpg' },
      ],
      '15': [
        { name: 'iPhone 15', image: 'images/iphone15.jpg' },
        { name: 'iPhone 15 Plus', image: 'images/iphone15plus.jpg' },
        { name: 'iPhone 15 Pro', image: 'images/iphone15pro.jpg' },
        { name: 'iPhone 15 Pro Max', image: 'images/iphone15promax.jpg' },
      ],
    };

    const models = seriesModels[series] || [];

    const seriesTitle = document.getElementById('seriesTitle');
    if (seriesTitle) seriesTitle.textContent = `iPhone ${series} Series`;

    const list = document.getElementById('modelList');
    if (list) {
      list.innerHTML = ''; // clear previous content
      models.forEach((model) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <a href="purchase.html?model=${encodeURIComponent(model.name)}">
            <img src="${model.image}" alt="${model.name}" style="width:100%; height:auto; border-radius:10px 10px 0 0;" />
            <div class="card-body">
              <h3>${model.name}</h3>
              <p>Price: ₱${productPrices[model.name].toLocaleString()}</p>
            </div>
          </a>
        `;
        list.appendChild(card);
      });
    }
  }
});

