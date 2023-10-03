import { AuthProvider } from "../AuthProvider";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
  return (
    <div className="Layout">
      <AuthProvider>
        <Menu to={""} children={undefined} />
        <hr />

        <Routing />
      </AuthProvider>
    </div>
  );
}

export default Layout;
