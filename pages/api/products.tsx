// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

import connectDB from '../../middleware/mongodb';

import { deleteProduct, getProduct, getProducts, postProduct, updateProduct } from '../../crud/products';

const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  origin: process.env.CORS_ORIGIN
});

function enableCors(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req,res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    })
  })
}

export default async function products (req: NextApiRequest, res: NextApiResponse) {
  
  const { method, query: {id} } = req;

  await connectDB();
  await enableCors(req, res, cors);
  // await NextCors(req, res, {
  //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
  //   origin: '*',
  //   allowedHeaders: ''
  // })
  
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
