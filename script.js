document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.getElementById("projectsContainer");
  const addProjectButton = document.getElementById("addProjectButton");
  const projectModal = document.getElementById("projectModal");
  const closeButton = document.querySelector(".close");
  const projectForm = document.getElementById("projectForm");
  const contactForm = document.getElementById("contactForm");
  const filterButtons = document.querySelectorAll(".filter-button");

  addProjectButton.addEventListener("click", () => {
    projectModal.style.display = "block";
  });

  closeButton.addEventListener("click", () => {
    projectModal.style.display = "none";
  });

  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const type = document.getElementById("type").value;

    const project = {
      title,
      description,
      type,
    };

    addProject(project);
    saveProjectsToLocalStorage();

    projectModal.style.display = "none";
    projectForm.reset();
  });

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Send contact form data as needed

    contactForm.reset();
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => {
        btn.classList.remove("selected");
      });
      button.classList.add("selected");
      filterProjects(button.dataset.filter);
    });
  });

  function addProject(project) {
    const projectElement = document.createElement("div");
    projectElement.classList.add("project");
    projectElement.classList.add(project.type);

    const titleElement = document.createElement("h3");
    titleElement.textContent = project.title;

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = project.description;

    projectElement.appendChild(titleElement);
    projectElement.appendChild(descriptionElement);

    projectsContainer.appendChild(projectElement);
  }

  function saveProjectsToLocalStorage() {
    const projects = getProjectsFromLocalStorage();
    projects.push(projects);
    // obrati paynju ovde bilo je u jednini
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  function getProjectsFromLocalStorage() {
    let projects;
    if (localStorage.getItem("projects") === null) {
      projects = [];
    } else {
      projects = JSON.parse(localStorage.getItem("projects"));
    }
    return projects;
  }

  function loadProjectsFromLocalStorage() {
    const projects = getProjectsFromLocalStorage();
    projects.forEach((project) => {
      addProject(project);
    });
  }

  function filterProjects(type) {
    const projectElements = projectsContainer.getElementsByClassName("project");
    Array.from(projectElements).forEach((element) => {
      if (type === "all") {
        element.style.display = "block";
      } else if (element.classList.contains(type)) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    });
  }

  loadProjectsFromLocalStorage();
});
