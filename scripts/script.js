//botar input date
//tipar o data do banco de dados para date
//as transacoes precisam estar listadas pelas mais novas em questão de data
//adicionar window.confirm no botao de deletar

const $meuform = document.querySelector("#meu-form");

let transacoes = [];
let editando = false;
let transacaoId = null;

const $proventos = document.getElementById('proventos');
const $gastos = document.getElementById('gastos');
const $saldo = document.getElementById('saldo');


// PROJETO - CARREGAR
window.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("http://127.0.0.1:5000/api/transacoes");
  const dados = await response.json();
  transacoes = dados;
  carregarTransacoes();
});

// PROJETO - CRIAR
$meuform.addEventListener("submit", async (e) => {
  e.preventDefault();
  const descricao = $meuform["desc-name"].value;
  const valor = $meuform["valor-name"].value;
  const tipo = $meuform["radio-name"].value;


  function funcaoData() {
    let data1 = document.querySelector('.data').value;
    let data = data1.split('-').reverse().join('/');
    return data;
  }

  let dataFormatada = funcaoData();

  if (!editando) {
    const response = await fetch("http://127.0.0.1:5000/api/transacoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        descricao,
        valor,
        tipo,
        dataFormatada
      }),

    });
    // console.log(dataFormatada)

    const dados = await response.json();
    transacoes.push(dados);
    carregarTransacoes();

  } else {
    const response = await fetch(`http://127.0.0.1:5000/api/transacoes/${transacaoId}`, {
      // let valorData = response.data
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        descricao,
        valor,
        tipo,
        dataFormatada
      }),

    });

    const updateTransacao = await response.json();
    transacoes = transacoes.map((transacao) => transacao.idtransacao === updateTransacao.idtransacao ? updateTransacao : transacao);

    carregarTransacoes();

    editando = false;
    transacaoId = null;
  }
  // location.reload();
  $meuform.reset();
  $proventos.value = '';
  $gastos.value = '';
  $saldo.value = '';

});

function carregarTransacoes() {
  const transacoesLista = document.getElementById("corpoTabela");
  transacoesLista.innerHTML = "";

  transacoes.forEach((transacao) => {
    const transacaoItem = document.createElement("tr");

    const valorFormatado = parseFloat(transacao.valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });


    transacaoItem.innerHTML = `
      <td>${transacao.descricao}</td>
      <td>${valorFormatado}</td>
      <td class="tipo"><i class="bi ${transacao.tipo === 'Entrada' ? 'bi-caret-up-fill' : 'bi-caret-down-fill'}"></i></td>
      <td>${transacao.data}</td>
      <td class="btns">
        <i data-id"${transacao.idtransacao} class="bi bi-pencil-fill btn-edit""></i>
        <i data-id"${transacao.idtransacao} class="bi bi-trash3-fill btn-delete""></i>
      </td>
    `;

    // deletar transacao
    const btnDelete = transacaoItem.querySelector(".btn-delete");
    btnDelete.addEventListener("click", async (e) => {
      const windowDelete = window.confirm("Tem certeza que deseja excluir esta transação?");

      if (windowDelete) {
        const response = await fetch(
          `http://127.0.0.1:5000/api/transacoes/${transacao.idtransacao}`, {
          method: "DELETE",
        });

        const data = await response.json();

        transacoes = transacoes.filter(
          (transacao) => transacao.idtransacao !== data.idtransacao
        );
        carregarTransacoes();
        valorNegativo();
      }
    });

    transacoesLista.appendChild(transacaoItem);

    //editar transacao
    const btnEdit = transacaoItem.querySelector(".btn-edit");
    btnEdit.addEventListener("click", async (e) => {
      const response = await fetch(
        `http://127.0.0.1:5000/api/transacoes/${transacao.idtransacao}`
      );

      const data = await response.json();
      $meuform["desc-name"].value = data.descricao;
      $meuform["valor-name"].value = data.valor;
      $meuform["radio-name"].value = data.tipo;


      console.log(data.data);

      const dataTransacaoInput = document.getElementById("dataInput");
      const datinha = data.data.split('/').reverse().join('-');

      dataTransacaoInput.value = datinha;


      let type = $meuform["radio-name"].value;
      if ($meuform["radio-name"].value == "Entrada") {
        document.querySelector("#entrada").checked = true;
      } else {
        document.querySelector("#saida").checked = true;
      }

      editando = true;
      transacaoId = transacao.idtransacao;
    });

    valorNegativo();
  });
  popularCards()
}


// CARREGAR CARDS
function popularCards() {
  if (transacoes.length === 0) {
    document.querySelector('#proventos').innerHTML = 'R$ 0,00';
    document.querySelector('#gastos').innerHTML = 'R$ 0,00';
    document.querySelector('#saldo').innerHTML = 'R$ 0,00';
  } else {
    fetch('http://127.0.0.1:5000/valores')
      .then(response => response.json())
      .then(corpo => {
        let totalEntradasFormatado = parseFloat(corpo.total_entradas).toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
        let totalSaidaFormatado = parseFloat(corpo.total_saida).toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
        let saldoFormatado = parseFloat(corpo.saldo).toLocaleString('pt-br', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })

        valorNegativo(corpo.saldo)
        document.querySelector('#proventos').innerHTML = `R$ ${totalEntradasFormatado}`
        document.querySelector('#gastos').innerHTML = `R$ ${totalSaidaFormatado}`;
        document.querySelector('#saldo').innerHTML = `R$ ${saldoFormatado}`
      })
  }

}
