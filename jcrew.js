var links = [];
var casper = require('casper').create();
var utils = require('utils')


function getTownLinks () {
  var links = document.querySelectorAll('figure.product-item a');
  return [].map.call(links, function(link) {
    return link.getAttribute('href');
  });
}

casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X)');

casper.start('https://www.jcrew.com/sale.jsp').then(function() {
    this.echo("Loaded Sale");

	if (this.exists('#selectCategory > a:nth-child(2)')) {
	this.echo("sdf");
	}
});



casper.thenClick('nav#selectCategory > a:nth-child(3)', function() {
    this.echo("Clicked.");

    this.capture('page2.png',{
       top: 0,
       left: 0, 
       width: 1280, 
       height: 1024
    });

    links = this.evaluate(getTownLinks);
    utils.dump(links);
});
casper.run();
