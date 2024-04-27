"use client";

import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import { prettifyDate } from "~/app/helpers/dates";
import { db } from "~/firebase/firebase";

function RecentEvent() {
  const fetchRecentEvent = onSnapshot(collection(db, "events"), (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const data = change.doc.data();
        if (typeof window !== "undefined") {
          const el = document.getElementById("recent-event");
          if (el) {
            el.innerText = `${data["detection type"]} at ${prettifyDate(new Date(data.timestamp))}`;
          }
        }
      }
    });
  });

  useEffect(() => {
    return () => {
      fetchRecentEvent();
    };
  });
  return (
    <div className="rounded-md shadow-md mb-12 bg-slate-100 w-[20rem]">
      <div className="font-semibold">Recent Event</div>
      <div id="recent-event"></div>
    </div>
  );
}

export default RecentEvent;
