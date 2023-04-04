// import React from "react";
// import "./headline.css";
// import { HiLink } from "react-icons/hi";

// import Calender from "./Calender";
// import { useState } from "react";
// import { format } from "date-fns";
// import { useContext } from "react";
// import { Context } from "../../../Context/ContextProvider";

// const HeadLine = () => {
//   const { user } = useContext(Context);
//   const email = user?.email;
//   const [selected, setSelected] = useState(new Date());
//   const date = format(selected, "PP");

//   const formHandler = (event) => {
//     event.preventDefault();
//     const form = event.target;
//     const headline = form.headline.value;
//     const link = form.link.value;
//     const content = {
//       headline,
//       link,
//       date,
//       email,
//     };
//     console.log(content);
//   };
//   return (
//     <div className="h-[300px]">
//       <div className=" border-red-50 w-full">
//         <div>
//           <h2 className=" text-center">
//             <b>EVENT</b> <b className="text-blue-600 headline">WORKSHOP</b>
//           </h2>
//         </div>
//       </div>
//       <div className="justify-center flex items-center  ">
//         <form className="border-2" onSubmit={formHandler}>
//           <input
//             name="headline"
//             type="text"
//             maxLength="25"
//             placeholder="headline 25 character"
//             className=" input-text text-center block  text-5xl input-lg  "
//           />
//           <div className="wrapper">
//             <HiLink className="icon"></HiLink>
//             <input
//               name="link"
//               type="text"
//               placeholder="write link here"
//               id="inputID"
//               className="input mt-6 w-[600px] mx-auto input-bordered "
//             />
//           </div>

//           <div className="mt-5">
//             <Calender selected={selected} setSelected={setSelected}></Calender>
//           </div>

//           <div>
//             <button type="submit" className="btn btn-primary mt-6">
//               submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default HeadLine;
