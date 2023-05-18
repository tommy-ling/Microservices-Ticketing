import express, { Request, Response } from 'express'
import { requireAuth } from '@udemyms/common';
import { Order } from '../models/order';

const router = express.Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
  // populate method chained at the end tells Mongoose to include 'Ticket'
  // which is tied to the Order
  const orders = await Order.find({ userId: req.currentUser!.id }).populate('ticket')

  res.send(orders)
})

export { router as indexOrderRouter }