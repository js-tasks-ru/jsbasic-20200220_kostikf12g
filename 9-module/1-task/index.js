'use strict';

class CheckoutProductList {
  productsStoreKey = 'cart-products';

  constructor(parentElement) {
    this.el = parentElement;
    this.productsCart = JSON.parse(localStorage.getItem(this.productsStoreKey));

    this.renderProductsBlock();
    this.updateCart();
  }

  renderProductsBlock() {
    let productList = '';
    let mainBlock = document.createElement('div');
    mainBlock.className = 'product-list-box';

    for (let product of this.productsCart) {
        productList += this.renderProductItem(product);
    }

    mainBlock.innerHTML = productList;
    this.el.append(mainBlock);
  }

  renderProductItem(product) {
    let productItem = `
        <div data-product-id="${product.id}" class="product-wrapper box-inner-col description-col">
          <div class="product-image-container">
            <img class="product-image" src="${product.imageUrl}" alt="${product.title}">
          </div>
          <div class="product-description">
            <h4 class="col-title mb-2">${product.title}</h4>
            ${this.renderProductStars(product.rating)}
          </div>
          <div class="product-price">
            <p class="mb-0 font-weight-light">Price:</p>
            <h4 class="col-title price-text mb-2">${product.price}</h4>
          </div>
          <div class="product-remove-button-wrapper">
            <button type="button"
                    data-button-role="checkout-remove-product"
                    class="product-remove-button">
              X
            </button>
          </div>
        </div>`;

    return productItem;
  }

  renderProductStars(rating) {
    if (!rating) {
        return '';
    }

    let starList = '<div class="rate">';

        for(let i = 0; i < 5; i++) {
            starList += `<i class="icon-star ${(i < rating.stars) ? 'checked' : ''}"></i>`;
        }

        starList += `<p class="rate-amount d-none d-md-block mt-1">${rating.reviewsAmount} reviews</p>`;
    starList += '</div>';

    return starList;
  }

  updateCart() {
    let productList = this.el.querySelector('.product-list-box');

    productList.addEventListener('click', e => {
        if (e.target.matches('[data-button-role="checkout-remove-product"]')) {
            let isRemoveProduct = confirm('Вы уверенны, что хотите удалить этот товар из корзины?');
            if (isRemoveProduct) {
                let currentProduct = e.target.closest('.product-wrapper');
                let currentProductId = +currentProduct.dataset.productId;

                currentProduct.remove();

                this.productsCart.splice(this.productsCart.findIndex(item => {
                    return item.id === currentProductId
                }), 1);

                localStorage.setItem(this.productsStoreKey, JSON.stringify(this.productsCart));

                if (!productList.firstElementChild) {
                    productList.remove();
                }
            }
        }
    });
  }
}

window.CheckoutProductList = CheckoutProductList;
