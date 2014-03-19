/*
  Proof of concept.
  Grab all of the products form the jcrew website
*/

var links = [];
var casper = require('casper').create();
var utils = require('utils')


// Make us look like a normal Mac
casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X)');


/* Grabs all of the product links off the page */
function getProductLinks () {
  var links = document.querySelectorAll('figure.product-item');
  return [].map.call(links, function(link) {
    return link.querySelectorAll('a');
  });
}

function processProductLinks(links){
    /* We should push these products to a queue to process images, prices, etc 
       For now just ignore
    */
    console.log("Products found: " + links.length);
    return;
}

/* Start up the scraper on the main sale page*/
casper.start('https://www.jcrew.com/sale.jsp').then(function() {
    this.echo("Loaded Sale Site");
});


/* Click on the Mens section */
casper.thenClick('nav#selectCategory > a:nth-child(3)', function() {
  this.echo("Clicked Mens");

  var productLinks = this.evaluate(getProductLinks);
  processProductLinks(productLinks);

  var totalPages = this.evaluate(function(){
   return document.querySelector('span.pagination-total').innerHTML;
  });

  var url = 'https://www.jcrew.com/search2/index.jsp?N=21+16&Nloc=en&Ntrm=&Nsrt=3&Npge=';
  for (var x=2;x<=totalPages;x++){
    /* Loop over all pages (Except the first) and process those pages in 
       parallel */
  }
});

casper.run();
