const productSectionElement = document.getElementById("product-section");
const productDescriptionElement = document.getElementById(
  "product-description"
);
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");

let currentlyDisplayedProductNumber = 0;

//Fetch--------------------------------
const asyncGetProductsJson = async () => {
  const response = await fetch("data/products.json");
  const data = await response.json();
  productsData = data;
  //Show the first product on initial load
  displayProduct(currentlyDisplayedProductNumber);
};
asyncGetProductsJson();

//Display--------------------------------
function displayProduct(index) {
  const product = productsData[index];
  //HTML (right)
  const productHtml = `
    <div class="column">
      <figure class="image is-1by1">
        <img src="${product.imageUrl}" alt="${product.name}">
      </figure>
    </div>
  `;
  //HTML (left)
  const descriptionHtml = `
    <div class="column content">
      <div class="title is-2 mt-3 mb-6">${product.name}</div>
      <div class="subtitle ml-3 is-6">${product.description}</div>
      <div class="mb-6 content is-6">
        <ul>
        <li>${product.features[0]}</li>
        <li>${product.features[1]}</li>
        <li>${product.features[2]}</li>
        </ul>
      </div>
      <div class="ml-4">
        <a target="_blank" rel="noopener noreferrer" class="button is-black is-medium" href="${product.priceURL}">Buy Now at ${product.price}</a>
      </div>
    </div>
  `;

  //Insert new complete HTML into left and right columns
  productSectionElement.innerHTML = productHtml;
  productDescriptionElement.innerHTML = descriptionHtml;
}

//Buttons--------------------------------
nextButton.addEventListener("click", () => {
  currentlyDisplayedProductNumber =
    (currentlyDisplayedProductNumber + 1) % productsData.length;
  displayProduct(currentlyDisplayedProductNumber);
});

previousButton.addEventListener("click", () => {
  currentlyDisplayedProductNumber =
    (currentlyDisplayedProductNumber - 1 + productsData.length) %
    productsData.length;
  displayProduct(currentlyDisplayedProductNumber);
});
