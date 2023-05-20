const abcMinusculas = "abcdefghijklmnñopqrstuvwxyz";
const abcMayusculas = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
const numeros = "0123456789";
const simbolos = "$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

function generatePassword(mayusculas, num, sim) {
    let charset = abcMinusculas;

    if (mayusculas) {
        charset += abcMayusculas;
    } if (num) {
        charset += numeros;
    } if (sim) {
        charset += simbolos;
    }

    let length = parseInt(document.getElementById("length").value);
    let password = "";

    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }

    // return password;
    document.getElementById("password").value = password;
}