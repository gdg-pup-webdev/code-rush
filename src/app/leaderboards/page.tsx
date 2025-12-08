"use client";

import { db } from "@/lib/firebase";
import { getLeaderboards, postLeaderBoardEntry } from "@/lib/leaderboards";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React from "react";

export const page = () => {
  const handleOnCreateEntry = async () => {
    const res = await postLeaderBoardEntry("test", 1000);

    console.log("created entry", res);
  };

  const handleOnGetLeaderboards = async () => {
    const res = await getLeaderboards();

    console.log("leaderboards", res);
  };

  return (
    <>
      <div>leaderboards</div>

      <button
        onClick={handleOnGetLeaderboards}
        className="border p-2 bg-orange-200 m-8"
      >
        get leaderboards
      </button>
      <button
        onClick={handleOnCreateEntry}
        className="border p-2 bg-orange-200 m-8"
      >
        create entry
      </button>
    </>
  );
};

export default page;
