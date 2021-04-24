function handleBuyProductBtnClick() {
    const btns = document.querySelectorAll('.btn-buy');
    const products = getData();

    btns.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();

            const btnId = event.target.getAttribute('data-id');
            const orderQuantityInput = document.querySelector('#product-order-quantity-' + btnId);

            const product = products.find((item) => {
                return item.id === parseInt(btnId, 10);
            });
            

            const orderQuantity = orderQuantityInput.value === ''
                ? 0
                : parseInt(orderQuantityInput.value, 10);
            const availableQuantity = parseInt(product.variants[0].inventory_quantity, 10);
            const isProductManaged = productManaged(product.variants[0].inventory_management);

            if (orderQuantity === 0) {
                return alert('Hong mua mà quậy hả');
            }

            console.log(orderQuantity > availableQuantity, isProductManaged);
            console.log(product.variants[0].inventory_management);
            if (orderQuantity > availableQuantity && isProductManaged === true) {
                return alert('Hàng trong kho hỏng còn đủ, xin lỗi đằng ấy nha');
            }
            
            return alert('Lên bill rồi nha');
        })
    });
}