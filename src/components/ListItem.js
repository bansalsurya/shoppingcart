import React, { useState } from "react";

const ListItem = ({ value, setList, setItems, list }) => {
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
    setList(list);
    setItems(list.length);
    return list;
  };

  const increaseQuantity = (list, id) => {
    list.map((ele, i) => {
      if (ele.id === id) {
        ++ele.quantity;
        setList(list);
        setPrice(ele.quantity * ele.price);
        return list;
      }
      return i;
    });
    return list;
  };

  const decreaseQuantity = (list, id) => {
    list.map((ele, i) => {
      if (ele.id === id && ele.quantity > 1) {
        --ele.quantity;
        setList(list);
        setPrice(ele.quantity * ele.price);
        return list;
      }
      return i;
    });

    return list;
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
                deleteItem(list, value.id);
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
                const newlist = decreaseQuantity(list, value.id);
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
                const newlist = increaseQuantity(list, value.id);
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
