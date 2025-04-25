function checkStrength(password = null) {
    const input = password || document.getElementById("passwordInput").value;
    const result = document.getElementById("strengthResult");

    let score = 0;

    if (input.length >= 8) score++;
    if (input.length >= 12) score++;
    if (input.length >= 16) score++;

    if (/[a-z]/.test(input)) score++;
    if (/[A-Z]/.test(input)) score++;
    if (/[0-9]/.test(input)) score++;
    if (/[^A-Za-z0-9]/.test(input)) score++;

    const labels = [
        "Pathetic", "Very Weak", "Weak", "Moderate",
        "Strong", "Very Strong", "Uncrackable", "Quantum Resistant", "God Mode"
    ];
    const colors = [
        "darkred", "red", "orangered", "orange",
        "blue", "green", "darkgreen", "indigo", "gold"
    ];

    const finalScore = Math.min(score, labels.length - 1);

    result.textContent = `Strength: ${labels[finalScore]}`;
    result.style.color = colors[finalScore];
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

    // Show strength for generated password separately
    showGeneratedStrength(password);

    document.getElementById("copyMessage").textContent = "Password generated!";

}

function showGeneratedStrength(password) {
    const result = document.getElementById("generatedStrengthResult");

    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;

    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const labels = [
        "Pathetic", "Very Weak", "Weak", "Moderate",
        "Strong", "Very Strong", "Uncrackable", "Quantum Resistant", "God Mode"
    ];
    const colors = [
        "darkred", "red", "orangered", "orange",
        "blue", "green", "darkgreen", "indigo", "gold"
    ];

    const finalScore = Math.min(score, labels.length - 1);

    result.textContent = `Strength: ${labels[finalScore]}`;
    result.style.color = colors[finalScore];
}
