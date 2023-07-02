function roleta() {
    console.clear()
    let lista = []
    let textarea = document.getElementById("textarea").value
    lista = textarea.split("\n")
    lista = lista.filter(function (value) { return value != '' })
    console.log(lista)

    const roleta = document.getElementById("roleta")
    roleta.innerText = ''

    const canvas = document.getElementById('Wheel');
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.arc(200, 200, 150, 0, 2 * Math.PI);
    ctx.fillStyle = 'orange';
    ctx.fill();

    const numSlices = lista.length;
    const sliceAngle = (2 * Math.PI) / numSlices;
    const sliceNames = lista;

    for (let i = 0; i < numSlices; i++) {
        const sliceCenterAngle = (i * sliceAngle) + (sliceAngle / 2);
        const sliceCenterX = 200 + Math.cos(sliceCenterAngle) * 100;
        const sliceCenterY = 200 + Math.sin(sliceCenterAngle) * 100;

        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.arc(
            200,
            200,
            150,
            i * sliceAngle,
            (i + 1) * sliceAngle,
            false
        );
        ctx.closePath();

        // Cor e largura da borda
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;

        ctx.fillStyle = i % 2 === 0 ? 'orange' : 'brown';
        ctx.fill();

        // Desenhar a borda
        ctx.stroke();

        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';

        // Ajuste para texto vertical
        ctx.textBaseline = 'middle';
        ctx.save();
        ctx.translate(sliceCenterX, sliceCenterY);
        ctx.rotate(sliceCenterAngle + Math.PI / 2); // Rotação de 90 graus

        ctx.fillText(sliceNames[i], 0, 0);

        ctx.restore();
    }


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
    giros_roleta = 36*10 + 360 - giros_roleta 
    console.log(fatia)
    console.log(p_sorteada, giros_roleta)
    document.documentElement.style.setProperty("--rotacao", giros_roleta + "deg");

    return [p_sorteada, giros_roleta]
}

