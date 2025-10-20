import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import SettingsCard from "../SettingsCard";

jest.mock("../Themed", () => ({
  __esModule: true,
  Text: require("react-native").Text,
  useThemeColor: jest.fn(() => "white"),
}));

test("renders label correctly", () => {
  const { getByText } = render(<SettingsCard label="Test Label" />);
  expect(getByText("Test Label")).toBeTruthy();
});

test("renders value correctly", () => {
  const { getByText } = render(<SettingsCard label="Label" value="42" />);
  expect(getByText("42")).toBeTruthy();
});

test("renders switch and handles change", () => {
  const onSwitchChange = jest.fn();
  const { getByTestId } = render(
    <SettingsCard
      label="Switch"
      showSwitch
      switchValue={true}
      onSwitchChange={onSwitchChange}
    />,
  );
  fireEvent(getByTestId("switch"), "valueChange", false);
});
