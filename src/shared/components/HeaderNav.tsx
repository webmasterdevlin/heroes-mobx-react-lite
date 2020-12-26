import React, { useState, useContext } from "react";
import { observer, useObserver } from "mobx-react-lite";
import { RootStoreContext } from "../../store/root-store";
import { Link } from "react-router-dom";

const HeaderNav = observer(() => {
  const store = useContext(RootStoreContext);
  const [navIsCollapse, setNavIsCollapse] = useState(true);

  const toggleNavBar = () => {
    setNavIsCollapse(!navIsCollapse);
  };

  return useObserver(() => (
    <nav className="sticky-top navbar navbar-expand-lg navbar-light bg-light mb-5">
      <div className="container-fluid">
        <span className="navbar-brand me-5">
          <Link className="nav-link" to="/">
            <li className="fas fa-cube" />
            React Tour of Heroes
          </Link>
        </span>
        <button
          onClick={toggleNavBar}
          className="navbar-toggler"
          type="button"
          data-toggle=" collapse"
          data-target="#navbarSupportedContent"
          aria-controls=" navbarSupportedContent"
          aria-expanded="false"
          aria-label=" Toggle navigation"
        >
          <span className=" navbar-toggler-icon" />
        </button>
        <div
          className={
            navIsCollapse ? "collapse navbar-collapse" : "navbar-collapse"
          }
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-5">
            <li className="nav-item">
              <Link className="nav-link" to="/heroes">
                Heroes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/villains">
                Villains
              </Link>
            </li>
          </ul>

          <span className="me-5" style={{ color: "purple", fontSize: "24px" }}>
            Total heroes: {store.heroStore.totalHeroesAction}
          </span>
          <span className="me-5" style={{ color: "purple", fontSize: "24px" }}>
            Total villains: {store.villainStore.totalVillainsAction}
          </span>
          <span className="me-5" style={{ color: "purple", fontSize: "24px" }}>
            Last Edited Hero: {store.heroStore.hero.firstName}
          </span>
          <span className="me-5" style={{ color: "purple", fontSize: "24px" }}>
            Last Edited Villain: {store.villainStore.villain.firstName}
          </span>
        </div>
      </div>
    </nav>
  ));
});

export default HeaderNav;
