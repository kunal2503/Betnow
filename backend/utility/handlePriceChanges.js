const handlePriceChanges =  (yesQuantity, noQuantity)=>{
    let MAX =  9.50;
    let MIN =  0.50;

    let totalQty = yesQuantity + noQuantity;
    let newYesAvg = totalQty / yesQuantity;
    let newNoAvg =  totalQty / noQuantity;
    

    console.log(totalQty);
    console.log(newYesAvg);
    console.log(newNoAvg);


}
handlePriceChanges(10,5)