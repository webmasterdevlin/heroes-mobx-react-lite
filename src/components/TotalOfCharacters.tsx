import React from "react";

type Props = {
  total: () => number;
  dataTestId: string;
};

const TotalOfCharacters = ({ total, dataTestId }: Props) => (
  <span data-testid={dataTestId} style={{ color: "cyan", margin: "0 1rem" }}>
    {total}
  </span>
);

export default TotalOfCharacters;
