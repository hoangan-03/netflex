import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }

    const { movieId } = req.query;
    const videoIDString = String(movieId);

    if (typeof videoIDString !== "string") {
      return res.status(400).json({ error: "Invalid videoID: not a string" });
    }

    if (!videoIDString) {
      return res.status(400).json({ error: "Missing videoID" });
    }

    const movies = await prismadb.movie.findUnique({
      where: {
        videoID: videoIDString,
      },
    });
    if (!movies) {
      return res.status(404).json({ error: "Movie not found" });
    }

    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
