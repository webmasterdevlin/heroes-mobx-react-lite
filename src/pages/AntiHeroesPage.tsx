import React, { useEffect, useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "store/rootStore";
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
import { AntiHeroModel } from "../features/antiHeroes/antiHeroTypes";

const AntiHeroesPage = observer(() => {
  const { antiHeroStore } = useContext(RootStoreContext);

  const smallScreen = useMediaQuery("(max-width:600px)");
  const classes = useStyles();

  /*local state*/
  const [counter, setCounter] = useState("0");

  useEffect(() => {
    fetchAntiHeroes();
  }, []);

  const fetchAntiHeroes = async () => {
    await antiHeroStore.getAntiHeroesAction();
  };

  const handleSoftDelete = (antiHero: AntiHeroModel) => {
    console.log("handleSoftDelete:", antiHero);
    antiHeroStore.softDeleteAntiHeroAction(antiHero);
  };

  const handleDelete = async (antiHeroId: string) => {
    await antiHeroStore.deleteAntiHeroAction(antiHeroId);
  };

  return (
    <div>
      <TitleBar title={"Anti HeroesPage"} />
      <FormSubmission postAction={antiHeroStore.postAntiHeroAction} />
      <UpdateUiLabel />
      <>
        {antiHeroStore.loading ? (
          <Typography variant={"h2"}>Loading.. Please wait..</Typography>
        ) : (
          antiHeroStore.antiHeroes.map((ah) => (
            <Box
              mb={2}
              role={"card"}
              key={ah.id}
              display={"flex"}
              flexDirection={smallScreen ? "column" : "row"}
              justifyContent={"space-between"}
            >
              <div>
                <Typography>
                  <span>{`${ah.firstName} ${ah.lastName} is ${ah.knownAs}`}</span>
                  {counter === ah.id && <span> - marked</span>}
                </Typography>
              </div>
              <div>
                <Button
                  className={classes.button}
                  onClick={() => setCounter(ah.id)}
                  variant={"contained"}
                  color={"default"}
                >
                  Mark
                </Button>{" "}
                <Button
                  className={classes.button}
                  variant={"contained"}
                  color={"secondary"}
                  onClick={() => handleSoftDelete(ah)}
                >
                  Remove
                </Button>{" "}
                <Button
                  className={classes.button}
                  variant={"outlined"}
                  color={"secondary"}
                  onClick={async () => await handleDelete(ah.id)}
                >
                  DELETE in DB
                </Button>
              </div>
            </Box>
          ))
        )}
      </>
      {antiHeroStore.antiHeroes.length === 0 && !antiHeroStore.loading && (
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
});

export default AntiHeroesPage;

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
