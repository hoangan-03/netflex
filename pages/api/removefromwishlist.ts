import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { userId, movieId } = req.query;
    if (!userId || !movieId) {
      return res
        .status(400)
        .json({ error: "User ID and Movie ID are required" });
    }
    const movieIdStr = String(movieId);
    let movie = await prismadb.movie.findUnique({
      where: { videoID: movieIdStr },
    });
    try {
      await prismadb.userMovie.deleteMany({
        where: {
          userId: String(userId),
          movieId: movie?.id,
        },
      });
      res.status(200).json({ message: "Movie removed from wishlist" });
    } catch (error) {
      console.error("Error removing movie from wishlist:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
