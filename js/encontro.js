//evento q gera o click e funcao de escolher em todas as classes opcao
document.querySelectorAll(".opcao").forEach((btn) => {
    btn.addEventListener("click", () => escolher(btn));
});

// evento de clique nos botões de dia da semana
document.querySelectorAll(".dia").forEach((btn) => {
    btn.addEventListener("click", () => escolherDia(btn));
});

function escolher(btn) {
    // remove seleção anterior
    document.querySelectorAll(".opcao").forEach((b) => b.classList.remove("selecionada"));
    btn.classList.add("selecionada");

    const escolha = btn.dataset.opcao;
    const resultado = document.getElementById("resultado");
    resultado.innerText = `Combinado! ${escolha} 💕`;

    // mostra os botões de dia da semana
    const agendamento = document.getElementById("agendamento");
    agendamento.classList.remove("oculto");//remove a classe oculto que no CSS tem como display:none
    agendamento.dataset.escolha = escolha;

    // limpa uma confirmação anterior, se houver
    document.getElementById("confirmacao").innerText = "";
    document.getElementById("btn-whatsapp").classList.add("oculto");
}

function escolherDia(btn) {
    document.querySelectorAll(".dia").forEach((b) => b.classList.remove("selecionada"));
    btn.classList.add("selecionada");

    const agendamento = document.getElementById("agendamento");
    agendamento.dataset.dia = btn.dataset.dia;

    // mostra o campo de horário
    const campoHorario = document.getElementById("campo-horario");
    campoHorario.classList.remove("oculto");
    document.getElementById("horario").focus();

    document.getElementById("confirmacao").innerText = "";
    document.getElementById("btn-whatsapp").classList.add("oculto");
}

function confirmarEncontro() {
    const agendamento = document.getElementById("agendamento");
    const escolha = agendamento.dataset.escolha;
    const dia = agendamento.dataset.dia;
    const horario = document.getElementById("horario").value;
    const confirmacao = document.getElementById("confirmacao");

    if (!dia) {
        confirmacao.style.color = "#c0392b";
        confirmacao.innerText = "Escolhe o dia da semana antes de confirmar! 📅";
        return;
    }

    if (!horario) {
        confirmacao.style.color = "#c0392b";
        confirmacao.innerText = "Escolhe o horário antes de confirmar! 🕒";
        return;
    }

    confirmacao.style.color = "#333";
    confirmacao.innerText = `Combinado: ${escolha} na ${dia} às ${horario} 💕`;

    // monta o link do WhatsApp com a mensagem pronta
    const telefone = "5544984239643";
    const mensagem = `Ei! Combinado o nosso encontro: ${escolha} na ${dia} às ${horario} `;
    const btnWhatsapp = document.getElementById("btn-whatsapp");
    btnWhatsapp.href = `https://api.whatsapp.com/send?phone=${telefone}&text=${encodeURIComponent(mensagem)}`;
    btnWhatsapp.classList.remove("oculto");
}


document.getElementById("btn-confirmar").addEventListener("click", confirmarEncontro);