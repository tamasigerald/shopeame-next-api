// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../middleware/mongodb';

import { deleteProduct, getProduct, getProducts, postProduct, updateProduct } from '../../crud/products';

export default async function products (req: NextApiRequest, res: NextApiResponse) {
  
  const { method, query: {id} } = req;

  await connectDB();
  console.log('Mongo conncted!')
  
  switch(method) {
    case 'GET':
      if (id) {
        await getProduct( req, res, id);
      }
      else{
        await getProducts(req, res);
      }
      break;
    case 'POST':
      await postProduct(req, res);
      break;
    case 'PUT':
      await updateProduct(req, res, id);
      break;
    case 'DELETE':
      await deleteProduct(req, res, id);
      break;
    default:
      res.status(400).json({ success: false })
      break;
  }
}
