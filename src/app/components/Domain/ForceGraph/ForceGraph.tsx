"use client";
import { TGraphData } from "@/app/types";
import dynamic from "next/dynamic";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

const data = {
  nodes: [
    {
      id: "id1",
      name: "name1",
      val: 1,
    },
    {
      id: "id2",
      name: "name2",
      val: 10,
    },
  ],
  links: [
    {
      source: "id1",
      target: "id2",
    },
  ],
};

interface Props {
  width: number;
  height: number;
  data: TGraphData;
}

export const ForceGraph = (props: Props) => {
  const { width, height, data } = props;

  return (
    <ForceGraph2D
      width={width}
      height={height}
      graphData={data}
      linkColor={() => "#FFF"}
    />
  );
};
