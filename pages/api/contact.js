import { MongoClient } from "mongodb";

const resolver = async (req, res) => {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    if (!email?.includes('@') || !name?.trim() || !message?.trim()) {
      res.status(422).json({ message: 'Invalid input' });
      return;
    }

    const newMessage = {
      email,
      name,
      message
    };

    let client;

    try {
      client = await MongoClient.connect(process.env.MONGO_DB_URI);
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Could not connect to database' });
      return;
    }
    try {
      const db = client.db('events');
      const result = await db.collection('messages').insertOne(newMessage);
      newMessage.id = result.insertedId;
    }
    catch (err) {
      client.close();
      res.status(500).json({ message: 'Storing message failed!' });
      return;
    }

    client.close();
    res.status(201).json({ message: 'Successfully stored the message', data: newMessage })
  }
};

export default resolver;