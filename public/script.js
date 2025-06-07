function publicar() {
  const htmlContent = document.getElementById("htmlCode").value;
  const pageName = document.getElementById("pageName").value.trim();

  if (!pageName) {
    alert("Por favor, ingresa un nombre para la página.");
    return;
  }

  fetch('/crear-fork', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ htmlContent, pageName })
  })
  .then(response => response.json())
  .then(data => {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `Página creada: <a href="${data.url}" target="_blank">${data.url}</a>`;
  })
  .catch(err => {
    console.error(err);
    alert("Hubo un error al crear la página.");
  });
}
