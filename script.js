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
    result.textContent = "Strength: " + messages[strength - 1] || "Very Weak";
    result.style.color = ["red", "orangered", "orange", "blue", "green"][strength - 1] || "red";
}

function generatePassword() {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < 12; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    document.getElementById("generatedPassword").value = password;
}
