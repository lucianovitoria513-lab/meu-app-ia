import { fal } from "@fal-ai/client";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!process.env.FAL_KEY) {
      return Response.json({ error: "FAL_KEY não definida" }, { status: 500 });
    }

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

    return Response.json({
      url: result?.images?.[0]?.url || null
    });

  } catch (error) {
    console.error("ERRO:", error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}