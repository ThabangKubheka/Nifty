document.getElementById("signUpForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;

  if (validateForm()) {
    try {  ///........endpoint
      const response = await fetch("......", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname,
        }),
      });

      const result = await response.text();
      document.getElementById("signUpStatus").textContent = result;

      if (result === "User created successfully") {
        window.location = "../pages/login.html";
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
});

function validateForm() {
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("password-confirm").value;
  const errorMsg = document.getElementById("errorMsg");

  errorMsg.textContent = "";

  if (firstname.trim() === "" || lastname.trim() === "") {
    errorMsg.textContent = "Firstname and lastname are required fields.";
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errorMsg.textContent = "Please enter a valid email address.";
    return false;
  }

  if (password.length < 6) {
    errorMsg.textContent = "Password should be at least 6 characters long.";
    return false;
  }

  if (confirmPassword !== password) {
    errorMsg.textContent = "Password confirmation does not match.";
    return false;
  }

  return true;
}