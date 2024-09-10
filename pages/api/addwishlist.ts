import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, movieId } = req.body;
    if (!userId || !movieId) {
      return res.status(400).json({ error: 'User ID and Movie ID are required' });
    }
    try {
      let movie = await prismadb.movie.findUnique({
        where: { videoID: movieId },
      });

      if (!movie) {
        return res.status(500).json({ error: 'Failed to create or find the movie' });
      }
      await prismadb.userMovie.create({
        data: {
          userId,
          movieId: movie.id,
        },
      });
      res.status(200).json({ message: 'Movie added to wishlist' });
    } catch (error) {
      console.error('Error adding movie to wishlist:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}