function valorNegativo(saldo) {
    let iconePositivo = document.querySelector(".bi-check-circle-fill");
    let iconeNegativo = document.querySelector(".bi-exclamation-triangle-fill");

    if (saldo < 0) {
        document.getElementById('saldo').style.color = 'rgb(123, 21, 21)'
        iconePositivo.style.display = 'none'
        iconeNegativo.style.display = 'block'
    } else {
        document.getElementById('saldo').style.color = ''
        iconePositivo.style.display = 'block'
        iconeNegativo.style.display = 'none'
    }
}