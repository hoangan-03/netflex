import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { userId, movieId, seriesId } = req.query;

    if (!userId || (!movieId && !seriesId)) {
      return res
        .status(400)
        .json({ error: "User ID and either Movie ID or Series ID are required" });
    }

    try {
      if (movieId) {
        const movieIdStr = String(movieId);
        let movie = await prismadb.movie.findUnique({
          where: { videoID: movieIdStr },
        });
        if (movie) {
          await prismadb.userMovie.deleteMany({
            where: {
              userId: String(userId),
              movieId: movie.id,
            },
          });
          return res.status(200).json({ message: "Movie removed from wishlist" });
        } else {
          return res.status(404).json({ error: "Movie not found" });
        }
      }

      if (seriesId) {
        const seriesIdStr = String(seriesId);
        let series = await prismadb.series.findUnique({
          where: { seriesID: seriesIdStr },
        });
        if (series) {
          await prismadb.userSeries.deleteMany({
            where: {
              userId: String(userId),
              seriesId: series.id,
            },
          });
          return res.status(200).json({ message: "Series removed from wishlist" });
        } else {
          return res.status(404).json({ error: "Series not found" });
        }
      }
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}