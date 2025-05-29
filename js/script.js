// registeration
const registerform = document.getElementById('register');
registerform?.addEventListener('submit', (e) =>{
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
const userData = {
    username,
    email,
    password
}
let users = JSON.parse(localStorage.getItem('users')) || [];
users.push(userData);
localStorage.setItem('users', JSON.stringify(users));
alert('Signed Up successfully! You can now log in.');
window.location.href = 'login.html';
})


// Sign in
const loginform = document.getElementById('login');
loginform?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errormsg =document.getElementById('error');

const users = JSON.parse(localStorage.getItem('users')) || [];
const foundUser = users.find(user => user.email === email);

if (!foundUser) {
    errormsg.textContent = 'User not found.';
} 
else if (foundUser.password !== password) {
    errormsg.textContent = 'Incorrect password.';
}
else {
    errormsg.textContent = '';
    alert('Logged in successfully!');
    window.location.href = 'index.html';
}

})


// Logout
document.addEventListener('DOMContentLoaded', function() {
    const profileIcon = document.getElementById('profile-icon');
    const profileDropdown = document.getElementById('profile-dropdown');
    const profileContainer = document.querySelector('.profile-menu-container');
    
if (profileIcon && profileDropdown) {
    profileIcon.addEventListener('click', function(e) {
        e.preventDefault();
        profileContainer.classList.toggle('active');
    });
  }
})

const logoutBtn = document.getElementById('logout-btn');
logoutBtn?.addEventListener('click', () => {
    alert('Logged out successfully!');
    window.location.href = 'login.html';
});



// cart script
document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    const addToCartButtons = document.querySelectorAll('.cart-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = {
                id: this.getAttribute('data-id'),
                name: this.getAttribute('data-name'),
                price: parseFloat(this.getAttribute('data-price')),
                image: this.getAttribute('data-image'),
                quantity: 1
            };

            let cart = JSON.parse(localStorage.getItem('cart'));
            const existingItem = cart.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            this.textContent = 'Added!';
            setTimeout(() => {
                this.textContent = 'Add to Cart';
            }, 1000);
        });
    });
});


const cartlist = document.getElementById('cart-list');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.appendChild(overlay);

function toggleCart() {
  cartlist.classList.toggle('active');
  overlay.classList.toggle('active');
  if (cartlist.classList.contains('active')) {
    updateCartDisplay();
  }
}

function updateCartDisplay() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartItemsContainer.innerHTML = '';
  let total = 0;
  
  cart.forEach(item => {
    total += item.price;
    
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
      </div>`;
    cartItemsContainer.appendChild(cartItem);
  });
  
  cartTotalPrice.textContent = `$${total.toFixed(2)}`;
}

document.querySelector('.fi-sr-shopping-cart').addEventListener('click', toggleCart);
document.querySelector('.close-cart').addEventListener('click', toggleCart);
overlay.addEventListener('click', toggleCart);

if (!localStorage.getItem('cart')) {
  localStorage.setItem('cart', '[]');
}

document.querySelectorAll('.cart-btn').forEach(button => {
  button.addEventListener('click', function() {
    const product = {
      id: this.getAttribute('data-id') || Date.now(),
      name: this.parentElement.querySelector('.product-title-1').textContent,
      price: parseFloat(this.parentElement.querySelector('.product-price-1').textContent.replace('$', '')),
      image: this.parentElement.querySelector('img').src,
    };

    const cart = JSON.parse(localStorage.getItem('cart'));
    const existingItem = cart.find(item => item.name === product.name);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    
    const originalText = this.textContent;
    this.textContent = 'Added!';
    setTimeout(() => this.textContent = originalText, 1000);
  });
});


// checkout script
document.getElementById('checkout-btn').onclick = () => {
  const cart = JSON.parse(localStorage.cart || '[]');
  if (!cart.length) return alert("Your cart is empty!");
  alert(`Checking out ${cart.length} items (Total: $${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)})`);
  localStorage.removeItem('cart');
  window.location.href = 'catalog.html';
};

