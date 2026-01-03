import { Button, Snackbar, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { SERVER_URL } from "../Constants";
import Carlist from "./Carlist";
import Logout from "./Logout";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [isAuthenticated, setAuthenticated] = useState(false);

  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const login = () => {
    fetch(SERVER_URL + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        const jwtToken = res.headers.get("Authorization");
        if (jwtToken !== null) {
          sessionStorage.setItem("jwt", jwtToken);
          setAuthenticated(true);
        } else {
          setOpen(true);
        }
      })
      .catch((err) => console.error(err));
  };

  if (isAuthenticated) {
    return (
      <Stack spacing={2} alignItems="center" mt={2}>
        <Carlist />
        <Logout setAuthenticated={setAuthenticated} setUser={setUser} />
      </Stack>
    );
  } else {
    return (
      <div>
        <Stack spacing={2} alignItems="center" mt={2}>
          <TextField name="username" label="Username" onChange={handleChange} />
          <TextField
            name="password"
            label="Password"
            type="password"
            onChange={handleChange}
          />
          <Button variant="outlined" color="primary" onClick={login}>
            Login
          </Button>
        </Stack>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          message="Login failed: Check your username and password"
        />
      </div>
    );
  }
}

export default Login;
