import { connectToDatabase } from "../util/mongodb";

export async function getServerSideProps({ req, res,context }) {
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
    )
    // Get posts on SSR
    const { db } = await connectToDatabase();
    const users = await db
      .collection("users")
      .find()
      .filter({ email: "pehjos4@gmail.com" })
      .toArray();
  
    return {
      props: {
      users: users.map((user) => ({
        _id: user._id.toString(),
      name:user.name,
      email:user.email,
        })),
      },
    };
  }
  
  