import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router";
import { observer } from "mobx-react-lite";
import { Formik } from "formik";

import { RootStoreContext } from "../../store/root-store";

/* observer converts component into reactive component*/
const EditHero = observer(() => {
  const store = useContext(RootStoreContext);
  const { id } = useParams<{ id: string }>();
  const [isSuccess, setIsSuccess] = useState(false);
  const history = useHistory();

  useEffect(() => {
    store.heroStore.getHeroByIdAction(id);
  }, []);

  const handleBackButton = () => {
    history.goBack();
  };

  return (
    <>
      <h2>Edit Hero</h2>
      <div className="card my-3" style={{ width: "auto" }}>
        <Formik
          enableReinitialize
          initialValues={store?.heroStore?.hero}
          validationSchema={null}
          onSubmit={async (values) => {
            try {
              await store.heroStore.putHeroAction(values);
              setIsSuccess(!isSuccess);
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
                    type="text"
                    id="firstName"
                    className="form-control"
                    value={formikProps.values?.firstName}
                    onChange={formikProps.handleChange("firstName")}
                  />
                </div>
                <div className="mt-3 ml-3 input-width">
                  <label>Last Name</label>
                  <input
                    name="lastName"
                    type="text"
                    id="lastName"
                    className="form-control"
                    value={formikProps.values?.lastName}
                    onChange={formikProps.handleChange("lastName")}
                  />
                </div>
              </section>
              <label className="mt-3">House</label>
              <input
                name="house"
                type="text"
                id="house"
                className="form-control"
                value={formikProps.values?.house}
                onChange={formikProps.handleChange("house")}
              />
              <label className="mt-3">Known as</label>
              <input
                name="knownAs"
                type="text"
                id="knownAs"
                className="form-control"
                value={formikProps.values?.knownAs}
                onChange={formikProps.handleChange("knownAs")}
              />
              <button
                type="submit"
                disabled={isSuccess}
                className="btn btn-info mt-3 me-3"
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
          )}
        </Formik>
      </div>

      {isSuccess && (
        <div className="alert alert-success col-md-3" role="alert">
          This hero has been updated!
        </div>
      )}
    </>
  );
});
export default EditHero;
