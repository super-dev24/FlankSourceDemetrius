import { render, screen } from "@testing-library/react";
import Router from "react-router-dom";
import userEvent from "@testing-library/user-event";

import Fixture from "../Fixture";
import { data } from "../../data";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => {
    return mockedUseNavigate;
  },
}));

test("render Fixture component correctly", async () => {
  jest.spyOn(Router, "useParams").mockReturnValue({ club: "Manchester City" });
  render(<Fixture data={data} />);
  expect(screen.getByText("Fixture")).toBeInTheDocument();
  expect(screen.getAllByTestId(/manchester city/i).length).toBe(1);
  expect(screen.getAllByTestId("match-item").length).toBe(6);
  await userEvent.click(screen.getByText("League"));
  expect(mockedUseNavigate).toBeCalledTimes(1);
});
