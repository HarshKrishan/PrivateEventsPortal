"use client";
import TopNavbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import AddUser from "@/components/AddUser";
import UserTableRow from "@/components/UserTableRow";
import UpdateUser from "@/components/UpdateUser";


export const dynamic = "force-dynamic";
export const revalidate = 0;
export const cache = "no-store";

function Page() {
  const [visible, setVisible] = useState(false);
  
  const [userDataToShow, setUserDataToShow] = useState({
    fName: "",
    lName: "",
    emailId: "",
    password: "",
    role: "",
    status: "",
  });

  const handleCLick = () => {
    setVisible(false);
  };

  const [updateUserVisible, setUpdateUserVisible] = useState(false);
  const handleUpdateUserCLick = () => {
    setUpdateUserVisible(false);
  };

  const markUpdateUserVisibleTrue = ({ name, lname, role, email, status }) => {
    setUserDataToShow({
      fName: name,
      lName: lname,
      role: role,
      emailId: email,
      status: status,
    });
    setUpdateUserVisible(true);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    //for local
    fetch('http://localhost:3000/api/getAllUsers')
    .then(res => res.json())
        .then(json =>

          // console.log(json),
          setData(json.result)
        )

    //for vercel
    // fetch("https://iiit-events-portal.vercel.app/api/getAllUsers", {
    //   cache: "no-cache",
    //   next: { revalidate: 0 },
    //   cache:"no-store",
    // })
    //   .then((res) => res.json())
    //   .then((json) =>
    //     // console.log(json),
    //     setData(json.result)
    //   );
  }, [visible]);

  // if (!session) {
  //   redirect("/login");
  //   return null;
  // }

  return (
    <div>
      <TopNavbar>
        <div className="pt-5 px-16 w-full">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold">Users</h1>
            <button
              className="bg-teal-400 rounded-md p-2 hover:bg-teal-500"
              onClick={() => {
                setVisible(true);
              }}
            >
              Add User
            </button>
          </div>
          <div className="h-[28rem] overflow-y-auto  mt-20">
            <div className="w-full flex justify-center h-100dvh">
              <table className="table-auto border-4 border-slate-300 w-full">
                <thead className="sticky top-0 z-10  ">
                  <tr>
                    <th className="border-4 border-slate-300 ">S NO.</th>
                    <th className="border-4 border-slate-300 ">Name</th>
                    <th className="border-4 border-slate-300 ">Role</th>
                    <th className="border-4 border-slate-300 ">Email</th>
                    <th className="border-4 border-slate-300 ">Status</th>
                    <th className="border-4 border-slate-300 w-20 ">Modify</th>
                  </tr>
                </thead>
                <tbody className="">
                  {data.map((user, index) => (
                    <UserTableRow
                      key={index + 1}
                      id={index + 1}
                      //for local sql
                      name={user.fName}
                      lname={user.lName}
                      role={user.role}
                      email={user.emailId}
                      status={user.status}

                      //for vercel sql
                      // name={user.fname}
                      // lname={user.lname}
                      // role={user.role}
                      // email={user.emailid}
                      // status={user.status}
                      markUpdateUserVisibleTrue={markUpdateUserVisibleTrue}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <AddUser visible={visible} handleCLick={handleCLick} />
        <UpdateUser
          visible={updateUserVisible}
          handleCLick={handleUpdateUserCLick}
          data={userDataToShow}
        />
      </TopNavbar>
    </div>
  );
}

export default Page;
