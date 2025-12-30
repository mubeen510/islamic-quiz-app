document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll("[data-include]");
  let loadedCount = 0;

  includes.forEach(el => {
    const file = el.getAttribute("data-include");

    fetch(file)
      .then(res => {
        if (!res.ok) throw new Error("Failed to load " + file);
        return res.text();
      })
      .then(data => {
        el.innerHTML = data;
        loadedCount++;

        // 🔔 when all includes loaded
        if (loadedCount === includes.length) {
          document.dispatchEvent(new Event("includesLoaded"));
        }
      })
      .catch(err => {
        console.error(err);
      });
  });
});

