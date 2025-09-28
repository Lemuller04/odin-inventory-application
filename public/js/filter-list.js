const searchInput = document.querySelector("#item-search");
const items = document.querySelectorAll(".item-list li");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  for (const item of items) {
    const title = item.querySelector(".item-title").textContent.toLowerCase();
    item.style.display = title.includes(query) ? "grid" : "none";
  }
});
