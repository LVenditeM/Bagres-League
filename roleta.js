function roleta() {

  //Pegar as informações do textarea
  console.clear()
  let lista = []
  let textarea = document.getElementById("textarea").value
  lista = textarea.split("\n") // Converte o texto em lista
  lista = lista.filter(function (value) { return value != '' }) //Retira os espaços vazios
  console.log(lista)

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
    console.log(list_ord)
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
function modoJogo() {
  

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
  console.log("Area", area)
  console.log("Area Inicial", areainicial)
  console.log("Percentual", percentual)
  ctx.font = fontSize + "px Arial";
}




function iniciarAnimacao() {
  const roleta = document.getElementById("Wheel")
  roleta.classList.remove("animacao");
  void roleta.offsetWidth; // Reinicia a animação removendo e adicionando a classe rapidamente IMPORTANTISSIMO
  roleta.classList.add("animacao");
}

function sortear() {
  iniciarAnimacao()
  lista_roleta = roleta()
  let fatia = 360 / lista_roleta.length
  let sorteado = Math.floor(Math.random() * (lista_roleta.length))
  let p_sorteada = lista_roleta[sorteado]
  let giros_roleta = sorteado * fatia
  giros_roleta = Math.floor(Math.random() * ((giros_roleta + fatia + 1) - giros_roleta + 1)) + giros_roleta;
  console.log(giros_roleta)
  giros_roleta = 360 * 10 + 360 - giros_roleta
  console.log(fatia)
  console.log(p_sorteada, giros_roleta)
  document.documentElement.style.setProperty("--rotacao", giros_roleta + "deg");
  document.getElementById("resultado").innerHTML = "P sorteada: " + p_sorteada;
  return [p_sorteada, giros_roleta]
}

const jogadores = localStorage.getItem("jogadores");
function modosDeJogo(prm) {
  modos = ["Primitive Bagres",
    "Golden Match",
    "Maré de Bagres",
    "Caos Absoluto",
    "RoleSwap",
    "Espelho do Destino",
    "Heróis Invertidos"]
  lanes = ["Atirador",
    "Suporte",
    "Jungler",
    "Mid laner",
    "Top laner"]
  textArea = document.getElementById("textarea")
  if (prm == "modos") {
    textArea.value = modos.join("\n")
  }else if (prm == "lanes"){
    textArea.value = lanes.join("\n")
    
  }else if (prm = "jogadores") {
    if (textArea.value == []) {
      textArea.value = []
      localStorage.setItem("jogadores", textArea.value);
      console.log("reset")
    }else if (textArea != modos && textArea.value != lanes){
      localStorage.setItem("jogadores", textArea.value);
      console.log("setar", jogadores, textArea.value)
    }else {
      textArea.value = jogadores
      console.log("salvar")
    }
  }
  roleta()
}


