import React, { useState, useEffect } from "react";

const ListItem = ({
  value,
  setList,
  setItems,
  list,
  setTotal,
  setDiscount,
  setTypediscount,
  setOrdertotal,
  total,
  discount,
  typediscount,
}) => {
  const [price, setPrice] = useState(value.price);

  const deleteItem = (list, id) => {
    let index = -1;

    list.map((ele, i) => {
      if (ele.id === id) {
        return (index = i);
      }
      return i;
    });

    if (index > -1) {
      console.log(list.splice(index, 1));
    }
    setItems(list.length);
    return list;
  };

  const increaseQuantity = (list, id) => {
    list.map((ele, i) => {
      if (ele.id === id) {
        ele.quantity++;
        setPrice(ele.quantity * ele.price);
      }
      return i;
    });
    return list;
  };

  const decreaseQuantity = (list, id) => {
    list.map((ele, i) => {
      if (ele.id === id && ele.quantity > 1) {
        ele.quantity--;
        setPrice(ele.quantity * ele.price);
      }
      return i;
    });
    return list;
  };

  const changeBill = (list) => {
    setTotal(0);
    setDiscount(0);
    setTypediscount(0);
    setOrdertotal(0);
    list.map((ele, i) => {
      setTotal((prev) => prev + ele.price * ele.quantity);
      setDiscount(
        (prev) => prev + (ele.discount / 100) * ele.price * ele.quantity
      );
      if (ele.type === "fiction") {
        setTypediscount((prev) => prev + 0.15 * ele.price * ele.quantity);
      }
      setOrdertotal((prev) => prev + total - discount - typediscount);
      return i;
    });
  };

  return (
    <div className="row">
      <div className="col-7 col-s-7">
        <div className="row">
          <div className="col-2 col-s-2">
            <img src={value.img_url} alt="" height="100%" width="100%" />
          </div>
          <div className="col-8 col-s-8">{value.name}</div>
          <div className="col-2 col-s-2">
            <button
              style={{ border: "none", background: "none", cursor: "pointer" }}
              onClick={() => {
                list = deleteItem(list, value.id);
                setList(list);
                return changeBill(list);
              }}
            >
              X
            </button>
          </div>
        </div>
      </div>
      <div className="col-3 col-s-3">
        <div className="row">
          <div className="col-3 col-s-3">
            <button
              style={{ border: "none", background: "none", cursor: "pointer" }}
              onClick={() => {
                list = decreaseQuantity(list, value.id);
                setList(list);
                return changeBill(list);
              }}
            >
              -
            </button>
          </div>
          <div className="col-6 col-s-5">{value.name}</div>
          <div className="col-3 col-s-3">
            <button
              style={{ border: "none", background: "none", cursor: "pointer" }}
              onClick={() => {
                list = increaseQuantity(list, value.id);
                setList(list);
                return changeBill(list);
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="col-2 col-s-2">{price}</div>
    </div>
  );
};
export default ListItem;
