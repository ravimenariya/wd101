let userform = document.getElementById('user-form');

const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
}

let userEntries = retrieveEntries();

// Function to calculate the user's age based on their date of birth
const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    const monthDifference = today.getMonth() - dobDate.getMonth();

    // Adjust age if the birthday hasn't happened yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dobDate.getDate())) {
        return age - 1;
    }
    return age;
}

// Function to validate email format
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to display all the user entries in the table
const displayEntries = () => {
    let entries = retrieveEntries();
    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class='border px-4 py-2 text-white'>${entry.name}</td>`;
        const emailCell = `<td class='border px-4 py-2 text-white'>${entry.email}</td>`;
        const passwordCell = `<td class='border px-4 py-2 text-white'>${entry.password}</td>`;
        const dobCell = `<td class='border px-4 py-2 text-white'>${entry.dob}</td>`;
        const acceptTermsCell = `<td class='border px-4 py-2 text-white'>${entry.acceptedTerms}</td>`;
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join('\n');

    const table = `
        <table class='table-auto w-full'>
            <tr>
                <th class='px-4 py-2 text-white'>Name</th>
                <th class='px-4 py-2 text-white'>Email</th>
                <th class='px-4 py-2 text-white'>Password</th>
                <th class='px-4 py-2 text-white'>DOB</th>
                <th class='px-4 py-2 text-white'>Accepted Terms?</th>
            </tr>
            ${tableEntries}
        </table>
    `;

    let details = document.getElementById('user-entries');
    details.innerHTML = table;
}

const saveUserForm = (event) => {
    event.preventDefault();  // Prevent form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptedTerms = document.getElementById('terms').checked;

    // Validate email format
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Validate age between 18 and 55
    const age = calculateAge(dob);
    if (age < 18 || age > 55) {
        alert("Age must be between 18 and 55 years old.");
        return;
    }

    const entry = {
        name,
        email,
        password,
        dob,
        acceptedTerms
    };

    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));  // Store updated entries in localStorage
    displayEntries();  // Update the table with the new entry
    userform.reset();  // Reset the form after submission
}

// Add event listener to form submission
userform.addEventListener("submit", saveUserForm);

// Initial call to display the entries when the page loads
displayEntries();