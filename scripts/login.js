// (function () {
//         const roleStudent = document.getElementById("role-student");
//         const roleTeacher = document.getElementById("role-teacher");
//         const roleAdmin = document.getElementById("role-admin");

//         const emailInput = document.getElementById("emailInput");
//         const passwordInput = document.getElementById("passwordInput");
//         const loginForm = document.getElementById("loginForm");

//         // Demo credentials for each role
//         const DEMO_CREDENTIALS = {
//             student: {
//                 email: "student@demo",
//                 password: "student123",
//                 redirect: "../student/student-dashboard.html"
//             },

//             teacher: {
//                 email: "teacher@demo",
//                 password: "teacher123",
//                 redirect: "../teacher/teacher-dashboard.html"
//             },

//             admin: {
//                 email: "admin@demo",
//                 password: "admin123",
//                 redirect: "../admin/admin-dashboard.html"
//             }
//         };

//         function applyPrefill() {

//             if (roleStudent.checked) {
//                 emailInput.value = DEMO_CREDENTIALS.student.email;
//                 passwordInput.value = DEMO_CREDENTIALS.student.password;
//             }

//             else if (roleTeacher.checked) {
//                 emailInput.value = DEMO_CREDENTIALS.teacher.email;
//                 passwordInput.value = DEMO_CREDENTIALS.teacher.password;
//             }

//             else if (roleAdmin.checked) {
//                 emailInput.value = DEMO_CREDENTIALS.admin.email;
//                 passwordInput.value = DEMO_CREDENTIALS.admin.password;
//             }
//         }

//         // Prefill credentials when the page loads
//         // and whenever the selected role changes.
//         [roleStudent, roleTeacher, roleAdmin].forEach(function (radio) {
//             radio.addEventListener("change", applyPrefill);
//         });

//         applyPrefill();


//         // Handle login
//         loginForm.addEventListener("submit", function (event) {

//             if (roleStudent.checked) {
//                 event.preventDefault();
//                 window.location.href = DEMO_CREDENTIALS.student.redirect;
//             }

//             else if (roleTeacher.checked) {
//                 event.preventDefault();
//                 window.location.href = DEMO_CREDENTIALS.teacher.redirect;
//             }

//             else if (roleAdmin.checked) {
//                 event.preventDefault();
//                 window.location.href = DEMO_CREDENTIALS.admin.redirect;
//             }

//         });


//         // Show / hide password
//         const passwordIcon = document.querySelector(".password-icon");

//         passwordIcon.addEventListener("click", function () {

//             const isPassword = passwordInput.type === "password";

//             passwordInput.type = isPassword ? "text" : "password";

//             this.innerHTML = isPassword
//                 ? '<i class="fa-regular fa-eye-slash"></i>'
//                 : '<i class="fa-regular fa-eye"></i>';

//             this.setAttribute(
//                 "aria-label",
//                 isPassword ? "Hide password" : "Show password"
//             );

//         });

//     })();