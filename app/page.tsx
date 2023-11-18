/* App Page */

import { Box } from "@mui/system";
import Tasks from "./pages/tasks/page";
import Footer from "./components/Footer/footer";

const Home = () => {

  return (
    <Box>
      <Tasks />
    </Box>
  );
};

export default Home;