import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { DoubleTapImage } from "../DoubleTapImage";

const mockStore = configureStore([]);

describe("DoubleTapImage", () => {
  const uri = "https://example.com/image.jpg";
  let store: any;
  let onLoad: jest.Mock;
  let onDoubleTap: jest.Mock;

  beforeEach(() => {
    store = mockStore({
      theme: { current: "light" }, // mock your Redux state
    });

    onLoad = jest.fn();
    onDoubleTap = jest.fn();
  });

  const renderWithProvider = (ui: JSX.Element) =>
    render(<Provider store={store}>{ui}</Provider>);

  it("calls onLoad when image is loaded", () => {
    const { getByTestId } = renderWithProvider(
      <DoubleTapImage
        uri={uri}
        liked={false}
        onDoubleTap={onDoubleTap}
        onLoad={onLoad}
        isGrid={false}
      />
    );

    const image = getByTestId("double-tap-image");
    fireEvent(image, "onLoad");

    expect(onLoad).toHaveBeenCalled();
  });

  it("calls onDoubleTap on double tap", () => {
    const { getByTestId } = renderWithProvider(
      <DoubleTapImage
        uri={uri}
        liked={false}
        onDoubleTap={onDoubleTap}
        onLoad={onLoad}
        isGrid={false}
      />
    );

    const touchable = getByTestId("double-tap-touchable");

    fireEvent.press(touchable);
    fireEvent.press(touchable);

    expect(onDoubleTap).toHaveBeenCalled();
  });

  it("renders author text when provided", () => {
    const { getByText } = renderWithProvider(
      <DoubleTapImage
        uri={uri}
        liked={false}
        author="John Doe"
        onDoubleTap={onDoubleTap}
      />
    );

    expect(getByText("John Doe")).toBeTruthy();
  });
});