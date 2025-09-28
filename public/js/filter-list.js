document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector("#item-search");
  const items = document.querySelectorAll(".item-list li");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    for (const item of items) {
      const title = item.querySelector(".item-title").textContent.toLowerCase();
      item.style.display = title.includes(query) ? "grid" : "none";
    }
  });

  const categoryFilter = document.querySelector("#category-filter");
  const typeFilter = document.querySelector("#type-filter");

  if (categoryFilter && typeFilter) {
    categoryFilter.addEventListener("change", () => {
      applyFilter();
    });

    typeFilter.addEventListener("change", () => {
      applyFilter();
    });
  }

  function applyFilter() {
    const selectedCategory = categoryFilter.value;
    const selectedType = typeFilter.value;

    for (const item of items) {
      const itemCategory = item.dataset.categoryId;
      const itemType = item.dataset.typeId;

      if (
        selectedCategory === "" ||
        (itemCategory === selectedCategory && selectedType === "") ||
        itemType === selectedType
      ) {
        item.style.display = "grid";
      } else {
        item.style.display = "none";
      }
    }
  }
});
