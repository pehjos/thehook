import { connectToDatabase } from "../../../util/mongodb";
import { Timestamp } from "mongodb";

export default async function handler(req, res) {
  const { method, body } = req;

  const { db } = await connectToDatabase();

  if (method === "GET") {
    try {
      const users = await db
        .collection("users")
        .find()
        .filter({  })
        .toArray();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === "POST") {
    try {
      const user = await db
        .collection("users")
        .insertOne({ ...body, timestamp: new Timestamp() });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
