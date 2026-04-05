// =======================
// LOGIN
// =======================
const form = document.getElementById("loginForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem");

    if (email === "admin@email.com" && senha === "1234") {
      mensagem.style.color = "green";
      mensagem.textContent = "Login realizado com sucesso!";

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    } else {
      mensagem.style.color = "red";
      mensagem.textContent = "E-mail ou senha inválidos.";
    }
  });
}

// =======================
// LOGOUT
// =======================
function logout() {
  window.location.href = "index.html";
}

// =======================
// SALVAR CHAMADO
// =======================
const chamadoForm = document.getElementById("chamadoForm");

if (chamadoForm) {
  chamadoForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const categoria = document.getElementById("categoria").value;
    const prioridade = document.getElementById("prioridade").value;
    const mensagemChamado = document.getElementById("mensagemChamado");

    const novoChamado = {
      id: Date.now(),
      titulo,
      descricao,
      categoria,
      prioridade,
      status: "Aberto",
    };

    let chamados = JSON.parse(localStorage.getItem("chamados")) || [];
    chamados.push(novoChamado);
    localStorage.setItem("chamados", JSON.stringify(chamados));

    mensagemChamado.style.color = "green";
    mensagemChamado.textContent = "Chamado salvo com sucesso!";

    chamadoForm.reset();

    setTimeout(() => {
      window.location.href = "meus-chamados.html";
    }, 1000);
  });
}

// =======================
// LISTAR CHAMADOS
// =======================
function carregarChamados() {
  const listaChamados = document.getElementById("listaChamados");
  if (!listaChamados) return;

  let chamados = JSON.parse(localStorage.getItem("chamados")) || [];

  const pesquisa =
    document.getElementById("pesquisaChamado")?.value.toLowerCase() || "";
  const filtroStatus =
    document.getElementById("filtroStatus")?.value || "Todos";

  chamados = chamados.filter((chamado) => {
    const combinaPesquisa = chamado.titulo.toLowerCase().includes(pesquisa);
    const combinaStatus =
      filtroStatus === "Todos" || chamado.status === filtroStatus;
    return combinaPesquisa && combinaStatus;
  });

  if (chamados.length === 0) {
    listaChamados.innerHTML = "<p>Nenhum chamado encontrado.</p>";
    return;
  }

  listaChamados.innerHTML = "";

  chamados.forEach((chamado) => {
    listaChamados.innerHTML += `
      <div class="chamado-card">
        <h3>${chamado.titulo}</h3>
        <p><strong>Descrição:</strong> ${chamado.descricao}</p>
        <p><strong>Categoria:</strong> ${chamado.categoria}</p>
        <p><strong>Prioridade:</strong> ${chamado.prioridade}</p>
        <p><strong>Status:</strong> 
          <span class="${chamado.status === "Aberto" ? "status-aberto" : "status-fechado"}">
            ${chamado.status}
          </span>
        </p>

        <div class="acoes-chamado">
          ${
            chamado.status === "Aberto"
              ? `<button class="btn-fechar" onclick="fecharChamado(${chamado.id})">Fechar</button>`
              : ""
          }
          <button class="btn-editar" onclick="editarChamado(${chamado.id})">Editar</button>
          <button class="btn-excluir" onclick="excluirChamado(${chamado.id})">Excluir</button>
        </div>
      </div>
    `;
  });
}

// =======================
// FECHAR CHAMADO
// =======================
function fecharChamado(id) {
  let chamados = JSON.parse(localStorage.getItem("chamados")) || [];

  chamados = chamados.map((chamado) => {
    if (chamado.id === id) {
      chamado.status = "Fechado";
    }
    return chamado;
  });

  localStorage.setItem("chamados", JSON.stringify(chamados));
  carregarChamados();
  atualizarDashboard();
}

// =======================
// EXCLUIR CHAMADO
// =======================
function excluirChamado(id) {
  const confirmar = confirm("Tem certeza que deseja excluir este chamado?");
  if (!confirmar) return;

  let chamados = JSON.parse(localStorage.getItem("chamados")) || [];
  chamados = chamados.filter((chamado) => chamado.id !== id);

  localStorage.setItem("chamados", JSON.stringify(chamados));
  carregarChamados();
  atualizarDashboard();
}

// =======================
// EDITAR CHAMADO
// =======================
function editarChamado(id) {
  let chamados = JSON.parse(localStorage.getItem("chamados")) || [];
  const chamado = chamados.find((c) => c.id === id);

  if (!chamado) return;

  const novoTitulo = prompt("Editar título:", chamado.titulo);
  if (novoTitulo === null || novoTitulo.trim() === "") return;

  const novaDescricao = prompt("Editar descrição:", chamado.descricao);
  if (novaDescricao === null || novaDescricao.trim() === "") return;

  chamado.titulo = novoTitulo;
  chamado.descricao = novaDescricao;

  localStorage.setItem("chamados", JSON.stringify(chamados));
  carregarChamados();
}

// =======================
// DASHBOARD
// =======================
function atualizarDashboard() {
  const totalChamados = document.getElementById("totalChamados");
  const totalAbertos = document.getElementById("totalAbertos");
  const totalFechados = document.getElementById("totalFechados");

  if (!totalAbertos || !totalFechados || !totalChamados) return;

  let chamados = JSON.parse(localStorage.getItem("chamados")) || [];

  const total = chamados.length;
  const abertos = chamados.filter((c) => c.status === "Aberto").length;
  const fechados = chamados.filter((c) => c.status === "Fechado").length;

  totalChamados.textContent = total;
  totalAbertos.textContent = abertos;
  totalFechados.textContent = fechados;
}

// =======================
// EVENTOS DE FILTRO
// =======================
const pesquisaChamado = document.getElementById("pesquisaChamado");
const filtroStatus = document.getElementById("filtroStatus");

if (pesquisaChamado) {
  pesquisaChamado.addEventListener("input", carregarChamados);
}

if (filtroStatus) {
  filtroStatus.addEventListener("change", carregarChamados);
}

// Executar ao carregar
carregarChamados();
atualizarDashboard();
