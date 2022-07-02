
import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  const { db } = await connectToDatabase();


  if (method === "PUT") {
    try {
      await db.collection("users").findOneAndUpdate({ _id: new ObjectId(id) },
      {
        $set:{
  cover: req.body.input1,       
  profile:req.body.input2,
  username:req.body.input3,
  bio:req.body.input4,
  link:req.body.input5,
          }
          
      });
      res.status(200).json({ message: "updated sucefully" });
    
    
    } catch (error) {
      res.status(500).json(error,);
      console.log("hmmm")
    }
  }
}
