import React, { useEffect, useContext, useState } from "react";
import { observer } from "mobx-react-lite";

import FormSubmission from "../../shared/components/FormSubmission";
import { RootStoreContext } from "../../store/root-store";
import { HeroModel } from "../hero-types";

/* observer converts component into reactive component*/
const Heroes = observer(() => {
  /* Don't destructure. MobX observable are objects (and derives) only. When destructuring, any primitive variables will remain at latest values and won't be observable anymore. Use boxed observables to track primitive values exclusively or preferably pass a whole state object around.
 example:
 const { heroes,hero, getHeroes,  postHero, setHero,deleteHero,isLoading } = useContext(heroContext);*/
  const store = useContext(RootStoreContext);
  const [editingTracker, setEditingTracker] = useState("0");
  const [heroValues, setHeroValues] = useState<HeroModel>({
    id: "",
    firstName: "",
    lastName: "",
    house: "",
    knownAs: "",
  });

  useEffect(() => {
    store.heroStore.getHeroesAction().then();
  }, []); // empty array needed here

  const handleRemoveItem = async (id, name) => {
    const isConfirmed = window.confirm(`Delete ${name}?`);
    if (!isConfirmed) return;

    await store.heroStore.deleteHeroAction(id);
  };

  return (
    <>
      <div className="container-fluid">
        <h1>Heroes Works!</h1>
        {editingTracker === "0" && (
          <div
            style={{
              display: "flex",
              placeContent: "center",
              placeItems: "center",
            }}
          >
            <div className="mb-5">
              <FormSubmission
                text={"Create"}
                obj={heroValues}
                handleSubmit={store.heroStore.postHeroAction}
              />
            </div>
          </div>
        )}
      </div>
      <div className="card mt-3">
        {store.heroStore.isLoading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div
              className="spinner-border"
              style={{ width: " 6rem", height: "6rem", color: "purple" }}
              role="status"
            />
          </div>
        ) : (
          <div style={{ width: "auto" }}>
            <div className="card-header">
              {store.heroStore.heroes.map((h) => (
                <div key={h.id} className="mb-5">
                  {editingTracker === h.id ? (
                    <div
                      style={{
                        display: "flex",
                        placeContent: "center",
                        placeItems: "center",
                      }}
                    >
                      <div className="mb-5">
                        <FormSubmission
                          text={"Update"}
                          obj={h}
                          handleSubmit={store.heroStore.putHeroAction}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="card-title">
                        {h.firstName} {h.lastName}
                      </h3>
                      <h5 className="card-subtitle mb-2 text-muted">
                        {h.house}
                      </h5>
                      <p className="card-text">{h.knownAs}</p>
                    </>
                  )}
                  <section className="card-body">
                    <div className="row">
                      {editingTracker === h.id ? (
                        <button
                          className="btn btn-info card-link col text-center"
                          onClick={() => {
                            setEditingTracker("0");
                          }}
                        >
                          Cancel
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary card-link col text-center"
                          onClick={() => {
                            store.heroStore.setHeroAction(h);
                            setEditingTracker(h.id);
                          }}
                        >
                          Edit
                        </button>
                      )}
                      <button
                        className="btn btn-outline-danger card-link col text-center"
                        onClick={() => handleRemoveItem(h.id, h.firstName)}
                      >
                        Delete
                      </button>
                    </div>
                  </section>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
});
export default Heroes;
