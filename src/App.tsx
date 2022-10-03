import React, { useEffect } from 'react';
import './App.css';

function App() {

  var Data:any;

  useEffect(()=>{
    fetch("https://sellerapp20221003120442.azurewebsites.net/api/seller/GetAll")
    //fetch("http://localhost:15815/seller/show-bids")
    .then(response=>response.json())
    .then(res=> {
      var ddl:any = document.getElementById("products");
      ddl.innerHTML = "";
      var opt = document.createElement("option");
      opt.value = "-1";
      opt.textContent = "Select Product";
      ddl.appendChild(opt);    

      res.data.forEach(BindDDL); 
      Data = res.data;     
    })
  });

  return (
    <div className="App">
      <div className="Header">
          List of bid on products
      </div>
      <div className="Content">
        <select className="input-text" id="products">

        </select>
        <input type="button" value="Search" className="input-button" onClick={LoadBids}/>
      </div>
      <div className="Content">
        <table id="tblProduct">
          <tbody>
            <tr>
              <td>Product Name</td>
              <td><label id="ProductName"></label></td>
            </tr>
            <tr>
              <td>Short Description</td>
              <td><label id="ShortDescription"></label></td>
            </tr>
            <tr>
              <td>Detailed Description</td>
              <td><label id="DetailedDescription"></label></td>
            </tr>
            <tr>
              <td>Category</td>
              <td><label id="Category"></label></td>
            </tr>
            <tr>
              <td>Starting Price</td>
              <td><label id="StartingPrice"></label></td>
            </tr>
            <tr>
              <td>Bid End Date</td>
              <td><label id="BidEndDate"></label></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="Content">
      <table id="tblBid">
          <thead>
            <tr>
              <td>Bid Amount</td>
              <td>Name</td>
              <td>Email</td>
              <td>Phone</td>
            </tr>
          </thead>
          <tbody  id="tblBidBody">

          </tbody>
        </table>
      </div>
    </div>  
  );
  function BindDDL(item:any,index:any){

      var ddl:any = document.getElementById("products");
      var opt = document.createElement("option");
      opt.value = index;
      opt.textContent = item.productName;
      ddl.appendChild(opt);    
  }
  function FillBids(item:any,index:any){
    var tbody:any = document.getElementById("tblBidBody");
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");

    td1.innerHTML = item.bidAmount;
    td2.innerHTML = item.firstName +" "+item.lastName;
    td3.innerHTML = item.email;
    td4.innerHTML = item.phone;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tbody.appendChild(tr);    
}
  function LoadBids()
  {
    var ddl:any = document.getElementById("products");
    var value = ddl.value;
    
    var productName:any = document.getElementById("ProductName");
    var ShortDescription:any = document.getElementById("ShortDescription");
    var DetailedDescription:any = document.getElementById("DetailedDescription");
    var Category:any = document.getElementById("Category");
    var StartingPrice:any = document.getElementById("StartingPrice");
    var BidEndDate:any = document.getElementById("BidEndDate");
    
    if(value === "-1")
    {
      productName.innerHTML ="";
      ShortDescription.innerHTML = "";
      DetailedDescription.innerHTML = "";
      Category.innerHTML ="";
      StartingPrice.innerHTML = "";
      BidEndDate.innerHTML = "";  
    }
    else
    {
      productName.innerHTML =Data[value].productName;
      ShortDescription.innerHTML = Data[value].shortDescription;
      DetailedDescription.innerHTML = Data[value].detailedDescription;
      Category.innerHTML =Data[value].category;
      StartingPrice.innerHTML = Data[value].startingPrice;
      BidEndDate.innerHTML = Data[value].bidEndDate;
    }

    var tbody:any = document.getElementById("tblBidBody");
    tbody.innerHTML = "";
    Data[value].bids.forEach(FillBids);    
  }
}

export default App;
