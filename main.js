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