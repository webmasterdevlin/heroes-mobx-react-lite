import React, { useEffect, useState } from "react";
import TitleBar from "components/TitleBar";
import UpdateUiLabel from "components/UpdateUiLabel";

import {
  Box,
  Button,
  createStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import FormSubmission from "components/FormSubmission";

const VillainsPage = () => {
  const loading = false;
  const villains = [];

  const classes = useStyles();
  const smallScreen = useMediaQuery("(max-width:600px)");

  /*local state*/
  const [counter, setCounter] = useState("0");

  return (
    <div>
      <TitleBar title={"Super VillainsPage"} />
      <FormSubmission />
      <UpdateUiLabel />
      <>
        {loading ? (
          <Typography variant={"h2"}>Loading.. Please wait..</Typography>
        ) : (
          villains.map((v) => (
            <Box
              key={v.id}
              role={"card"}
              mb={2}
              display={"flex"}
              flexDirection={smallScreen ? "column" : "row"}
              justifyContent={"space-between"}
            >
              <Typography>
                <span>{`${v.firstName} ${v.lastName} is ${v.knownAs}`}</span>
                {counter === v.id && <span> - marked</span>}
              </Typography>
              <div>
                <Button
                  className={classes.button}
                  variant={"contained"}
                  color={"default"}
                >
                  Mark
                </Button>{" "}
                <Button
                  className={classes.button}
                  variant={"contained"}
                  color={"secondary"}
                >
                  Remove
                </Button>{" "}
                <Button
                  className={classes.button}
                  variant={"outlined"}
                  color={"secondary"}
                >
                  DELETE in DB
                </Button>
              </div>
            </Box>
          ))
        )}
      </>
      {villains.length === 0 && !loading && (
        <Button
          className={classes.button}
          variant={"contained"}
          color={"primary"}
    
        >
          Re-fetch
        </Button>
      )}
    </div>
  );
};

export default VillainsPage;

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      margin: "0 0.5rem",
      "&:focus": {
        outline: "none",
      },
    },
  })
);
