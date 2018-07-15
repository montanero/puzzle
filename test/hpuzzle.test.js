let hpuzzle = require ("../src/js/hpuzzle")

describe('HPuzzle', function () {

    // inject the HTML fixture for the tests
    beforeEach(function() {
	var fixture = '<div id="fixture" class="outer">'+
	    ' <div class="tile" id="tile0"></div>'+
	    ' <div class="tile" id="tile1"></div>'+
	    ' <div class="tile" id="tile2"></div>'+
	    ' <div class="tile" id="tile3"></div>'+
	    ' <div class="tile" id="tile4"></div>'+
	    ' <div class="tile" id="tile5"></div>'+
	    ' <div class="tile" id="tile6"></div>'+
	    ' <div class="tile" id="tile7"></div>'+
	    ' <div class="tile" id="tile8"></div>'+
	    ' <div class="tile" id="tile9"></div>'+
	    ' <div class="tile" id="tile10"></div>'+
	    ' <div class="tile" id="tile11"></div>'+
	    ' <div class="tile" id="tile12"></div>'+
	    ' <div class="tile" id="tile13"></div>'+
	    ' <div class="tile" id="tile14"></div>'+
	    ' <div class="tile" id="tile15"></div>'+
	    '</div>';
	
	document.body.insertAdjacentHTML(
	    'afterbegin',
	    fixture);
    });

    // remove the html fixture from the DOM
    afterEach(function() {
        document.body.removeChild(document.getElementById('fixture'));
      });

    describe('#init()', function () {
        it('calculates', function () {
            assert.equal(1+2,3)
        });
    })
});
