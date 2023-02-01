import { Combobox } from "@headlessui/react";
import React from "react";

const OptionsPane = ({ filteredValues }: { filteredValues: string[] }) => {
  return (
    <Combobox.Options>
      {filteredValues.map((value) => (
        <Combobox.Option key={value} value={value}>
          {value}
        </Combobox.Option>
      ))}
    </Combobox.Options>
  );
};

export default OptionsPane;
