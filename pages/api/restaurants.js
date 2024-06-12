import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("core");

  switch (req.method) {
    case "GET":
      const allRestaurants = await db
        .collection("restaurants")
        .find({})
        .toArray();
      res.json({ status: 200, data: allRestaurants });
      break;
  }
}
