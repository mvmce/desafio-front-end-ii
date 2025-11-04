// Regex de e-mail
const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// FORMULÁRIO
const form = document.getElementById("formulario");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const sobrenome = document.getElementById("sobrenome").value.trim();
    const email = document.getElementById("email").value.trim();
    const idade = parseInt(document.getElementById("idade").value);

    let mensagemErro = "";

    if (nome.length < 3 || nome.length > 50) {
      mensagemErro = "Nome deve ter entre 3 e 50 caracteres.";
    } else if (sobrenome.length < 3 || sobrenome.length > 50) {
      mensagemErro = "Sobrenome deve ter entre 3 e 50 caracteres.";
    } else if (!regexEmail.test(email)) {
      mensagemErro = "E-mail inválido.";
    } else if (isNaN(idade) || idade <= 0 || idade >= 120) {
      mensagemErro = "Idade inválida.";
    }

    if (mensagemErro) {
      document.getElementById("mensagem-erro").textContent = mensagemErro;
    } else {
      const dados = { nome, sobrenome, email, idade };
      localStorage.setItem("dadosFormulario", JSON.stringify(dados));
      window.location.href = "confirmation.html";
    }
  });
}

// PÁGINA DE CONFIRMAÇÃO
const dadosDiv = document.getElementById("dados");
if (dadosDiv) {
  const dados = JSON.parse(localStorage.getItem("dadosFormulario"));

  if (!dados) {
    window.location.href = "form.html";
  } else {
    dadosDiv.innerHTML = `
      <p><strong>Nome:</strong> ${dados.nome}</p>
      <p><strong>Sobrenome:</strong> ${dados.sobrenome}</p>
      <p><strong>Email:</strong> ${dados.email}</p>
      <p><strong>Idade:</strong> ${dados.idade}</p>
    `;
  }

  document.getElementById("editar").addEventListener("click", () => {
    window.location.href = "form.html";
  });

  document.getElementById("confirmar").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.json";
    link.click();

    localStorage.removeItem("dadosFormulario");
    window.location.href = "index.html";
  });
}
