import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { GiTireIronCross } from "react-icons/gi";
import { MdHistory } from "react-icons/md";
import { VscMenu } from "react-icons/vsc";
import axios from "axios";
import Popup from "./Popup";

const Header = () => {
  // props = { userName, onLogout }
  const [showPopup, setShowPopup] = useState(false);
  const [googleError, setgoogleError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isMenubarOpen, setIsMenuBarOpen] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem("user");
    const userDetails = JSON.parse(data);
    setUserInfo(userDetails);
  }, []);
  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then(async (resp) => {
        console.log(resp);
        await axios.post(`${import.meta.env.VITE_BACKEND_URI}/auth/google-login`, {
          email: resp?.data?.email,
          name: resp?.data?.name,
          picture: resp?.data?.picture,
        });
        sessionStorage.setItem("user", JSON.stringify(resp?.data));
      })
      .catch((error) => setgoogleError(error))
      .finally(() => {
        window.location.reload();
        setShowPopup(false);
      });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: googleError,
  });
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <header className="bg-white shadow-sm py-2">
      <div className="mx-auto px-5 flex items-center justify-between">
        {/* Logo */}
        <Link to={`/`} className="flex items-center bg-black p-1 pr-2 rounded">
          <span className="text-yellow-300 font-bold tracking-tight text-2xl">
            🛩TRai
          </span>
        </Link>

        {/* User Info & Logout */}
        <div className="md:block hidden">
          <div className="flex items-center space-x-4">
            {userInfo && <span><Link className="text-gray-400 flex flex-row items-center gap-1 font-medium" to={`/history`}><MdHistory /> History</Link></span>}
            {userInfo && (
              <span className="flex flex-row items-center gap-2">
                <span className="w-5 h-5 rounded-full overflow-hidden">
                  <img
                    className="w-full h-full"
                    src={userInfo?.picture}
                    alt={userInfo?.name}
                    referrerPolicy="no-referrer"
                  />
                </span>
                <span className="text-orange-600 font-medium">{userInfo?.name}</span>
              </span>
            )}
            {userInfo ? (
              <button
                onClick={handleLogout}
                className="bg-orange-600 hover:bg-yellow-300 text-white hover:text-black hover:border px-4 py-2 rounded-lg transition duration-20"
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={() => setShowPopup(true)}
                className="bg-black hover:bg-yellow-300 text-white hover:text-black hover:border px-4 py-2 rounded-lg transition duration-20"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
        <div className="md:hidden block">
          <button
            className="text-orange-600 font-bold"
            onClick={() => setIsMenuBarOpen(!isMenubarOpen)}
          >
            {isMenubarOpen ? <GiTireIronCross /> : <VscMenu />}
          </button>
        </div>
      </div>
      <div className={`md:hidden ${isMenubarOpen ? "block" : "hidden"}`}>
        <ul className="w-full gap-2 mt-2 bg-orange-600 p-2">
          {userInfo && <li><Link className="text-white flex flex-row items-center gap-1 text-lg py-1 border-b-2 border-b-white" to={`/history`}><MdHistory /> History</Link></li>}
          {userInfo && (
            <li className="flex flex-row items-center gap-2 py-2 border-b-2 border-b-white">
              <span className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  className="w-full h-full"
                  src={userInfo?.picture}
                  alt={userInfo?.name}
                  referrerPolicy="no-referrer"
                />
              </span>
              <span className="text-white font-medium">{userInfo?.name}</span>
            </li>
          )}
          {userInfo ? (
            <li className="py-1 border-b-2 border-b-white">
            <button
              onClick={handleLogout}
              className="bg-white hover:bg-yellow-300 text-orange-600 hover:text-black hover:border px-4 py-2 rounded-lg transition duration-20"
            >
              Log Out
            </button>
            </li>
          ) : (
            <li className="py-1 border-b-2 border-b-white">
            <button
              onClick={() => setShowPopup(true)}
              className="bg-black hover:bg-yellow-300 text-white hover:text-black hover:border px-4 py-2 rounded-lg transition duration-20"
            >
              Sign in
            </button>
            </li>
          )}
        </ul>
      </div>
      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        login={login}
      />
    </header>
  );
};

export default Header;
