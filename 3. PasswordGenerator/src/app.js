const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span i");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!#$%&()+,-./:;<=>?@[]^_\`{|}~ \'\""
}

const generarContraseña = () => {
    let staticPassword = "",
        randomPassword = "",
        excludeDuplicate = false,
        passLength = lengthSlider.value;

    options.forEach(option => {
        if (option.checked) {
            if (option.id !== "exc-duplicate" && option.id !== "spaces") {
                staticPassword += characters[option.id];
            } else if (option.id === "spaces") {
                staticPassword += `  ${staticPassword}  `;
            } else {
                excludeDuplicate = true;
            }
        }
    });

    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if (excludeDuplicate) {
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        } else {
            randomPassword += randomChar;
        }
    }
    passwordInput.value = randomPassword;

}

const actualizarIndicadorContraseña = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}

const actualizarSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generarContraseña();
    actualizarIndicadorContraseña();
}
actualizarSlider();

const copiarContraseña = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.className = "fa-solid fa-check";
    copyIcon.style.color = "#2b6455";

    setTimeout(() => {
        copyIcon.className = "fa-solid fa-copy";
    }, 1500);
}

copyIcon.addEventListener("click", copiarContraseña);
lengthSlider.addEventListener("input", actualizarSlider);
generateBtn.addEventListener("click", generarContraseña);