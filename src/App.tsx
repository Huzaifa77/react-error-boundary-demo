import "./App.css";
import { UserList } from "@/Components";
import { SWRConfig } from "swr";
import { swrConfig } from "@/configs";

function App() {
  return (
    <SWRConfig value={swrConfig}>
      <UserList />
    </SWRConfig>
  );
}

export default App;
