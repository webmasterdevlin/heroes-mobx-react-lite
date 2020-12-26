import React, { useEffect, useContext, useState } from "react";
import FormSubmission from "../../shared/components/FormSubmission";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../store/root-store";
import { VillainModel } from "../villain-types";

/* observer converts component into reactive component*/
const Villains = observer(() => {
  /* Don't destructure. MobX observable are objects (and derives) only. When destructuring, any primitive variables will remain at latest values and won't be observable anymore. Use boxed observables to track primitive values exclusively or preferably pass a whole state object around.
example:
const {villains, villain, getVillains} = useContext(villainContext);
*/
  const store = useContext(RootStoreContext);
  const [editingTracker, setEditingTracker] = useState("0");
  const [villainValues, setVillainValues] = useState<VillainModel>({
    id: "",
    firstName: "",
    lastName: "",
    house: "",
    knownAs: "",
  });

  useEffect(() => {
    store.villainStore.getVillainsAction().then();
  }, []); // empty array needed here

  const handleRemoveItem = async (id, name) => {
    const isConfirmed = window.confirm(`Delete ${name}?`);
    if (!isConfirmed) return;

    await store.villainStore.deleteVillainAction(id);
  };

  return (
    <>
      <div className="container-fluid">
        <h1>Villains Works!</h1>
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
                obj={villainValues}
                handleSubmit={store.villainStore.postVillainAction}
              />
            </div>
          </div>
        )}
      </div>
      <div className="card mt-3">
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
          <div style={{ width: "auto" }}>
            <div className="card-header">
              {store.villainStore.villains.map((v) => (
                <div key={v.id} className="mb-5">
                  {editingTracker === v.id ? (
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
                          obj={v}
                          handleSubmit={store.villainStore.putVillainAction}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="card-title">
                        {v.firstName} {v.lastName}
                      </h3>
                      <h5 className="card-subtitle mb-2 text-muted">
                        {v.house}
                      </h5>
                      <p className="card-text">{v.knownAs}</p>
                    </>
                  )}
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
    </>
  );
});
export default Villains;
