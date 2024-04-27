"use client";
// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/bar
import { ResponsiveBar } from "@nivo/bar";

type Props = {
  count_data: {
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
    };
  };
};

export default function TypeSummary({ count_data }: Props) {
  console.log(count_data);
  const days = ["Su", "M", "Tu", "W", "Th", "F", "Sa"];
  let new_data = [];
  for (let i = 0; i < 7; i++) {
    let idx = days[i];
    if (idx) {
      new_data.push({
        day_of_week: idx,
        //@ts-ignore
        squirrel: count_data.squirrelCounts[idx],
        //@ts-ignore
        bird: count_data.birdCounts[idx],
      });
    }
  }

  return (
    <div className="h-[30rem] w-[30rem]">
      <ResponsiveBar
        data={new_data}
        keys={["squirrel", "bird"]}
        indexBy="day_of_week"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Day of the Week",
          legendPosition: "middle",
          legendOffset: 32,
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Number",
          legendPosition: "middle",
          legendOffset: -40,
          truncateTickAt: 0,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
      />
    </div>
  );
}
