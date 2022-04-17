import type { NextApiRequest, NextApiResponse } from "next";
import { Entry, IEntry } from "../../../../models";
import { db } from "../../../../database";

type Data = 
 | { message: string; }
 | IEntry

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  switch (req.method) {
    case "GET":
      return getEntryById(req, res);
    case "PUT":
      return updateEntry(req, res);

    default:
      return res.status(400).json({ message: "Metodo no existe" });
  }
}

const getEntryById = async (req:NextApiRequest, res:NextApiResponse<Data>) => {
  
  const { id } = req.query;

  try {
    await db.connect()

    const entry = await Entry.findById(id);

    await db.disconnect()

    if(!entry) {
      return res.status(400).json({ message: 'No hay entrada con ese Id' })
    }
    
    return res.status(200).json( entry )

  } catch (error) {
    await db.disconnect()
    console.log(error)
    return res.status(400).json({ message: 'Algo salio mal' })
  }

}


const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  try {
    await db.connect();
  
    const entryToUpdate = await Entry.findById(id);
  
    if (!entryToUpdate) {
      await db.disconnect();
      return res.status(400).json({ message: "No hay entrada con ese Id" });
    }
  
    const {
      description = entryToUpdate.description,
      status = entryToUpdate.status,
    } = req.body;
  
    const updateEntry = await Entry.findByIdAndUpdate(
      id,
      { description, status },
      { runValidators: true, new: true }
    );

    // entryToUpdate.description = description,
    // entryToUpdate.status = status
  
    // await entryToUpdate.save();

    return res.status(200).json(updateEntry!)
    
  } catch (error) {
    await db.disconnect()
    console.log(error)

    return res.status(400).json({ message: 'Algo salio mal' })
  }

};
