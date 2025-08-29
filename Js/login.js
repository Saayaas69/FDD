function showLogin() {
  document.getElementById("welcome").classList.add("hidden");
  document.getElementById("loginForm").classList.add("active");
  document.querySelector(".auth-title").textContent = "Welcome Back";
  document.querySelector(".auth-subtitle").textContent =
    "Sign in to your account";
}

function showSignup() {
  document.getElementById("welcome").classList.add("hidden");
  document.getElementById("signupForm").classList.add("active");
  document.querySelector(".auth-title").textContent = "Create Account";
  document.querySelector(".auth-subtitle").textContent =
    "Join the Sportify community";
}

function goBack() {
  document.getElementById("welcome").classList.remove("hidden");
  document.getElementById("loginForm").classList.remove("active");
  document.getElementById("signupForm").classList.remove("active");
  document.querySelector(".auth-title").textContent = "Welcome";
  document.querySelector(".auth-subtitle").textContent =
    "Join the sports community";
}

// Handle form submissions and redirect to home page
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  // In a real app, you would validate credentials here
  // For now, just redirect to home page
  window.location.href = "index.html";
});

document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();
  // In a real app, you would create the account here
  // For now, just redirect to home page
  window.location.href = "index.html";
});
