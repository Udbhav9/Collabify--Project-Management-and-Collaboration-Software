// Mock user data (replace with API later)
const user = {
    name: "Udbhav",
    activeProjects: 3,
    pendingTasks: 5,
    completedTasks: 12,
    overdueTasks: 1
};

const projects = [
    { name: "AI Research Tool", progress: 70 },
    { name: "College Event Website", progress: 45 },
    { name: "Internship Tracker", progress: 90 }
];

const deadlines = [
    { task: "Design Landing Page", date: "Feb 15" },
    { task: "Submit Research Draft", date: "Feb 18" },
    { task: "Fix Backend Bugs", date: "Feb 20" }
];

// Populate User Info
document.getElementById("welcome-message").innerText =
    `Welcome, ${user.name} 👋`;

document.getElementById("sidebar-username").innerText = user.name;

document.getElementById("active-projects").innerText = user.activeProjects;
document.getElementById("pending-tasks").innerText = user.pendingTasks;
document.getElementById("completed-tasks").innerText = user.completedTasks;
document.getElementById("overdue-tasks").innerText = user.overdueTasks;

// Populate Progress Bars
const projectsContainer = document.getElementById("projects-container");

projects.forEach(project => {
    const div = document.createElement("div");
    div.classList.add("progress-bar-container");

    div.innerHTML = `
        <p>${project.name}</p>
        <div class="progress-bar">
            <div class="progress-fill" style="width:${project.progress}%"></div>
        </div>
    `;

    projectsContainer.appendChild(div);
});

// Populate Deadlines
const deadlineList = document.getElementById("deadline-list");

deadlines.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.task}</strong><br><small>${item.date}</small>`;
    deadlineList.appendChild(li);
});

// Navigation placeholders
function goToProjects() {
    alert("Projects page coming soon 🚀");
}

function goToTasks() {
    alert("My Tasks page coming soon 🚀");
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
}
