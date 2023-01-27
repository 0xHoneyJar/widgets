import React from "react";
import "./SwapWidget.css";

export interface SwapWidgetProps {
  label: string;
}

const SwapWidget = ({ label }: SwapWidgetProps) => {
  return <button>{label}</button>;
};

export default SwapWidget;
