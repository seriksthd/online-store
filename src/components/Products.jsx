import React, { useEffect, useReducer } from "react";
import styled from "styled-components";
import { products } from "../utils/constants";
import { ProductsList } from "./ProductsList";

const initialState = {
  products,
  product: JSON.parse(localStorage.getItem("product")) || [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "addproduct":
      const newProduct = state.products.find(
        (item) => item.id === action.payload
      );
      const updatedProduct = { ...newProduct, amount: 1 };
      return {
        ...state,
        product: [...state.product, updatedProduct],
      };

    case "removeproduct":
      return {
        ...state,
        product: state.product.filter((item) => item.id !== action.payload),
      };

    case "increment":
      return {
        ...state,
        product: state.product.map((item) =>
          item.id === action.payload
            ? { ...item, amount: item.amount + 1 }
            : item
        ),
      };

    case "decrement":
      return {
        ...state,
        product: state.product.map((item) =>
          item.id === action.payload && item.amount > 0
            ? { ...item, amount: item.amount - 1 }
            : item
        ),
      };

    default:
      return state;
  }
};

export default function Products() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("product", JSON.stringify(state.product));
  }, [state.product]);

  console.log("state: ", state.product);

  const addproduct = (id) => {
    dispatch({ type: "addproduct", payload: id });
  };

  const removeproduct = (id) => {
    dispatch({ type: "removeproduct", payload: id });
  };

  const disabledAddButton = (id) => {
    return state.product.find((item) => item.id === id);
  };
  const increment = (id) => {
    dispatch({ type: "increment", payload: id });
  };
  const decrement = (id) => {
    dispatch({ type: "decrement", payload: id });
  };
  const disabledDecrementButton = (id) => {
    return state.product.find((item) => item.id === id && item.amount === 1);
  };

  const totalPrice = state.product.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );

  return (
    <div>
      <StyledSection>
        <section>
          <article className="article">
            {state.products.map((item) => (
              <div key={item.id} className="box">
                <img src={item.image} alt={item.title} />
                <h3>{item.title}</h3>
                <b>$ {item.price}</b>
                <button
                  onClick={() => addproduct(item.id)}
                  disabled={disabledAddButton(item.id)}
                >
                  add
                </button>
              </div>
            ))}
          </article>
        </section>
      </StyledSection>
      <ProductsList
        product={state.product}
        removeproduct={removeproduct}
        decrement={decrement}
        increment={increment}
        disabledDecrementButton={disabledDecrementButton}
        totalPrice={totalPrice}
      />
    </div>
  );
}
const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin-top: 30px;
  article {
    display: flex;
    gap: 60px;
  }
  .article {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    gap: 10px;
    border-radius: 10px;
    box-shadow: 0px 3px 14px 8px rgba(34, 60, 80, 0.21);
    img {
      width: 200px;
      height: 200px;
      object-fit: cover;
    }
    button {
      width: 100%;
      height: 30px;
      background-color: green;
      color: white;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      &:disabled {
        background-color: gray;
        cursor: not-allowed;
      }
    }
  }
`;
