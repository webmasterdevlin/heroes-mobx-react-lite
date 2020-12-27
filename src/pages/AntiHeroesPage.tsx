import React, { useEffect, useContext, useState } from "react";
import { observer } from "mobx-react-lite";

import FormSubmission from "components/FormSubmission";
import { RootStoreContext } from "store/rootStore";
import { AntiHeroModel } from "features/antiHeroes/antiHeroTypes";

/* observer converts component into reactive component*/
const AntiHeroesPage = observer(() => {
  /* Don't destructure. MobX observable are objects (and derives) only. When destructuring, any primitive variables will remain at latest values and won't be observable anymore. Use boxed observables to track primitive values exclusively or preferably pass a whole state object around.
example:
const {antiHeroes, antiHero, getAntiHeroes} = useContext(antiHeroContext);
*/
  const { antiHeroStore } = useContext(RootStoreContext);
  const [editingTracker, setEditingTracker] = useState("0");
  const [antiHeroValues, setAntiHeroValues] = useState<AntiHeroModel>({
    id: "",
    firstName: "",
    lastName: "",
    house: "",
    knownAs: "",
  });

  useEffect(() => {
    antiHeroStore.getAntiHeroesAction().then();
  }, []); // empty array needed here

  const handleRemoveItem = async (id, name) => {
    const isConfirmed = window.confirm(`Delete ${name}?`);
    if (!isConfirmed) return;

    await antiHeroStore.deleteAntiHeroAction(id);
  };

  return (
    <div className="mb-5">
      <div className="container-fluid mb-4">
        <h4>Anti Heroes Page</h4>
        {editingTracker === "0" && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <FormSubmission
              text={"Create"}
              obj={antiHeroValues}
              handleSubmit={antiHeroStore.postAntiHeroAction}
            />
          </div>
        )}
      </div>
      <div>
        {antiHeroStore.isLoading ? (
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
            {antiHeroStore.antiHeroes.map((ah) => (
              <div key={ah.id} className="card mt-3">
                {editingTracker === ah.id ? (
                  <div
                    className="card-header"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <FormSubmission
                      text={"Update"}
                      obj={ah}
                      handleSubmit={antiHeroStore.putAntiHeroAction}
                    />
                  </div>
                ) : (
                  <div className="card-header">
                    <h3 className="card-title">
                      {ah.firstName} {ah.lastName}
                    </h3>
                    <h5 className="card-subtitle mb-2 text-muted">
                      {ah.house}
                    </h5>
                    <p className="card-text">{ah.knownAs}</p>
                  </div>
                )}
                <section className="card-body">
                  <div>
                    {editingTracker === ah.id ? (
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
                          antiHeroStore.setAntiHeroAction(ah);
                          setEditingTracker(ah.id);
                        }}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="btn btn-outline-danger card-link col text-center"
                      onClick={() => handleRemoveItem(ah.id, ah.firstName)}
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
export default AntiHeroesPage;
