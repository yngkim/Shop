import Col from "react-bootstrap/Col";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Card(props) {
  let navigate = useNavigate();
  let url =
    "https://codingapple1.github.io/shop/shoes" +
    (props.shoes[props.i].id + 1) +
    ".jpg";
  return (
    <Col xs={6} md={4}>
      <img
        src={url}
        width="80%"
        //이미지를 클릭하면 정렬에 상관없이 해당 제품의 id에 맞는 상세 페이지로 이동
        onClick={() => {
          navigate("/detail/" + (props.shoes[props.i].id + 1));
          //최근 본 상품 localstorage의 recent에 추가
          let getArr = JSON.parse(localStorage.getItem("recent"));
          getArr.push(props.shoes[props.i].id + 1);
          localStorage.setItem("recent", JSON.stringify(getArr));
        }}
      ></img>
      <h4>{props.shoes[props.i].title}</h4>
      <p>{props.shoes[props.i].content}</p>
      <p>{props.shoes[props.i].price}</p>
    </Col>
  );
}

export default Card;
