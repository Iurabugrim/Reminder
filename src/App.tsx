import { useState, useMemo } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import SET_LOGIN from "./redux/Action/loginAction";
import { useCookies } from "react-cookie";

const aunitificate = async (jwt: string) => {
  const data = await axios
    .get("/user/auth", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then(({ data }) => {
      return data;
    })
    .catch((e) => false);
  return data;
};

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useMemo(async () => {
    const token = await aunitificate(cookies.token);
    if (token) {
      setIsAuth(true);
      dispatch(SET_LOGIN());
    }
    setLoading(false);
  }, []);

  return (
    <>
      {!loading ? (
        <BrowserRouter>
          <main>
            <section className="container">
              <Routes>
                <Route
                  path="*"
                  element={<Navigate to={isAuth ? "/" : "/auth"} />}
                />

                {isAuth ? (
                  <Route path="/" element={<Home />} />
                ) : (
                  <Route path="/auth" element={<Auth />} />
                )}
              </Routes>
            </section>
          </main>
        </BrowserRouter>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default App;
