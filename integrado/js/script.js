function verificarImagemSlider() {
    const imagem1 = input_imagem1
    const imagem2 = input_imagem2
    const imagem3 = input_imagem3
    const imagem4 = input_imagem4

    if (imagem1.checked) {
        div_imagem_slider.innerHTML = `<img src="">`
    } else if (imagem2.checked) {
        div_imagem_slider.innerHTML = `<img src="">`
    } else if (imagem3.checked) {
        div_imagem_slider.innerHTML = `<img src="">`
    } else if (imagem4.checked) {
        div_imagem_slider.innerHTML = `<img src="">`
    }
} function exibirSolucoes() {
    div_pagina_rotativa.innerHTML = `
    <div id="div_solucoes_sessao_incial">
        <h1>Soluções</h1>
        *Texto apresentação soluções*
        *Imagens*
    </div>
    <div id="div_solucoes_sessao_explicacao">
        *Texto de explicação detalhada da solução*
        *Imagens*`
}