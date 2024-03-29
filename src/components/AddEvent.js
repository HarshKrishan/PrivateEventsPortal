"use client";
import { useRouter } from 'next/navigation';
import React from 'react'
import { useState } from 'react'

const AddEvent = ({ visible, handleCLick }) => {
  const router = useRouter();

  const [event, setEvent] = useState({
    name: "",
    date: "",
    time: "",
    description: "",
    organiser: "",
    link: "",
    image: [],
    fundedBy: "",
    fund:"",
  });
  if (!visible) return null;
  const handleSubmit = async () => {
    // e.preventDefault();
    console.log("event",event);
    const formdata = new FormData();
    formdata.append("name", event.name);
    formdata.append("date", event.date);
    formdata.append("time", event.time);
    formdata.append("description", event.description);
    formdata.append("organiser", event.organiser);
    formdata.append("link", event.link);
    formdata.append("fundedBy", event.fundedBy);
    formdata.append("fund", event.fund);
    for (let i = 0; i < event.image.length; i++) {
      formdata.append("image[]", event.image[i]);
    }
    //for local
    fetch("http://localhost:3000/api/addEvent", {
      method: "POST",
      body: formdata,
    })
      .then((response) => {
        console.log(response);
      })
      .then((json) => console.log(json)); 


    //for vercel
    // fetch("https://iiit-events-portal.vercel.app/api/addEvent", {
    //   method: "POST",
    //   body: formdata,
    // })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .then((json) => console.log(json));
        
    
    setEvent({
      name: "",
      date: "",
      time: "",
      description: "",
      organiser: "",
      link: "",
      image: [],
      fundedBy: "",
      fund:"",
    });
     router.refresh();
    await handleCLick();
  }
  // bg-black  bg-opacity-20 backdrop-blur-sm
  return (
    <div className="fixed inset-x-72 inset-y-5 bg-slate-200 overflow-auto">
      <div className=" flex justify-center items-center overflow-auto">
        <div className=" w-4/5 flex-col items-center">
          <h1 className="text-black text-2xl font-bold my-5 ">Add Event</h1>

          <div>
            <div className="flex flex-col items-center">
              <label className="text-black w-3/5">Event Name</label>
              <input
                className="m-2 rounded-md p-1 w-3/5"
                type="text"
                placeholder="Event Name"
                value={event.name}
                onChange={(e) => {
                  setEvent({ ...event, name: e.target.value });
                }}
              />

              <label className="text-black w-3/5">Event Date</label>

              <input
                className="m-2 rounded-md p-1 w-3/5"
                type="date"
                placeholder="Event Date"
                value={event.date}
                onChange={(e) => {
                  setEvent({ ...event, date: e.target.value });
                }}
              />
              <label className="text-black w-3/5">Event Time</label>

              <input
                className="m-2 rounded-md p-1 w-3/5"
                type="time"
                placeholder="Event Time"
                value={event.time}
                onChange={(e) => {
                  setEvent({ ...event, time: e.target.value });
                }}
              />
              <label className="text-black w-3/5">Event Description</label>

              <textarea
                className="m-2 rounded-md p-1 w-3/5"
                type="text"
                placeholder="Event Description"
                value={event.description}
                onChange={(e) => {
                  setEvent({ ...event, description: e.target.value });
                }}
              />
              <label className="text-black w-3/5">Event Organiser</label>

              <input
                className="m-2 rounded-md p-1 w-3/5"
                type="text"
                placeholder="Event Organiser"
                value={event.organiser}
                onChange={(e) => {
                  setEvent({ ...event, organiser: e.target.value });
                }}

              />
              <label className="text-black w-3/5">Event Link</label>

              <input
                className="m-2 rounded-md p-1 w-3/5"
                type="text"
                placeholder="Event Link"
                value={event.link}
                onChange={(e) => {
                  setEvent({ ...event, link: e.target.value });
                }}

              />

              <label className="text-black w-3/5">Event Funded By</label>

              <input
                className="m-2 rounded-md p-1 w-3/5"
                type="text"
                placeholder="Event Funded By"
                value={event.fundedBy}
                onChange={(e) => {
                  setEvent({ ...event, fundedBy: e.target.value });
                }}

              />

              <label className="text-black w-3/5">Event Fund</label>

              <input
                className="m-2 rounded-md p-1 w-3/5"
                type="text"
                placeholder="Event Fund"
                value={event.fund}
                onChange={(e) => {
                  setEvent({ ...event, fund: e.target.value });
                }}
              
              />

              <label className="text-black w-3/5">Event Image</label>

              <input
                className="m-2 rounded-md p-1 w-3/5"
                type="file"
                placeholder="Event Image"
                multiple={true}
                onChange={(e) => {
                  setEvent({ ...event, image: e.target.files });
                }}
              />
              <div className='flex justify-between w-3/5 mb-5'>
                <button
                  className="text-black bg-teal-400 rounded-md p-1 w-1/3 hover:bg-teal-500"
                  onClick={() => {
                    handleSubmit();
                    // handleCLick();
                  }}
                >
                  Add Event
                </button>
                <button 
                className="text-black bg-teal-400 rounded-md p-1 w-1/3 hover:bg-teal-500"
                onClick={() => {
                  setEvent({
                    name: "",
                    date: "",
                    time: "",
                    description: "",
                    organiser: "",
                    link: "",
                    image: [],
                    fundedBy: "",
                    fund: "",
                  });
                  handleCLick();
                }}
              >
                Cancel
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvent