import React from "react";

export default function Bill({
  items,
  total,
  discount,
  typediscount,
  ordertotal,
}) {
  return (
    <div>
      <div className="row">
        <div className="col-12"></div>
        <div className="col-12"></div>
      </div>
      <div className="row" style={{}}>
        <div className="col-12">
          <h3>Total</h3>
        </div>
        <div className="col-12">
          <div className="row">
            <div className="col-6 col-s-6"> Items({items})</div>
            <div className="col-6 col-s-6"> : ${total}</div>
          </div>
        </div>

        <div className="col-12">
          <div className="row">
            <div className="col-6 col-s-6"> Discount</div>
            <div className="col-6 col-s-6"> : -${discount}</div>
          </div>
        </div>

        <div className="col-12">
          <div className="row">
            <div className="col-6 col-s-6"> Type Discount</div>
            <div className="col-6 col-s-6"> : -${typediscount}</div>
          </div>
        </div>

        <div className="col-12">
          <div className="row">
            <div className="col-6 col-s-6"> Order Total</div>
            <div className="col-6 col-s-6">: ${ordertotal}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
