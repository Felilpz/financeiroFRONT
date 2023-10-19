function formatarData(numero) {
    if (numero <= 9) {
        return "0" + numero;
    } else {
        return numero;
    }
}

function funcaoData() {
    let data1 = document.querySelector('.data').value
    let data = data1.split('-').reverse().join('/');
}

let dataFormatada = funcaoData()
