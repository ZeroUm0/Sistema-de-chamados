const form = document.getElementById("loginForm");

console.log("JS carregou!");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    console.log("Botão Entrar clicado!");

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem");

    console.log("Email digitado:", email);
    console.log("Senha digitada:", senha);

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

function logout() {
  window.location.href = "index.html";
}
