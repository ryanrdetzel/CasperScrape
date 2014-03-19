var casper = require('casper').create({
  verbose: false,
  logLevel: "debug"
});

var snapshot = 0;
function debugSnapshot(){
  casper.capture('jcrew' + (snapshot++) + '.png', {
        top: 0,
        left: 0,
        width: 1024,
        height: 2000
  });
}

var url = 'https://www.jcrew.com/mens_category/polostees/brokeninjerseytees/PRD~72977/99102149736/72977.jsp?N=21+16&Nbrd=J&Nloc=en_US&Nrpp=48&Npge=1&Nsrt=3&isFromSale=true&isSaleItem=true&isNewSearch=true';

casper.start(url, function() {
    this.echo(this.getTitle());
});

casper.thenClick('a.add-item', function(){
  this.echo("Clicked on add item");
  debugSnapshot()
});

casper.thenClick('#viewShoppingBagButton', function(){
  this.echo("Clicking on cart");
  debugSnapshot()
});


/* Apply promotion */
casper.thenClick('#hasPromo',function() {
  this.echo("Has promo");
  this.fill('#summary-promo-form', {
    promotionCode: 'HEYSPRING'
  }, false);

  console.log(this.getCurrentUrl()); 
  this.evaluate(function(){
    document.querySelector('body').style.backgroundColor='blue';
    __utils__.echo("HERE");
    CheckOutPage.applyDiscount('promoApply');
  });

  
});

casper.waitForText("off your purchase", function(){
  this.echo("Wait for text");
});

casper.then(function(){
  this.echo("Apply promo");
  debugSnapshot();
});


casper.thenClick('#button-checkout', function(){
  console.log("Checkout");
  debugSnapshot();
});


// Check the total privae to make sure it's correct
// Fill out the form and you're done

casper.run();
