import { useState, useEffect } from "react";

import ContestList from "./contestList";
import Contest from "./contest";

const App = ({ initialData }) => {
  const [currentPage, setCurrentPage] = useState(
    initialData.currentContest ? "Contest" : "ContestList",
  );
  const [currentContest, setCurrentContest] = useState(
    initialData.currentContest,
  );

  useEffect(() => {
    window.onpopstate = (event) => {
      setCurrentPage(
        event.state?.contestId ? "Contest" : "ContestList",
      );
      setCurrentContest({ id: event.state?.contestId });
    };
  }, []);

  const navigateToContest = (contestId: string) => {
    setCurrentContest({ id: contestId });
    setCurrentPage("Contest");
    window.history.pushState(
      { contestId },
      "",
      `/contest/${contestId}`,
    );
  };

  const navigateToContestList = () => {
    setCurrentContest({});
    setCurrentPage("ContestList");
    window.history.pushState(undefined, "", "/");
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "Contest":
        return (
          <Contest
            initialContest={currentContest}
            onContestListClick={navigateToContestList}
          />
        );
      case "ContestList":
      default:
        return (
          <ContestList
            initialContests={initialData.contests}
            onContestClick={navigateToContest}
          />
        );
    }
  };

  return <div className="container">{renderCurrentPage()}</div>;
};

export default App;
