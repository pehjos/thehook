
import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  const { db } = await connectToDatabase();

  
  if (method === "POST") {
   
    try {
      const post = await db
        .collection("posts")
        .findOneAndUpdate({ _id: new ObjectId(id) },{
$push:{
comments:req.body
}

        });
 ;
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === "PUT") {
    try {
      await db.collection("posts").findOneAndUpdate({ _id: new ObjectId(id) },
      {
     $pull:{comments:{name:req.body}}
      });
      res.status(200).json({ message: "The post has been deleted!!" });
    
    
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
