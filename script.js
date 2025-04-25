function checkStrength() {
    const password = document.getElementById("passwordInput").value;
    const result = document.getElementById("strengthResult");
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const messages = ["Very Weak", "Weak", "Moderate", "Strong", "Very Strong"];
    const colors = ["red", "orangered", "orange", "blue", "green"];

    result.textContent = "Strength: " + (messages[strength - 1] || "Very Weak");
    result.style.color = colors[strength - 1] || "red";
}

function generatePassword() {
    const length = parseInt(document.getElementById("lengthInput").value);
    const useUpper = document.getElementById("includeUppercase").checked;
    const useLower = document.getElementById("includeLowercase").checked;
    const useNumbers = document.getElementById("includeNumbers").checked;
    const useSymbols = document.getElementById("includeSymbols").checked;

    let charset = "";
    if (useLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useNumbers) charset += "0123456789";
    if (useSymbols) charset += "!@#$%^&*()_+-=[]{}|;:',.<>?/";

    if (charset === "") {
        alert("Please select at least one character type!");
        return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    const output = document.getElementById("generatedPassword");
    output.value = password;
    document.getElementById("copyMessage").textContent = ""; // clear copy message
}

function copyPassword() {
    const passwordField = document.getElementById("generatedPassword");
    passwordField.select();
    passwordField.setSelectionRange(0, 99999); // mobile support

    navigator.clipboard.writeText(passwordField.value).then(() => {
        document.getElementById("copyMessage").textContent = "Copied!";
    }).catch(() => {
        document.getElementById("copyMessage").textContent = "Failed to copy.";
    });
}
