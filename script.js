// ========== Part 1: Event Handling ==========

// Theme toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// ========== Part 2: Interactive Elements ==========

// Counter
let count = 0;
const counter = document.getElementById("counter");
document.getElementById("increaseBtn").addEventListener("click", () => {
  count++;
  counter.textContent = count;
});
document.getElementById("resetBtn").addEventListener("click", () => {
  count = 0;
  counter.textContent = count;
});

// FAQ toggle
const faqToggles = document.querySelectorAll(".faq-toggle");
faqToggles.forEach(button => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    answer.style.display = (answer.style.display === "block") ? "none" : "block";
  });
});

// ========== Part 3: Form Validation ==========

document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault(); // prevent form from submitting

  // Get inputs
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Error spans
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const formMessage = document.getElementById("formMessage");

  // Reset errors
  nameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  formMessage.textContent = "";

  let isValid = true;

  // Validate name
  if (name.length < 3) {
    nameError.textContent = "Name must be at least 3 characters.";
    isValid = false;
  }

  // Validate email with regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    emailError.textContent = "Enter a valid email address.";
    isValid = false;
  }

  // Validate password (min 6 chars, at least one number)
  const passwordRegex = /^(?=.*[0-9]).{6,}$/;
  if (!passwordRegex.test(password)) {
    passwordError.textContent = "Password must be 6+ characters and contain a number.";
    isValid = false;
  }

  // If valid, show success
  if (isValid) {
    formMessage.style.color = "green";
    formMessage.textContent = "🎉 Registration successful!";
  }
});
