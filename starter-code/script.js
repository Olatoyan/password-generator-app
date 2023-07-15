const slider = document.querySelector(".password__range");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const getPassword = document.querySelector(".generate");
const passwordLength = document.querySelector(".password__length");
const strengthType = document.querySelector(".strength__type");
const strengthBars = document.querySelectorAll(".bar");
const allCheckbox = document.querySelectorAll(".checkbox");
const passwordOutput = document.querySelector(".password__output");
const copy = document.querySelector(".copy");
const copiedText = document.querySelector(".copied");

slider.addEventListener("input", function () {
  const value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
  slider.style.backgroundSize = value + "%";

  console.log(slider.value);
  passwordLength.textContent = slider.value;
  // generatePassword(slider.value);
});

const generatePassword = function (length) {
  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()";
  const charPoolSize =
    uppercaseLetters.length +
    lowercaseLetters.length +
    numbers.length +
    symbols.length;
  let characters = "";

  if (uppercaseCheckbox.checked) {
    characters += uppercaseLetters;
  }
  if (lowercaseCheckbox.checked) {
    characters += lowercaseLetters;
  }
  if (numbersCheckbox.checked) {
    characters += numbers;
  }
  if (symbolsCheckbox.checked) {
    characters += symbols;
  }
  let generatedPassword = "";

  for (let i = 0; i < +passwordLength.textContent; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    generatedPassword += characters.charAt(randomIndex);
  }

  const passwordStrength = zxcvbn(generatedPassword).score;
  console.log(generatedPassword);
  updateStrengthIndicator(passwordStrength);
  passwordOutput.textContent = generatedPassword;
};

const updateStrengthIndicator = function (strength) {
  console.log(strength);
  strengthBars.forEach((bar, index) => {
    bar.classList.remove("too__weak", "weak", "medium", "strong");

    if (strength <= 1 && index === 0) {
      bar.classList.add("too__weak");
      strengthType.textContent = "too weak!";
    } else if (strength === 2 && index < 2) {
      bar.classList.add("weak");
      strengthType.textContent = "weak";
    } else if (strength === 3 && index < 3) {
      bar.classList.add("medium");
      strengthType.textContent = "medium";
    } else if (strength === 4) {
      bar.classList.add("strong");
      strengthType.textContent = "strong";
    }
  });
};

getPassword.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    !uppercaseCheckbox.checked &&
    !lowercaseCheckbox.checked &&
    !numbersCheckbox.checked &&
    !symbolsCheckbox.checked
  ) {
    passwordOutput.style.opacity = "0.25";
    strengthType.style.display = "none";
    passwordOutput.textContent = "P4$5W0rD!";

    strengthBars.forEach((bar) => {
      bar.classList.remove("too__weak", "weak", "medium", "strong");
    });
    return;
  }
  if (+slider.value === 0) {
    passwordOutput.style.opacity = "0.25";
    strengthType.style.display = "none";
    passwordOutput.textContent = "P4$5W0rD!";

    strengthBars.forEach((bar) => {
      bar.classList.remove("too__weak", "weak", "medium", "strong");
    });
    return;
  } else {
    passwordOutput.style.opacity = "1";
    strengthType.style.display = "block";
    strengthBars.forEach((bar) => {
      bar.classList.remove("too__weak", "weak", "medium", "strong");
    });
  }
  generatePassword();
});

copy.addEventListener("click", function (e) {
  if (
    +slider.value === 0 ||
    (!uppercaseCheckbox.checked &&
      !lowercaseCheckbox.checked &&
      !numbersCheckbox.checked &&
      !symbolsCheckbox.checked)
  ) {
    passwordOutput.textContent = "P4$5W0rD!";
    return;
  }
  console.log(this);
  const text = this.closest(".password__output__box").querySelector(
    ".password__output"
  ).textContent;
  console.log(text);
  navigator.clipboard.writeText(text);

  setTimeout(() => {
    copiedText.style.opacity = "1";
    copiedText.style.visibility = "visible";
    copiedText.style.transform = "translateY(0)";

    setTimeout(() => {
      copiedText.style.opacity = "0";
      copiedText.style.visibility = "hidden";
      copiedText.style.transform = "translateY(-100%)";
    }, 2000);
  }, 200);
});
