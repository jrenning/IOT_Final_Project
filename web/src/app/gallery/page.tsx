"use client";
import { fetchSensorData } from "~/firebase/queries/queries";
import { prettifyDate } from "../helpers/dates";
import { UserAuth } from "~/context/AuthContext";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";

export default function HomePage() {
  const [data, setData] = useState<DocumentData[]>();

  useEffect(() => {
    async function fetchData() {
      const res = await fetchSensorData();
      if (res) {
        setData(res);
      }
      
    }

    fetchData();
  });

  const {user} = UserAuth();

  return (
    <div>
      {user ? (
        <div className="grid grid-cols-2 items-center justify-center lg:grid-cols-4 lg:gap-6">
          {data && data.map((d) => (
            <div className="flex flex-col items-center justify-center">
              <img
                src={d.image_url}
                className="h-[12rem] w-[15rem] object-contain"
              ></img>
              <div className="text-lg">{d["detection type"]}</div>
              <div className="font-semibold">
                {prettifyDate(new Date(d.timestamp))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex mt-[10rem] justify-center">Please Sign In to View...</div>
      )}
    </div>
  );
}
