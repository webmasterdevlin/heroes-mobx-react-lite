import React, { useEffect, useContext } from "react";
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

  useEffect(() => {
    store.villainStore.getVillainsAction().then();
  }, []); // empty array needed here

  const removeItem = async (id, name) => {
    const isConfirmed = window.confirm(`Delete ${name}?`);
    if (!isConfirmed) return;

    await store.villainStore.deleteVillainAction(id);
  };

  return (
    <>
      <NewItemForm />
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
            style={{
              width: "9rem",
              height: "9rem",
              color: "purple",
            }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        store.villainStore.villains.map((item) => (
          <div key={item.id} className="card mt-3" style={{ width: "auto" }}>
            <div className="card-header">
              <h3 className="card-title">
                {item.firstName} {item.lastName}
              </h3>
              <h5 className="card-subtitle mb-2 text-muted">{item.house}</h5>
              <p className="card-text">{item.knownAs}</p>
            </div>
            <section className="card-body">
              <div className="row">
                <Link
                  to={`/edit-villain/${item.id}`}
                  className="btn btn-primary card-link col text-center"
                >
                  <span className="fas fa-edit  mr-2" />
                  Edit
                </Link>
                <button
                  onClick={() => removeItem(item.id, item.firstName)}
                  className="btn btn-outline-danger card-link col text-center"
                >
                  <span className="fas fa-eraser  mr-2" />
                  Delete
                </button>
              </div>
            </section>
          </div>
        ))
      )}
    </>
  );
});
export default Villains;
