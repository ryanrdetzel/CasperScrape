/* Proof of concept */
var casper = require('casper').create();

var snapshot = 0;
function debugSnapshot(message){
  /* Saves a screenshot of the page to see what the bot sees */
  casper.capture('jcrew' + (snapshot++) + '.png', {
        top: 0,
        left: 0,
        width: 1024,
        height: 2000
  });
  casper.echo(message);
}

var url = 'https://www.jcrew.com/mens_category/polostees/brokeninjerseytees/PRD~72977/99102149736/72977.jsp?N=21+16&Nbrd=J&Nloc=en_US&Nrpp=48&Npge=1&Nsrt=3&isFromSale=true&isSaleItem=true&isNewSearch=true';

casper.start(url, function() {
    this.echo(this.getTitle());
});

casper.thenClick('a.add-item', function(){
  debugSnapshot("Clicked on add item")
});

casper.thenClick('#viewShoppingBagButton', function(){
  debugSnapshot("Clicking on cart")
});

/* Apply promotion */
casper.thenClick('#hasPromo',function() {
  this.fill('#summary-promo-form', {
    promotionCode: 'HEYSPRING'
  }, false);
  this.evaluate(function(){
    //__utils__.echo("executing js directly on the page");
    CheckOutPage.applyDiscount('promoApply');
  });
});

casper.waitForText("off your purchase", function(){
  this.echo("Wait for page to load");
});

casper.then(function(){
  debugSnapshot("Apply promo");
});

casper.thenClick('#button-checkout', function(){
  debugSnapshot("Checkout");
});

// TODO: Check the total price to make sure it's correct before we continue
// TODO: Fill out the form with user information and submit.
casper.run();
