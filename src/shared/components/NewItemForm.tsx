import { Formik } from "formik";
import React, { useContext, useState } from "react";
import { RootStoreContext } from "../../store/root-store";
import { values } from "mobx";

const NewItemForm = ({}) => {
  const store = useContext(RootStoreContext);

  const [isShowNewItemForm, setIsShowNewItemForm] = useState(false);

  const showNewItemForm = () => {
    setIsShowNewItemForm(!isShowNewItemForm);
  };

  return (
    <>
      <section className="d-flex flex-row justify-content-start">
        <button
          onClick={showNewItemForm}
          type="button"
          className="btn btn-outline-success mx-1"
        >
          <span className="fas fa-plus  mr-2 my-lg-0" /> Add New
        </button>
        {isShowNewItemForm && (
          <button
            onClick={showNewItemForm}
            type="button"
            className="btn btn-outline-warning mx-1"
          >
            <span className="fas fa-chevron-left  mr-2 my-lg-0" /> Cancel
          </button>
        )}
      </section>
      {isShowNewItemForm && (
        <div className="card my-3" style={{ width: "auto" }}>
          <Formik
            initialValues={{
              id: "",
              firstName: "",
              lastName: "",
              house: "",
              knownAs: "",
            }}
            validationSchema={null}
            onSubmit={async (values) => {
              try {
                await store.heroStore.postHeroAction(values);
                setIsShowNewItemForm(!isShowNewItemForm);
              } catch (e) {
                console.log(e);
              }
            }}
          >
            {(formikProps) => (
              <form className="card-header" onSubmit={formikProps.handleSubmit}>
                <section className="d-flex flex-row">
                  <div className="mt-3 me-3 input-width">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      name="firstName"
                      id="firstName"
                      required
                      type="text"
                      onChange={formikProps.handleChange("firstName")}
                      className="form-control"
                    />
                  </div>
                  <div className="mt-3 ml-3 input-width">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      name="lastName"
                      id="lastName"
                      type="text"
                      onChange={formikProps.handleChange("lastName")}
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
                  onChange={formikProps.handleChange("house")}
                  className="form-control"
                />
                <label htmlFor="knownAs" className="mt-3">
                  Known as
                </label>
                <input
                  name="knownAs"
                  id="knownAs"
                  type="text"
                  onChange={formikProps.handleChange("knownAs")}
                  className="form-control"
                />
                <button type="submit" className="btn btn-success my-3">
                  <span className="fas fa-save me-2" />
                  Save
                </button>
              </form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default NewItemForm;
