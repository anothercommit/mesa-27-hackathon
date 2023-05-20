// This is a simple Password Generator App that will generate random password maybe you can you them to secure your account.
// I tried my best to make the code as simple as possible please dont mind the variable names.
// Also this idea came in my mind after checking Traversy Media's latest video.

// Clear the concole on every refresh
console.clear();
// set the body to full height
// document.body.style.height = `${innerHeight}px`

// Range Slider Properties.
// Fill : The trailing color that you see when you drag the slider.
// background : Default Range Slider Background
const sliderProps = {
	fill: "#0B1EDF",
	background: "rgba(255, 255, 255, 0.214)",
};

// Selecting the Range Slider container which will effect the LENGTH property of the password.
const slider = document.querySelector(".range__slider");

// Text which will show the value of the range slider.
const sliderValue = document.querySelector(".length__title");

// Using Event Listener to apply the fill and also change the value of the text.
slider.querySelector("input").addEventListener("input", event => {
	sliderValue.setAttribute("data-length", event.target.value);
	applyFill(event.target);
});
// Selecting the range input and passing it in the applyFill func.
applyFill(slider.querySelector("input"));
// This function is responsible to create the trailing color and setting the fill.
function applyFill(slider) {
	const percentage = (100 * (slider.value - slider.min)) / (slider.max - slider.min);
	const bg = `linear-gradient(90deg, ${sliderProps.fill} ${percentage}%, ${sliderProps.background} ${percentage +
		0.1}%)`;
	slider.style.background = bg;
	sliderValue.setAttribute("data-length", slider.value);
}

// Object of all the function names that we will use to create random letters of password
const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol,
};

// Random more secure value
function secureMathRandom() {
	return window.crypto.getRandomValues(new Uint32Array(1))[0] / (Math.pow(2, 32) - 1);
}

// Generator Functions
// All the functions that are responsible to return a random value taht we will use to create password.
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
	return String.fromCharCode(Math.floor(secureMathRandom() * 10) + 48);
}
function getRandomSymbol() {
	const symbols = '~!@#$%^&*()_+{}":?><;.,';
	return symbols[Math.floor(Math.random() * symbols.length)];
}

// Selecting all the DOM Elements that are necessary -->

// The Viewbox where the result will be shown
const resultEl = document.getElementById("result");
// The input slider, will use to change the length of the password
const lengthEl = document.getElementById("slider");

// Checkboxes representing the options that is responsible to create differnt type of password based on user
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");

// Button to generate the password
const generateBtn = document.getElementById("generate");
// Button to copy the text
const copyBtn = document.getElementById("copy-btn");
// Result viewbox container
const resultContainer = document.querySelector(".result");
// Text info showed after generate button is clicked
const copyInfo = document.querySelector(".result__info.right");
// Text appear after copy button is clicked
const copiedInfo = document.querySelector(".result__info.left");

// if this variable is trye only then the copyBtn will appear, i.e. when the user first click generate the copyBth will interact.
let generatedPassword = false;

// Update Css Props of the COPY button
// Getting the bounds of the result viewbox container
let resultContainerBound = {
	left: resultContainer.getBoundingClientRect().left,
	top: resultContainer.getBoundingClientRect().top,
};
// This will update the position of the copy button based on mouse Position
resultContainer.addEventListener("mousemove", e => {
	resultContainerBound = {
		left: resultContainer.getBoundingClientRect().left,
		top: resultContainer.getBoundingClientRect().top,
	};
	if (generatedPassword) {
		copyBtn.style.opacity = '1';
		copyBtn.style.pointerEvents = 'all';
		copyBtn.style.setProperty("--x", `${e.x - resultContainerBound.left}px`);
		copyBtn.style.setProperty("--y", `${e.y - resultContainerBound.top}px`);
	} else {
		copyBtn.style.opacity = '0';
		copyBtn.style.pointerEvents = 'none';
	}
});
window.addEventListener("resize", e => {
	resultContainerBound = {
		left: resultContainer.getBoundingClientRect().left,
		top: resultContainer.getBoundingClientRect().top,
	};
});

// Copy Password in clipboard
copyBtn.addEventListener("click", () => {
	const textarea = document.createElement("textarea");
	const password = resultEl.innerText;
	if (!password || password == "CLICK GENERATE") {
		return;
	}
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand("copy");
	textarea.remove();

	copyInfo.style.transform = "translateY(200%)";
	copyInfo.style.opacity = "0";
	copiedInfo.style.transform = "translateY(0%)";
	copiedInfo.style.opacity = "0.75";
});

// When Generate is clicked Password id generated.
generateBtn.addEventListener("click", () => {
	const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numberEl.checked;
	const hasSymbol = symbolEl.checked;
	generatedPassword = true;
	resultEl.innerText = generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol);
	copyInfo.style.transform = "translateY(0%)";
	copyInfo.style.opacity = "0.75";
	copiedInfo.style.transform = "translateY(200%)";
	copiedInfo.style.opacity = "0";
});

// Function responsible to generate password and then returning it.
function generatePassword(length, lower, upper, number, symbol) {
	let generatedPassword = "";
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);
	if (typesCount === 0) {
		return "";
	}
	for (let i = 0; i < length; i++) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	return generatedPassword.slice(0, length);
}

// function that handles the checkboxes state, so at least one needs to be selected. The last checkbox will be disabled.
function disableOnlyCheckbox() {
	let totalChecked = [uppercaseEl, lowercaseEl, numberEl, symbolEl].filter(el => el.checked)
	totalChecked.forEach(el => {
		if (totalChecked.length == 1) {
			el.disabled = true;
		} else {
			el.disabled = false;
		}
	})
}

[uppercaseEl, lowercaseEl, numberEl, symbolEl].forEach(el => {
	el.addEventListener('click', () => {
		disableOnlyCheckbox()
	})
})

// Datos de configuración para la solicitud
const endpoint = 'https://api.openai.com/v1/chat/completions';
// const apiKey = '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'; // Joaco D.
// const apiKey = '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'; // Lauti
const apiKey = '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'; // Benja

const model = 'gpt-3.5-turbo';

// Función para hacer la solicitud al API de ChatGPT
async function chatGPT(message) {
	const response = await fetch(endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model,
			messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: message }]
		})
	});

	const data = await response.json();
	console.log(data);
	return data.choices[0].message.content;
}

// Ejemplo de uso
async function runChat() {
	const baseMessage =
		"You will act as a password generator. You will answer only with the password. I will tell you in spanish how I want the passowrd to be: "
	const userMessage = baseMessage + document.getElementById("prompt").value;
	const response = await chatGPT(userMessage);
	console.log(response);

	document.getElementById("chatgpt").innerHTML = response;
}