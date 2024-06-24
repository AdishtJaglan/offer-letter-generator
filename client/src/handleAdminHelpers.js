export const createAdminModal = (admins) => {
  const body = document.querySelector("body");
  const adminModal = document.createElement("dialog");

  adminModal.classList.add("admin-modal");
  adminModal.innerHTML = `
    <div class="admin-modal-container">
      <div class="admin-heading">
        <p>Admin Info</p>
        <span class="admin-info-close">&#10006;</span>
      </div>
    </div>
  `;

  body.appendChild(adminModal);

  const adminModalContainer = document.querySelector(".admin-modal-container");

  admins.forEach((admin) => {
    const nameP = document.createElement("p");
    const emailP = document.createElement("p");
    const adminContainer = document.createElement("div");

    nameP.textContent = admin.name;
    emailP.textContent = admin.email;

    nameP.classList.add("admin-name");
    emailP.classList.add("admin-email");
    adminContainer.classList.add("admin-container");

    adminContainer.appendChild(nameP);
    adminContainer.appendChild(emailP);

    adminModalContainer.appendChild(adminContainer);
  });

  const closeButton = document.querySelector(".admin-info-close");

  adminModal.showModal();

  closeButton.addEventListener("click", () => {
    adminModal.close();
    adminModal.remove();
  });
};

export const createUpdateAdminModal = (admin) => {
  const body = document.querySelector("body");
  const adminModal = document.createElement("dialog");

  adminModal.classList.add("update-admin-modal");
  adminModal.innerHTML = `
    <div class="update-admin-modal-container">
      <div class="update-admin-heading">
        <p>Admin Info</p>
        <span class="update-admin-info-close">&#10006;</span>
      </div>

      <div class="update-admin-row">
        <label for="admin_name">name:</label>
        <input type="text" name="name" id="admin_name" />
      </div>

      <div class="update-admin-row">
        <label for="admin_email">email:</label>
        <input type="email" name="email" id="admin_email" />
      </div>

      <div class="update-admin-row">
        <label for="admin_password">password:</label>
        <input type="password" name="password" id="admin_password" />
      </div>

      <button class="update-admin-info-btn">update</button>
    </div>
  `;

  body.appendChild(adminModal);

  const adminName = document.querySelector("#admin_name");
  const adminEmail = document.querySelector("#admin_email");
  const adminPassword = document.querySelector("#admin_password");
  const closeUdpateAdminBtn = document.querySelector(
    ".update-admin-info-close"
  );

  adminEmail.value = admin.email;
  adminName.value = admin.name;
  adminPassword.value = "";

  adminModal.showModal();

  closeUdpateAdminBtn.addEventListener("click", () => {
    adminModal.close();
    adminModal.remove();
  });
};

export const makeAdminModal = () => {
  const body = document.querySelector("body");
  const adminModal = document.createElement("dialog");

  adminModal.classList.add("create-admin-modal");
  adminModal.innerHTML = `
    <div class="create-admin-modal-container">
      <div class="create-admin-heading">
        <p>Create Admin</p>
        <span class="create-admin-close">&#10006;</span>
      </div>

      <div class="create-admin-row">
        <label for="create_admin_name">name:</label>
        <input type="text" name="name" id="create_admin_name" />
      </div>

      <div class="create-admin-row">
        <label for="create_admin_email">email:</label>
        <input type="email" name="email" id="create_admin_email" />
      </div>

      <div class="create-admin-row">
        <label for="create_admin_password">password:</label>
        <input type="password" name="password" id="create_admin_password" />
      </div>

      <button class="create-admin-info-btn">create</button>
    </div>
  `;

  body.appendChild(adminModal);
  adminModal.showModal();

  const closeCreateAdminBtn = document.querySelector(".create-admin-close");

  closeCreateAdminBtn.addEventListener("click", () => {
    adminModal.remove();
    adminModal.close();
  });
};

export const showAdminDeleteModal = (admins) => {
  const body = document.querySelector("body");
  const adminModal = document.createElement("dialog");

  adminModal.classList.add("delete-admin-modal");
  adminModal.innerHTML = `
    <div class="delete-admin-modal-container">
      <div class="delete-admin-heading">
        <p>Admin Info</p>
        <span class="delete-admin-close">&#10006;</span>
      </div>
    </div>
  `;

  body.appendChild(adminModal);

  const deleteAdminModalContainer = document.querySelector(
    ".delete-admin-modal-container"
  );

  admins.forEach((admin) => {
    const nameP = document.createElement("p");
    const deleteAdminBtn = document.createElement("button");
    const adminContainer = document.createElement("div");

    deleteAdminBtn.dataset.id = admin._id;
    deleteAdminBtn.textContent = "delete";
    deleteAdminBtn.classList.add("delete-admin-btn");

    nameP.textContent = admin.name;
    nameP.classList.add("delete-admin-name");
    adminContainer.classList.add("delete-admin-container");

    adminContainer.appendChild(nameP);
    adminContainer.appendChild(deleteAdminBtn);

    deleteAdminModalContainer.appendChild(adminContainer);
  });

  const closeButton = document.querySelector(".delete-admin-close");

  adminModal.showModal();

  closeButton.addEventListener("click", () => {
    adminModal.innerHTML = "";
    adminModal.close();
    adminModal.remove();
  });
};
