import { NextResponse, NextFetchEvent, NextRequest } from 'next/server';
// import mongoose from 'mongoose';

export function middleware( req: NextRequest, ev: NextFetchEvent) {

  const id = req.page.params?.id || '';

  const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");
  // !mongoose.isValidObjectId(id)
  if (!checkMongoIDRegExp.test(id)){
    return new Response(JSON.stringify({ message: 'El id no es valido ' + id }),{
      status: 400,
      headers: {
        'Content-Type': 'applicaction/json'
      }
    })
  }

  return NextResponse.next()

}