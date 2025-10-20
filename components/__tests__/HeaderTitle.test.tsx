// HeaderTitle.test.tsx
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { HeaderTitle } from "../HeaderTitle";

jest.mock("../Themed", () => {
  const React = require("react");
  return {
    useThemeColor: jest.fn(() => "black"),
    Text: (props: any) => React.createElement("Text", props, props.children),
    View: (props: any) => React.createElement("View", props, props.children),
  };
});

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  return {
    MaterialIcons: (props: any) =>
      React.createElement("Text", null, props.name),
  };
});

describe("HeaderTitle", () => {
  it("renders title correctly", () => {
    const { getByText } = render(
      <HeaderTitle title="My Header" isGrid={true} toggleLayout={() => {}} />,
    );
    expect(getByText("My Header")).toBeTruthy();
  });

  it("calls toggleLayout when icon is pressed", () => {
    const toggleMock = jest.fn();
    const { getByText } = render(
      <HeaderTitle title="Header" isGrid={false} toggleLayout={toggleMock} />,
    );

    fireEvent.press(getByText("grid-view"));
    expect(toggleMock).toHaveBeenCalledTimes(1);
  });

  it("renders correct icon based on isGrid prop", () => {
    const { getByText, rerender } = render(
      <HeaderTitle title="Header" isGrid={true} toggleLayout={() => {}} />,
    );
    expect(getByText("view-list")).toBeTruthy();

    rerender(
      <HeaderTitle title="Header" isGrid={false} toggleLayout={() => {}} />,
    );
    expect(getByText("grid-view")).toBeTruthy();
  });
});
