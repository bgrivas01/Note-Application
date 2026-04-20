document.getElementById("createAccount-form").addEventListener("submit", function(event) {
    event.preventDefault();
     const data = {
     username: document.getElementById("Username").value,
     name: document.getElementById("Name").value,
     email: document.getElementById("Email").value,
     dob: document.getElementById("DOB").value,
     password: document.getElementById("Password").value
     };
    // send to backend here
    fetch("http://localhost:5000/create-account", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);

        // Redirect AFTER backend confirms success
        if (result.status === "success") {
            window.location.href = "homepage.html";
        } else {
            alert("Registration failed: " + (result.message || "Please try again"));
        }
    })
    .catch(error => console.error(error));
});


document.getElementById("Login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const form = document.getElementById("Login-form");
     const loginData = {
     username: form.querySelector("[name='login-username']").value,
     email: form.querySelector("[name='login-email']").value,
     password: form.querySelector("[name='login-password']").value
     };
    
    // send to backend here
    fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);

        // Redirect AFTER backend confirms success
        if (result.status === "success") {
            window.location.href = "homepage.html";
        } else {
            alert("Login failed: " + (result.message || "Invalid credentials"));
        }
    })
    .catch(error => console.error(error));
});