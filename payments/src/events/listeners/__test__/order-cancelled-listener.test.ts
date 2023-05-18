import mongoose from "mongoose"
import { OrderStatus, OrderCancelledEvent } from "@udemyms/common"
import { OrderCancelledListener } from "../order-cancelled-listener"
import { natsWrapper } from "../../../nats-wrapper"
import { Order } from "../../../models/order"
import { Message } from "node-nats-streaming"

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client)

  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    price: 10,
    userId: 'slkgjs',
    version: 0
  })
  await order.save()

  const data: OrderCancelledEvent['data'] = {
    id: order.id,
    version: order.version + 1,
    ticket: {
      id: 'jksdfskl',
    }
  }
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  }

  return { msg, data, order, listener }
}

it('updates the status of the order', async() => {
  const { msg, data, order, listener } = await setup()

  await listener.onMessage(data, msg)

  const updateOrder = await Order.findById(order.id)

  expect(updateOrder!.status).toEqual(OrderStatus.Cancelled)
})

it('acks the message', async() => {
  const { msg, data, listener } = await setup()

  await listener.onMessage(data, msg)

  expect(msg.ack).toHaveBeenCalled()
})