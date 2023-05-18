import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken';

declare global {
  var signin: (id?: string) => string[];
}

jest.mock('../nats-wrapper')

process.env.STRIPE_KEY = 'sk_test_51N8XXzESLVMPnj810FJ2GZz31YQX53l3Wm8n5YpbATjvtc5MLfyPsv30qUgx3MBcfAHrkUqR0jNgE0RIywCODVNZ00SWjrciWu'

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdf'

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {})
})

beforeEach(async () => {
  // clear all mock implementations so it doesn't count invocations from previous tests
  jest.clearAllMocks()

  const collections = await mongoose.connection.db.collections()

  for (let collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  // build a jsonwebtoken payload { id, email }
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com'
  }

  // create JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // build a session object
  const session = { jwt: token }

  // turn that session into json
  const sessionJSON = JSON.stringify(session)

  // take json and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64')

  // return a string that is the cookie with the encoded data
  return [`session=${base64}`];
}