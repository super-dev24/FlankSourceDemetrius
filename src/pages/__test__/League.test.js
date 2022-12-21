import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import League from "../League";
import { data } from "../../data";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => {
    return mockedUseNavigate;
  },
}));

test("render League component correctly", async () => {
  render(<League data={data} />);
  expect(screen.getByText("Premier League")).toBeInTheDocument();
  expect(screen.getAllByTestId("team_row").length).toBe(7);
  expect(screen.getAllByTestId("team_item")[19]).toHaveTextContent(9);
  await userEvent.click(screen.getByText("Liverpool"));
  expect(mockedUseNavigate).toBeCalledTimes(1);
});
