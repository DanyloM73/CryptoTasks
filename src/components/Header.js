function Header() {
    return(
        <header className="header">
          <div className="logo"> <div>Crypto</div>Tasks</div>
          <a href="#/" className="header-element">C чего начать</a>
          <a href="#/" className="header-element">Преимущества</a>
          <a href="#/" className="header-element">Топ</a>
          <a href="#/" className="header-element">Партнёрка</a>
          <div className="burger-menu">
            <input id="menu-toggle" type="checkbox" />
            <label className="menu-btn" htmlFor="menu-toggle">
              <span></span>
            </label>
            <div className="menu-list">
              <a href="#/" className="menu-element">C чего начать</a>
              <a href="#/" className="menu-element">Преимущества</a>
              <a href="#/" className="menu-element">Топ</a>
              <a href="#/" className="menu-element">Партнёрка</a>
            </div>
          </div>
        </header>
    )
}

export default Header;