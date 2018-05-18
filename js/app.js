//Budget Controller
var budgetController = (function() {
  // Some code
}());

// UIController
var UIController = (function() {
  var DOMStrings = {
    inputType : '.add__type',
    inputDescription : '.add__description',
    inputValue : '.add__value',
    inputBtn : '.add__btn'
  };

  return {
    getInput: function() {
      return {
        type : document.querySelector(DOMStrings.inputType).value, //Will be either inc or exp
        description : document.querySelector(DOMStrings.inputDescription).value,
        value : document.querySelector(DOMStrings.inputValue).value
      };
    },
    getDOMstrings : function() {
      return DOMStrings;
    },
  };

}());

// Controller
var controller = (function(budgetCtrl, UICtrl) {
  var DOMStrings = UICtrl.getDOMstrings();
  var ctrlAddItem = function() {
    // Get the field input data
    var input = UICtrl.getInput();
    console.log(input);
    // Add item to the budget budgetController
    // Add new item to the UI
    // calculate the budget
    // Display the budget
  }

  document.querySelector(DOMStrings.inputBtn).addEventListener('click', ctrlAddItem);

  document.addEventListener('keypress', function(event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });

}(budgetController, UIController));
