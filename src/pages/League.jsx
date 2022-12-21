import React, { useMemo } from "react";
import { LeagueTable, Appbar } from "../components";
import { now } from "../constants";
import { initializeTeam, updateTeamData } from "../utils";
import { isBefore, parseISO } from "date-fns";

export default function League({ data }) {
  const prevGames = useMemo(
    () =>
      data
        .filter((game) => isBefore(parseISO(game.date), now))
        .reduce((prev, { score }) => {
          Object.keys(score).forEach((teamName) => {
            prev[teamName] = initializeTeam(prev, teamName);
          });
          return updateTeamData(prev, score);
        }, {}),
    [data]
  );

  return (
    <div className="app">
      <Appbar title="Premier League" url="logo192.svg" />
      <LeagueTable teams={prevGames} />;
    </div>
  );
}
