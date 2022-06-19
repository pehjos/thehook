import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  const { db } = await connectToDatabase();

  if (method === "DELETE") {
    try {
      await db.collection("posts").deleteOne({ _id: new ObjectId(id) });
      res.status(200).json({ message: "The post has been deleted!!" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === "POST") {
    try {
      await db.collection("posts").findOneAndUpdate({ _id: new ObjectId(id) },
      {
     $pull:{likeId:req.body }
      });
      res.status(200).json({ message: "The post has been deleted!!" });
    
    
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === "PUT") {
   
    try {
      const post = await db
        .collection("posts")
        .findOneAndUpdate({ _id: new ObjectId(id) },{
$push:{
  likes:req.body
}

        });
 ;
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === "PATCH") {
   
    try {
      const post = await db
        .collection("posts")
        .findOneAndUpdate({ _id: new ObjectId(id) },{
$push:{
  likeId:req.body
}

        });
 ;
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  
}
