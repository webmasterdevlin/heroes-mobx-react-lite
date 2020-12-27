import React, { useContext } from "react";
import { observer, useObserver } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { RootStoreContext } from "store/rootStore";

const HeaderNav = observer(() => {
  const { antiHeroStore, heroStore } = useContext(RootStoreContext);

  return useObserver(() => (
    <nav className="sticky-top navbar navbar-expand-lg navbar-light bg-light mb-5">
      <div className="container-fluid">
        <span className="navbar-brand me-5">
          <Link className="nav-link" to="/">
            <li className="fas fa-database me-1" />
            Mobx 6 Course
          </Link>
        </span>

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
    </nav>
  ));
});

export default HeaderNav;
