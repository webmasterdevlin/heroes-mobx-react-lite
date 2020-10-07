import React, { useState, useEffect, useContext } from "react";
import NewItemForm from "../../shared/components/NewItemForm";
import { Link } from "@reach/router";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../store/root-store";

  /* observer converts component into reactive component*/
const Heroes = observer(() => {
  /* Don't destructure. MobX observable are objects (and derivatives) only. When destructuring, any primitive variables will remain at latest values and won't be observable anymore. Use boxed observables to track primitive values exclusively or preferably pass a whole state object around.
   example:
   const { heroes,hero, getHeroes,  postHero, setHero,deleteHero,isLoading } = useContext(heroContext);*/
  const store = useContext(RootStoreContext);

  const [isShowNewItemForm, setIsShowNewItemForm] = useState(false);

  useEffect(() => {
    store.heroes.getHeroes().then();
  }, []); // empty array needed here

  const showNewItemForm = () => {
    setIsShowNewItemForm(!isShowNewItemForm);
  };
  const onChange = ({ currentTarget: input }) => {
    const newHero = { ...store.heroes.hero };
    const { name, value } = input;
    newHero[name] = value;
    store.heroes.setHero(newHero);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    store.heroes.postHero(store.heroes.hero).then();
    setIsShowNewItemForm(!isShowNewItemForm);
  };

  const removeItem = async (id, name) => {
    const isConfirmed = window.confirm(`Delete ${name}?`);
    if (!isConfirmed) return;

    await store.heroes.deleteHero(id);
  };

  return (
    <>
      <NewItemForm
        isShowNewItemForm={isShowNewItemForm}
        handleOnChange={onChange}
        handleOnSubmit={onSubmit}
        handleShowNewItemForm={showNewItemForm}
      />
      {store.heroes.isLoading ? (
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
        store.heroes.heroes.map((item) => (
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
                  to={`/edit-hero/${item.id}`}
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
)});
export default Heroes;
