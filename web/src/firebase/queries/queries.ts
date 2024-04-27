
import {
    DocumentData,
    collection,
    getDocs
} from "firebase/firestore";
import { db } from "../firebase";

const getDayOfWeek = (timestampStr: string) => {
  const date = new Date(timestampStr);
  const days = ["Su", "M", "Tu", "W", "Th", "F", "Sa"];
  return days[date.getDay()];
};

export async function getDayOfWeekData() {
  try {
    const snapshot = await getDocs(collection(db, "events"));

    // Initialize an object to store counts by day
    const countsByDayB = {
      Su: 0,
      M: 0,
      Tu: 0,
      W: 0,
      Th: 0,
      F: 0,
      Sa: 0,
    };

    const countsByDayS = {
      Su: 0,
      M: 0,
      Tu: 0,
      W: 0,
      Th: 0,
      F: 0,
      Sa: 0,
    };

    // Loop through the documents and accumulate counts by day of the week
    //@ts-ignore
    snapshot.forEach((doc) => {
      const data = doc.data();
      const dayOfWeek = getDayOfWeek(data.timestamp); // Assume the field is 'timestamp'

      // Update counts for each detection type (assuming 'detection_count' field)
      if (data["detection type"] === "Birds") {
        //@ts-ignore
        countsByDayB[dayOfWeek] += 1; // Increment the count by the field's value
      } else if (data["detection type"] === "Squirrels") {
        //@ts-ignore
        countsByDayS[dayOfWeek] += 1; // Increment the count by the field's value
      }
    });

    const counts = {
      birdCounts: countsByDayB,
      squirrelCounts: countsByDayS,
    };

    return counts;
  } catch (error) {
    console.error("Error aggregating counts by day of the week:", error);
  }
}

function countDetectionByDay(
  data: DocumentData,
  detectionType: "Birds" | "Squirrels",
) {
  // Step 1: Group the data by date
  const groupedByDate = data.reduce((acc: any, item: any) => {
    const date = new Date(item.timestamp).toISOString().split("T")[0]; // Extract the date part
    if (date) {
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
    }
    return acc;
  }, {});

  // Step 2: Count occurrences of the specified detection type for each group (date)
  const detectionCounts = {};
  for (const date in groupedByDate) {
    const dailyData = groupedByDate[date];

    // Step 3: Filter by detection type and count occurrences
    const filteredByType = dailyData.filter(
      (item: any) => item["detection type"] === detectionType,
    );
    //@ts-ignore
    detectionCounts[date] = filteredByType.length; // Get the count of matching detection types
  }

  return detectionCounts; // Return an object where the keys are dates and the values are the counts
}

export async function getRecentCounts() {
  const q = await getDocs(collection(db, "events"));

  // filter data to only be in the last week
  let data: DocumentData[] = [];

  const week_ago = new Date();
  week_ago.setDate(week_ago.getDate() - 7);

  q.forEach((doc) => {
    const d = doc.data();
    if (new Date(d.timestamp) > week_ago) {
      data.push(d);
    }
  });

  const birdDetection = countDetectionByDay(data, "Birds");
  const squirrelDetection = countDetectionByDay(data, "Squirrels");

  const day_counts = {
    birds: birdDetection,
    squirrels: squirrelDetection,
  };

  // sum up birds and squirrels

  return day_counts;
}

export async function fetchSensorData(): Promise<DocumentData[] | undefined> {
  try {
    const query = await getDocs(collection(db, "events"));
    let data: DocumentData[] = [];
    query.forEach((doc) => {
      data.push(doc.data());
    });

    return data.reverse();
  } catch (err) {
    console.log(err)
  }
}
