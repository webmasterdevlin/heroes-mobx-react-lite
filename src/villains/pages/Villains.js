import React, { useState, useEffect } from "react";
import NewItemForm from "../../shared/components/NewItemForm";
import { postVillain, getVillains, deleteVillain } from "../villain-service";
import { Link } from "react-router-dom";

export default function Villains() {
  const [villain, setVillain] = useState({
    villain: {
      id: "",
      firstName: "",
      lastName: "",
      house: "",
      knownAs: ""
    }
  });
  const [villains, setVillains] = useState([villain]);
  const [isShowNewItemForm, setIsShowNewItemForm] = useState(false);

  useEffect(() => {
    onLoadData();
  }, []);

  const onLoadData = async () => {
    const { data } = await getVillains();
    setVillains(data);
  };

  const showNewItemForm = () => {
    setIsShowNewItemForm(!isShowNewItemForm);
  };
  const onChange = ({ currentTarget: input }) => {
    const newVillain = { ...villain };
    const { name, value } = input;
    newVillain[name] = value;
    setVillain(newVillain);
  };

  const onSubmit = async event => {
    event.preventDefault();
    try {
      const { data: addedVillain } = await postVillain(villain);
      const newSetOfVillains = [...villains, addedVillain];
      setVillains(newSetOfVillains);
      setIsShowNewItemForm(!isShowNewItemForm);
    } catch (e) {
      alert(e.message);
      throw e;
    }
  };

  const removeItem = async (id, name) => {
    const isConfirmed = window.confirm(`Delete ${name}?`);
    if (!isConfirmed) return;

    try {
      await deleteVillain(id);
      const newSetOfVillains = villains.filter(villain => villain.id !== id);
      setVillains(newSetOfVillains);
    } catch (e) {
      alert(e.message);
      throw e;
    }
  };
  return (
    <>
      <NewItemForm
        isShowNewItemForm={isShowNewItemForm}
        handleOnChange={onChange}
        handleOnSubmit={onSubmit}
        handleShowNewItemForm={showNewItemForm}
      />
      {villains.map(item => (
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
              <button
                onClick={() => removeItem(item.id, item.firstName)}
                className="btn btn-outline-danger card-link col text-center"
              >
                <span className="fas fa-eraser  mr-2" />
                Delete
              </button>
              <Link
                to={`/edit-villain/${item.id}`}
                className="btn btn-outline-primary card-link col text-center"
              >
                <span className="fas fa-edit  mr-2" />
                Edit
              </Link>
            </div>
          </section>
        </div>
      ))}
    </>
  );
}
