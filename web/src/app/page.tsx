
"use client"
import { useEffect, useState } from "react";
import CountChart from "~/components/CountChart";
import RecentEvent from "~/components/RecentEvent";
import TypeSummary from "~/components/TypeSummary";
import { UserAuth } from "~/context/AuthContext";
import { getDayOfWeekData, getRecentCounts } from "~/firebase/queries/queries";

export default function HomePage() {

  type DayData = {
    birdCounts: {
        Su: number;
        M: number;
        Tu: number;
        W: number;
        Th: number;
        F: number;
        Sa: number;
    };
    squirrelCounts: {
        Su: number;
        M: number;
        Tu: number;
        W: number;
        Th: number;
        F: number;
        Sa: number;
  }
}

type CountData = {
  birds: {},
  squirrels: {}
}

  const [dayData, setDayData] = useState<DayData> ()
  const [countData, setCountData] = useState<CountData>()


  useEffect(()=> {
    async function fetchData(){
      let res_days = await getDayOfWeekData()
      let res_counts = await getRecentCounts()
      if (res_days) {
        setDayData(res_days);
      }

      if (res_counts) {
        setCountData(res_counts);
      }
      
      
    }

    fetchData()
  }, [])

  const {user} = UserAuth()



  return (
    <div>
      {user ? (
        <main className="ml-4 mt-10 flex flex-col">
          <div>
            <RecentEvent />
          </div>
          <div className="mb-8 text-xl font-semibold">My Dashboard</div>
          <div className="mt-4 grid lg:grid-cols-2">
            {dayData && <TypeSummary count_data={dayData} />}
            <div>{countData && <CountChart count_data={countData} />}</div>
          </div>
        </main>
      ) : <div className="flex mt-[10rem] justify-center">Please Sign In to View...</div>}
    </div>
  );
}
