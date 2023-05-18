import * as React from "react";
import { useState, useEffect } from "react";
import { fetchContest } from "../api-client";
import Header from "./header";

const Contest: React.FC<{
  initialContest: object;
  onContestListClick: any;
}> = ({ initialContest, onContestListClick }) => {
  const [contest, setContest] = useState(initialContest);
  console.log(contest);
  useEffect(() => {
    if (!contest.names) {
      fetchContest(contest.id).then((contest) => {
        setContest(contest);
      });
    }
  }, [contest.id, contest.names, initialContest]);

  const handleClickContestList = (event) => {
    event.preventDefault();
    onContestListClick();
  };
  return (
    <>
      <Header title={contest.contestName} />

      <div className="contest">
        <div className="title">Contest Description</div>
        <div className="description">{contest.description}</div>
        <a
          href="/"
          className="link"
          onClick={handleClickContestList}
        >
          Contest List
        </a>
      </div>
    </>
  );
};

export default Contest;
