import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Helmet } from "react-helmet";
import { handleLogin } from "../functions/handleLogin";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../state/state";

const LandingPage = () => {
  const [open, setOpen] = useState(false);

  const handleLoginButtonPress = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    if (user.id) {
      navigate("/main");
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/ForestCamping.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sofia&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json"></link>
      </Helmet>
      <div style={{ position: "absolute", zIndex: 1 }}>
        <Grid
          direction="column"
          paddingY={6}
          justifyContent="space-between"
          height="100vh"
          alignItems="center"
          container
        >
          <Grid container direction="column" alignItems="center">
            <Grid>
              <Typography
                variant="h3"
                fontFamily="Sofia"
                fontWeight="bold"
                color="secondary"
                style={{ textShadow: "0px 20px 30px #042343" }}
              >
                GroupCalendar
              </Typography>
            </Grid>
            <Grid>
              <Button color="secondary" size="large" variant="text">
                about
              </Button>
            </Grid>
          </Grid>
          {!open && (
            <Grid direction="column" container spacing={3}>
              <Grid>
                <Button
                  color="secondary"
                  size="large"
                  variant="contained"
                  sx={{ borderRadius: "8px" }}
                  onClick={handleLoginButtonPress}
                >
                  Přihlásit se
                </Button>
              </Grid>
              <Grid>
                <Button
                  color="secondary"
                  size="large"
                  variant="text"
                  onClick={() => navigate("/login")}
                >
                  Vytvořit účet
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(5px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            width: "80vw",
            paddingY: "48px",
            borderRadius: "16px",
          }}
        >
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            direction={"column"}
            spacing={2}
          >
            <Typography variant="h5" color={"secondary"}>
              Přihlášení
            </Typography>
            <TextField
              name="username"
              label={"přihlašovací jméno"}
              color={"secondary"}
              onChange={handleInputChange}
              value={form.username}
              focused
              sx={{ input: { color: "white" } }}
            />
            <TextField
              name="password"
              label={"heslo"}
              type="password"
              color={"secondary"}
              onChange={handleInputChange}
              value={form.password}
              focused
              sx={{ input: { color: "white" } }}
            />

            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                handleLogin(form.username, form.password).then(
                  (data) => data && setUser(data)
                )
              }
              sx={{ color: "White" }}
            >
              Přihlásit
            </Button>

            <Typography size={"small"}>alpha version: 20.5.2024</Typography>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default LandingPage;
