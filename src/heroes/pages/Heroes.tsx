import React, { useEffect, useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import NewItemForm from "../../shared/components/NewItemForm";
import { RootStoreContext } from "../../store/root-store";

/* observer converts component into reactive component*/
const Heroes = observer(() => {
  /* Don't destructure. MobX observable are objects (and derives) only. When destructuring, any primitive variables will remain at latest values and won't be observable anymore. Use boxed observables to track primitive values exclusively or preferably pass a whole state object around.
 example:
 const { heroes,hero, getHeroes,  postHero, setHero,deleteHero,isLoading } = useContext(heroContext);*/
  const store = useContext(RootStoreContext);

  const [editingTracker, setEditingTracker] = useState("0");

  useEffect(() => {
    store.heroStore.getHeroesAction().then();
  }, []); // empty array needed here

  const handleRemoveItem = async (id, name) => {
    const isConfirmed = window.confirm(`Delete ${name}?`);
    if (!isConfirmed) return;

    await store.heroStore.deleteHeroAction(id);
  };

  return (
    <div className="card-header">
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
        <div className="card mt-3" style={{ width: "auto" }}>
          <div>
            {store.heroStore.heroes.map((h) => (
              <div key={h.id} className="card-header">
                <h3 className="card-title">
                  {h.firstName} {h.lastName}
                </h3>
                <h5 className="card-subtitle mb-2 text-muted">{h.house}</h5>
                <p className="card-text">{h.knownAs}</p>
                <section className="card-body">
                  <div className="row">
                    {editingTracker === h.id ? (
                      <button
                        className="btn btn-info card-link col text-center"
                        onClick={() => setEditingTracker("0")}
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary card-link col text-center"
                        onClick={() => setEditingTracker(h.id)}
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
  );
});
export default Heroes;
