"use strict";

const dadosDaConversao = {
    cotacao: [],
    entrada: {
        valor: undefined,
        moeda: undefined
    },
    saida: {
        moeda: undefined
    }
}

async function receberParametrosUsuario() {
    dadosDaConversao.entrada.valor = document.querySelector(".entrada .valor").value;
    dadosDaConversao.entrada.moeda = document.querySelector(".entrada .moeda").value;
    dadosDaConversao.saida.moeda = document.querySelector(".saida .moeda").value;
}

async function carregarDadosConversaoMoedas() {
    try{
        const url = "https://api2.binance.com/api/v3/ticker/24hr";
        const resposta = await fetch(url);
        const json = await resposta.json();
        return json;
    }
    catch(erro){
        return window.cotacaoDasMoedasPadrao;
    }
    
}

async function receberDadosMoedas() {
    if(dadosDaConversao.cotacao.length > 0){
        return        
    }
    const moedas = await carregarDadosConversaoMoedas();

    const paraBtc = moedas
        .filter(cotacao => cotacao.symbol.endsWith("BTC"))
        .map(cotacao => ({
            moeda: cotacao.symbol.substring(0, cotacao.symbol.indexOf("BTC")),
            valor: parseFloat(cotacao.lastPrice)
        }));

    const deBtc = moedas
        .filter(cotacao => cotacao.symbol.startsWith("BTC"))
        .map(cotacao => ({
            moeda: cotacao.symbol.substring(3),
            valor: 1 / parseFloat(cotacao.lastPrice)
        }));

    dadosDaConversao.cotacao = [
        { moeda: "BTC", valor: 1 },
        ...paraBtc,
        ...deBtc,
    ];
}

async function calcularResultado() {
    const valorDeEntrada = parseFloat(dadosDaConversao.entrada.valor);
    const moedaDeEntrada = (dadosDaConversao.entrada.moeda || "BTC").toUpperCase();
    const moedaDeSaida = (dadosDaConversao.saida.moeda || "USDT").toUpperCase();

    const cotacaoDaMoedaDeEntradaParaBtc = moedaDeEntrada === "BTC"
        ? 1
        : dadosDaConversao.cotacao.find(cotacao => cotacao.moeda == moedaDeEntrada)?.valor;
    if(cotacaoDaMoedaDeEntradaParaBtc == undefined){
        console.error(`ERRO: Moeda não existe: ${moedaDeEntrada}`);
    }

    const cotacaoDaMoedaDeSaidaParaBtc = moedaDeSaida === "BTC"
        ? 1
        : dadosDaConversao.cotacao.find(cotacao => cotacao.moeda == moedaDeSaida)?.valor;
    if(cotacaoDaMoedaDeSaidaParaBtc == undefined){
        console.error(`ERRO: Moeda não existe: ${moedaDeSaida}`);
    }

    if(cotacaoDaMoedaDeEntradaParaBtc === undefined || cotacaoDaMoedaDeSaidaParaBtc === undefined){
        return
    }

    const razao = cotacaoDaMoedaDeEntradaParaBtc / cotacaoDaMoedaDeSaidaParaBtc;
    const valorDeSaida = valorDeEntrada * razao;

    const valorDeEntradaDecimais = moedaDeEntrada.includes("USD") || moedaDeEntrada.includes("BRL") ? 2 : 8;
    const valorDeSaidaDecimais = moedaDeSaida.includes("USD") || moedaDeSaida.includes("BRL") ? 2 : 8;

    document.querySelector(".saida .valor").value = valorDeSaida.toFixed(valorDeSaidaDecimais);
}
function preencherMoedasNaLista(select, moedas){
    if(!select){
        console.error("preencherMoedasNaLista: select não encontrado", select, moedas);
        return;
    }
    const selecao = select.value || "";
    select.innerHTML = "";
    if(!Array.isArray(moedas)){
        console.error("preencherMoedasNaLista: moedas inválidas", moedas);
        return;
    }
    moedas.forEach(moeda => {
        const option = document.createElement("option");
        option.value = moeda;
        option.innerHTML = moeda;
        select.appendChild(option);
    });
    if(selecao) select.value = selecao;
}

function preencherMoedas(){
    let moedas = (dadosDaConversao.cotacao || []).map(cotacao => cotacao.moeda)
    moedas.push("BTC")
    moedas = moedas.filter(Boolean)
    moedas = Array.from(new Set(moedas)).sort()

    preencherMoedasNaLista(document.querySelector(".entrada .moeda"), moedas);
    preencherMoedasNaLista(document.querySelector(".saida .moeda"), moedas);

}

async function executarPrograma() {
    await receberDadosMoedas();
    preencherMoedas();
    await receberParametrosUsuario();
    await calcularResultado();
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".entrada .valor").addEventListener("input", executarPrograma);
    document.querySelector(".entrada .moeda").addEventListener("change", executarPrograma);
    document.querySelector(".saida .moeda").addEventListener("change", executarPrograma);
    executarPrograma();
});

const toggle = document.getElementById("toggle");
if (toggle) {
    toggle.addEventListener("click", () => {
        document.body.classList.toggle('Tema_Escuro');
        document.body.classList.toggle('Tema_Claro');
        toggle.classList.toggle("active");
        document.body.classList.toggle("dark");
    });
}


