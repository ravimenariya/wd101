document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let dob = document.getElementById("dob").value;
    let Err = document.getElementById("ageError");
    let success = document.getElementById("success");

    let today = new Date();
    dob = new Date(dob);

    let time = today.getTime() - dob.getTime();
    let days = Math.floor(time / (1000 * 60 * 60 * 24));
    let mindays = 18 * 365;
    let maxdays = 55 * 365;

    if (mindays >= days || days >= maxdays) {
        Err.style.display = "block";
    }
    else {
        Err.style.display = "none";
        success.style.display = "block";

        let user = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: btoa(document.getElementById("password").value),
            dob: document.getElementById("dob").value,
            terms: document.getElementById("terms").checked
        }
        userentry(user);
    }

});

function userentry(user) {
    console.log("in entry");
    console.log(user);

    let userarr = localStorage.getItem("users");
    if (userarr == null) {
        userarr = [];
    } else {
        userarr = JSON.parse(userarr);
    }
    userarr.push(user);
    localStorage.setItem('users', JSON.stringify(userarr));
    createTable();
}
function createTable() {
    let userarr = localStorage.getItem("users");
    if (userarr == null) {
        userarr = [];
    } else {
        userarr = JSON.parse(userarr);
    }

    let table = document.getElementById("table");
    table.innerHTML = "";

    let head = document.createElement("tr");
    head.innerHTML = '<th>Name</th><th>Email</th><th>Password</th><th>Dob</th><th>Accepted terms?</th>';
    table.appendChild(head);

    userarr.forEach((user) => {
        let row = document.createElement("tr");

        let nameData = document.createElement("td");
        nameData.innerHTML = user.name;
        row.appendChild(nameData);

        let emailData = document.createElement("td");
        emailData.innerHTML = user.email;
        row.appendChild(emailData);

        let passwordData = document.createElement("td");
        passwordData.innerHTML = user.password;
        row.appendChild(passwordData);

        let dobData = document.createElement("td");
        dobData.innerHTML = user.dob;
        row.appendChild(dobData);

        let termsData = document.createElement("td");
        termsData.innerHTML = user.terms ? "Accepted" : "Not Accepted";
        row.appendChild(termsData);

        table.appendChild(row);
    });
}

createTable();