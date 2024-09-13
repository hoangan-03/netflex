import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from "@/lib/prismadb";
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    try {
      const userObjectId = new ObjectId(String(userId));
      const userObjectIdStr = userObjectId.toString();

      const movieWishlist = await prismadb.userMovie.findMany({
        where: { userId: userObjectIdStr },
        include: {
          movie: true,
        },
      });

      const seriesWishlist = await prismadb.userSeries.findMany({
        where: { userId: userObjectIdStr },
        include: {
          series: true,
        },
      });

      const movies = movieWishlist.map((userMovie) => userMovie.movie);
      const series = seriesWishlist.map((userSeries) => userSeries.series);
      const wishlist = {
        movies,
        series,
      };

      res.status(200).json(wishlist);
    } catch (error) {
      console.error('Error retrieving wishlist:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}