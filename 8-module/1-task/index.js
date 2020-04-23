class ProductList {
  productsUrl = '/assets/data/products.json';
  productsStoreKey = 'cart-products';

  constructor(element) {
    this.el = element;
  }

  show() {
    return fetch('/assets/data/products.json')
        .then(res => { 
            return res.json();
        })
        .then(products => {
            this.renderProductsBlock(products);
        })
        .then(() => {
            this.products = this.el.querySelector('.homepage-cards');
            this.updateCart();
        });
  }

  renderProductsBlock(products) {
    let mainBlock = document.createElement('div');
    mainBlock.className = 'row justify-content-end';
    mainBlock.innerHTML = 
        `<div class="col-lg-9">
            <h3 class="section-title">
                Top Recommendations for You
                <a href="/checkout.html">Your Cart</a>
            </h3>
            ${this.renderProductsList(products)}
        </div>`;

    this.el.append(mainBlock);
  }

  renderProductsList(products) {
    let productList = '<div class="row homepage-cards">';

        for (let product of products) {
            productList += `<div class="products-list-product col-md-6 col-lg-4 mb-4" id="${product.id}">
                <div class="card">
                    <div class="card-img-wrap">
                        <img class="card-img-top" src="${product.imageUrl}" alt="product.title">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        ${this.renderProductStars(product.rating)}

                        ${this.renderProductPrice(product.price, product.oldPrice)}

                        <button class="product-add-to-cart" data-button-role="add-to-cart">
                          Add to cart
                        </button>
                    </div>
                </div>
            </div>`;
        }

    productList += '</div>';
    return productList;
  }

  renderProductStars(rating) {
    if (!rating) {
        return '';
    }

    let starList = '<div class="rate">';

        for(let i = 0; i < 5; i++) {
            starList += `<i class="icon-star ${(i < rating.stars) ? 'checked' : ''}"></i>`;
        }

        starList += `<span class="rate-amount ml-2">${rating.reviewsAmount}</span>`;
    starList += '</div>';

    return starList;
  }

  renderProductPrice(price, oldPrice) {
    if (oldPrice) {
        return `
            <p class="card-text price-text discount">
                <strong>${price}</strong>
                <small class="ml-2">${oldPrice}</small>
            </p>`;
    } else {
        return `
            <p class="card-text price-text">
                <strong>${price}</strong>
            </p>`;
    }
  }

  updateCart() {
    this.productCart = [];
    if (localStorage.getItem('cart-products')) {
        this.productCart = localStorage.getItem('cart-products').split(',') || [];
    }

    this.products.addEventListener('click', e => {
      if (e.target.matches('[data-button-role="add-to-cart"]')) {
        let productId = e.target.closest('.products-list-product').id;
        let isAnswerUserOK = confirm('Вы уверенны, что хотите добавить этот товар в корзину?');

        if (isAnswerUserOK && !this.productCart.includes(productId)) {
            this.productCart.push(productId);

            localStorage.setItem('cart-products', this.productCart);
        }
      }
    });
  }
}

// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.ProductList = ProductList;
