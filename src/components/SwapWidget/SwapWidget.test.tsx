import React from "react";
import { render } from "@testing-library/react";

import SwapWidget from "./SwapWidget";

describe("SwapWidget", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<SwapWidget label="Test Label" />);
    expect(baseElement).toBeTruthy();
  });
});
