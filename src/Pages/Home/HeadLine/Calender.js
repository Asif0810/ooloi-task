import { format } from "date-fns";
import React from "react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
const Calender = ({ selected, setSelected }) => {
  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = (
      <p
        style={{ borderRadius: "20px" }}
        className="border-2 p-6 text-[#90d9d9] text-xl font-bold"
      >
        Select date {format(selected, "PP")}.
      </p>
    );
  }
  return (
    <div>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        footer={footer}
      />
    </div>
  );
};

export default Calender;
