import * as React from "react";
import { useState, useEffect } from "react";
import {
  addNewNameToContest,
  fetchContest,
} from "../api-client";
import Header from "./header";

const Contest: React.FC<{
  initialContest: object;
  onContestListClick: any;
}> = ({ initialContest, onContestListClick }) => {
  const [contest, setContest] = useState(initialContest);
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
  const handleNewNameSubmit = async (event) => {
    event.preventDefault();
    const newNameValue = event.target.newName.value;
    const updatedContest = await addNewNameToContest(
      contest.id,
      newNameValue,
    );
    setContest(updatedContest);
    console.log("updated contest: ", updatedContest);
  };
  return (
    <>
      <Header title={contest.contestName} />

      <div className="contest">
        <div className="title">Contest Description</div>
        <div className="description">{contest.description}</div>
        <div className="title">Proposed Names</div>
        <div className="body">
          {contest.names?.length > 0 ? (
            <div className="list">
              {contest.names.map((proposedNames) => (
                <div key={proposedNames.id} className="item">
                  {proposedNames.name}
                </div>
              ))}
            </div>
          ) : (
            <div>No names proposed yet</div>
          )}
        </div>
        <div className="title"> Propose a new Name</div>
        <div className="body">
          <form onSubmit={handleNewNameSubmit}>
            <input
              type="text"
              name="newName"
              placeholder="New Name here..."
            />
            <button type="submit">Submit</button>
          </form>
        </div>
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
