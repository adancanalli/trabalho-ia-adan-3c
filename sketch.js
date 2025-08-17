// Perguntas e feedback customizado para Sim/Não
const perguntas = [
  {
    texto: "IA pode aprender com dados para melhorar seu desempenho ao longo do tempo?",
    feedbackSim: "Correto! Aprendizado de máquina permite que modelos melhorem com dados.",
    feedbackNao: "Na verdade, pode sim: técnicas como aprendizado supervisionado fazem isso."
  },
  {
    texto: "Todo sistema baseado apenas em regras fixas (sem aprender) é considerado IA moderna?",
    feedbackSim: "Nem sempre. Sistemas puramente baseados em regras não 'aprendem' com dados.",
    feedbackNao: "Certo! Regra fixa não é, por si só, IA moderna baseada em aprendizado."
  },
  {
    texto: "IA generativa pode criar imagens, textos e até códigos a partir de instruções?",
    feedbackSim: "Exato! Modelos generativos produzem conteúdo novo a partir de prompts.",
    feedbackNao: "Pode sim! Modelos generativos são usados para imagens, textos, áudio e mais."
  },
  {
    texto: "É importante considerar ética e viés ao treinar e usar sistemas de IA?",
    feedbackSim: "Perfeito. Avaliar viés, privacidade e impacto social é essencial.",
    feedbackNao: "É fundamental considerar ética/viés para reduzir danos e injustiças."
  }
];

// Estado do quiz
let indice = 0;

// Elementos
const perguntaEl   = document.getElementById("pergunta-label");
const feedbackEl   = document.getElementById("feedback");
const btnSim       = document.getElementById("btnSim");
const btnNao       = document.getElementById("btnNao");
const btnProxima   = document.getElementById("btnProxima");
const btnReiniciar = document.getElementById("btnReiniciar");
const progressBar  = document.getElementById("progressBar");

// Inicia a interface
function carregarPergunta() {
  const atual = perguntas[indice];
  perguntaEl.textContent = `Pergunta ${indice + 1}/${perguntas.length}: ${atual.texto}`;
  feedbackEl.textContent = "";
  btnProxima.disabled = true;
  btnSim.disabled = false;
  btnNao.disabled = false;
  btnSim.focus();
  atualizarProgresso();
}

function atualizarProgresso() {
  const pct = Math.round((indice / perguntas.length) * 100);
  progressBar.style.width = `${pct}%`;
  progressBar.setAttribute("aria-valuenow", String(pct));
}

function responder(tipo) {
  const atual = perguntas[indice];
  const texto = tipo === "sim" ? atual.feedbackSim : atual.feedbackNao;
  feedbackEl.textContent = texto;

  // Trava os botões para evitar múltiplos cliques
  btnSim.disabled = true;
  btnNao.disabled = true;
  btnProxima.disabled = false;
  btnProxima.focus();
}

function proxima() {
  if (indice < perguntas.length - 1) {
    indice++;
    carregarPergunta();
  } else {
    finalizar();
  }
}

function finalizar() {
  progressBar.style.width = "100%";
  perguntaEl.textContent = "Missão concluída! 🚀";
  feedbackEl.textContent = "Você respondeu todas as perguntas. Quer tentar novamente?";
  btnSim.disabled = true;
  btnNao.disabled = true;
  btnProxima.hidden = true;
  btnReiniciar.hidden = false;
  btnReiniciar.focus();
}

function reiniciar() {
  indice = 0;
  btnProxima.hidden = false;
  btnReiniciar.hidden = true;
  carregarPergunta();
}

// Listeners (após o DOM estar pronto)
document.addEventListener("DOMContentLoaded", () => {
  carregarPergunta();

  btnSim.addEventListener("click", () => responder("sim"));
  btnNao.addEventListener("click", () => responder("nao"));
  btnProxima.addEventListener("click", proxima);
  btnReiniciar.addEventListener("click", reiniciar);

  // Acessibilidade: Enter/Barra de Espaço nos botões já funciona, mas
  // adicionamos atalhos opcionais: S = Sim, N = Não, P = Próxima, R = Reiniciar
  document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (key === "s") {
      if (!btnSim.disabled) btnSim.click();
    } else if (key === "n") {
      if (!btnNao.disabled) btnNao.click();
    } else if (key === "p") {
      if (!btnProxima.disabled && !btnProxima.hidden) btnProxima.click();
    } else if (key === "r") {
      if (!btnReiniciar.hidden) btnReiniciar.click();
    }
  });
});
