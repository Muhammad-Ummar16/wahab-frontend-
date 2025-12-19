import { Toaster } from "react-hot-toast";
import Approutes from "./routes/Approutes";
const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Approutes />
    </>
  );
};

export default App;
