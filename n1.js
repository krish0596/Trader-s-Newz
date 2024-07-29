const response = fetch("http://localhost:5000/stock/buy", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ userId: 1,stockId: "masft", amount: 10 ,price:'100.0'}),
})
.then((data)=>{
    console.log(data);
})
.catch((e)=>{
    console.log(e)
})
