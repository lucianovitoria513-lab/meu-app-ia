"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imagem, setImagem] = useState("");
  const [loading, setLoading] = useState(false);

  async function gerarImagem() {
    setLoading(true);
    setImagem("");

    try {
      const res = await fetch("/api/gerar-imagem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      console.log("RESPOSTA:", data);

      if (!data.url) {
        alert("Erro: " + JSON.stringify(data));
        setLoading(false);
        return;
      }

      setImagem(data.url);

    } catch (err) {
      alert("Erro ao conectar com API");
      console.error(err);
    }

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

      {/* 👇 ISSO É FUNDAMENTAL */}
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