export const initializeTeam = (teamData, teamName) => {
  return (
    teamData[teamName] || {
      scored: 0,
      conceded: 0,
      totalGames: 0,
      winGames: 0,
      lossGames: 0,
      drawGames: 0,
      totalPoints: 0,
    }
  );
};

export const updateTeamData = (teamData, score) => {
  const home = Object.keys(score)[0];
  const away = Object.keys(score)[1];

  teamData[home]["scored"] += score[home];
  teamData[home]["conceded"] += score[away];
  teamData[home]["totalGames"]++;
  teamData[away]["scored"] += score[away];
  teamData[away]["conceded"] += score[away];
  teamData[away]["totalGames"]++;

  if (score[home] > score[away]) {
    teamData[home]["winGames"]++;
    teamData[home]["totalPoints"] += 3;
    teamData[away]["lossGames"]++;
  } else if (score[home] === score[away]) {
    teamData[home]["drawGames"]++;
    teamData[home]["totalPoints"] += 1;
    teamData[away]["drawGames"]++;
    teamData[away]["totalPoints"] += 1;
  } else {
    teamData[home]["lossGames"]++;
    teamData[away]["winGames"]++;
    teamData[away]["totalPoints"] += 3;
  }

  return teamData;
};
