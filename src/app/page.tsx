"use client";
import { WordCloudContainer } from "./components/Domain/WordCloudContainer/WordCloudContainer";
import { useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Box, Button, Container, Flex, Spinner } from "@radix-ui/themes";
import { ForceGraph } from "./components/Domain/ForceGraph/ForceGraph";
import { useElementHeight } from "./hooks/useElementHeight";
import { TGraphData, TLink, TNode, Word } from "./types";
import { useAutoSaveWord } from "./hooks/useAutoSaveWord";
import { toast, ToastContainer } from "react-toastify";
import { useToastTrigger } from "./hooks/useToastTrigger";

export default function Home() {
  const [canRefetchOnInterval, setCanRefetchOnInterval] = useState(true);

  const { data, error, isFetching, isLoading, refetch } = useQuery<Word>({
    queryKey: ["words"],
    queryFn: getWord,
    refetchInterval: canRefetchOnInterval ? 10000 : false,
    refetchIntervalInBackground: true,
    staleTime: 10000,
  });
  const [words, setWords] = useState<Array<Word>>([]);
  const { isSuccess, reset, isError } = useAutoSaveWord(data);

  const graphContainerRef = useRef<HTMLDivElement | null>(null);
  const { height, width } = useElementHeight(graphContainerRef);

  useToastTrigger(isSuccess, "Saved this word!", () => {
    reset();
  });
  useToastTrigger(isError, "Oops.. we couldn't save this word!", () => {
    reset();
  });

  if (error) {
    return <div>Something went wrong whilst loading word</div>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="flex h-[75dvh]">
        <WordCloudContainer className="w-1/2" words={words} />

        <div ref={graphContainerRef} className="h-full w-1/2">
          <ForceGraph width={width} height={height} data={getGroupData()} />
        </div>
      </div>
      <Container>
        <Box>
          <Flex justify={"center"}>
            <Button
              variant="outline"
              className="mr-4!"
              onClick={() => setCanRefetchOnInterval(!canRefetchOnInterval)}
            >
              {canRefetchOnInterval ? "Pause" : "Resume"}
            </Button>

            <Button onClick={() => refetch()}>
              Add Word
              {isFetching && <Spinner />}
            </Button>
          </Flex>
        </Box>
        <ToastContainer />
      </Container>
    </div>
  );

  function getGroupData() {
    const groups = Object.entries(
      words.reduce<Record<string, number>>((acc, { group }) => {
        acc[group] = (acc[group] || 0) + 1;
        return acc;
      }, {})
    );

    const nodes: TNode[] = groups.map(([group, count]) => ({
      id: group,
      name: group,
      val: count,
    }));

    const links: TLink[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        links.push({
          source: nodes[i].id,
          target: nodes[j].id,
        });
      }
    }

    const graph: TGraphData = {
      nodes,
      links,
    };

    return graph;
  }

  async function getWord() {
    try {
      const data = await fetch("/word");

      const json = await data.json();

      if ("error" in json) {
        throw new Error(json.error);
      }

      const parsedData = JSON.parse(json.word);

      setWords((prev) => [...prev, parsedData]);

      return json;
    } catch (e) {
      console.log(e);

      return { error: "Failed to fetch random word" };
    }
  }
}
