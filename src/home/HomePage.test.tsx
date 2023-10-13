import React from "react";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import HomePage from "./HomePage";

describe("<HomePage/>", () => {
  test("should render without crashing", () => {
    render(<HomePage />);
  });

  test("render home heading", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading")).toHaveTextContent("Home");
  });

  test("snapshot", () => {
    const tree = renderer.create(<HomePage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
