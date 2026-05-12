async function gerarImagem() {
  setLoading(true);

  try {
    const res = await fetch("/api/gerar-imagem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json" // 👈 FALTAVA ISSO
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    console.log("RESPOSTA:", data);

    if (!data.url) {
      alert("Erro: " + JSON.stringify(data));
      return;
    }

    setImagem(data.url);

  } catch (err) {
    alert("Erro ao conectar com API");
    console.error(err);
  }

  setLoading(false);
}