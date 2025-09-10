// Declaring Variables
const categoryContainer = document.getElementById("catagories-container");
const allPlants = document.getElementById("All-Plants");
const categoryContentContainer = document.getElementById(
  "category-content-container"
);
const cartContainer = document.getElementById("category-cart");
const cartTotalPrice = document.getElementById("cart-total-price");
const spinner = document.getElementById("spinner");
// Managing Spinner
const loadSpinner = (status) => {
  if (status) {
    spinner.classList.remove("hidden");
    categoryContentContainer.classList.add("hidden");
  } else {
    spinner.classList.add("hidden");
    categoryContentContainer.classList.remove("hidden");
  }
};

//loading All Plant Categories in the Nav
const loadAllCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => showAllCategories(data.categories))
    .catch((error) => console.log(error));
};

const showAllCategories = (categories) => {
  //console.log(categories);
  categories.forEach((category) => {
    categoryContainer.insertAdjacentHTML(
      "beforeend",
      `
    <li id="${category.id}"
        class="btn rounded-md cursor-pointer tree-category mb-1">
        ${category.category_name}
    </li>
  `
    );
  });
};

loadAllCategories();

//Event Listener For Loading All Plant Card
allPlants.addEventListener("click", (e) => {
  // console.log("clicked");
  loadAllPlants();
  removeActiveFromLi();
  e.target.classList.add("active");
});
//Loading All Plants From Direct URL Fetch
const loadAllPlants = () => {
  loadSpinner(true);
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => showAllPlants(data.plants))
    .catch((error) => console.log(error));
};
//Function for Showing All Plants in the UI
const showAllPlants = (allPlants) => {
  categoryContentContainer.innerHTML = "";
  allPlants.forEach((plant) => {
    categoryContentContainer.insertAdjacentHTML(
      "beforeend",
      `
            <div class="items-stretch">
              <div class="card p-4 flex flex-col gap-3">
                <img
                  src="${plant.image}"
                  alt=""
                  class="rounded-lg h-50 object-cover"
                />
                <h2 id="${plant.id}" class="font-semibold cursor-pointer">${plant.name}</h2>
                <p class="text-sm text-pretty text-gray-500">
                  
                ${plant.description}
                </p>
                <div class="flex justify-between items-center">
                  <p
                    class="text-sm bg-light-green px-3 py-1.5 rounded-full text-green-800"
                  >
                    ${plant.category}
                  </p>
                  <p class="text-sm font-semibold text-gray-600">
                    ৳<span class="ml-1 price">${plant.price}</span>
                  </p>
                </div>
                <button id="${plant.id}" 
                  type="button"
                  class="btn btn-success rounded-full bg-green text-white border-none outline-none"
                >
                  Add to Cart
                </button>
              </div>
            </div>
        `
    );
  });
  loadSpinner(false);
};

loadAllPlants();

//Event Listener For Loading Plants By Categories
categoryContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("tree-category")) {
    loadPlantsByCategory(e.target.id);
    // adding active class here
    removeActiveFromLi();
    e.target.classList.add("active");
    // show modal code here
  }
});
// Remove All Active Class For Li
const removeActiveFromLi = () => {
  const allLi = document.querySelectorAll("li");
  allLi.forEach((li) => {
    li.classList.remove("active");
  });
};
// Loading Plants With Their ID
const loadPlantsByCategory = (categoryId) => {
  loadSpinner(true);
  const categoryUrl = `https://openapi.programming-hero.com/api/category/${categoryId}`;
  fetch(categoryUrl)
    .then((res) => res.json())
    .then((data) => showPlantsByCategory(data.plants))
    .catch((error) => console.log(error));
};
//Showing All the Plants According to their ID
const showPlantsByCategory = (plants) => {
  categoryContentContainer.innerHTML = "";
  plants.forEach((plant) => {
    //console.log(plant);
    categoryContentContainer.insertAdjacentHTML(
      "beforeend",
      `
            <div class="items-stretch">
              <div class="card p-4 flex flex-col gap-3">
                <img
                  src="${plant.image}"
                  alt=""
                  class="rounded-lg h-50 object-cover"
                />
                <h2 id="${plant.id}" class="font-semibold cursor-pointer">${plant.name}</h2>
                <p class="text-sm text-pretty text-gray-500">
                  
                ${plant.description}
                </p>
                <div class="flex justify-between items-center">
                  <p
                    class="text-sm bg-light-green px-3 py-1.5 rounded-full text-green-800"
                  >
                    ${plant.category}
                  </p>
                  <p class="text-sm font-semibold text-gray-600">
                    ৳<span class="ml-1 price">${plant.price}</span>
                  </p>
                </div>
                <button id="${plant.id}" 
                  type="button"
                  class="btn btn-success rounded-full bg-green text-white border-none outline-none"
                >
                  Add to Cart
                </button>
              </div>
            </div>
        `
    );
  });
  loadSpinner(false);
};

// Adding Event Listener on Heading
categoryContentContainer.addEventListener("click", (e) => {
  // Showing Details in Modal
  if (e.target.localName === "h2") {
    const detailsID = e.target.id;
    loadIndividualDetails(detailsID);
  }
  //ADD TO CART OPTION CALLING
  if (e.target.innerText === "Add to Cart") {
    const id = e.target.id;
    const name = e.target.parentNode.children[1].innerText;
    const quantity = 1;
    const price =
      e.target.parentNode.children[3].children[1].childNodes[1].innerText;
    let plantCart = { id, name, quantity, price };
    insertingCart(plantCart);
  }
});

//Declaring Function To Fetch
const loadIndividualDetails = async (id) => {
  const fetchUrl = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(fetchUrl);
  const data = await res.json();
  showIndividualDetails(data.plants);
};
//Showing Modal With Details in UI
const showIndividualDetails = (plantDetails) => {
  const modalContainer = document.getElementById("my_modal_5");
  modalContainer.innerHTML = `
      <div class="modal-box">
        <img src="${plantDetails.image}" alt="" class="h-80 w-full object-cover" />
        <h3 class="py-2 font-semibold">${plantDetails.name}</h3>
        <p class="py-2">${plantDetails.description}</p>
         <div class="flex justify-between items-center py-2">
          <p class="btn btn-outline btn-success">${plantDetails.category}</p>
          <p class="btn btn-outline btn-primary">Price: ৳ ${plantDetails.price}</p>
        </div>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button type="submit" class="btn btn-error">Close</button>
          </form>
        </div>
      </div>
  `;
  my_modal_5.showModal();
};

// Calculating and Showing Add to Cart
let cartArray = [];

const insertingCart = (plantCart) => {
  const existingPlant = cartArray.find((plants) => plants.id === plantCart.id);

  if (existingPlant) {
    existingPlant.quantity += plantCart.quantity;
  } else {
    cartArray.push(plantCart);
  }
  showCartItems(cartArray);
  calculateTotal(cartArray);
};

const showCartItems = (allCarts) => {
  cartContainer.innerHTML = "";
  allCarts.forEach((carts) => {
    cartContainer.insertAdjacentHTML(
      "beforeend",
      `
          <div id="${carts.id}"
                class="p-2 flex items-center justify-between bg-green-100 my-2"
              >
                <div class="text-sm">
                  <h2 class="font-semibold">${carts.name}</h2>
                  <p class="text-sm text-gray-400">
                    ৳ <span>${carts.price}</span>
                    <span>X ${carts.quantity}</span>
                  </p>
                </div>
                <div class="">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline border-none hover:bg-green-200"
                  >
                    ❌
                  </button>
                </div>
              </div>
    `
    );
  });
};
const calculateTotal = (cart) => {
  let totalPrice = cart.reduce(
    (acc, item) => acc + parseInt(item.price) * item.quantity,
    0
  );
  document.getElementById("cart-total-price").innerText = totalPrice;
};

cartContainer.addEventListener("click", (e) => {
  if (e.target.localName === "button") {
    let cartItemId = e.target.parentNode.parentNode.id;
    let filteredArray = cartArray.filter(
      (itemCart) => itemCart.id !== cartItemId
    );
    cartArray = filteredArray;
    showCartItems(cartArray);
    adjustTotal(cartArray);
  }
});

const adjustTotal = (cart) => {
  let totalPrice = cart.reduce(
    (acc, item) => acc + parseInt(item.price) * item.quantity,
    0
  );
  document.getElementById("cart-total-price").innerText = totalPrice;
};
