function search(products, searchTerm) {
    return products.find((product) => product.title.toLowerCase() === searchTerm.toLowerCase());
}

function handleProductSubmit() {
    const form = document.querySelector('.product-search-by-name-form');
    const products = getData();
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const searchInput = document.querySelector('#product-search-by-name');
        const searchTerm = searchInput.value;
        const found = search(products, searchTerm);
        renderProductHTML(ProductHTMLFactory(found));
    })
}