import React from "react";

const Flex = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>{children}</div>
  );
};

export default Flex;
