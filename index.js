document.addEventListener("DOMContentLoaded", () => {
    const products = getData();
    const content = products.map((product) => ProductHTMLFactory(product));
    renderProductHTML(content);
    handleProductSubmit();

    getFineProducts(products);

    handleRenderAllBtnClick();
});