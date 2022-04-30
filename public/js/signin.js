const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const res = await fetch("http://localhost:5000/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    const data = await res.json();
    localStorage.setItem("token", data.token);
    window.location.href = "http://localhost:5000/admin/index";
  } catch (error) {
    console.error(error);
  }
});
