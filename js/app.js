
window.onload = function constructUsers(){
	// Temporary hard-coding of users for testing.
	rupert = new User('rupert');
	jess = new User('jess');
	
	rupert.addUserToWall();
	jess.addUserToWall();

	$(".slider").hide();

	$(".slider").fadeIn("slow", function(){});

};

function User (theName) {
    this.name = theName;
    this.balance = 0;
    // this.quizScores = [];
    // this.currentScore = 0;
}

User.prototype = {
    constructor: User,
    showNameAndBalance:function ()  {
        var balance = "'s Balance is: "+this.balance;
        return this.name + balance;
    },
    replaceBalance:function (newBalance)  {
        this.balance = newBalance;
        return "New Balance Saved: " + this.balance;
    },
    getBalance:function ()  {
        return this.balance;
    },
    addUserToWall:function ()  {
        var panel = document.createElement('div');
		panel.className = 'col-md-12 slider';

		panel.innerHTML = '<div class="panel panel-warning"><div class="panel-heading"><h3 class="panel-title">'+
		this.name+'</h3></div><div class="panel-body"><h5> Balance: $<span id="'+this.name+'">'+this.balance+'</span></h5>';
		
		document.getElementById('usersActive').appendChild(panel);

    },
    updateBalance:function (amount){
		this.balance += (amount/2);
		// var refreshBalance = 
		document.getElementById(this.name).innerHTML = this.balance;
		// refreshBalance.innerHTML = this.balance;
		
		return "Updated balance is: "+this.balance;
		}
};

function addPurchase(form){
	
	//Form getter
	var newPurchaseToAdd = form.newPurchase.value;
	var newPurchaseName = form.newPurchaseName.value;
	var date = form.newDate.value;
	var buyer = form.buyerSelect.value;
	var notes = form.newPurchaseNote.value;

	//Total 
	var currentTotal = parseInt($('#total').text(), 10);
	console.log(currentTotal);
	//update total
	var newTotal = (parseFloat(currentTotal) + parseFloat(newPurchaseToAdd));
	// document.getElementById('total').innerHTML = newTotal;
	$('#total').html(newTotal);

	// updates debts for r and j
	updateDebts(buyer, newPurchaseToAdd);
	
	//displaying purchase to history
	appendPurchase(newPurchaseToAdd, newPurchaseName, buyer, date, notes);


}


function updateDebts(buyer, purchaseTotal){

	// Refactor this to work generically across any user
	if(buyer === 'rupert'){
		rupert.updateBalance(purchaseTotal);

		jess.updateBalance(-(purchaseTotal));
	}

	else{
		jess.updateBalance(purchaseTotal);
		rupert.updateBalance(-(purchaseTotal));

	}

	//Animate refresh
	$(".slider").slideUp("fast", function(){});
	$(".slider").slideDown("slow", function(){});
	updateDebtsDisplay();
}

function updateDebtsDisplay () {
	var displayDebtJess = document.getElementById('jessOwes');
	var displayDebtRupert = document.getElementById('rupertOwes');

	displayDebtJess.innerHTML = "Jess is owed: $"+jess.getBalance();
	displayDebtRupert.innerHTML = "Rupert is owed: $"+rupert.getBalance();
}



function appendPurchase(amount, name, buyer, date, note){
	//Construct the div
	var panel = document.createElement('div');
	panel.className = 'col-md-6';


	panel.innerHTML = '<div class="panel panel-info"><div class="panel-heading jhide"><h3 class="panel-title">'+name+'</h3></div><div class="panel-body"><h5> Value: $'+amount+'</h5><h5> Buyer: '+buyer+'</h5><h5> Date: '+date+'</h5><h5> Notes: '+note+'</h5></div></div>';

	//TODO add details here - purchaser, split with, date etc
	document.getElementById('previousPurchases').appendChild(panel);
	


	// $('.jhide').click(function(){
	// 	$(this).next('.panel-body').slideToggle(250);
	// 	// $(this).addClass('panelHidden');
	// });

}


