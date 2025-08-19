import React, { useMemo } from "react";
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
import { SnackbarProvider } from "./context/SnackbarProvider";

const MainApp = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: { main: "#1565c0" },
          secondary: { main: "#ff7043" },
          background: {
            default: "#f4f6fb",
            paper: "#fff",
          },
        },
        shape: { borderRadius: 14 },
        typography: {
          fontFamily: "'Inter', 'Roboto', sans-serif",
          h4: { fontWeight: 700 },
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography
              variant={isMobile ? "h5" : "h4"}
              mb={2}
              color="primary"
              sx={{
                fontWeight: "bold",
                textShadow: "0px 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              Task Management
            </Typography>
          </Grid>

          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                width: { xs: "100%", sm: "auto" },
              }}
            >
              <TaskForm />
            </Grid>

            <Grid item xs={12} md={8}>
              <TaskList />
            </Grid>
          </Grid>
        </Container>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

const App = () => (
  <TaskProvider>
    <MainApp />
  </TaskProvider>
);

export default App;
