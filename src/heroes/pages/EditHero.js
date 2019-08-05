import React, { useState, useEffect, useContext } from "react";
import useReactRouter from "use-react-router";
import { heroContext } from "../hero-context";
import { useObserver } from "mobx-react-lite";

export default function EditHero() {
  const heroStore = useContext(heroContext);
  const [isSuccess, setIsSuccess] = useState(false);
  const { match, history } = useReactRouter();

  useEffect(() => {
    heroStore.getHeroById(match.params.id);
  }, []);

  const handleInputChange = ({ currentTarget: input }) => {
    const updatedHero = { ...heroStore.hero };
    const { name, value } = input;
    updatedHero[name] = value;
    heroStore.setHero(updatedHero);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    await heroStore.putHero(heroStore.hero);
    setIsSuccess(!isSuccess);
  };

  const handleBackButton = () => {
    history.goBack();
  };

  return useObserver(() => (
    <>
      <h2>Edit Hero</h2>
      {heroStore.isLoading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <div
            className="spinner-border"
            style={{
              width: "9rem",
              height: "9rem",
              color: "purple"
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
                  value={heroStore.hero.firstName}
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
                  value={heroStore.hero.lastName}
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
              value={heroStore.hero.house}
              onChange={handleInputChange}
              type="text"
              id="house"
              className="form-control"
            />
            <label className="mt-3">Known as</label>
            <input
              name="knownAs"
              value={heroStore.hero.knownAs}
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
  ));
}
