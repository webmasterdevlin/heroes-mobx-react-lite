import React, { useEffect, useContext, useState } from "react";
import { observer } from "mobx-react-lite";

import FormSubmission from "components/FormSubmission";
import { RootStoreContext } from "store/rootStore";
import { HeroModel } from "features/heroes/heroTypes";

/* observer converts component into reactive component*/
const HeroesPage = observer(() => {
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
    <div className="mb-5">
      <div className="container-fluid mb-4">
        <h4>Heroes Page</h4>
        {editingTracker === "0" && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <FormSubmission
              text={"Create"}
              obj={heroValues}
              handleSubmit={store.heroStore.postHeroAction}
            />
          </div>
        )}
      </div>
      <div>
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
            {store.heroStore.heroes.map((h) => (
              <div key={h.id} className="card mt-3">
                {editingTracker === h.id ? (
                  <div
                    className="card-header"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <FormSubmission
                      text={"Update"}
                      obj={h}
                      handleSubmit={store.heroStore.putHeroAction}
                    />
                  </div>
                ) : (
                  <div className="card-header">
                    <h3 className="card-title">
                      {h.firstName} {h.lastName}
                    </h3>
                    <h5 className="card-subtitle mb-2 text-muted">{h.house}</h5>
                    <p className="card-text">{h.knownAs}</p>
                  </div>
                )}
                <section className="card-body">
                  <div>
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
        )}
      </div>
    </div>
  );
});

export default HeroesPage;
