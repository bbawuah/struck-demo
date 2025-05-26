import { WordCloud } from "../WordCloud/WordCloud";
import classNames from "classnames";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  words: { word: string; group: string }[];
}
export const WordCloudContainer = (props: Props) => {
  const { className, words, ...rest } = props;
  const classes = classNames("overflow-y-scroll space-y-2", className);

  return (
    <div className={classes} {...rest}>
      {words?.map((word, index) => (
        <WordCloud key={index} word={word.word} />
      ))}
    </div>
  );
};
