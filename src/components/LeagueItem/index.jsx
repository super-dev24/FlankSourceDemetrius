import React from "react";
import { useNavigate } from "react-router-dom";

export default function LeagueItem({ data }) {
  const navigate = useNavigate();
  return (
    <tr
      data-testid="team_row"
      className="table-row"
      onClick={() => {
        navigate(`/${data.team}`);
      }}
    >
      {Object.keys(data).map((key, index) => (
        <td key={`td-${key}-${index}}`} data-testid="team_item">
          {data[key]}
        </td>
      ))}
    </tr>
  );
}
