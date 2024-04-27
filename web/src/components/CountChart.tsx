"use client";
import React from "react";

import { ResponsiveLine } from "@nivo/line";


type Props = {
  count_data: {birds: {}, squirrels: {}}
}

function CountChart({count_data}: Props) {

  console.log(count_data)
  //@ts-ignore
  let bird_data = Object.keys(count_data.birds).map((key)=> {return {x: key, y: count_data.birds[key]}})
  let squirrel_data = Object.keys(count_data.squirrels).map((key) => {
    //@ts-ignore
    return { x: key, y: count_data.squirrels[key] };
  });


    let data = [
              {
            id: "squirrels",
            color: "hsl(100, 50%, 50%)",
            data: squirrel_data
        },
        {
            id: "birds",
            color: "hsl(200, 50%, 50%)",
            data: bird_data
        }

     
    ];
  return (
    <div className="w-[30rem] h-[30rem]">
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "date",
          legendOffset: 36,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}

export default CountChart;
