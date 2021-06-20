'use strict';

const main=document.getElementById('main');
const btnAddUser=document.getElementById('add-user');
const btnDouble=document.getElementById('double');
const btnFilter=document.getElementById('filter-rich');
const btnTotal=document.getElementById('total');
const btnSort=document.getElementById('sort');
//add user
//fetch random user from random user api
let data=[];


const getRandomUser=async function(){
    const response=await fetch('https://randomuser.me/api');
    const data=await response.json();
    const user=data.results[0];
// console.log(user);

const newUser={
    name:`${user.name.first} ${user.name.last}`,
    balance:Math.floor(Math.random()*100000),
};

addData(newUser);
};
//function update dom
const updateDOM=function(providedData=data){
    //clear main
    main.innerHTML=' <h2><strong>Name</strong>Balance</h2>';
    providedData.forEach(item =>{
   const element=document.createElement('div');
   element.classList.add('users');
   element.innerHTML=`<strong>${item.name}</strong>${item.balance}`;
   main.appendChild(element);
    });
  };
  const addData=function(obj){
      data.push(obj);
      updateDOM();
  };



function formatToCurrency(amount){
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,'$&,');
};
//double balance
const doubleBalance=function(){
 data=data.map(user =>{
     return{...user,balance:user.balance *2}
 });
 updateDOM();
};

const  filterRich=function(){
    data=data.filter((user)=> user.balance>75000);
    updateDOM();
};

const totalBalance=function(){
    const wealth=data.reduce((acc,user)=>(acc=acc+user.balance),0);

    const wealthE1=document.createElement('div');
    wealthE1.innerHTML=`<h3>Total Balance:<strong>${formatToCurrency(wealth)}</strong></h3>`;
    main.appendChild(wealthE1);
};
// console.log(data);

const sortItem=function(){
    const sorted=data.sort((user1,user2)=>user1.balance-user2.balance);
    updateDOM();
};
getRandomUser();
getRandomUser();

btnAddUser.addEventListener('click',getRandomUser);
btnDouble.addEventListener('click',doubleBalance);

btnFilter.addEventListener('click',filterRich);
btnTotal.addEventListener('click',totalBalance);
btnSort.addEventListener('click',sortItem)
