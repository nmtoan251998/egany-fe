function getFineProducts(products) {
    const quantity = [],
        management = [],
        policy = [];
    products.forEach((product) => {
        const variants = product.variants[0];
        if (variants.inventory_quantity > 0) {
            quantity.push(product.id);
        }
        if (variants.inventory_management === null) {
            management.push(product.id);
        }
        if (variants.inventory_policy === 'allow') {
            policy.push(product.id);
        }
    })
}

