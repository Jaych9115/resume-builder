Project Title + Tagline
# 🚀 ResumeBuilder Pro
> Create Professional Resumes in Minutes

📌 Project Overview (Introduction)
ResumeBuilder Pro is a fully frontend-based web application that allows users to create, preview, manage, and download professional resumes instantly. It provides a clean UI, multiple templates, and a personalized user experience using browser storage.

🌐 Live Demo
👉 https://resumebuilder-p.netlify.app/

🎯 Objectives
•	To simplify resume creation for users 
•	To provide multiple modern templates 
•	To allow real-time preview before download 
•	To enable user-based resume storage 
•	To generate downloadable PDF resumes instantly 
•	To build a complete frontend project with real-world features 

❗ Problem Statement
Many users face problems like:
•	Difficulty in designing professional resumes 
•	Lack of technical/design skills 
•	Time-consuming formatting in Word 
•	Paid resume builders with limited free features 
•	No easy way to manage multiple resumes 
👉 Goal: Build a simple, free, and user-friendly solution to solve these issues.

💡 Solution
Your solution provides:
•	A web-based resume builder 
•	User authentication system 
•	Live preview feature 
•	Multiple templates (Modern, Classic, Minimal, Dark, Creative) 
•	PDF download functionality 
•	User-specific resume storage using localStorage 
•	History management (Edit, Delete, Download) 


✨ Features
🔸 1. Authentication Protection
🔸 2. Live Resume Preview 
🔸 3. Profile Photo Upload
🔸 4. Multiple Templates
🔸 5. PDF Download
🔸 6. Resume History Management
🔸 7. Responsive UI
🔸 8. Multi-User System

🛠️ 5. Technologies Used
🔹 1. HTML (Structure)
•	Defines layout of all pages (index, builder, dashboard, etc.) 
•	Creates forms, navigation, sections 
🔹 2. CSS (Design)
•	Styling UI elements 
•	Responsive layout 
•	Template designs (modern, dark, creative) 
•	Visual enhancements like shadows, gradients 
🔹 3. JavaScript (Logic)
•	Handles: 
o	Login & Signup 
o	Resume generation 
o	Data storage 
o	PDF export 
o	DOM manipulation 
🔹 4. LocalStorage (Browser Storage)
•	Stores: 
o	Users (users) 
o	Current session (loggedIn, currentUser) 
o	Resume data (resumes_username) 
•	Enables multi-user system without backend 
🔹 5. html2canvas (Library)
•	Converts HTML resume into image 
🔹 6. jsPDF (Library)
•	Converts image into downloadable PDF 


🏗️ 6. System Architecture
🔸 Type: Client-Side Architecture (Frontend Only)
User → Browser UI → JavaScript Logic → LocalStorage
                            ↓
                       Resume Preview
                            ↓
                        PDF Generation
Flow:
1.	User logs in/signup 
2.	Data stored in localStorage 
3.	User creates resume 
4.	Resume saved per user 
5.	Preview shown instantly 
6.	PDF generated using libraries 


📦 7. Project Modules
________________________________________
🔹 1. Authentication Module
Files: login.html, signup.html, script.js
Features:
•	Signup new user 
•	Login validation 
•	Session management 
•	Logout 
Logic:
•	Users stored in localStorage 
•	Login checks credentials 
•	Redirect to dashboard 
________________________________________
🔹 2. Resume Builder Module
File: builder.html
Features:
•	Input fields (name, email, skills, etc.) 
•	Photo upload 
•	Template selection 
•	Live preview 
Logic:
•	generateResume() updates preview 
•	saveData() stores data per user 
________________________________________
🔹 3. Dashboard Module
File: dashboard.html
Features:
•	Welcome user 
•	Show total resumes 
•	Empty state UI 
•	Navigation 
________________________________________
🔹 4. History Module
File: history.html
Features:
•	View saved resumes 
•	Edit resume 
•	Delete resume 
•	Download resume 
Logic:
•	Uses resumes_username key 
•	Dynamic rendering using JS 
________________________________________
🔹 5. PDF Generation Module
Functions:
•	downloadPDF() 
•	downloadResume() 
•	downloadFromBuilder() 
Process:
1.	Convert HTML → Canvas 
2.	Canvas → Image 
3.	Image → PDF 
________________________________________
🔹 6. Template Module
Templates:
•	Modern 
•	Classic 
•	Minimal 
•	Dark 
•	Creative 


📂 Project Structure
ResumeBuilderPro/
│── index.html # Home page
│── login.html # Login page
│── signup.html # Signup page
│── dashboard.html # User dashboard
│── builder.html # Resume builder
│── history.html # Resume history
│── about.html # About page
│── style.css # Styling
│── script.js # Logic & functionality


⚙️ Key Functionalities
- Multi-user system using LocalStorage
- Resume saved per user (resumes_username)
- Template-based styling
- Dynamic DOM updates
- Image handling using FileReader
- PDF export using jsPDF


## ▶️ How to Run
1. Download or clone the repository
2.Open the project folder
3. Run the project:
- Open index.html in any browser
4. Start building your resume


🚀 12. Deployment
🔹 Platform Used: Netlify
Steps:
1.	Upload project to GitHub 
2.	Connect GitHub to Netlify 
3.	Deploy site 
4.	Get live URL 
Your Live Site:
👉 https://resumebuilder-p.netlify.app/
Benefits:
•	Free hosting 
•	Fast CDN 
•	Auto deployment 


🚀 Future Scope
- Backend integration (Node.js / Firebase)
- Cloud database storage
- Secure authentication (JWT / OAuth)
- Shareable resume links
- AI-based resume suggestions
- More advanced templates


✅ Advantages
- No backend required
- Fast and lightweight
- Easy to use
- Real-time preview
- Multi-template support


⚠️ Limitations
- Data stored only in browser
- No cloud backup
- Limited security
- Not scalable for large applications


---

## 👨‍💻 Author
Jay Choudhary

---

## 📜 License
This project is licensed under the MIT License.


⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!






