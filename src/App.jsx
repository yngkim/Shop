import { useEffect, useState } from "react";

import "./App.css";
import data from "./data.js";
import axios from "axios";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";
import Card from "./components/Card";
import Detail from "./components/Detail";
// import Darknav from "./components/Darknav.jsx";
import Cart from "./components/Cart.jsx";
import { useQuery } from "react-query";

function App() {
  useEffect(() => {
    if (!localStorage.getItem("recent")) {
      localStorage.setItem("recent", JSON.stringify([]));
    } else {
    }
  }, []);

  let [shoes, setShoes] = useState(data);

  //원래 로드 횟수 처음에 1인데 setstate가 늦게 작동해서 2로바꿈
  let [load, setLoad] = useState(2);
  let [isMore, setIsMore] = useState(true);
  let [isLoading, setIsLoading] = useState(false);

  useQuery("username", () => {
    return axios
      .get("https://codingapple1.github.io/userdata.json")
      .then((a) => {
        return a.data;
      });
  });

  return (
    <>
      <Darknav />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="main-bg"></div>
                <button
                  className="moreBtn"
                  onClick={() => {
                    let cpy = [...shoes];
                    cpy.sort((a, b) => a.title.localeCompare(b.title));
                    setShoes(cpy);
                  }}
                >
                  A-Z sort
                </button>
                <Row className="merch">
                  {shoes.map((a, i) => {
                    return <Card shoes={shoes} i={i} key={i}></Card>;
                  })}
                </Row>
                {isLoading === true ? (
                  <div className="loading">로딩중...</div>
                ) : null}
                {isMore === false ? (
                  <div className="alert alert-warning">더 로드할 수 없음</div>
                ) : null}
                <button
                  className="moreBtn"
                  onClick={() => {
                    setIsLoading(true);
                    let cpy = load;
                    cpy += 1;
                    setLoad(cpy);
                    let url =
                      "https://codingapple1.github.io/shop/data" +
                      load +
                      ".json";
                    let data2 = axios
                      .get(url)
                      .then((res) => {
                        setIsLoading(false);
                        let cpy = [...shoes, ...res.data];
                        setShoes(cpy);
                      })
                      .catch(() => {
                        setIsLoading(false);
                        setIsMore(false);
                        console.log("실패함ㅅㄱ");
                      });
                  }}
                >
                  더보기
                </button>
              </>
            }
          />

          <Route path="/detail/:id" element={<Detail shoes={shoes} />} />

          <Route path="/about" element={<About />}>
            <Route path="member" element={<div>뭐</div>} />
            <Route path="location" element={<div>어디</div>} />
          </Route>

          <Route path="/cart" element={<Cart></Cart>} />

          <Route path="*" element={<div>You're not supposed to be here</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

function About() {
  return (
    <div>
      <Link to="/about/member">Members</Link>
      <div></div>
      <Link to="/about/location">location</Link>

      <Outlet></Outlet>
    </div>
  );
}

function Darknav() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container className="nav">
        <Navbar.Brand href="/">weSellCraps</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/detail">Detail</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/cart">Cart</Nav.Link>
          <Nav className="ms-auto">
            {result.isLoding ? "로딩중" : result.data.name}
          </Nav>
        </Nav>
      </Container>
    </Navbar>
  );
}
