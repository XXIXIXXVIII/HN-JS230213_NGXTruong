import { useState } from "react";
import { productsData } from "../data/productsData";

function Page() {
  const [toSpend, setToSpend] = useState(128000000000);
  const [toltal, setToltal] = useState(0);
  const [menu, setMenu] = useState([]);

  

  const [countProduct, setCountProduct] = useState(() =>
    productsData.map((item) => {
      return { id: item.id, count: 0 };
    })
  );

  const handleAdd = (item, itemData) => {
    const newCount = [...item];
    const newCount1=newCount.find(item=>item.id===itemData.id)
    newCount1.count++
    setCountProduct(newCount);

    setToSpend(toSpend - itemData.price);
    if (menu.length === 0) {
      setMenu([...menu, itemData]);
    } else {
      if (menu.some((item) => item.id === itemData.id)) {
        setMenu([...menu]);
      } else {
        setMenu([...menu, itemData]);
      }
    }
    setToltal(toltal + itemData.price);
    // console.log(menu)
  };
  const handleInterest = (item, index, itemData) => {
    const newCount = [...item];
    const newCount1=newCount.find(item=>item.id===itemData.id)
    newCount1.count--
    setCountProduct(newCount);

    setToSpend(toSpend + itemData.price);
    setToltal(toltal - itemData.price);
  };
  const handleReset = () => {
    setToSpend(128000000000);
    setMenu([]);
    setToltal(0);
    setCountProduct(() =>
      productsData.map((item) => {
        return { id: item.id, count: 0 };
      })
    );
  };
  const handleAddMenu=(itemMenu)=>{
    const newCount=countProduct.find(item=>item.id===itemMenu.id)
    newCount.count++
    const newCountProduct=[...countProduct]
    const newCountProduct1= newCountProduct.filter(item=>item.id!==itemMenu.id)
    newCountProduct1.push(newCount)
    setCountProduct(newCountProduct1)
    setToltal(toltal + itemMenu.price);
  }
  const handleInterestMenu=(itemMenu)=>{
    const newCount=countProduct.find(item=>item.id===itemMenu.id)
    newCount.count--
    const newCountProduct=[...countProduct]
    const newCountProduct1= newCountProduct.filter(item=>item.id!==itemMenu.id)
    newCountProduct1.push(newCount)
    setCountProduct(newCountProduct1)
    setToltal(toltal - itemMenu.price);
  }


  return (
    <div className=" bg-gray-300">
      <div className="w-full h-14 font-light text-lg bg-red-500 fixed flex justify-center text-white [align-items:center] ">
        <span>
          To Spend
          <span className="font-bold text-xl mx-1">
            {new Intl.NumberFormat().format(toSpend)}
          </span>
          {toSpend === 128000000000
            ? "You Have Money"
            : "You Have a Lot of money"}
        </span>
      </div>
      <div className="p-20 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {productsData.map((item, index) => {
          return (
            <div key={item.id} className="bg-white">
              <img
                className="mb-5 h-[325px] w-[325px] object-cover mx-auto p-2  "
                src={item.image}
                alt="product"
              />
              <div className="flex justify-between font-bold px-3 mb-2">
                <span>{item.title}</span>
                <span>${item.price}</span>
              </div>
              <div className="w-full px-4  flex py-5">
                <button
                  className={`flex-grow h-10 rounded-l-lg border-2 border-red-500 ${
                    countProduct.find((i) => i.id === item.id).count === 0
                      ? "opacity-50 cursor-not-allowed pointer-events-none"
                      : "opacity-100 cursor-pointer"
                  }`}
                  onClick={() => handleInterest(countProduct, index, item)}
                >
                  Interest
                </button>
                <span className="w-1/5 h-10 flex text-center flex-col justify-center">
                  {countProduct.find((i) => i.id === item.id).count}
                </span>
                <button
                  className="w-1/5 h-10 rounded-r-lg bg-red-600"
                  onClick={() => handleAdd(countProduct, item)}
                >
                  Add
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {toltal !== 0 ? (
        <div className="bg-white w-[90%] mx-auto">
          <h3 className="text-center font-bold text-2xl my-5 text-red-600">
            Your Cart
          </h3>

          {menu.leng !== 0
            ? menu.map((itemMenu, index) => (
                <div
                  key={index}
                  className="flex justify-between w-[98%] mb-2 mx-auto px-4 bg-gray-300"
                >
                  <span>{itemMenu.title}</span>
                  <div>
                    <button onClick={()=>handleInterestMenu(itemMenu,index)} className={`bg-red-600 w-8 mr-3 rounded-lg ${countProduct.find((i) => i.id === itemMenu.id).count===0?"pointer-events-none":""}`}>-</button>
                    <span>
                      {countProduct.find((i) => i.id === itemMenu.id).count}
                    </span>
                    <button onClick={()=>handleAddMenu(itemMenu)} className="bg-red-600 w-8 ml-3 rounded-lg">+</button>
                  </div>
                </div>
              ))
            : "a"}
          <div className="flex justify-between w-[98%] mx-auto  mt-5">
            <span className="text-red-600 font-extrabold text-2xl">
              Total: ${Intl.NumberFormat().format(toltal)}
            </span>
            <button
              onClick={handleReset}
              className="bg-red-600 text-white rounded-l-xl py-2 px-5"
            >
              reset Cart
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Page;
