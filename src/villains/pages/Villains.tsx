import React, { useEffect, useContext, useState } from "react";
import NewItemForm from "../../shared/components/NewItemForm";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../store/root-store";
import { Link } from "react-router-dom";

/* observer converts component into reactive component*/
const Villains = observer(() => {
  /* Don't destructure. MobX observable are objects (and derives) only. When destructuring, any primitive variables will remain at latest values and won't be observable anymore. Use boxed observables to track primitive values exclusively or preferably pass a whole state object around.
example:
const {heroes, hero, getVillains} = useContext(villainContext);
*/
  const store = useContext(RootStoreContext);

  const [editingTracker, setEditingTracker] = useState("0");

  useEffect(() => {
    store.villainStore.getVillainsAction().then();
  }, []); // empty array needed here

  const handleRemoveItem = async (id, name) => {
    const isConfirmed = window.confirm(`Delete ${name}?`);
    if (!isConfirmed) return;

    await store.villainStore.deleteVillainAction(id);
  };

  return (
    <div className="card-header">
      {store.villainStore.isLoading ? (
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
            {store.villainStore.villains.map((v) => (
              <div key={v.id} className="card-header">
                <h3 className="card-title">
                  {v.firstName} {v.lastName}
                </h3>
                <h5 className="card-subtitle mb-2 text-muted">{v.house}</h5>
                <p className="card-text">{v.knownAs}</p>
                <section className="card-body">
                  <div className="row">
                    {editingTracker === v.id ? (
                      <button
                        className="btn btn-info card-link col text-center"
                        onClick={() => setEditingTracker("0")}
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary card-link col text-center"
                        onClick={() => setEditingTracker(v.id)}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="btn btn-outline-danger card-link col text-center"
                      onClick={() => handleRemoveItem(v.id, v.firstName)}
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
export default Villains;
