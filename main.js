function generatePassword() {
    const abcMayusculas = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    const numeros = "0123456789";
    const simbolos = "$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
    let caracteres = "abcdefghijklmnñopqrstuvwxyz";

    let usarMayusculas = document.getElementById("mayusculas");
    let usarNumeros = document.getElementById("numeros");
    let usarSimbolos = document.getElementById("simbolos");

    if (usarMayusculas.checked) {
        caracteres += abcMayusculas;
    } if (usarNumeros.checked) {
        caracteres += numeros;
    } if (usarSimbolos.checked) {
        caracteres += simbolos;
    }

    let length = parseInt(document.getElementById("length").value);
    let password = "";

    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * caracteres.length);
        password += caracteres.charAt(randomIndex);
    }

    document.getElementById("password").value = password;
}

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
    const userMessage = 'Hola, ¿cómo estás?';
    const response = await chatGPT(userMessage);
    console.log(response);

    document.getElementById("chatgpt").value = response;
}