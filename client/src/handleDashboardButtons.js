export const logoutEvent = () => {
  const logoutBtn = document.querySelector(".sidebar p:nth-child(2)");

  logoutBtn.addEventListener("click", () => {
    window.location.reload();
  });
};
