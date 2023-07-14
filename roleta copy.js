const sleep = time => new Promise((resolve) => {
  setTimeout(resolve, time)
})

function roleta(lista = []) {

  //Pegando o valor da div roleta
  const div_roleta = document.getElementById("roleta")
  const roleta_size = div_roleta.getBoundingClientRect().width - 90
  // Pega o objeto da roleta
  const canvas = document.getElementById('Wheel');
  const ctx = canvas.getContext('2d');

  //Definindo tamanho dos canvas roleta
  canvas.width = roleta_size
  canvas.height = roleta_size

  // Cria o circulo principal da roleta
  ctx.beginPath();
  ctx.arc(roleta_size / 2, roleta_size / 2, roleta_size / 2, 0, 2 * Math.PI);
  ctx.fillStyle = 'orange';
  ctx.fill();

  // Divide as informações para a criação dos items da roleta
  const numItems = lista.length;
  const itemAngle = (2 * Math.PI) / numItems;
  const itemNames = lista;

  //Criando roleta
  for (let i = 0; i < numItems; i++) {

    //Pega o centro do angulo de cada item 
    const sliceCenterAngle = (i * itemAngle) + (itemAngle / 2);
    const sliceCenterX = roleta_size / 2 + Math.cos(sliceCenterAngle) * roleta_size / 4;
    const sliceCenterY = roleta_size / 2 + Math.sin(sliceCenterAngle) * roleta_size / 4;
    const radios = Math.min(roleta_size / 2, roleta_size / 2) - 10

    ctx.beginPath();
    ctx.moveTo(roleta_size / 2, roleta_size / 2);
    ctx.arc(roleta_size / 2, roleta_size / 2, roleta_size / 2, i * itemAngle, (i + 1) * itemAngle, false);
    ctx.closePath();

    // Cor e espesura da borda
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    //Definir cor do item
    ctx.fillStyle = i % 2 === 0 ? 'orange' : 'brown';
    ctx.fill();
    ctx.stroke();

    // Define as propriedades do texto
    list_ord = itemNames.sort((a, b) => a.length - b.length)
    textSize = calcularTamanhoFonte(ctx, list_ord[list_ord.length - 1], radios, numItems)
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.save();

    // Ajuste para texto vertical
    ctx.translate(sliceCenterX, sliceCenterY);
    ctx.rotate(sliceCenterAngle + Math.PI * 4); // Rotação de 90 graus

    ctx.fillText(itemNames[i], 0, 0);

    ctx.restore();
  }

  //Criando botao roleta
  const canvas_btn = document.getElementById("btn_roleta")
  const btn_ctx = canvas_btn.getContext('2d')
  canvas_btn.width = 50
  canvas_btn.height = 50

  btn_ctx.beginPath()
  btn_ctx.arc(25, 25, 25, 0, Math.PI * 2)
  btn_ctx.fillStyle = 'black'
  btn_ctx.fill()

  return lista
}

function calcularTamanhoFonte(ctx, text, radius, items_quantia) {
  var area = (100 * (360 / items_quantia)) / 2;
  const areainicial = (100 * 360) / 2;
  var percentual = (area / areainicial) * 100;
  var fontSize = 400;
  fontSize = (fontSize * percentual) / 65;
  while (fontSize * text.length > radius) {
    fontSize--
  }
  ctx.font = fontSize + "px Arial";
}

function iniciarAnimacao() {
  const roleta = document.getElementById("Wheel")
  roleta.classList.remove("animacao");
  void roleta.offsetWidth; // Reinicia a animação removendo e adicionando a classe rapidamente IMPORTANTISSIMO
  roleta.classList.add("animacao");
}

async function sortear(lista) {
  iniciarAnimacao()
  lista_roleta = roleta(lista)
  let fatia = 360 / lista_roleta.length
  let sorteado = Math.floor(Math.random() * (lista_roleta.length))
  let p_sorteada = lista_roleta[sorteado]
  let giros_roleta = sorteado * fatia
  giros_roleta = Math.floor(Math.random() * ((giros_roleta + fatia + 1) - giros_roleta + 1)) + giros_roleta;
  giros_roleta = 360 * 10 + 360 - giros_roleta
  document.documentElement.style.setProperty("--rotacao", giros_roleta + "deg");
  await sleep(9000)
  return p_sorteada
}


function sortearJogadores() {
  //Pegar as informações do textarea
  let textarea = document.getElementById("textarea").value
  let lista = textarea.split("\n") // Converte o texto lista
  lista = lista.filter(function (value) { return value != '' }) //Retira os espaços vazios
  const jogadores = []

  if (lista.length >= 10) {
    for (i = 0; i < 10; i++) {
      random_n = Math.floor(Math.random() * lista.length)
      jogadores.push(lista[random_n])
      lista.splice(random_n, 1)
    }
    return jogadores
  } else {
    return lista
  }
}

function listaParticipantes(jogadores = []) {
  const tabela_p = document.getElementById("tabelaParticipantes")
    for (i = 0; i < 10; i++) {
      const jogador = document.createElement("tr")
      jogador.textContent = jogadores[i]
      jogador.style.padding = "15px"
      jogador.style.fontSize = "20px"
      tabela_p.appendChild(jogador)
    }
}

function botaoTimes(listaCapitaes) {
  const tabela_p = document.querySelectorAll("#tabelaParticipantes tr")
  for (i = 0; i < 10; i++) {
    if (tabela_p[i].textContent != listaCapitaes[0] && tabela_p[i].textContent != listaCapitaes[1]) {
      
      const botaoAzul = document.createElement("button")
      botaoAzul.type = "button"
      botaoAzul.id = "botaoAzul"  
      botaoAzul.textContent = "Time"
      botaoAzul.style.backgroundColor = "#4560e6"
      botaoAzul.style.padding = "2px"
      botaoAzul.style.color = "#ffffff"
      botaoAzul.style.borderRadius = "5px"
      botaoAzul.addEventListener("click", function(){
        const row = botaoAzul.parentNode.parentNode
        const tabelaTime = document.querySelector("#teamBlue tbody")
        let idValue = document.querySelectorAll("#teamBlue tbody tr")
        idValue = idValue[idValue.length-1].id.replace("row-","")
        const novoJogador = document.createElement("tr")
        const nameJogador = document.createElement("td")
        nameJogador.textContent = row.textContent.replace("Time", "")
        novoJogador.id = "row-"+idValue+1
        novoJogador.appendChild(nameJogador) 
        tabelaTime.appendChild(novoJogador)
        botaoAzul.parentNode.remove()
      })

      const botaoVermelho = document.createElement("button")
      botaoVermelho.type = "button"
      botaoVermelho.id = "botaoVermelho"
      botaoVermelho.textContent = "Time"
      botaoVermelho.style.backgroundColor = "#e0371d"
      botaoVermelho.style.padding = "2px"
      botaoVermelho.style.color = "#ffffff"
      botaoVermelho.style.borderRadius = "5px"
      botaoVermelho.addEventListener("click", function(){
        const row = botaoVermelho.parentNode.parentNode
        const tabelaTime = document.querySelector("#teamRed tbody")
        let idValue = document.querySelectorAll("#teamRed tbody tr")
        idValue = idValue[idValue.length-1].id.replace("row-","")
        const novoJogador = document.createElement("tr")
        const nameJogador = document.createElement("td")
        nameJogador.textContent = row.textContent.replace("Time", "")
        novoJogador.id = "row-"+idValue+1
        novoJogador.appendChild(nameJogador) 
        tabelaTime.appendChild(novoJogador)
        botaoVermelho.parentNode.remove()
      })
      const divButton = document.createElement("div")
      divButton.id = "box-botao"
      divButton.append(botaoAzul, botaoVermelho)
      tabela_p[i].append(divButton)
    }    
  }
}

async function divisaoTimes(listaJogadores, timeA, timeV, tipo_sorteio) {
  if (tipo_sorteio == "capitaes") {
    sorteios_qta = 2
  } if (tipo_sorteio == "times") {
    sorteios_qta = 10
  } if (tipo_sorteio == "resto") {
    sorteios_qta = 8
  }

  for (i = 0; i < sorteios_qta; i++) {
    const jogador_sorteado = await sortear(listaJogadores)
    listaJogadores.splice(listaJogadores.indexOf(jogador_sorteado), 1)
    if (i % 2 == 0) {
      const tablelines = document.querySelector("#teamBlue tbody")
      timeA.push(jogador_sorteado)

      const linha = document.createElement("tr")
      linha.id = "row-" + timeA.length
      const item = document.createElement("td")
      item.textContent = jogador_sorteado
      if(tipo_sorteio == "capitaes") {
        item.id = "capitao"
      }
      linha.appendChild(item)
      tablelines.appendChild(linha)
    } else {
      const tablelines = document.querySelector("#teamRed tbody")
      timeV.push(jogador_sorteado)

      const linha = document.createElement("tr")
      linha.id = "row-" + timeA.length
      const item = document.createElement("td")
      item.textContent = jogador_sorteado
      if(tipo_sorteio == "capitaes") {
        item.id = "capitao"
      }
      linha.appendChild(item)
      tablelines.appendChild(linha)
    }
  }
  console.log(timeA, timeV)
  return [listaJogadores, timeA, timeV]
}

const button_partida = document.getElementById("iniciar_p")

async function main() {
  // Variaveis
  const partida = {}
  let listaJogadores = sortearJogadores()
  let listaCapitaes = []
  let timeA = []
  let timeV = []
  const modos = ["Primitive Bagres",
    "Golden Match",
    "Maré de Bagres",
    "Caos Absoluto",
    "RoleSwap",
    "Espelho do Destino",
    "Heróis Invertidos"]

  if (listaJogadores.length >= 10) {
    listaParticipantes(listaJogadores)
    button_partida.removeEventListener("click", main)
    button_partida.style.backgroundColor = "#696969"
    do {
      modo = await sortear(modos)
      document.getElementById("gamemode").innerHTML = modo
      
      if (modo == "Primitive Bagres") {
        timeDivisao = await divisaoTimes(listaJogadores, timeA, timeV, "capitaes")
        listaJogadores = timeDivisao[0]
        listaCapitaes.push(timeDivisao[1])
        listaCapitaes.push(timeDivisao[2])
        botaoTimes(listaCapitaes)
      }
      if (modo == "Golden Match") {
        modos.splice(1,1)
      }
      if (modo == "Maré de Bagres") {
        timeDivisao = await divisaoTimes(listaJogadores, timeA, timeV, "capitaes")
        listaCapitaes.push(timeDivisao[1])
        listaCapitaes.push(timeDivisao[2])
        botaoTimes(listaCapitaes)
      }
      if (modo == "Caos Absoluto") {
        timeDivisao = await divisaoTimes(listaJogadores, timeA, timeV, "times")
        timeA = timeDivisao[1]
        timeB = timeDivisao[2]
      }
      if (modo == "RoleSwap") {
        timeDivisao = await divisaoTimes(listaJogadores, timeA, timeV, "times")
        timeA = timeDivisao[1]
        timeB = timeDivisao[2]
      }
      if (modo == "Espelho do Destino") {
        timeDivisao = await divisaoTimes(listaJogadores, timeA, timeV, "capitaes")
        listaCapitaes.push(timeDivisao[1])
        listaCapitaes.push(timeDivisao[2])
        botaoTimes(listaCapitaes)
      }
      if (modo == "Heróis Invertidos") {
        timeDivisao = await divisaoTimes(listaJogadores, timeA, timeV, "capitaes")
        listaCapitaes.push(timeDivisao[1])
        listaCapitaes.push(timeDivisao[2])
        botaoTimes(listaCapitaes)
      }
    } while (modo == "Golden Match")
    console.log(timeA + "\n" + timeV)
  } else {
    alert("Coloque no minino 10 jogadores para iniciar uma partida!")
  }
}

button_partida.addEventListener("click", main)