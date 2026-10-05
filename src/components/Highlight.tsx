/** Renders text where segments wrapped in *asterisks* are highlighted. */
const Highlight = ({ text, className }: { text: string; className: string }) => (
  <>
    {text.split("*").map((part, i) =>
      i % 2 === 1 ? (
        <span key={i} className={className}>
          {part}
        </span>
      ) : (
        part
      ),
    )}
  </>
);

export default Highlight;
