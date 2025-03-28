import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Nav from "react-bootstrap/Nav";

import { addCart } from "./store.js";
import { useDispatch, useSelector } from "react-redux";

let OrderBtn = styled.button`
  background : ${(props) => props.bg};
  color : ${(props) => props.color};
  padding ; 10px;
  `;

function Detail(props) {
  let state = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch();
  //Detail 컴포넌트가 mount, update(ex. 컴포넌트 안에서 state 변경) 시 실행
  //useEffect는 html이 렌더링 된 후 실행되기 떄문에 시간이 오래 걸리는 작업에서 코드를 순차적으로 실행하는 js에 비해 유연함
  // 어렵거나 시간이 오래 걸리는 작업(연산, 서버에서 데이터 가져오는, 타이머 등)은 useEffect에

  //2초후에 할인 알림이 사라지는 코드
  let [isSale, setIsSale] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      let cpy = isSale;
      cpy = false;
      setIsSale(cpy);
    }, 2000);
    return () => {};
  }, []);

  // depandency([]) 를 추가하지 않으면 mount시 및 update 될 때마다 useEffect 실행
  // 빈 dependency를 추가하면 mount될때만 useEffect 실행
  // [count] 등의 실행조건을 추가하면 count가 변경될떄마다 useEffect 실행

  //정리
  // useEffect(() => {})  -> mount,update마다 실행
  // useEffect(() => {}, []) -> mount시 1회 실행
  // useEffect(() => {}, [?] ) -> ?가 변경될때마다 실행
  // useEffect(() => {}, return() => {이것}) -> '이것'  unmount시 1회 실행
  // useEffect(() => {}, return() => {클린업코드 / useEffect 실행 전 실행}) -> ㅇㅇ

  let [input, setInput] = useState("");
  let [isNumber, setIsNumber] = useState(true);
  let [tabNum, setTabNum] = useState(1);

  useEffect(() => {
    if (input === "") {
      setIsNumber(true);
    } else if (/^[0-9]+$/.test(input)) {
      setIsNumber(true);
    } else {
      setIsNumber(false);
    }
  }, [input]);

  let { id } = useParams();

  id -= 1;
  //useparams의id와 shoes.id가 일치하는 객체 x를 shoes 배열에서 찾아서 product에 저장 -> find 메서드
  let product = props.shoes.find((x) => x.id === parseInt(id));

  if (!product) {
    return <div>존재하지 않는 상품입니다.</div>;
  }

  let url =
    "https://codingapple1.github.io/shop/shoes" + (product.id + 1) + ".jpg";

  let [fades, setFades] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setFades("end");
    }, 10);
    return () => {
      setFades("");
    };
  }, []);

  return (
    <>
      <div className={"start " + fades}>
        <div className="container">
          {isSale === true ? (
            <div className="alert alert-warning">2초안에 사면 할인</div>
          ) : null}

          {isNumber === false ? (
            <div className="alert alert-warning">숫자만 입력하세요;</div>
          ) : null}

          <div className="row">
            <div className="col-md-6">
              <img src={url} width="100%" />
            </div>
            <div className="col-md-6">
              <h4 className="pt-5">{product.title}</h4>
              <p>{product.content}</p>
              <p>{product.price}원</p>

              <input
                placeholder="수량"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              ></input>

              <OrderBtn
                bg="black"
                color="white"
                onClick={() => {
                  dispatch(
                    addCart({
                      id: parseInt(id),
                      name: product.title,
                      count: parseInt(input),
                    })
                  );
                  console.log(state.userCart);
                }}
              >
                주문하기
              </OrderBtn>
            </div>
          </div>
        </div>

        <Nav justify variant="tabs" defaultActiveKey="link-1" className="tab">
          <Nav.Item>
            <Nav.Link
              eventKey="link-1"
              onClick={() => {
                setTabNum(1);
              }}
            >
              1번탭임
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link-2"
              onClick={() => {
                setTabNum(2);
              }}
            >
              2번탭임
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link-3"
              onClick={() => {
                setTabNum(3);
              }}
            >
              3번탭임
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab tabNum={tabNum}></Tab>
      </div>
    </>
  );
}

export default Detail;

function Tab(props) {
  let [fade, setFade] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 10);
    return () => {
      setFade("");
    };
  }, [props.tabNum]);

  return (
    <div className={"tab2 start " + fade}>
      {
        [<div>내용1111</div>, <div>내용222222</div>, <div>내용33333</div>][
          props.tabNum - 1
        ]
      }
    </div>
  );
}
