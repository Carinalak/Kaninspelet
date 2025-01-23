import React from "react";

interface GameResult {
  total_score: number;
  game_date: string;
  golden_rabbits: number;
}

interface SortDropdownProps {
  gameResults: GameResult[];
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  onSortResults: (sortedResults: GameResult[]) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({
  gameResults,
  sortBy,
  setSortBy,
  onSortResults,
}) => {
  // Sorteringslogik
  const sortResults = (results: GameResult[], sortBy: string): GameResult[] => {
    return [...results].sort((a, b) => {
      switch (sortBy) {
        case "highestScore":
          return b.total_score - a.total_score;
        case "lowestScore":
          return a.total_score - b.total_score;
        case "mostGoldenRabbits":
          return b.golden_rabbits - a.golden_rabbits;
        case "latest": {
          const dateA = new Date(a.game_date).getTime();
          const dateB = new Date(b.game_date).getTime();
          return dateB - dateA;
        }
        case "oldest": {
          const dateA = new Date(a.game_date).getTime();
          const dateB = new Date(b.game_date).getTime();
          return dateA - dateB;
        }
        default:
          return 0;
      }
    });
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;
    setSortBy(selectedSort);
    const sorted = sortResults(gameResults, selectedSort);
    onSortResults(sorted);
  };

  return (
    <div>
     {/*  <label htmlFor="sort-dropdown">Sortera efter:</label>*/}
      <select
        id="sort-dropdown"
        value={sortBy}
        onChange={handleSortChange}
      >
        <option value="highestScore">Högsta poäng</option>
        <option value="latest">Senaste</option>
        <option value="oldest">Äldsta</option>
        <option value="lowestScore">Lägsta poäng</option>
        <option value="mostGoldenRabbits">Flest guldkaniner</option>
      </select>
    </div>
  );
};
