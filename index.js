function queryDOM() {
    const allProductDiv = document.querySelector('.all-products');
    const searchResultDiv = document.querySelector('.product-search-result');

    return {
        allProductDiv,
        searchResultDiv,
    };
}

function renderData(dom, content) {
    dom.innerHTML = content;
}

document.addEventListener("DOMContentLoaded", () => {
    const {
        allProductDiv,
        searchResultDiv,
    } = queryDOM();

    const products = getData();
    const content = products.map((product) => ProductHTMLFactory(product));
    renderData(allProductDiv, content);
    renderSearchResult()

    getFineProducts(products);
});