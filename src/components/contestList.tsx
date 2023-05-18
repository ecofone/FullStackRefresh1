import { useState, useEffect } from "react";
import ContestPreview from "./contestPreview";
import { fetchContests } from "../api-client";
import Header from "./header";

const ContestList = ({ initialContests, onContestClick }) => {
  const [contests, setContests] = useState(
    initialContests ?? [],
  );
  console.log(contests);
  useEffect(() => {
    if (!initialContests) {
      fetchContests().then((contests) => setContests(contests));
    }
  }, [initialContests]);

  return (
    <>
      <Header title="Naming Contests" />
      <div className="contest-list">
        {contests.map((contest) => {
          return (
            <ContestPreview
              key={contest.id}
              contest={contest}
              onContestClick={onContestClick}
            />
          );
        })}
      </div>
    </>
  );
};

export default ContestList;
