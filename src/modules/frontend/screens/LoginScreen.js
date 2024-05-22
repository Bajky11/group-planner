import {
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import CryptoJS from "crypto-js";
import FullScreenColorContainer from "../containers/FullScreenColorContainer";
import { db } from "../../.."; // Ujistěte se, že tato cesta je správná pro import instance Firestore
import { handleLogin } from "../functions/handleLogin";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../state/state";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [user, setUser] = useAtom(userAtom);
  const [isRegistration, setIsRegistration] = useState(false);

  useEffect(() => {
    if (user.id) {
      navigate("/main");
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleRegistration = async () => {
    if (form.username === "" || form.password === "") {
      alert("Zadané údaje nejsou platné");
      return;
    }
  
    // Query the database to check if the username already exists
    const querySnapshot = await getDocs(query(collection(db, "users"), where("username", "==", form.username)));
    if (!querySnapshot.empty) {
      alert("Uživatelské jméno již existuje. Zvolte prosím jiné.");
      return;
    }
  
    try {
      const docRef = await addDoc(collection(db, "users"), {
        username: form.username,
        password: CryptoJS.SHA256(form.password).toString(CryptoJS.enc.Hex),
        firstName: form.firstName,
        lastName: form.lastName,
        dates: [],
        groups: []
      });
      console.log("Document written with ID: ", docRef.id);
      alert("Registrace proběhla úspěšně, nyní se můžete přihlásit");
      // Reset stavu pro přihlášení
      setForm({ username: "", password: "", firstName: "", lastName: "" });
      setIsRegistration(false); // Vrátí uživatele zpět k přihlášení
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  

  return (
    <FullScreenColorContainer alignItems={"center"} justifyContent={"center"}>
      <Paper elevation={4}>
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          direction={"column"}
          spacing={2}
          padding={6}
        >
          <Typography>
            {isRegistration ? "Registrace" : "Přihlášení"}
          </Typography>
          <TextField
            name="username"
            label={"přihlašovací jméno"}
            onChange={handleInputChange}
            value={form.username}
          />
          <TextField
            name="password"
            label={"heslo"}
            type="password"
            onChange={handleInputChange}
            value={form.password}
          />
          {isRegistration && (
            <>
              <TextField
                name="firstName"
                label={"Jméno"}
                onChange={handleInputChange}
                value={form.firstName}
              />
              <TextField
                name="lastName"
                label={"Příjmení"}
                onChange={handleInputChange}
                value={form.lastName}
              />
            </>
          )}
          {isRegistration ? (
            <Button variant="contained" onClick={handleRegistration}>
              Registrovat
            </Button>
          ) : (
            <>
              <Button variant="contained" onClick={() => handleLogin(form.username, form.password).then((data) => data && setUser(data))}>
                Přihlásit
              </Button>
              <Button onClick={() => setIsRegistration(true)}>
                Založit účet
              </Button>
            </>
          )}
        </Stack>
      </Paper>
      alpha version: 20.5.2024
    </FullScreenColorContainer>
  );
};

export default LoginScreen;
