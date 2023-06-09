import './NavBar.css'

const NavBar = () => {
    return (
        <nav className="navbar fixed-top bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Lorum Ipsum</a>
                <div id="navbarText">
                    <ul className="nav">
                        <li className="nav-item">
                            <a id="login"className="nav-link" aria-current="page" href="/login">Login</a>
                        </li>
                        <li className="nav-item">
                            <a id="register" className="nav-link" href="/registration">Register</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;