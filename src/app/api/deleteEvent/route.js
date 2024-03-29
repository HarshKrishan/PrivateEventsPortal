import { revalidatePath } from "next/cache";
import connectSql, { connection } from "../connectDb/route";
import { NextResponse } from "next/server";
import { createClient } from "@vercel/postgres";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const cache = "no-store";

export async function POST(req) {
  console.log("Entering deleteEvent route");

  const data = await req.formData();
  //   console.log("data", data);

  const id = data.get("eventId");

  // local database
  connectSql();
  const query = `DELETE FROM events WHERE eventId = '${id}';`;

  const res = await connection
    .promise()
    .query(query)
    .then(([data, fields]) => {
      // console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
      return NextResponse.json(
        { result: "Error deleting event" },
        { status: 500 }
      );
    });
  return NextResponse.json({ result: res }, { status: 200 });
  // vercel
  // const client = createClient();
  // await client.connect();

  // try {
  //   const { res, fields } =
  //     await client.sql`DELETE FROM events WHERE eventid = ${id};`;

  //   return NextResponse.json({ result: res }, { status: 200 });
  // } catch (e) {
  //   console.log("error deleting event", e);
  // } finally {
  //   await client.end();
  // }
  // revalidatePath("https://iiit-events-portal.vercel.app/dashboardAdmin");
  // return NextResponse.json({ result: "Error deleting event" }, { status: 500 });
}
