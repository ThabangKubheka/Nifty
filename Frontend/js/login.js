document
.getElementById("loginForm")
.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (validateForm()) {
    try {///........endpoint
      const response = await fetch(".............", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email: email,
          password: password,
        }),
      });

      const result = await response.text();
      document.getElementById("loginStatus").textContent = result;
      console.log(result);

      if (result === "Login successful") {
        localStorage.setItem("userEmail", email);
        ///........redirect;
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
});

function validateForm() {
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const errorMsg = document.getElementById("errorMsg");

errorMsg.textContent = "";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  errorMsg.textContent = "Please enter a valid email address.";
  errorMsg.style.color = "red";
  return false;
}

if (password.trim() === "") {
  errorMsg.textContent = "Please enter a password.";
  errorMsg.style.color = "red";
  return false;
}

return true;
}