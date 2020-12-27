import React, { useState, useContext } from "react";
import { observer, useObserver } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { RootStoreContext } from "store/rootStore";

const HeaderNav = observer(() => {
  const { antiHeroStore, heroStore } = useContext(RootStoreContext);
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
              <Link className="nav-link" to="/anti-heroes">
                AntiHeroes
              </Link>
            </li>
          </ul>

          <span className="me-5" style={{ color: "purple" }}>
            Total heroes: {heroStore.totalHeroesAction}
          </span>
          <span className="me-5" style={{ color: "purple" }}>
            Total anti-heroes: {antiHeroStore.totalAntiHeroesAction}
          </span>
          <span className="me-5" style={{ color: "purple" }}>
            Last Edited Hero: {heroStore.hero.firstName}
          </span>
          <span className="me-5" style={{ color: "purple" }}>
            Last Edited AntiHero: {antiHeroStore.antiHero.firstName}
          </span>
        </div>
      </div>
    </nav>
  ));
});

export default HeaderNav;
