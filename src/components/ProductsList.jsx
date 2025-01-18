import styled from "styled-components";

export const ProductsList = ({
  product,
  removeproduct,
  increment,
  decrement,
  disabledDecrementButton,
  totalPrice,
}) => {
  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {product?.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                <img src={item.image} alt={item.title} />
              </td>
              <td>{item.title}</td>
              <td>{item.price}$</td>
              <td style={{ width: "298px" }}>
                <QuantityControl>
                  <button
                    // disabled={item.amount === item.stock}
                    className="incBtn"
                    onClick={() => increment(item.id)}
                  >
                    +
                  </button>

                  <button
                    // disabled={item.amount === item.stock}
                    className="decBtn"
                    onClick={() => decrement(item.id)}
                    disabled={() => disabledDecrementButton(item.id)}
                  >
                    -
                  </button>
                </QuantityControl>
                <span>{item.amount}</span>
              </td>
              <td style={{ width: "277px" }}>
                <RemoveButton onClick={() => removeproduct(item.id)}>
                  Remove
                </RemoveButton>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <h2>Total Price: {totalPrice}</h2>
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 50px;
`;

const StyledTable = styled.table`
  width: 95%;
  border-collapse: collapse;
  border: 1px solid #ccc;

  thead {
    background-color: #f5f5f5;
  }

  th,
  td {
    padding: 10px;
    text-align: center;
    border: 1px solid #ddd;
  }

  tr:hover {
    background-color: #f9f9f9;
  }

  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  button {
    width: 30px;
    height: 30px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
  .decBtn {
    &:disabled {
      background-color: gray;
      cursor: not-allowed;
    }
  }

  span {
    width: 20px;
    text-align: center;
    font-weight: bold;
  }
`;

const RemoveButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #cc0000;
  }
`;
