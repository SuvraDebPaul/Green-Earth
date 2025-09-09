// Declaring Variables
const categoryContainer = document.getElementById("catagories-container");
const allPlants = document.getElementById("All-Plants");
const categoryContentContainer = document.getElementById(
  "category-content-container"
);

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

const loadAllPlants = () => {
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
                    ৳<span class="ml-1">${plant.price}</span>
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

const removeActiveFromLi = () => {
  const allLi = document.querySelectorAll("li");
  allLi.forEach((li) => {
    li.classList.remove("active");
  });
};

const loadPlantsByCategory = (categoryId) => {
  const categoryUrl = `https://openapi.programming-hero.com/api/category/${categoryId}`;
  fetch(categoryUrl)
    .then((res) => res.json())
    .then((data) => showPlantsByCategory(data.plants))
    .catch((error) => console.log(error));
};

const showPlantsByCategory = (plants) => {
  categoryContentContainer.innerHTML = "";
  plants.forEach((plant) => {
    console.log(plant);
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
                    ৳<span class="ml-1">${plant.price}</span>
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
};
