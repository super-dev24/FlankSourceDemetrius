import React from "react";
import LeagueItem from "../LeagueItem";

export default function LeagueTable({ teams }) {
  const rows = ["Rank", "Club", "MP", "W", "D", "L", "GF", "GA", "GD", "Pts"];
  const structuredTeams = Object.keys(teams).map((team) => {
    return {
      team,
      totalGames: teams[team].totalGames,
      winGames: teams[team].winGames,
      drawGames: teams[team].drawGames,
      lossGames: teams[team].lossGames,
      scored: teams[team].scored,
      conceded: teams[team].conceded,
      goalDiff: teams[team].scored - teams[team].conceded,
      totalPoints: teams[team].totalPoints,
    };
  });
  return (
    <div className="container">
      <table data-cy="table" className="table">
        <thead>
          <tr>
            {rows.map((item) => {
              return <th key={`header-${item}`}>{item}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {structuredTeams
            .sort((a, b) => b.goalDiff - a.goalDiff)
            .sort((a, b) => b.totalPoints - a.totalPoints)
            .map((team, index) => {
              return {
                ranking: index + 1,
                ...team,
              };
            })
            .map((team, index) => (
              <LeagueItem key={`club-${team}${index}`} data={team} />
            ))}
        </tbody>
      </table>
    </div>
  );
}
