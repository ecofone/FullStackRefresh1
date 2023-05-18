import ReactDomServer from "react-dom/server";
import { fetchContest, fetchContests } from "../api-client";

import App from "../components/app";

const serverRender = async (req) => {
  const { contestId } = req.params;
  const initialData = {
    contests: await fetchContests(),
    currentContest: contestId
      ? await fetchContest(contestId)
      : null,
  };
  const initialHTML = ReactDomServer.renderToString(
    <App initialData={initialData} />,
  );
  return { initialHTML, initialData };
};

export default serverRender;
