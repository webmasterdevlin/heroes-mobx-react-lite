import React, { useState, useEffect, useContext } from "react";
import useReactRouter from "use-react-router";
import { villainContext } from "../villain-context";
import { useObserver } from "mobx-react-lite";

export default function EditVillain() {
  const villainStore = useContext(villainContext);
  const [isSuccess, setIsSuccess] = useState(false);
  const { match, history } = useReactRouter();

  useEffect(() => {
    villainStore.getVillainById(match.params.id);
  }, []);

  const handleInputChange = async ({ currentTarget: input }) => {
    const updatedVillain = { ...villainStore.villain };
    const { name, value } = input;
    updatedVillain[name] = value;
    await villainStore.setVillain(updatedVillain);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    await villainStore.putVillain(villainStore.villain);
    setIsSuccess(!isSuccess);
  };

  const handleBackButton = () => {
    history.goBack();
  };

  return useObserver(() => (
    <>
      <h2>Edit Villain</h2>
      <div className="card my-3" style={{ width: "auto" }}>
        <form className="card-header" onSubmit={handleSubmit}>
          <section className="d-flex flex-row">
            <div className="mt-3 mr-3 input-width">
              <label htmlFor="firstName">First Name</label>
              <input
                name="firstName"
                value={villainStore.villain.firstName}
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
                value={villainStore.villain.lastName}
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
            value={villainStore.villain.house}
            onChange={handleInputChange}
            type="text"
            id="house"
            className="form-control"
          />
          <label className="mt-3">Known as</label>
          <input
            name="knownAs"
            value={villainStore.villain.knownAs}
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
            className="btn btn-default mt-3"
          >
            Back
          </button>
        </form>
      </div>
      {isSuccess && (
        <div className="alert alert-success col-md-3" role="alert">
          This villain has been updated!
        </div>
      )}
    </>
  ));
}
