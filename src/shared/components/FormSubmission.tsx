import React, { useState } from "react";
import { Formik } from "formik";

import { HeroModel } from "heroes/hero-types";
import { VillainModel } from "villains/villain-types";

type Props = {
  text: string;
  obj: HeroModel | VillainModel;
  handleSubmit: (obj: HeroModel | VillainModel) => Promise<void>;
};

const FormSubmission = ({ text, obj, handleSubmit }: Props) => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="card my-3" style={{ width: "auto" }}>
      <Formik
        enableReinitialize
        initialValues={obj}
        validationSchema={null}
        onSubmit={async (values, formikHelpers) => {
          try {
            await handleSubmit(values);
            setSubmitted(true);
          } catch (e) {
            console.log(e);
          }
        }}
      >
        {(formikProps) => (
          <form
            className="card-header"
            style={{ minWidth: "460px" }}
            onSubmit={formikProps.handleSubmit}
          >
            <div className="d-flex flex-column">
              <section className="form-group">
                <label htmlFor="firstName" className="me-4">
                  First Name
                </label>
                <input
                  placeholder="📛"
                  name="firstName"
                  id="firstName"
                  required
                  type="text"
                  value={formikProps.values.firstName}
                  onChange={formikProps.handleChange("firstName")}
                  className="form-control"
                />
              </section>
              <section className="form-group">
                <label htmlFor="lastName" className="me-4">
                  Last Name
                </label>
                <input
                  placeholder="📛"
                  name="lastName"
                  id="lastName"
                  type="text"
                  value={formikProps.values.lastName}
                  onChange={formikProps.handleChange("lastName")}
                  className="form-control"
                />
              </section>
              <section className="form-group">
                <label htmlFor="house" className="me-3">
                  House
                </label>
                <input
                  placeholder="🏠"
                  name="house"
                  id="house"
                  type="text"
                  value={formikProps.values.house}
                  onChange={formikProps.handleChange("house")}
                  className="form-control"
                />
              </section>
              <section className="form-group">
                <label htmlFor="knownAs" className="me-3">
                  Known as
                </label>
                <input
                  placeholder="👀"
                  name="knownAs"
                  id="knownAs"
                  type="text"
                  value={formikProps.values.knownAs}
                  onChange={formikProps.handleChange("knownAs")}
                  className="form-control"
                />
              </section>
            </div>
            <button
              type="submit"
              className="btn btn-success my-3"
              disabled={submitted}
            >
              <span className="fas fa-save me-2" />
              {text}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FormSubmission;
