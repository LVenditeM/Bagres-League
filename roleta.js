function roleta() {

    //Pegar as informações do textarea
    console.clear()
    let lista = []
    let textarea = document.getElementById("textarea").value 
    lista = textarea.split("\n") // Converte o texto em lista
    lista = lista.filter(function (value) { return value != '' }) //Retira os espaços vazios
    console.log(lista)

    // Pega o objeto da roleta
    const canvas = document.getElementById('Wheel');
    const ctx = canvas.getContext('2d');

    // Cria o circulo principal da roleta
    ctx.beginPath(); 
    ctx.arc(200, 200, 150, 0, 2 * Math.PI); 
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
        const sliceCenterX = 200 + Math.cos(sliceCenterAngle) * 100;
        const sliceCenterY = 200 + Math.sin(sliceCenterAngle) * 100;

        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.arc(200, 200, 150, i * itemAngle, (i + 1) * itemAngle, false);
        ctx.closePath();
 
        // Cor e espesura da borda
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;

        //Definir cor do item
        ctx.fillStyle = i % 2 === 0 ? 'orange' : 'brown';
        ctx.fill();
        ctx.stroke();

        // Define as propriedades do texto
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.save();

        // Ajuste para texto vertical
        ctx.translate(sliceCenterX, sliceCenterY);
        ctx.rotate(sliceCenterAngle + Math.PI); // Rotação de 90 graus

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
    giros_roleta = 360 *10 + 360 - giros_roleta 
    console.log(fatia)
    console.log(p_sorteada, giros_roleta)
    document.documentElement.style.setProperty("--rotacao", giros_roleta + "deg");

    return [p_sorteada, giros_roleta]
}

