

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
        window.location.href = "homepage.html";
    })
    .catch(error => console.error(error));
});


document.getElementById("Login-form").addEventListener("submit", function(event) {
    event.preventDefault();
     const loginData = {
     username: document.getElementById("Username").value,
     email: document.getElementById("Email").value,
     password: document.getElementById("Password").value
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
        window.location.href = "homepage.html";
    })
    .catch(error => console.error(error));
});