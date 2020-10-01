import React from "react";

export default function NewItemForm({
  isShowNewItemForm,
  handleOnChange,
  handleOnSubmit,
  handleShowNewItemForm
}) {
  return (
    <>
      <section className="d-flex flex-row justify-content-start">
        <button
          onClick={handleShowNewItemForm}
          type="button"
          className="btn btn-outline-success mx-1"
        >
          <span className="fas fa-plus  mr-2 my-lg-0" /> Add New
        </button>
        {isShowNewItemForm && (
          <button
            onClick={handleShowNewItemForm}
            type="button"
            className="btn btn-outline-warning mx-1"
          >
            <span className="fas fa-chevron-left  mr-2 my-lg-0" /> Cancel
          </button>
        )}
      </section>
      {isShowNewItemForm && (
        <div className="card my-3" style={{ width: "auto" }}>
          <form className="card-header" onSubmit={handleOnSubmit}>
            <section className="d-flex flex-row">
              <div className="mt-3 mr-3 input-width">
                <label htmlFor="firstName">First Name</label>
                <input
                  name="firstName"
                  id="firstName"
                  required="required"
                  type="text"
                  onChange={handleOnChange}
                  className="form-control"
                />
              </div>
              <div className="mt-3 ml-3 input-width">
                <label htmlFor="lastName">Last Name</label>
                <input
                  name="lastName"
                  id="lastName"
                  type="text"
                  onChange={handleOnChange}
                  className="form-control"
                />
              </div>
            </section>
            <label htmlFor="house" className="mt-3">
              House
            </label>
            <input
              name="house"
              id="house"
              type="text"
              onChange={handleOnChange}
              className="form-control"
            />
            <label htmlFor="knownAs" className="mt-3">
              Known as
            </label>
            <input
              name="knownAs"
              id="knownAs"
              type="text"
              onChange={handleOnChange}
              className="form-control"
            />
            <button type="submit" className="btn btn-success mt-3">
              <span className="fas fa-save mr-2" />
              Save
            </button>
          </form>
        </div>
      )}
    </>
  );
}
