import { fal } from "@fal-ai/client";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    fal.config({
      credentials: process.env.FAL_KEY
    });

    const result = await fal.run("fal-ai/fast-sdxl", {
      input: {
        prompt: prompt,
        image_size: "square_hd"
      }
    });

    console.log("RESULT:", result);

    // 👇 VALIDAÇÃO IMPORTANTE
    if (!result?.images || result.images.length === 0) {
      return Response.json(
        { error: "Nenhuma imagem retornada" },
        { status: 500 }
      );
    }

    return Response.json({
      url: result.images[0].url
    });

  } catch (error) {
    console.error("ERRO COMPLETO:", error);

    return Response.json(
      { error: error.message || "Erro na geração" },
      { status: 500 }
    );
  }
}