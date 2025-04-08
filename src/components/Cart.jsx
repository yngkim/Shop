import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { addOne, subtractOne, agePlusOne, deleteCart } from "./store.js";
import { memo, useState } from "react";

//Child = memo(function(){....}) => Child의 props가 변경될 때만 재랜더링
//없으면 밑에 state 변수인 count 변경될때마다 재랜더링됨
//근데 기존 props와 현재 Props를 비교하는 작업이 추가되기 떄문에 남발 ㄴㄴ
//state 변경할때마다 재랜더링하기 무거운 컴포넌트에만 적용

//비슷한 useMemo는 컴포넌트 랜더링 시 1회만 실행해줌
let Child = memo(function () {
  console.log("재랜더링됨");
  return <div>Child</div>;
});

function Cart() {
  let state = useSelector((state) => {
    return state;
  });
  console.log(state.userCart);
  let dispatch = useDispatch();
  let [count, setCount] = useState(0);

  return (
    <div>
      <Child></Child>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>

      <button
        onClick={(state) => {
          dispatch(agePlusOne());
        }}
      >
        떡국
      </button>
      <button
        onClick={() => {
          //   let cpy = [...state.userCart];
          //   cpy.sort((a, b) => a.title.localeCompare(b.name));
          //   state.userCart = cpy;
          // }
        }}
      >
        abc 정렬(구현안됨)
      </button>
      <div>
        {state.userName.name}의 장바구니 / {state.userName.age}살
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
            <th>제거하기</th>
          </tr>
        </thead>
        <tbody>
          {state.userCart.map((a, i) => {
            return (
              <tr key={i}>
                <td>{state.userCart[i].id}</td>
                <td>{state.userCart[i].name}</td>
                <td>{state.userCart[i].count}</td>
                <td>
                  {
                    // onclick에 넣을때 {() => {여기}} 에다가 안넣고 바로 {여기} 에다넣으면 개지랄함 ㄹㅇ
                    // dispatch(변경함수()) 가 함수가 아니고 object로 돼서 그런듯
                  }
                  <button
                    onClick={() => {
                      dispatch(addOne(state.userCart[i].id));
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      dispatch(subtractOne(state.userCart[i].id));
                    }}
                  >
                    -
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(deleteCart(state.userCart[i].id));
                    }}
                  >
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
