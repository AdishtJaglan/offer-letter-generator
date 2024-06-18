export const clearPage = () => {
  const body = document.querySelector("body");
  body.classList.remove("login-page");
  body.classList.add("dashboard-page");

  body.innerHTML = "";
};
