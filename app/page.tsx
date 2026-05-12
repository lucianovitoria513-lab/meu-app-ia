async function gerarImagem() {
  setLoading(true);

  try {
    const res = await fetch("/api/gerar-imagem", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    if (data.error) {
      alert("Erro: " + data.error);
      setLoading(false);
      return;
    }

    setImagem(data.url);

  } catch (err) {
    alert("Erro ao conectar com API");
  }

  setLoading(false);
}