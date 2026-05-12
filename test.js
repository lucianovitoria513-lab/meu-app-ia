import { fal } from "@fal-ai/client";

fal.config({
  credentials: process.env.FAL_KEY
});

async function run() {
  const result = await fal.run("fal-ai/fast-sdxl", {
    input: {
      prompt: "Harley Quinn cinematic, ultra detailed, 4k"
    }
  });

  console.log(result);
}

run();