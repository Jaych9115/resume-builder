
// AUTH CHECK
if (location.pathname.includes("dashboard") || location.pathname.includes("builder")) {
if (localStorage.getItem("loggedIn") !== "true") {
window.location.href = "login.html";
}
}


// LOGIN
function login(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let validUser = users.find(user => 
        user.username === username && user.password === password
    );

    if (validUser) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", validUser.username);

        alert("Login Successful");

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 500);

    } else {
        alert("Invalid Username or Password");
    }
}


// SIGNUP
function signup(event) {
    event.preventDefault();

    const username = document.getElementById("newUser").value.trim();
    const password = document.getElementById("newPass").value.trim();

    if (!username || !password) {
        alert("Please fill all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let userExists = users.find(user => user.username === username);

    if (userExists) {
        alert("Username already exists!");
        return;
    }

    users.push({ username, password });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Redirecting to login...");

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);
}


// LOGOUT
function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser"); 
    window.location.href = "login.html";
}


// TEMPLATE
function setTemplate() {
    const template = document.getElementById("template").value;
    const resume = document.getElementById("resume");

    resume.className = "resume " + template;
}


// GENERATE RESUME
function generateResume() {
    rname.innerText = fullname.value;
    remail.innerText = email.value;
    rphone.innerText = phone.value;
    rskills.innerText = skills.value;
    reducation.innerText = education.value;
    rexperience.innerText = experience.value;
    setTemplate();
    let file = photo.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            rphoto.src = e.target.result;
            saveData(e.target.result); // ✅ send photo
        };
        reader.readAsDataURL(file);
    } else {
        // If editing and no new photo selected → keep old photo
        let existingPhoto = rphoto.src;
        saveData(existingPhoto);
    }
}


// 🔥 SAVE DATA FUNCTION (NEW)
function saveData(photoData) {
    let currentUser = localStorage.getItem("currentUser");
    let key = "resumes_" + currentUser;

    let resumes = JSON.parse(localStorage.getItem(key)) || [];
    let editIndex = localStorage.getItem("editIndex");

    let data = {
    name: fullname.value,
    email: email.value,
    phone: phone.value,
    skills: skills.value,
    education: education.value,
    experience: experience.value,
    photo: photoData,
    template: document.getElementById("template").value  // ✅ ADD THIS
    };


    if (editIndex !== null) {
        resumes[editIndex] = data;
        localStorage.removeItem("editIndex");
    } else {
        resumes.push(data);
    }

    localStorage.setItem(key, JSON.stringify(resumes));

    alert("Saved Successfully!");
}


// 📄 LOAD DASHBOARD DATA
if (location.pathname.includes("dashboard")) {

    const user = localStorage.getItem("currentUser");
    const key = "resumes_" + user;

    document.getElementById("profileName").innerText = user;
    document.getElementById("welcomeUser").innerText = user;
    
    let data = JSON.parse(localStorage.getItem(key)) || [];

    document.getElementById("resumeCount").innerText = data.length;

    if (data.length === 0) {
        document.getElementById("emptyState").classList.remove("hidden");
    }

    savedData.innerHTML = data.map((r, i) => `
        <div class="card">
            <h3>${r.name}</h3>
            <p>${r.email}</p>
            <button onclick="deleteResume(${i})">Delete</button>
        </div>
    `).join("");
}


//DOWNLOAD PDF
function downloadPDF() {
    const resume = document.getElementById("resume");

    html2canvas(resume, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff"
    }).then(canvas => {

        const imgData = canvas.toDataURL("image/png");

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("p", "mm", "a4");

        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("resume.pdf");
    });
}


// LOAD WINDOW
window.onload = function () {
    const editId = localStorage.getItem("editId");

    if (editId) {
        let resumes = JSON.parse(localStorage.getItem("resumes")) || [];

        const resume = resumes.find(r => r.id == editId);

        if (resume) {
            document.getElementById("name").value = resume.name;
            document.getElementById("email").value = resume.email;
        }
    }
};


// 👤 PROFILE TOGGLE
document.addEventListener("DOMContentLoaded", function () {

    const profileBtn = document.getElementById("profileBtn");
    const dropdown = document.getElementById("dropdown");

    if (profileBtn && dropdown) {

        profileBtn.addEventListener("click", function (e) {
            e.stopPropagation(); 
            dropdown.classList.toggle("show");
        });

        dropdown.addEventListener("click", function (e) {
            e.stopPropagation(); // prevent closing when clicking inside
        });
    }
});


// ❌ CLOSE ON OUTSIDE CLICK
document.addEventListener("click", function () {
    const dropdown = document.getElementById("dropdown");
    if (dropdown) {
        dropdown.classList.remove("show");
    }
});


// 🗑 DELETE RESUME
function deleteResume(index) {
    let currentUser = localStorage.getItem("currentUser");
    let key = "resumes_" + currentUser;

    let resumes = JSON.parse(localStorage.getItem(key)) || [];

    resumes.splice(index, 1);

    localStorage.setItem(key, JSON.stringify(resumes));

    loadResumes();
}


// EDIT RESUME
function editResume(index) {
    localStorage.setItem("editIndex", index);
    window.location.href = "builder.html";
}


// SAVE RESUME
function saveResume() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    let resumes = JSON.parse(localStorage.getItem("resumes")) || [];
    const editId = localStorage.getItem("editId");

    if (editId) {
        // UPDATE EXISTING
        resumes = resumes.map(resume => {
            if (resume.id == editId) {
                return { ...resume, name, email };
            }
            return resume;
        });

        localStorage.removeItem("editId");
    } else {
        // CREATE NEW
        resumes.push({
            id: Date.now(),
            name,
            email
        });
    }

    localStorage.setItem("resumes", JSON.stringify(resumes));

    alert("Saved Successfully!");
}


// DOWNLOAD RESUME
function downloadResume(index) {
    let currentUser = localStorage.getItem("currentUser");
    let key = "resumes_" + currentUser;

    let resumes = JSON.parse(localStorage.getItem(key)) || [];
    let resumeData = resumes[index];
    // APPLY TEMPLATE
    const resumeDiv = document.getElementById("resume");
    resumeDiv.className = "resume " + (resumeData.template || "modern");
    
    

    if (!resumeData) return;
    // Fill hidden resume
    document.getElementById("rname").innerText = resumeData.name;
    document.getElementById("remail").innerText = resumeData.email;
    document.getElementById("rphone").innerText = resumeData.phone;
    document.getElementById("rskills").innerText = resumeData.skills;
    document.getElementById("reducation").innerText = resumeData.education;
    document.getElementById("rexperience").innerText = resumeData.experience;

    if (resumeData.photo) {
        document.getElementById("rphoto").src = resumeData.photo;
    }
    // Delay to ensure DOM updates
    setTimeout(() => {
        downloadPDF();
    }, 800);
    
}


// Download Resume PDF
function downloadResumePDF() {
    const img = document.getElementById("rphoto");

    if (img.complete) {
        downloadPDF();
    } else {
        img.onload = () => downloadPDF();
    }
}


// LOAD RESUME
function loadResumes() {
    const list = document.getElementById("resumeList");
    const count = document.getElementById("resumeCount");

    let currentUser = localStorage.getItem("currentUser");
    let key = "resumes_" + currentUser;

    let resumes = JSON.parse(localStorage.getItem(key)) || [];

    list.innerHTML = "";
    count.innerText = resumes.length;

    resumes.forEach((resume, index) => {
        list.innerHTML += `
            <div class="resume-card">
                <h3>${resume.name}</h3>
                <p>${resume.email}</p>

                <div class="actions">
                    <button onclick="editResume(${index})">Edit</button>
                    <button onclick="downloadResume(${index})">Download</button>
                    <button onclick="deleteResume(${index})">Delete</button>
                </div>
            </div>
        `;
    });
}


// LOAD EDIT DATA
function loadEditData() {
    let editIndex = localStorage.getItem("editIndex");

    if (editIndex !== null) {
        let currentUser = localStorage.getItem("currentUser");
        let key = "resumes_" + currentUser;

        let resumes = JSON.parse(localStorage.getItem(key)) || [];

        let resume = resumes[editIndex];

        if (resume) {
            document.getElementById("fullname").value = resume.name || "";
            document.getElementById("email").value = resume.email || "";
            document.getElementById("phone").value = resume.phone || "";
            document.getElementById("skills").value = resume.skills || "";
            document.getElementById("education").value = resume.education || "";
            document.getElementById("experience").value = resume.experience || "";

            // 🖼 LOAD PHOTO
            if (resume.photo) {
                document.getElementById("rphoto").src = resume.photo;
            }
        }
    }
}


// CLEAR HISTORY
function clearHistory() {
    let currentUser = localStorage.getItem("currentUser");
    let key = "resumes_" + currentUser;

    if (confirm("Delete all resumes?")) {
        localStorage.removeItem(key);
        loadResumes();
    }
}


document.addEventListener("DOMContentLoaded", () => {

    // History Page
    if (document.getElementById("resumeList")) {
        loadResumes();
    }

    // Builder Page
    if (document.getElementById("fullname")) {
        loadEditData();
    }
});


// DOWNLOAD FROM BUILDER WITH TEMPLATE
function downloadFromBuilder() {
    setTemplate(); // apply selected template

    setTimeout(() => {
        downloadPDF();
    }, 800);
}
