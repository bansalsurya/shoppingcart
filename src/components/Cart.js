import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";
import Bill from "./Bill";
import { data } from "../static/data.json";
import "../App.css";

const ColoredLine = ({ color, width }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 0.2,
    }}
  />
);

const addQuant = (dataset) => {
  dataset.map((ele, i) => {
    return (ele["quantity"] = 1);
  });
  return dataset;
};
export default function Cart() {
  //introduce quantity
  let newData = addQuant(data);
  const [list, setList] = useState(newData);
  const [items, setItems] = useState(newData.length);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [typediscount, setTypediscount] = useState(0);
  const [ordertotal, setOrdertotal] = useState(0);

  useEffect(() => {
    const changeTotal = (list) => {
      let newtotal = 0;
      list.map((ele, i) => {
        newtotal += ele.price * ele.quantity;
        return i;
      });
      return newtotal;
    };
    const changeDiscount = (list) => {
      let newdiscount = 0;

      list.map((ele, i) => {
        newdiscount += (ele.discount / 100) * ele.price * ele.quantity;
        return i;
      });
      return newdiscount;
    };
    const changeTypeDiscount = (list) => {
      let newtypediscount = 0;

      list.map((ele, i) => {
        if (ele.type === "fiction") {
          newtypediscount += 0.15 * ele.price * ele.quantity;
        }
        return i;
      });
      return newtypediscount;
    };

    return () => {
      setTotal(changeTotal(list));
      setDiscount(changeDiscount(list));
      setTypediscount(changeTypeDiscount(list));
    };
  }, [list]);

  useEffect(() => {
    setOrdertotal((prev) => prev + total - discount - typediscount);
  }, [total, discount, typediscount]);

  const List = ({ list, setList, setItems }) => {
    if (list.length === 0) return <div>No Items</div>;

    return list.map((value, index) => {
      return (
        <ListItem
          key={value.id}
          value={value}
          setList={setList}
          setItems={setItems}
          list={list}
        />
      );
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <h2>Order Summary</h2>
          {items === 0 && (
            <button
              style={{ border: "none", cursor: "pointer" }}
              onClick={() => {
                newData = addQuant(data);
                setList(newData);
                window.location.reload(false);
              }}
            >
              Reload
            </button>
          )}
          <ColoredLine color="#000000" />
          <div className="row">
            <div className="col-7 col-s-7">Items({items})</div>
            <div className="col-3 col-s-3">Qty</div>
            <div className="col-2 col-s-2">Price</div>
          </div>
          <ColoredLine color="#000000" />
          <List
            list={list}
            items={items}
            setList={setList}
            setItems={setItems}
          />
        </div>
        <div className="col-4">
          <Bill
            items={items}
            total={total}
            discount={discount}
            typediscount={typediscount}
            ordertotal={ordertotal}
          />
        </div>
      </div>
    </div>
  );
}
