document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector("#item-search");
  const items = document.querySelectorAll(".item-list li");

  searchInput.addEventListener("input", () => {
    applyAllFilters();
  });

  const categoryFilter = document.querySelector("#category-filter");
  const typeFilter = document.querySelector("#type-filter");

  if (categoryFilter && typeFilter) {
    categoryFilter.addEventListener("change", () => {
      applyAllFilters();
    });

    typeFilter.addEventListener("change", () => {
      applyAllFilters();
    });
  }

  function applyAllFilters() {
    const query = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedType = typeFilter.value;

    for (const item of items) {
      const title = item.querySelector(".item-title").textContent.toLowerCase();
      const itemCategory = item.dataset.categoryId;
      const itemType = item.dataset.typeId;

      const matchesSearch = title.includes(query);
      const matchesCategory =
        selectedCategory === "" || itemCategory === selectedCategory;
      const matchesType = selectedType === "" || itemType === selectedType;

      item.style.display =
        matchesSearch && matchesCategory && matchesType ? "grid" : "none";
    }
  }
});
