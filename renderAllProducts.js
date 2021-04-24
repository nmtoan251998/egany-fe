function handleRenderAllBtnClick() {
    const btn = document.querySelector('#render-all');

    btn.addEventListener('click', (event) => {
        event.preventDefault();

        const products = getData();
        const content = products.map((product) => ProductHTMLFactory(product));
        renderProductHTML(content);
    })
}