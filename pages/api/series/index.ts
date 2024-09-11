import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }
    const series = await prismadb.series.findMany();
    return res.status(200).json(series);
  } catch (error) {
    console.log({ error })
    return res.status(500).end();
  }
}
