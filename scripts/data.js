function formatarData(numero) {
    if (numero <= 9) {
        return "0" + numero;
    } else {
        return numero;
    }
}

function funcaoData() {
    let data1 = document.querySelector('.data').value;
    let partes = data1.split('-');
    return formatarData(partes[2]) + '/' + formatarData(partes[1]) + '/' + partes[0];
}

let dataFormatada = funcaoData();
console.log(dataFormatada);
