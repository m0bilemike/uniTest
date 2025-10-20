import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { HeartButton } from "../HeartButton";

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    MaterialIcons: ({ name }: any) => <Text testID="icon">{name}</Text>,
  };
});

describe("HeartButton component", () => {
  it("renders favorite icon when liked is true", () => {
    const { getByTestId } = render(
      <HeartButton liked={true} onPress={jest.fn()} />,
    );
    const icon = getByTestId("icon");
    expect(icon.props.children).toBe("favorite");
  });

  it("renders favorite-border icon when liked is false", () => {
    const { getByTestId } = render(
      <HeartButton liked={false} onPress={jest.fn()} />,
    );
    const icon = getByTestId("icon");
    expect(icon.props.children).toBe("favorite-border");
  });

  it("calls onPress when pressed", () => {
    const mockPress = jest.fn();
    const { getByTestId } = render(
      <HeartButton liked={false} onPress={mockPress} />,
    );
    const touchable = getByTestId("heart-button");
    fireEvent.press(touchable);
    expect(mockPress).toHaveBeenCalled();
  });
});
