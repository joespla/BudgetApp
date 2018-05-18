//Budget Controller
var budgetController = (function() {
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems : {
      exp : [],
      inc : []
    },
    totals : {
      exp : 0,
      inc : 0
    }
  };

  return {
    addItem : function(type, des, val) {
      var newItem, ID;
      // Create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length-1].id + 1;
      }else {
        ID = 0;
      }

      // Create new item base on inc or exp
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      }else if(type === 'inc'){
        newItem = new Income(ID, des, val);
      }

      // Push in into our data structure
      data.allItems[type].push(newItem);
      // Return new item
      return newItem;
    },

    testing : function() {
      console.log(data);
    }
  }

}());

// UIController
var UIController = (function() {
  var DOMStrings = {
    inputType : '.add__type',
    inputDescription : '.add__description',
    inputValue : '.add__value',
    inputBtn : '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  };

  return {
    getInput: function() {
      return {
        type : document.querySelector(DOMStrings.inputType).value, //Will be either inc or exp
        description : document.querySelector(DOMStrings.inputDescription).value,
        value : document.querySelector(DOMStrings.inputValue).value
      };
    },
    addListItem : function(obj, type) {
      var html, newHTML, element;
      // Create html string with placeholder text
      if (type === 'inc') {
        element = DOMStrings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }else {
        element = DOMStrings.expensesContainer;
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // Replace the placeholder text with some actual data
      newHTML = html.replace('%id%', obj.id);
      newHTML = newHTML.replace('%description%', obj.description);
      newHTML = newHTML.replace('%value%',obj.value);
      // Insert the html into to the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
    },
    clearFields : function() {
      var fields, fieldsArr;

      fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);
      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(current, index, array) {
        current.value = "";
      });

      fieldsArr[0].focus();
    },
    getDOMstrings : function() {
      return DOMStrings;
    },
  };

}());

// Controller
var controller = (function(budgetCtrl, UICtrl) {
  var setUpEventListeners = function () {
    var DOMStrings = UICtrl.getDOMstrings();

    document.querySelector(DOMStrings.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  }

  var ctrlAddItem = function() {
    var input, newItem;
    // Get the field input data
    input = UICtrl.getInput();
    // Add item to the budget budgetController
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    // Add new item to the UI
    UICtrl.addListItem(newItem, input.type);
    // Clear the fields
    UICtrl.clearFields();
    // calculate the budget
    // Display the budget
  }

  return {
    init : function() {
      console.log('Application has started');
      setUpEventListeners();
    }
  }

}(budgetController, UIController));

controller.init();
