let assert = require("assert");
let settingsBill = require("../settings-bill");

describe('Settings Bill Widget', function() {

  it('when the user updates call to 2.00 and sets the criticalLevel to 20 and the warningLevel to 10, when the update button is pressed then all totals should be updated when the user selects call.', function() {
    // alert(SettingsBillFunc);
    var settings = settingsBill();
    settings.setCallCost(2.00);
    settings.setWarningLevel(10);
    settings.setCriticalLevel(20);
    settings.bill3('call');
    assert.equal(settings.callBill3(), 2.00);
    assert.equal(settings.totalBill3(), 2.00);
    assert.equal(settings.reachedWarningLevel(), false);
    assert.equal(settings.reachedCriticalLevel(), false);
  });

  it('when the user updates sms to 1.50 and sets the criticalLevel to 20 and the warningLevel to 10, when the update button is pressed then all totals should be updated when the user selects call.', function() {
    var settings = settingsBill();
    settings.setSmsCost(1.50);
    settings.setWarningLevel(10);
    settings.setCriticalLevel(20);
    settings.bill3('sms');
    assert.equal(settings.smsBill3(), 1.50);
    assert.equal(settings.totalBill3(), 1.50);
    assert.equal(settings.reachedWarningLevel(), false);
    assert.equal(settings.reachedCriticalLevel(), false);
  });

  it('when the user updates sms to 3.50 , call to 0 and sets the criticalLevel to 4 and the warningLevel to 2, when the update button is pressed then should add nothing for calls when call is selected',function(){

    var settings = settingsBill();
    settings.setSmsCost(3.50);
    settings.setCallCost(0.00);
    settings.setWarningLevel(2);
    settings.setCriticalLevel(4);
    settings.bill3('sms');
    assert.equal(settings.smsBill3(),3.50);
    settings.bill3('call');
    assert.equal(settings.callBill3(),0);
    assert.equal(settings.totalBill3(),3.50);
    assert.equal(settings.reachedWarningLevel(),true);
    assert.equal(settings.reachedCriticalLevel(),false);
  });
  it('when the user updates call and sms to 0 and sets the criticalLevel to 40 and the warningLevel to 20, when the update button is pressed then should add nothing for both calls and sms when call or sms is selected',function(){

    var settings = settingsBill();
    settings.setSmsCost(0.00);
    settings.setCallCost(0.00);
    settings.setWarningLevel(20);
    settings.setCriticalLevel(40);
    settings.bill3('sms');
    assert.equal(settings.smsBill3(),0.00);

    settings.bill3('call');
    assert.equal(settings.callBill3(),0);
  });
  it('should be able to count till warningLevel = 10 when there are eleven calls at 2.00 and two smses at 0.75',function(){
    var settings = settingsBill();

    settings.setCallCost(2.00);
    settings.setSmsCost(0.75);
    settings.setWarningLevel(20);
    settings.setCriticalLevel(30);
    settings.bill3('call');
    settings.bill3('call');
    settings.bill3('call');
    settings.bill3('call');
    settings.bill3('call');
    settings.bill3('call');
    settings.bill3('call');
    settings.bill3('call');
    settings.bill3('call');
    settings.bill3('call');
    settings.bill3('call');
    settings.bill3('sms');
    settings.bill3('sms');

    assert.equal(settings.callBill3(),22.00);
    assert.equal(settings.smsBill3(),1.50);
    assert.equal(settings.totalBill3(),23.50);

    assert.equal(settings.reachedWarningLevel(),true);
    assert.equal(settings.reachedCriticalLevel(),false);
  });
  it('should be able to count till criticalLevel = 3 when there are five calls at 2.00 and two smses at 0.75',function(){
    var settings = settingsBill();

    settings.setCallCost(1.00);
    settings.setSmsCost(0.75);
    settings.setCriticalLevel(3);

    settings.bill3('call');
    settings.bill3('call');
    settings.bill3('sms');
    settings.bill3('sms');

    assert.equal(settings.callBill3(),2.00);
    assert.equal(settings.smsBill3(),1.50);
    assert.equal(settings.totalBill3(),3.50);
    assert.equal(settings.reachedCriticalLevel(),true);

    //when a user changes the Critical level then it should update
    settings.setCriticalLevel(10);

    settings.bill3('call');
    settings.bill3('call');
    settings.bill3('sms');
    settings.bill3('sms');

    assert.equal(settings.callBill3(),4.00);
    assert.equal(settings.smsBill3(),3.00);
    assert.equal(settings.totalBill3(),7.00);
    assert.equal(settings.reachedCriticalLevel(),false);
  });
});
