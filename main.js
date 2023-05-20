const abcMin = "abcdefghijklmnñopqrstuvwxyz";
const abcMay = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
const numeros = "0123456789";
const simbolos = "$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

let passLen = 16;

function generatePassword() {
    var length = parseInt(document.getElementById("length").value);
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    var password = "";

    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }

    document.getElementById("password").value = password;
}