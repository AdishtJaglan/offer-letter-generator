import "./styles/dashboardStyle.css";
import searchIcon from "./images/magnify.svg";
import logoutIcon from "./images/logout.svg";
import bellIcon from "./images/bell.svg";
import {
  createStudent,
  updateStudentInfo,
  viewStudentInfo,
} from "./handleStudentInfo";
import { downloadOfferLetter, sendOfferLetter } from "./handleOfferLetter";
import { getStudents, logoutEvent, toggleSidebar } from "./handleDashboard";

export const createDashboard = async () => {
  const body = document.querySelector("body");

  body.innerHTML = `
    <div class="header">
      <div class="user-info">
        <div class="left-info">
          <img src="${searchIcon}" alt="" class="icon" />
          <input type="text" name="" id="search_bar" />
        </div>

        <div class="right-info">
          <img src="${bellIcon}" alt="" class="icon" />
          <img
            src="https://img.icons8.com/doodle/48/user-male-circle.png"
            alt=""
            class="profile-picture"
          />
          <p>Adisht Jaglan</p>
        </div>
      </div>

      <div class="nav">
        <div class="greeting-container">
          <img
            src="https://img.icons8.com/doodle/100/user-male-circle.png"
            alt=""
            class="nav-profile-picture"
          />
          <div class="greeting">
            <p>Hi there,</p>
            <p>Adisht Jaglan</p>
          </div>
        </div>

        <ul>
          <li class="open-student-dialog">New</li>
          <li>Update</li>
          <li>Manage</li>
        </ul>
      </div>
    </div>

    <div class="sidebar">
      <button id="toggleButton">
        <span>&#9776;</span>
      </button>

      <p>
        <span><img src="${searchIcon}" alt="" class="search-icon" /></span
        ><span class="text">search admin</span>
      </p>

      <p class="sidebar-p">
        <span><img src="${logoutIcon}" class="logout-icon" /></span
        ><span class="text">logout</span>
      </p>
    </div>

    <div class="main-content">
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Domain</th>
            <th>From</th>
            <th>To</th>
            <th>UID</th>
            <th>View</th>
            <th>Update</th>
            <th>Send</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody id="studentTableBody">
        </tbody>
      </table>
    </div>  

    <dialog class="update-student">
      <div class="update-student-container">
        <div class="form-row">
          <label for="name">name:</label>
          <input type="text" id="name" />
        </div>

        <div class="form-row">
          <label for="student-email">email:</label>
          <input type="email" id="student-email" />
        </div>

        <div class="form-row">
          <label for="dateOfJoining">date of joining:</label>
          <input type="date" id="dateOfJoining" />
        </div>

        <div class="form-row">
          <label for="dateOfCompletion">date of completion:</label>
          <input type="date" id="dateOfCompletion" />
        </div>

        <div class="form-row">
          <label for="domain">domain:</label>
          <input type="text" id="domain" />
        </div>

        <div class="btns">
          <button class="update-student-btn">udpate</button>
          <button class="close-btn">close</button>
        </div>
      </div>
    </dialog>

    <dialog class="view-student-info">
      <div class="view-student-info-container">
        <p>Adisht Jaglan</p>
        <p>adisht7524@gmail.com</p>
        <p>12-04-2022 to 12-05-2022</p>
        <p>Web Development</p>
        <p>SMPA12DEF456</p>

        <button class="close-student-info-btn">close</button>
      </div>
    </dialog>

    <dialog class="create-student">
      <div class="create-student-container">
        <div class="row">
          <label for="create_name">name:</label>
          <input type="text" id="create_name" name="name" required />
        </div>

        <div class="row">
          <label for="create_email">email:</label>
          <input type="email" id="create_email" name="email" required />
        </div>

        <div class="date-row">
          <div class="dateOfJoining-group">
            <label for="create_dateOfJoining">date of joining:</label>
            <input
              type="date"
              name="dateOfJoining"
              id="create_dateOfJoining"
              required
            />
          </div>

          <div class="dateOfCompletion-group">
            <label for="create_dateOfCompletion">date of completion:</label>
            <input
              type="date"
              name="dateOfCompletion"
              id="create_dateOfCompletion"
              required
            />
          </div>
        </div>

         <div class="row">
          <label for="create_domain">domain:</label>
          <input list="domains" id="create_domain" name="domain" placeholder="Select or type a domain" required />
          <datalist id="domains">
            <option value="Marketing"></option>
            <option value="Social worker"></option>
            <option value="Public Relations"></option>
            <option value="Campus Ambassador"></option>
            <option value="Machine Learning"></option>
            <option value="Data Science"></option>
            <option value="Artificial Intelligence"></option>
            <option value="Web Developer"></option>
            <option value="Fundraising Coordinator"></option>
            <option value="Volunteer"></option>
            <option value="Coding Tutor"></option>
            <option value="Human Resource Management"></option>
            <option value="Social Media Marketing"></option>
            <option value="Digital Marketing"></option>
            <option value="Business Development Associate"></option>
            <option value="Content Writer"></option>
          </datalist>
         </div>

        <div class="student-btns">
          <button class="create-student-btn">submit</button>
          <button class="close-student-btn">close</button>
        </div>
      </div>
    </dialog>
    `;

  getStudents();
  toggleSidebar();
  downloadOfferLetter();
  sendOfferLetter();
  updateStudentInfo();
  viewStudentInfo();
  createStudent();
  logoutEvent();
};
