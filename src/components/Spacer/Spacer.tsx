import * as React from "react";

type SpaceLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32;

interface Props {
  size: SpaceLevel;
  axis?: "vertical" | "horizontal";
}

function Spacer({ size, axis = "vertical" }: Props) {
  const dimension = axis === "vertical" ? "height" : "width";

  return (
    <div
      aria-hidden
      style={{ [dimension]: `var(--space-${size})`, flexShrink: 0 }}
    />
  );
}

export default Spacer;
