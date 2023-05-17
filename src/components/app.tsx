import ContestList from "./contestList";
import Header from "./header";

const App = ({ initialData }) => {
  return (
    <div className="container">
      <Header title="Naming Contests" />
      <ContestList initialContests={initialData} />
    </div>
  );
};

export default App;
