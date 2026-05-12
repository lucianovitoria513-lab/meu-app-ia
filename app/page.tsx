"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imagem, setImagem] = useState("");
  const [loading, setLoading] = useState(false);

  async function gerarImagem() {
    setLoading(true);

    const res = await fetch("/api/gerar-imagem", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    setImagem(data.url);
    setLoading(false);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Gerador de Imagem IA 🚀</h1>

      <input
        style={{ width: "100%", padding: 10 }}
        placeholder="Digite seu prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button onClick={gerarImagem} style={{ marginTop: 10 }}>
        Gerar
      </button>

      {loading && <p>Gerando imagem...</p>}

      {imagem && (
        <img
          src={imagem}
          alt="imagem gerada"
          style={{ marginTop: 20, width: 400 }}
        />
      )}
    </div>
  );
}