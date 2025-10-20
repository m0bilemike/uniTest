import { render } from "@testing-library/react-native";
import React from "react";
import { useSelector } from "react-redux";
import { Text, View, useThemeColor } from "../Themed";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("@/constants/theme", () => ({
  Colors: {
    light: { text: "#000000", background: "#FFFFFF" },
    dark: { text: "#FFFFFF", background: "#000000" },
  },
}));

describe("Themed components", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useSelector as jest.Mock).mockImplementation((fn) =>
      fn({ theme: { current: "light" } }),
    );
  });

  it("Text renders with correct color from theme", () => {
    const { getByText } = render(<Text>Test Text</Text>);
    const text = getByText("Test Text");

    const styleArray = Array.isArray(text.props.style)
      ? text.props.style
      : [text.props.style];

    expect(styleArray).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: "#000000" })]),
    );
  });

  it("View renders with correct background color from theme", () => {
    const { getByTestId } = render(<View testID="view-test" />);
    const view = getByTestId("view-test");

    const styleArray = Array.isArray(view.props.style)
      ? view.props.style
      : [view.props.style];

    expect(styleArray).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: "#FFFFFF" }),
      ]),
    );
  });

  it("useThemeColor returns lightColor if provided", () => {
    const color = useThemeColor({ light: "red" }, "text");
    expect(color).toBe("red");
  });

  it("useThemeColor returns theme color when no color prop", () => {
    const color = useThemeColor({}, "text");
    expect(color).toBe("#000000");
  });

  it("useThemeColor returns dark theme colors correctly", () => {
    (useSelector as jest.Mock).mockImplementation((fn) =>
      fn({ theme: { current: "dark" } }),
    );

    const textColor = useThemeColor({}, "text");
    const bgColor = useThemeColor({}, "background");

    expect(textColor).toBe("#FFFFFF");
    expect(bgColor).toBe("#000000");
  });
});
