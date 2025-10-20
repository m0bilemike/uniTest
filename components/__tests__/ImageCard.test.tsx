import { PicsumImage } from "@/types/types";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { ImageCard } from "../ImageCard";

const mockStore = configureStore([]);

describe("ImageCard", () => {
  const item: PicsumImage = {
    id: "1",
    author: "John Doe",
    download_url: "https://example.com/image.jpg",
    width: 500,
    height: 500,
    url: "https://example.com",
  };

  let store: any;
  let onToggleLike: jest.Mock;

  beforeEach(() => {
    store = mockStore({
      theme: { current: "light" },
    });

    onToggleLike = jest.fn();
  });

  const renderWithProvider = (ui: JSX.Element) =>
    render(<Provider store={store}>{ui}</Provider>);

  it("renders author text", () => {
    const { getByText } = renderWithProvider(
      <ImageCard
        item={item}
        liked={false}
        isGrid={false}
        onToggleLike={onToggleLike}
      />,
    );

    expect(getByText("John Doe")).toBeTruthy();
  });

  it("calls onToggleLike when heart is pressed", () => {
    const { getByRole } = renderWithProvider(
      <ImageCard
        item={item}
        liked={false}
        isGrid={false}
        onToggleLike={onToggleLike}
      />,
    );

    const button = getByRole("button");
    fireEvent.press(button);

    expect(onToggleLike).toHaveBeenCalled();
  });

  it("renders loader initially", () => {
    const { getByTestId } = renderWithProvider(
      <ImageCard
        item={item}
        liked={false}
        isGrid={false}
        onToggleLike={onToggleLike}
      />,
    );

    const loader = getByTestId("ActivityIndicator");
    expect(loader).toBeTruthy();
  });
});
