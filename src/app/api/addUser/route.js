// import { revalidatePath } from "next/cache";
import connectSql, { connection } from "../connectDb/route";
import { NextResponse } from "next/server";
import { createClient } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const cache = "no-store";
export async function POST(req) {
  console.log("entering addUser route");
  // console.log(req);
  const { firstName, lastName, password, role, email, status } =
    await req.json();

  //for local sql
  console.log(
    "Got this....",
    firstName,
    lastName,
    password,
    role,
    email,
    status
  );
  // connectSql();
    const query = `INSERT INTO users (fName,lname,pwd, role, emailId, status) VALUES ('${firstName}','${lastName}','${password}', '${role}', '${email}', '${status}')`;
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
        { result: "Error adding User..." },
        { status: 500 }
      );
    });
    return NextResponse.json(
      { result: "Successfully added User" },
      { status: 200 }
    );
  //for vercel sql
  // const client = createClient();
  // await client.connect();

  // try {
  //   const { res, fields } =
  //     await client.sql`INSERT INTO users (fname,lname,pwd, role, emailid, status) VALUES (${firstName},${lastName},${password}, ${role}, ${email}, ${status})`;

  //   return NextResponse.json(
  //     { result: "Successfully added User" },
  //     { status: 200 }
  //   );
  // } catch (e) {
  //   console.log("error adding user", e);
  // } finally {
  //   await client.end();
  // }
  // revalidatePath("https://iiit-events-portal.vercel.app/manageUsers");
  // return NextResponse.json({ result: "Error adding User..." }, { status: 500 });
}
