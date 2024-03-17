import mongoConnect from 'mongoose';

connectDB().catch(err => console.log(err));

async function connectDB(): Promise<void> {
  if (!process.env.MongoURI) {
    throw new Error('MongoURI is not defined');
  } else {
    await mongoConnect.connect(process.env.MongoURI, { dbName: process.env.MongoDB} );
  }
}

export default connectDB;