
let fomartMoney = (x) =>{
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
let MoneytoInt =(x)=>{
        return parseInt(x?.replaceAll(".",""))
}

export {fomartMoney,MoneytoInt}