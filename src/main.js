/*MIT License

Copyright (c) 2020 Victor Lucio

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/

document.body.onload = firstRenderPage

// Criação das variáveis 'globais' (acessíveis em todo o arquivo)
var startTime
var contador
var tempocronometrado
var numvolta = 1;
var image_hours1 = document.createElement("img")
var image_hours2 = document.createElement("img")
var image_2points1 = document.createElement("img")
var image_minutes1 = document.createElement("img")
var image_minutes2 = document.createElement("img")
var image_2points2 = document.createElement("img")
var image_seconds1 = document.createElement("img")
var image_seconds2 = document.createElement("img")

// Função de Inicialização
function firstRenderPage(){
	// Criação do head e seus elementos
	var mainHead = document.head
	var title = document.createElement("title")
	var style = document.createElement("link")
	var favicon = document.createElement("link")
	var titulodapagina = document.createTextNode("Cronômetro FNAF")

	style.setAttribute("rel", "stylesheet")
	style.setAttribute("href", "./src/style.css")
	favicon.setAttribute("rel", "shortcut icon")
	favicon.setAttribute("href", "./assets/favicon.ico")

	title.appendChild(titulodapagina)
	mainHead.appendChild(title)
	mainHead.appendChild(style)
	mainHead.appendChild(favicon)


	// Criação do body - Div título
	var mainBody = document.createElement("body")
	var divtitulo = document.createElement("div")
	var h1titulo = document.createElement("h1")
	var titulo = document.createTextNode("Cronômetro FNAF")

	divtitulo.setAttribute("id", "divtitulo")

	h1titulo.appendChild(titulo)
	divtitulo.appendChild(h1titulo)
	mainBody.appendChild(divtitulo)


	// Body - Div cronômetro
	var divcronometro = document.createElement("div")

	divcronometro.setAttribute("id", "divcronometro")

	image_hours1.src = "./assets/relogio-0.png"
	image_hours2.src = "./assets/relogio-0.png"
	image_2points1.src = "./assets/relogio-2pontos.png"
	image_minutes1.src = "./assets/relogio-0.png"
	image_minutes2.src = "./assets/relogio-0.png"
	image_2points2.src = "./assets/relogio-2pontos.png"
	image_seconds1.src = "./assets/relogio-0.png"
	image_seconds2.src = "./assets/relogio-0.png"

	divcronometro.appendChild(image_hours1)
	divcronometro.appendChild(image_hours2)
	divcronometro.appendChild(image_2points1)
	divcronometro.appendChild(image_minutes1)
	divcronometro.appendChild(image_minutes2)
	divcronometro.appendChild(image_2points2)
	divcronometro.appendChild(image_seconds1)
	divcronometro.appendChild(image_seconds2)
	mainBody.appendChild(divcronometro)


	// Body - Div botões
	var divbotoes = document.createElement("div")

	divbotoes.setAttribute("id", "divbotoes")

	var btnStart = document.createElement("input")
	btnStart.setAttribute("type", "button")
	btnStart.setAttribute("id", "btnStart")
	btnStart.setAttribute("value", "Começar")
	btnStart.setAttribute("name","0")
	btnStart.onclick = async () => {StartCount()}

	var btnVolta = document.createElement("input")
	btnVolta.setAttribute("type", "button")
	btnVolta.setAttribute("value", "Volta")
	btnVolta.onclick = async () => {VoltaCount()}

	var btnRestart = document.createElement("input")
	btnRestart.setAttribute("type", "button")
	btnRestart.setAttribute("value", "Zerar")
	btnRestart.onclick = async () => {RestartCount()}

	var btnLimpar = document.createElement("input")
	btnLimpar.setAttribute("type", "button")
	btnLimpar.setAttribute("value", "Limpar Voltas")
	btnLimpar.onclick = async () => {LimparLista()}

	divbotoes.appendChild(btnStart)
	divbotoes.appendChild(btnVolta)
	divbotoes.appendChild(btnRestart)
	divbotoes.appendChild(btnLimpar)
	mainBody.appendChild(divbotoes)


	// Body - Div tabela de voltas
	var divtabela = document.createElement("div")
	var lista = document.createElement("ul")
	
	lista.setAttribute("id", "lista")

	divtabela.appendChild(lista)
	mainBody.appendChild(divtabela)

	document.body = mainBody
}

// Função de Início da Contagem
function StartCount(){
	var btnStart = document.getElementById("btnStart")
	btnStart.setAttribute("name", "1")

	if(btnStart.disabled != true){
		startTime = new Date()
	}
	contador = setInterval(CounterMain, 1000);
	
	btnStart.disabled = true

}

// Função de Contagem Principal, serve para juntar a renderização e a lógica do cronômetro
async function CounterMain(){
	let newTime = new Date();
	tempocronometrado = parseInt((newTime - startTime)/1000);
	renderClock(await CounterLogic());
}

// Função de Contagem Lógica, controla a lógica/ordem dos números
function CounterLogic(){
	var horarios = [0, 0, 0]
	horarios[2] = tempocronometrado

	while(horarios[2] >= 60){
		if(horarios[2] >= 60){
			horarios[2]-= 60
			horarios[1]+=1
		}
		if(horarios[1] >= 60){
			horarios[1]-= 60
			horarios[0]+=1
		}
	}
	return [horarios[0], horarios[1], horarios[2]]

}

// Função de Renderização do Cronômetro
function renderClock(tempoFormatado){
	if(tempoFormatado[0] >= 10){
		image_hours1.src = "./assets/relogio-" + (parseInt(tempoFormatado[0]/10)).toString() +".png"
		image_hours2.src = "./assets/relogio-" + (tempoFormatado[0]).toString()[1] +".png"
	}else{
		image_hours1.src = "./assets/relogio-0.png"
		image_hours2.src = "./assets/relogio-" + (tempoFormatado[0]) +".png"
	}

	if(tempoFormatado[1] >= 10){
		image_minutes1.src = "./assets/relogio-" + (parseInt(tempoFormatado[1]/10)).toString() +".png"
		image_minutes2.src = "./assets/relogio-" + (tempoFormatado[1]).toString()[1] +".png"
	}else{
		image_minutes1.src = "./assets/relogio-0.png"
		image_minutes2.src = "./assets/relogio-" + (tempoFormatado[1]) +".png"
	}

	if(tempoFormatado[2] >= 10){
		image_seconds1.src = "./assets/relogio-" + (parseInt(tempoFormatado[2]/10)).toString() +".png"
		image_seconds2.src = "./assets/relogio-" + (tempoFormatado[2]).toString()[1] +".png"
	}else{
		image_seconds1.src = "./assets/relogio-0.png"
		image_seconds2.src = "./assets/relogio-" + (tempoFormatado[2]) +".png"
	}
}

// Função de Marcar uma volta, adiciona o tempo atual à lista de voltas
async function VoltaCount(){
	var horarios = (await CounterLogic());
	if(horarios[2] == undefined){
		horarios[2] = 0
	}
	var lista = document.getElementById("lista")
	var item = document.createElement("li")
	item.innerHTML = numvolta + "º Tempo Marcado = " + horarios[0] + ":" + horarios[1] + ":" + horarios[2]
	numvolta++;
	lista.appendChild(item)
}

// Função de limpar a lista de voltas
function LimparLista(){
	var lista = document.getElementById("lista")
	lista.innerHTML = ''
	numvolta = 1
}

// Função de Reinício da Contagem
function RestartCount(){
	btnStart = document.getElementById("btnStart")
	btnStart.setAttribute("name", "0")
	clearInterval(contador)
	renderClock([0, 0, 0])
	btnStart.disabled = false
}


