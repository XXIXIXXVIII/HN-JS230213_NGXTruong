import { useState } from "react";
import { productsData } from "../data/productsData";

function Page() {
  const [toSpend, setToSpend] = useState(128000000000);
  const [countProduct, setCountProduct] = useState(() =>
    productsData.map((item) => {
      return { id: item.id, count: 0 };
    })
  );

  const handleAdd = (item, index, item1) => {
    const newCount = [...item];
    newCount[index].count++;
    setCountProduct(newCount);
    setToSpend(toSpend-item1.price)
  };
  const handleInterest = (item, index,item1) => {
    const newCount = [...item];
    newCount[index].count--;
    setCountProduct(newCount);
    setToSpend(toSpend+item1.price)
  };
  
  return (
    <div className=" bg-gray-300">
      <div className="w-full h-14 font-light text-lg bg-red-500 fixed flex justify-center text-white [align-items:center] ">
        <span>
          To Spend{" "}
          <span className="font-bold text-xl">
            {new Intl.NumberFormat().format(toSpend)}
          </span>{" "}
          You Have Money
        </span>
      </div>
      <div className="p-20 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {productsData.map((item, index) => {
          return (
            <div key={item.id} className="bg-white">
              <img
                className="mb-5 max-h-[325px] object-cover  "
                src={item.image}
                alt="product"
              />
              <div className="flex justify-between font-bold px-3 mb-2">
                <span>{item.title}</span>
                <span>${item.price}</span>
              </div>
              <div className="w-full px-4  flex py-5">
                <button
                  className="flex-grow h-10 rounded-l-lg border-2 border-red-500"
                  onClick={() => handleInterest(countProduct,index,item)}
                >
                  Interest
                </button>
                <span className="w-1/5 h-10 flex text-center flex-col justify-center">
                  {countProduct.find((i)=>i.id===item.id).count}
                </span>
                <button
                  className="w-1/5 h-10 rounded-r-lg bg-red-600"
                  onClick={() => handleAdd(countProduct, index,item)}
                >
                  Add
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-white w-[90%] mx-auto">
        <h3 className="text-center font-bold text-2xl my-5 text-red-600">
          Your Cart
        </h3>
        <div className="flex justify-between w-[98%] mb-2 mx-auto px-4 bg-gray-300">
          <span>Messi</span>
          <span>5</span>
        </div>
        <div className="flex justify-between w-[98%] mx-auto  mt-5">
          <span className="text-red-600 font-extrabold text-2xl">
            Total: $123123
          </span>
          <button className="bg-red-600 text-white rounded-l-xl py-2 px-5">
            reset Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
