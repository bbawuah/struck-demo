import { Card, Text } from "@radix-ui/themes";

interface Props {
  word: string;
}

export const WordCloud = (props: Props) => {
  const { word } = props;

  return (
    <Card className="max-w-1/3">
      <Text>{word}</Text>
    </Card>
  );
};
