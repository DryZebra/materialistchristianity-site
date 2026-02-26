(function () {
  const input = document.getElementById("wiki-search");
  const resultsList = document.getElementById("search-results");

  if (!input || !resultsList) {
    return;
  }

  let pages = [];

  function renderResults(matches, query) {
    resultsList.innerHTML = "";

    if (!query) {
      return;
    }

    if (!matches.length) {
      const emptyItem = document.createElement("li");
      emptyItem.textContent = "No matching maintenance entries found.";
      resultsList.appendChild(emptyItem);
      return;
    }

    matches.forEach(function (page) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = page.url;
      link.textContent = page.title;
      item.appendChild(link);
      resultsList.appendChild(item);
    });
  }

  function runSearch() {
    const query = input.value.trim().toLowerCase();

    if (!query) {
      renderResults([], "");
      return;
    }

    const matches = pages.filter(function (page) {
      const title = (page.title || "").toLowerCase();
      const content = (page.content || "").toLowerCase();
      return title.includes(query) || content.includes(query);
    });

    renderResults(matches, query);
  }

  fetch("/search.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Failed to load search ledger.");
      }
      return response.json();
    })
    .then(function (data) {
      pages = Array.isArray(data) ? data : [];
    })
    .catch(function () {
      const item = document.createElement("li");
      item.textContent = "Search ledger unavailable.";
      resultsList.appendChild(item);
    });

  input.addEventListener("input", runSearch);
})();
