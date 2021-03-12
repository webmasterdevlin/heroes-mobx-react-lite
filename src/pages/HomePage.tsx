import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";

const HomePage = () => {
  return (
    <Container>
      <Box
        width={"100%"}
        display={"flex"}
        flex={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography variant={"h2"}>
          Welcome to Mobx React Lite 🧑‍🏫 💻
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
