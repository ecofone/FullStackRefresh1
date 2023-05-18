import * as React from "react";

const ContestPreview: React.FC<{
  contest: object;
  onContestClick: any;
}> = ({ contest, onContestClick }) => {
  const handleClick = (event) => {
    event.preventDefault();
    onContestClick(contest.id);
  };
  return (
    <div
      key={contest.id}
      className="contest-preview link"
      onClick={handleClick}
    >
      <div className="category">{contest.categoryName}</div>
      <div className="contest">{contest.contestName}</div>
    </div>
  );
};

export default ContestPreview;
