// IProduct = {
//     "handle": string,
//     "id": number,
//     "title": string,
//     "vendor": string,
//     "tags": string,
//     "image": {
//         "id": number,
//         "src": string
//     },
//     "variants": [
//         {
//             "id": number,
//             "sku": string,
//             "price": number,
//             "compare_at_price": number,
//             "inventory_management": enum(string, null),
//             "inventory_policy": enum(deny, allow),
//             "inventory_quantity": number
//         }
//     ]
// }

function ProductHTMLFactory(product) {
    const productVariant = product.variants;

    const isProductDiscount = productDiscount(productVariant[0].price, productVariant[0].compare_at_price);
    const isProductOutOfStock = productOutOfStock(productVariant[0].inventory_quantity);
    const isAllowedToOrderWithNoProductInInventory = allowedToOrderWithNoProductInInventory(productVariant[0].inventory_policy);
    const isProductManaged = productManaged(productVariant[0].inventory_management);

    let content = '';

    content = `<div class="card product-card" product-id="${product.id}">
        <div class="card-header">
            ${
                isProductOutOfStock 
                    ? `
                        <img class="card-img-top product-img-out-of-stock" src="${product.image.src}" alt="Card image cap">
                        <div class="product-out-of-stock">
                            <h4>Tạm hết hàng</h4>
                        </div>
                    `
                    : `
                        <img class="card-img-top" src="${product.image.src}" alt="Card image cap">
                    `
            }
        </div>
        <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">Hàng trong kho: <span class="badge badge-light">
            ${
                isProductOutOfStock
                    ? `Hết hàng`
                    : `${productVariant[0].inventory_quantity}`
            }
            </span></p>
            <p class="card-text">Giá: 
                ${
                    isProductDiscount
                        ? `
                            <span class="product-price-prediscount"><span class="currency">đ</span>${productVariant[0].compare_at_price}</span>
                            <span class="product-price-discount">
                                <span class="currency">&nbsp;đ</span>${productVariant[0].price}
                                <span class="badge badge-light product-discount-percent">-${calculateDiscountPercent(productVariant[0].price, productVariant[0].compare_at_price)}%</span>
                            </span>
                        `
                        : `<span class="product-price"><span class="currency">đ</span>${productVariant[0].price}</span>`
                }
            </p>
            <div class="product-buy-me">
                ${
                    isProductOutOfStock
                        ?
                            isAllowedToOrderWithNoProductInInventory
                                ? `
                                    <input type="number" id="product-order-quantity-${product.id}" class="product-quantity-input" placeholder="Số lượng">
                                    <button class="btn btn-primary btn-buy" data-id="${product.id}">Để tui order</button>
                                `
                                : `
                                    <button class="btn btn-primary btn-buy" disabled>Hết hàng roài</button>
                                ` 
                        : `
                            <input type="number" id="product-order-quantity-${product.id}" class="product-quantity-input" placeholder="Số lượng">
                            <button class="btn btn-primary btn-buy" data-id="${product.id}">Mua liền hen</button>
                        `
                }
            </div>
        </div>
    </div>`;

    return content;
}

function productDiscount(price, compareAtPrice) {
    if (price < compareAtPrice) {
        return true;
    }

    return false;
}

function productOutOfStock(inventoryQuantity) {
    return inventoryQuantity <= 0;
}

function productManaged(inventoryManagement) {
    const inventoryManagementEnum = {
        MANUAL: 'manual',
        NULL: null,
    }

    return inventoryManagement === inventoryManagementEnum.MANUAL;
}

function allowedToOrderWithNoProductInInventory(inventoryPolicy) {
    const inventoryPolicyEnum = {
        ALLOW: 'allow',
        DENY: 'deny',
    }

    return inventoryPolicy === inventoryPolicyEnum.ALLOW;
}

function calculateDiscountPercent(price, compareAtPrice) {
    const discoutPercent = parseInt(((price*100/compareAtPrice).toString().slice(0, 5)), 10);
    return 100 - discoutPercent;
}

function renderProductHTML(html) {
    const allProductDiv = document.querySelector('.all-products');

    if (!html) {
        allProductDiv.innerHTML = 'No data found';    
        return;
    }

    allProductDiv.innerHTML = html;
}
