import React from "react";
import { observer } from "mobx-react-lite";
type Props = {
  total: () => number;
  role: string;
};

const TotalOfCharacters = observer(({ total, role }: Props) => (
  <span role={role} style={{ color: "cyan", margin: "0 1rem" }}>
    {total}
  </span>
));

export default TotalOfCharacters;
