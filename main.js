function generatePassword() {
    const abcMinusculas = "abcdefghijklmnñopqrstuvwxyz";
    const abcMayusculas = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    const numeros = "0123456789";
    const simbolos = "$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
    let caracteres = abcMinusculas;

    let usarMayusculas = document.getElementById("numeros").checked;
    let usarNumeros = document.getElementById("simbolos").checked;
    let usarSimbolos = document.getElementById("mayuscula").checked;

    let length = parseInt(document.getElementById("length").value);
    let password = "";

    if (usarMayusculas) {
        caracteres += abcMayusculas;
    } if (usarNumeros) {
        caracteres += numeros;
    } if (usarSimbolos) {
        caracteres += simbolos;
    }

    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * caracteres.length);
        password += caracteres.charAt(randomIndex);
    }

    document.getElementById("password").value = password;
}