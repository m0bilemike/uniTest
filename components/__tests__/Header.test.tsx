import { render } from "@testing-library/react-native";
import React from "react";
import { Header } from "../Header";

jest.mock("../Themed", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    View: (props: any) => <View {...props} />,
    useThemeColor: jest.fn(() => "black"),
  };
});

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    FontAwesome: ({ name, color, size }: any) => (
      <Text>{`${name}-${color}-${size}`}</Text>
    ),
  };
});

jest.mock("expo-router", () => {
  const React = require("react");
  const Trigger = ({ children }: any) => <>{children}</>;
  const Link = ({ href, children }: any) => <>{children}</>;
  Link.Trigger = Trigger;
  return { Link };
});

describe("Header component", () => {
  it("renders the FontAwesome icon with correct props", () => {
    const { getByText } = render(<Header />);
    const icon = getByText("sliders-black-28");
    expect(icon).toBeTruthy();
  });
});
