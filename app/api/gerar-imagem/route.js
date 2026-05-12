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

    return Response.json({
      url: result.images[0].url
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Erro ao gerar imagem" },
      { status: 500 }
    );
  }
}