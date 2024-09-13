import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userId, movieId, seriesId } = req.body;

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
          try {
            await prismadb.userMovie.create({
              data: {
                userId,
                movieId: movie.id,
              },
            });
            return res.status(200).json({ message: "Movie added to wishlist" });
          } catch (userMovieError) {
            console.error("Error adding movie to user wishlist:", userMovieError);
            return res
              .status(500)
              .json({ error: "Failed to add movie to wishlist" });
          }
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
          try {
            await prismadb.userSeries.create({
              data: {
                userId,
                seriesId: series.id,
              },
            });
            return res.status(200).json({ message: "Series added to wishlist" });
          } catch (userSeriesError) {
            console.error("Error adding series to user wishlist:", userSeriesError);
            return res
              .status(500)
              .json({ error: "Failed to add series to wishlist" });
          }
        } else {
          return res.status(404).json({ error: "Series not found" });
        }
      }
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}