// Seletores
const contactForm = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");
const phoneInput = document.getElementById("phone");

// Máscara para o campo de telefone
phoneInput.addEventListener("input", () => {
  let value = phoneInput.value.replace(/\D/g, ""); // Remove tudo que não é número
  value = value.replace(/^(\d{2})(\d)/, "($1) $2"); // Adiciona parênteses ao DDD
  value = value.replace(/(\d{5})(\d{4})/, "$1-$2"); // Adiciona o hífen no número
  phoneInput.value = value;
});

// Função para carregar contatos do localStorage
function loadContacts() {
  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  contactList.innerHTML = "";
  contacts.forEach((contact, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <span>${contact.name} - ${contact.phone}</span>
      <button class="btn btn-danger btn-sm" onclick="deleteContact(${index})">Excluir</button>
    `;
    contactList.appendChild(li);
  });
}

// Função para adicionar novo contato
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = phoneInput.value.trim();

  // Validação do telefone no formato (__) 9________
  const phoneRegex = /^\(\d{2}\) 9\d{4}-\d{4}$/;
  if (!phoneRegex.test(phone)) {
    alert("Por favor, insira um telefone válido no formato (__) 9____-____.");
    return;
  }

  if (name && phone) {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.push({ name, phone });
    localStorage.setItem("contacts", JSON.stringify(contacts));
    contactForm.reset();
    loadContacts();
  }
});

// Função para excluir contato
function deleteContact(index) {
  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  contacts.splice(index, 1);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  loadContacts();
}

// Inicializar a lista de contatos ao carregar a página
document.addEventListener("DOMContentLoaded", loadContacts);
