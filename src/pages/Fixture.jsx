import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format, isBefore, parseISO } from "date-fns";
import { Appbar } from "../components";
import { now } from "../constants";

export default function Fixture({ data }) {
  const navigate = useNavigate();
  const { club } = useParams();
  const fixtureList = data
    .filter((game) => Object.keys(game.score).includes(club))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="fixture">
      <Appbar title="Fixture" url="watch.png" />
      <div className="container">
        <div className="fixture-club">
          <img src={`${club}.svg`} alt={`${club}`} />
          <h2 data-testid={`title_${club}`}>{club}</h2>
        </div>
        <div className="fixture-items">
          {fixtureList.map((game, index) => {
            const home = Object.keys(game.score)[0];
            const away = Object.keys(game.score)[1];
            return (
              <div
                data-testid="match-item"
                className="fixture-item"
                key={`fixture-${index}`}
              >
                <div className="fixture-item__team">
                  <div className="left">
                    <div className="left-row">
                      <img src={`${home}.svg`} alt="" />
                      <span>{home}</span>
                    </div>
                    <div className="left-row">
                      <img src={`${away}.svg`} alt="" />
                      <span>{away}</span>
                    </div>
                  </div>
                  <div className="right">
                    <span>
                      {format(new Date(game.date), ["d", "MMMM", "y"])
                        .split(",")
                        .join(" ")}
                    </span>
                    <span>
                      {format(new Date(game.date), ["HH", "mm"])
                        .split(",")
                        .join(":")}
                    </span>
                    {isBefore(parseISO(game.date), now) && (
                      <span className="score">
                        {game.score[home]} : {game.score[away]}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button className="btn" onClick={() => navigate("/")}>
          League
        </button>
      </div>
    </div>
  );
}
