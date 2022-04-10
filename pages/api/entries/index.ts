
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = 
  | { message: string }
  | IEntry[]
  | IEntry

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      return getEntries(res)

    case 'POST':
      return createEntry(req, res)

    default:
      return res.status(400).json({ message: 'Endpoint no existe'});
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  
  await db.connect()

  const entries = await Entry.find().sort({ createdAt: 'ascending'})

  await db.disconnect()

  res.status(201).json(entries)
}


const createEntry = async (req:NextApiRequest, res:NextApiResponse<Data>) => {

  const { description } = req.body

  await db.connect()

  const entry = new Entry({
    description,
    createdAt: Date.now(),
    status: 'pending'
  })

  await entry.save()

  await db.disconnect()

  res.status(201).json(entry)
}
