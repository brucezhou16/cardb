import { Button } from "@mui/material";

function Logout(props) {
  const logout = () => {
    sessionStorage.removeItem("jwt");
    props.setUser(null);
    props.setAuthenticated(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}

export default Logout;
