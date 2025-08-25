

const handlePriceChanges =  (yesQuantity, noQuantity)=>{
    let MAX =  9.50;
    let MIN =  0.50;
    let BASEPRICE = 5;

    let totalQty = yesQuantity + noQuantity;
    let newYesAvg =  yesQuantity / totalQty;
    let newNoAvg =  noQuantity / totalQty;
    

    console.log(BASEPRICE / newYesAvg);
    console.log(BASEPRICE / newNoAvg);
    


}
handlePriceChanges(100,5)