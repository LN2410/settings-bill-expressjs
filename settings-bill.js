var moment = require('moment');
module.exports = function SettingsBillFunc() {

  var callCost = 0;
  var smsCost = 0;
  var warningLevel = 0;
  var criticalLevel = 0;
  var stampMap = [];

  // create a variables that will keep track of all three totals.
  var callCostTotal = 0;
  var smsCostTotal = 0;
  var totalCostThree = 0;

  function settingsBillCalc(billType) {
    if (totalCostThree < criticalLevel) {
      if (billType === "call") {
        callCostTotal += callCost;
      } else if (billType === "sms") {
        smsCostTotal += smsCost;
      }
        totalCostThree = smsCostTotal + callCostTotal;
        storeTime(billType);
    }
    else {

    }
  }

  function getCall3() {
    return callCostTotal.toFixed(2)
  }

  function getCall(){
    return callCost
  }

  function getSms3() {
    return smsCostTotal.toFixed(2)
  }

  function getSms(){
    return smsCost
  }

  function getWarning(){
    return warningLevel
  }

  function getCritical(){
    return criticalLevel
  }

  function getTotal3() {
    return totalCostThree.toFixed(2)
  }
  function getStamp() {
    for (var i = 0; i < stampMap.length; i++) {
      let mom = moment(stampMap[i].time).fromNow();
      stampMap[i].ago = mom;
    }
    return stampMap
  }

  function setCallCost(textboxcall){
    callCost = parseFloat(textboxcall);
  }
  function setSmsCost(textboxsms){
    smsCost = parseFloat(textboxsms);
  }
  function setWarningLevel(textboxwarning){
    warningLevel = parseFloat(textboxwarning);
  }
  function setCriticalLevel (textboxcritical){
    criticalLevel = parseFloat(textboxcritical);
  }

  function reachedWarningLevel(){
    return totalCostThree > warningLevel && totalCostThree < criticalLevel;
  }

  function reachedCriticalLevel(){
    return totalCostThree >= criticalLevel;
  }

  function storeTime(value){
    let d = new Date();

    if (value === "call") {
      stampMap.unshift(
        {
          type: "call",
          price: getCall(),
          time: d
        }
      )
    }
    else if (value === "sms") {
      stampMap.unshift(
        {
          type: "sms",
          price: getSms(),
          time: d
        }
      )
    }
  }
  function filter(value){
    let temp = [];
    for (var i = 0; i < stampMap.length; i++) {
      if(stampMap[i].type === value){
        temp.push(stampMap[i]);
      }
    }
    return temp;
  }
  function reset() {
    callCost = 0;
     smsCost = 0;
     warningLevel = 0;
     criticalLevel = 0;
     stampMap = [];
     callCostTotal = 0;
     smsCostTotal = 0;
     totalCostThree = 0;

  }
  return {
    setCallCost,
    setSmsCost,
    setWarningLevel,
    setCriticalLevel,
    bill3: settingsBillCalc,
    callBill3: getCall3,
    smsBill3: getSms3,
    totalBill3: getTotal3,
    reachedCriticalLevel,
    reachedWarningLevel,
    getCall,
    getSms,
    getWarning,
    getCritical,
    storeTime,
    getStamp,
    filter,
    reset
  }
};
