import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    try {
      const wishlist = await prismadb.userMovie.findMany({
        where: { userId: String(userId) },
        include: {
          movie: true,
        },
      });

      const movies = wishlist.map((userMovie) => userMovie.movie);

      res.status(200).json(movies);
    } catch (error) {
      console.error('Error retrieving wishlist:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}