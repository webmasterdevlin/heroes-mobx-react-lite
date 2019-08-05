import React, { useState, useEffect } from "react";
import { getVillainById, putVillain } from "../villain-service";
import useReactRouter from "use-react-router";

export default function EditVillain() {
  const [villain, setVillain] = useState({
    id: "",
    firstName: "",
    lastName: "",
    house: "",
    knownAs: ""
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const { match, history } = useReactRouter();

  useEffect(() => {
    onLoadData();
  }, []);

  const onLoadData = async () => {
    const { data } = await getVillainById(match.params.id);
    setVillain(data);
  };

  const handleInputChange = ({ currentTarget: input }) => {
    const updatedVillain = { ...villain };
    const { name, value } = input;
    updatedVillain[name] = value;
    setVillain(updatedVillain);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    await putVillain(villain);
    setIsSuccess(!isSuccess);
  };

  const handleBackButton = () => {
    history.goBack();
  };

  return (
    <>
      <h2>Edit Villain</h2>
      <div className="card my-3" style={{ width: "auto" }}>
        <form className="card-header" onSubmit={handleSubmit}>
          <section className="d-flex flex-row">
            <div className="mt-3 mr-3 input-width">
              <label htmlFor="firstName">First Name</label>
              <input
                name="firstName"
                value={villain.firstName}
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
                value={villain.lastName}
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
            value={villain.house}
            onChange={handleInputChange}
            type="text"
            id="house"
            className="form-control"
          />
          <label className="mt-3">Known as</label>
          <input
            name="knownAs"
            value={villain.knownAs}
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
  );
}
