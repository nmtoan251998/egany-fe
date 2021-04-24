function search(products, searchTerm) {
    return products.find((product) => product.title === searchTerm);
}

function renderSearchResult(dom, content) {
    dom.innerHTML = content;
}