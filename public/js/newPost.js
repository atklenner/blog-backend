const form = document.querySelector("form");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const body = document.querySelector("#body");
const token = localStorage.getItem("token");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const res = await fetch("http://localhost:5000/api/v1/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({
        title: title.value,
        author: author.value,
        body: body.value,
      }),
    });
    const data = await res.json();
    console.log(data);
    window.location.href = "http://localhost:5000/admin/index";
  } catch (error) {
    console.error(error);
  }
});
