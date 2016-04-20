var chaiExpect = chai.expect;

describe("Comma Separated Values (CSV) Tests", function(){
   var sandbox; // Using Sinon

   beforeEach(function() {
      // Using Sinon
      sandbox = sinon.sandbox.create();
      sandbox.stub(window.console, "log");
      sandbox.stub(window.console, "error");
   });

   afterEach(function() {
      // Using Sinon
      sandbox.restore();
   });

   describe("Testing MongoDB", function() {
     it ("Has valid Scheme", function() {

     }
   }

   describe("Testing separated values", function(){

      it("The three elements are correctly parsed", function(){
         var r = calculate('"This",3,"2,3"');
         chaiExpect(r[0].value[0]).to.equal('This');
         chaiExpect(r[0].value[1]).to.equal('3');
      });
   });

   describe("Testing double quotation marks", function(){
      it("The text is in a block", function(){
         var r = calculate('"This goes together","This, too","5,45 = 5.45"');
         chaiExpect(r[0].value[0]).to.equal('This goes together');
      });
      it("Escaping double quotation marks correctly", function(){
         var r = calculate('"This without quotation marks \\"and this with\\" quotation marks"');
         chaiExpect(r[0].value[0]).to.equal('This without quotation marks "and this with" quotation marks');
      });
   });
});
