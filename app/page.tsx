async function gerarImagem() {
  setLoading(true);

  try {
    const res = await fetch("/api/gerar-imagem", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    console.log("RESPOSTA FRONT:", data);

    // 👇 FORÇA MOSTRAR O QUE VEIO
    if (!data.url) {
      alert("Erro: " + JSON.stringify(data));
      setLoading(false);
      return;
    }

    setImagem(data.url);

  } catch (err) {
    alert("Erro ao conectar com API");
  }

  setLoading(false);
}