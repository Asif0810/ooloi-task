import React, { useRef } from "react";
import "../HeadLine/headline.css";
import { HiLink } from "react-icons/hi";
import { useState } from "react";
import { format } from "date-fns";
import { useContext } from "react";
import Calender from "../HeadLine/Calender";
import { Context } from "../../../Context/ContextProvider";
import JoditEditor, { Jodit } from "jodit-react";
import photo from "./abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-54034.avif";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
const Home = () => {
  const [contents, setcontents] = useState({});
  const [selected, setSelected] = useState(new Date());
  const today = format(selected, "PP");
  const imghostkey = process.env.REACT_APP_IMGBB;
  const editor = useRef(null);
  const [content, setContent] = useState("");
  console.log(content);
  const { user, google } = useContext(Context);
  const email = user?.email;
  const googleHandler = () => {
    google()
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch(console.error());
  };

  const { register, handleSubmit } = useForm();

  const formHandler = (data) => {
    const image = data.speakerimg[0];
    const formdata = new FormData();
    formdata.append("image", image);

    const url = `https://api.imgbb.com/1/upload?key=${imghostkey}`;
    fetch(url, {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((d) => {
        console.log(d);
        const imgdata = d.data.url;
        // setspeakerImage(imgdata);
        if (d.success) {
          const headline = data.headline;
          const addlink = data.addlink;
          const speakerinfo = data.speakerinfo;
          const speakername = data.speakername;
          const contents = {
            headline,
            addlink,
            speakerinfo,
            speakername,
            date: today,
            editorcontent: content,
            speakerImage: imgdata || "",
            userEmail: email,
          };
          setcontents(contents);
        } else {
          const headline = data.headline;
          const addlink = data.addlink;
          const speakerinfo = data.speakerinfo;
          const speakername = data.speakername;
          const contents = {
            headline,
            addlink,
            speakerinfo,
            speakername,
            date: today,
            editorcontent: content,
            speakerImage: imgdata || "",
          };

          setcontents(contents);
        }
        fetch("http://localhost:5000/my-content", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(contents),
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch(console.error());
      })
      .catch(console.error());
  };
  // get user content
  const { data: mycontent = [], refetch } = useQuery({
    queryKey: ["content", user?.email],
    queryFn: () =>
      fetch(`http://localhost:5000/content?email=${user?.email}`).then((res) =>
        res.json().catch(console.error())
      ),
  });
  const {
    addlink,
    date,
    editorcontent,
    headline,
    speakerImage,
    speakerinfo,
    speakername,
    userEmail,
    _id,
  } = mycontent;
  console.log(mycontent);
  const formatHandler = (_id) => {
    console.log(_id);
    fetch(`http://localhost:5000/delete/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          console.log(data);
          refetch();
        }
      })
      .catch(console.error());
  };
  return (
    <div className="">
      <div className=" border-red-50 w-full">
        <div>
          <h2 className=" text-center">
            <b>EVENT</b> <b className="text-blue-600 headline">WORKSHOP</b>
          </h2>
        </div>
      </div>
      <div className="justify-center flex items-center  ">
        <form className="" onSubmit={handleSubmit(formHandler)}>
          {/* headline................. */}
          <input
            type="text"
            maxLength="25"
            defaultValue={headline}
            {...register("headline")}
            placeholder="headline 25 character"
            className=" input-text  block  text-5xl input-lg  "
          />
          {/* add link section start.............. */}
          <div className="wrapper">
            <HiLink className="icon"></HiLink>
            <input
              type="text"
              {...register("addlink")}
              defaultValue={addlink}
              placeholder="write link here"
              id="inputID"
              className="input mt-6 w-[600px] mx-auto input-bordered "
            />
          </div>

          {/* calender................. */}
          <div className="mt-5">
            <Calender selected={selected} setSelected={setSelected}></Calender>
          </div>

          {/* About Event Section start.............. */}
          <div>
            <h2 className="text-[gray] font-bold">ABOUT THE EVENT</h2>
            <label>
              <i className="font-normal">
                What is the event going to be about? What should people expect ?
              </i>
            </label>
            {/* <textarea
              id="event"
           
              type="text"
              placeholder="Write Here"
              className="input-text2 fornt-bold  block text-2xl input-lg "
            /> */}
            <JoditEditor
              ref={editor}
              value={content}
              id="editor"
              onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            />
          </div>

          {/* speaker section start.............. */}

          <div className="mt-10">
            <h2 className="text-[gray] font-bold">ABOUT THE SPEAKER</h2>
            <i className="font-normal">
              Meantion a few key points about the speaker that are relevent to
              the topic to create intest in the event
            </i>
            <div className="border-2 border-dotted mt-3 flex border-red-700">
              <div>
                <img
                  style={{ width: "300px", height: "200px" }}
                  src={speakerImage}
                  alt=""
                />
                <input
                  {...register("speakerimg")}
                  type="file"
                  className="file-input w-[300px] file-input-bordered file-input-md  "
                />
              </div>
              <div>
                <input
                  {...register("speakername")}
                  type="text"
                  maxLength="25"
                  defaultValue={speakername}
                  id="speaker"
                  placeholder="Name Of The Speaker"
                  className="input-text mb-[-30px] block  text-2xl input-lg  "
                />
                <input
                  {...register("speakerinfo")}
                  type="text"
                  maxLength="25"
                  defaultValue={speakerinfo}
                  id="speakerinfo"
                  placeholder="write here information about speaker"
                  className="input-text  block input-lg  "
                />
              </div>
            </div>
          </div>

          <div>
            {user?.email ? (
              <button type="submit" className="btn btn-primary mt-6">
                submit
              </button>
            ) : (
              <button
                onClick={googleHandler}
                type="submit"
                data-tip="please login then will see submit button"
                className="btn tooltip tooltip-top btn-primary mt-6"
              >
                google
              </button>
            )}
          </div>
        </form>
      </div>
      <button
        onClick={() => formatHandler(_id)}
        className="btn btn-link ml-[200px]"
      >
        Format
      </button>
    </div>
  );
};

export default Home;
