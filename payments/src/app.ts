import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import { errorHandler, NotFoundError, currentUser } from '@udemyms/common'
import { CreateChargeRouter } from './routes/new'

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
  signed: false,
  // the next line is to make a distinction between test and not-test environments
  // in test env request is not made from https
  secure: process.env.NODE_ENV !== 'test'
}))
app.use(currentUser)

app.use(CreateChargeRouter)

app.all('*', async (req, res) => {
  throw new NotFoundError();
})

app.use(errorHandler);

export { app }