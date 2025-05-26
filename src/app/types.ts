export type TNode = {
  id: string;
  name: string;
  val: number;
};

export type TLink = {
  source: string;
  target: string;
};

export type TGraphData = {
  nodes: TNode[];
  links: TLink[];
};

export type Word = {
  word: string;
  group: string;
  timestamp: string;
};
