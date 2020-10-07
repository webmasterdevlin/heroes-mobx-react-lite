import React, { useState, useEffect, useContext, FC } from "react";
import { observer } from "mobx-react-lite";
import { useHistory, useParams } from "react-router";
import { RootStoreContext } from "../../store/root-store";


type Props = {
  id: string
}
  /* observer converts component into reactive component*/
const EditHero:FC<Props> = observer(({id}) => {
  const store = useContext(RootStoreContext);
  const history = useHistory();

  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    store.heroes.getHeroById(id);
  }, []);

  const handleInputChange = async ({ currentTarget: input }) => {
    const updatedHero = { ...store.heroes.hero };
    const { name, value } = input;
    updatedHero[name] = value;
    await store.heroes.setHero(updatedHero);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await store.heroes.putHero(store.heroes.hero);
    setIsSuccess(!isSuccess);
  };

  const handleBackButton = () => {
    history.goBack();
  };


  return (
    <>
      <h2>Edit Hero</h2>
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
        <div className="card my-3" style={{ width: "auto" }}>
          <form className="card-header" onSubmit={handleSubmit}>
            <section className="d-flex flex-row">
              <div className="mt-3 mr-3 input-width">
                <label htmlFor="firstName">First Name</label>
                <input
                  name="firstName"
                  value={store.heroes.hero.firstName}
                  onChange={handleInputChange}
                  type="text"
                  id="firstName"
                  className="form-control"
                />
              </div>
              <div className="mt-3 ml-3 input-width">
                <label>Last Name</label>
                <input
                  name="lastName"
                  value={store.heroes.hero.lastName}
                  onChange={handleInputChange}
                  type="text"
                  id="lastName"
                  className="form-control"
                />
              </div>
            </section>
            <label className="mt-3">House</label>
            <input
              name="house"
              value={store.heroes.hero.house}
              onChange={handleInputChange}
              type="text"
              id="house"
              className="form-control"
            />
            <label className="mt-3">Known as</label>
            <input
              name="knownAs"
              value={store.heroes.hero.knownAs}
              onChange={handleInputChange}
              type="text"
              id="knownAs"
              className="form-control"
            />
            <button
              type="submit"
              disabled={isSuccess}
              className="btn btn-info mt-3"
            >
              Update
            </button>
            <button
              onClick={handleBackButton}
              type="button"
              className="btn btn-outline-info mt-3 ml-3"
            >
              Back
            </button>
          </form>
        </div>
      )}
      {isSuccess && (
        <div className="alert alert-success col-md-3" role="alert">
          This hero has been updated!
        </div>
      )}
    </>
  )
});
export default EditHero;
