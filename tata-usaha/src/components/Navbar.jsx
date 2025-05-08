import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [admin, setAdmin] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem("adminData"));
    if (adminData) {
      setAdmin(adminData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("adminData");
    setAdmin(null);
    navigate("/");
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <NavLink to={"/"} className="btn btn-ghost text-xl">
            SMA JOMOK Kota Bekasi
          </NavLink>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink
                to={"/pendaftaran-murid-baru"}
                className="hover:bg-green-500 hover:text-white"
              >
                pendaftaran murid baru
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard"}
                className="hover:bg-green-500 hover:text-white"
              >
                dashboard
              </NavLink>
            </li>
            <li>
              <details>
                <summary>uang kas</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <a>Bayar SPP</a>
                  </li>
                  <li>
                    <a>UANG GEDUNG</a>
                  </li>
                </ul>
              </details>
            </li>
            {admin ? (
              <>
                <div className="flex items-center gap-2 ml-4">
                  <span className="text-sm font-semibold">
                    {admin.username || "Admin"}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="btn btn-error btn-sm"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                {" "}
                <NavLink to={"/login"} className="btn btn-primary rounded-lg">
                  Login
                </NavLink>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
