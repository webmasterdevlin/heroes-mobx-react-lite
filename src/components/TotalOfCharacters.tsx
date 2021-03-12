import React from "react";

type Props = {
  total: () => number;
  role: string;
};

const TotalOfCharacters = ({ total, role }: Props) => (
  <span role={role} style={{ color: "cyan", margin: "0 1rem" }}>
    {total}
  </span>
);

export default TotalOfCharacters;
