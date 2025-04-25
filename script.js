function checkStrength(password = null) {
    const input = password || document.getElementById("passwordInput").value;
    const result = document.getElementById("strengthResult");
    const bar = document.getElementById("strengthBar");

    let score = getPasswordScore(input);

    const { label, color, width } = getStrengthVisuals(score);

    result.textContent = `Strength: ${label}`;
    result.style.color = color;
    bar.style.width = width;
    bar.style.backgroundColor = color;
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
    showGeneratedStrength(password);

    document.getElementById("copyMessage").textContent = "Password generated!";
}

function showGeneratedStrength(password) {
    const result = document.getElementById("generatedStrengthResult");
    const bar = document.getElementById("generatedStrengthBar");

    let score = getPasswordScore(password);
    const { label, color, width } = getStrengthVisuals(score);

    result.textContent = `Generated Password Strength: ${label}`;
    result.style.color = color;
    bar.style.width = width;
    bar.style.backgroundColor = color;
}

function getPasswordScore(password) {
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;

    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return Math.min(score, 8);
}

function getStrengthVisuals(score) {
    const labels = [
        "Pathetic", "Very Weak", "Weak", "Moderate",
        "Strong", "Very Strong", "Uncrackable", "Quantum Resistant", "God Mode"
    ];
    const colors = [
        "darkred", "red", "orangered", "orange",
        "blue", "green", "darkgreen", "indigo", "gold"
    ];
    const widths = ["10%", "20%", "30%", "40%", "55%", "70%", "85%", "95%", "100%"];

    return {
        label: labels[score],
        color: colors[score],
        width: widths[score]
    };
}

function copyPassword() {
    const passwordField = document.getElementById("generatedPassword");
    passwordField.select();
    passwordField.setSelectionRange(0, 99999); // For mobile

    navigator.clipboard.writeText(passwordField.value).then(() => {
        document.getElementById("copyMessage").textContent = "Copied to clipboard!";
    }, () => {
        document.getElementById("copyMessage").textContent = "Copy failed.";
    });
}
