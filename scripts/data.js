// //fazer uma forma para armazenar e uma para mostrar
// //o postgres armazena a data em formato yy-mm-dd

// // function formatarData(numero) {
// //     if (numero <= 9) {
// //         return "0" + numero;
// //     } else {
// //         return numero;
// //     }
// // }


// let btn = document.getElementById('btn')

// function funcaoData() {
//     let data1 = document.querySelector('.data').value
//     let data = data1.split('-').reverse().join('/');
//     // console.log(data)
// }
// let dataFormatada = funcaoData()

// function ordenar() {
//     transacoes.sort((a, b) => {
//         const dataA = new Date(b.data);
//         const dataB = new Date(a.data);
//         return dataB - dataA;
//     });
// }

transacoes.sort((a, b) => {
    const dataA = new Date(b.data);
    const dataB = new Date(a.data);
    return dataA - dataB;
});