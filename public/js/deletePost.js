const form = document.querySelector("form");

const url = window.location.pathname.split("/");
const id = url[url.length - 2];

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const res = await fetch("http://localhost:5000/api/v1/blog/" + id, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    window.location.href = "http://localhost:5000/admin/index";
  } catch (error) {
    console.error(error);
  }
});
