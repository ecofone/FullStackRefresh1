import ReactDomServer from "react-dom/server";
import { fetchContests } from "../api-client";

import App from "../components/app";

const serverRender = async () => {
  const contests = await fetchContests();
  const initialHTML = ReactDomServer.renderToString(
    <App initialData={contests} />,
  );
  return { initialHTML, initialData: contests };
};

export default serverRender;
