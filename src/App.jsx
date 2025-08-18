import React from "react";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { TaskProvider, useTaskContext } from "./context/TaskContext";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Loading from "./components/Loading";

const theme = createTheme({
  palette: {
    primary: { main: "#1565c0" },
    secondary: { main: "#ff7043" },
    background: { default: "#f4f6fb" },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    h4: { fontWeight: 700 },
  },
});

const MainApp = () => {
  const { state } = useTaskContext();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          mb={4}
          align="center"
          color="primary"
          sx={{ fontWeight: "bold", textShadow: "0px 1px 3px rgba(0,0,0,0.1)" }}
        >
          Task Management
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TaskForm />
          </Grid>

          <Grid item xs={12} md={8}>
            {state.loading ? <Loading /> : <TaskList />}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <TaskProvider>
      <MainApp />
    </TaskProvider>
  );
};
export default App;
