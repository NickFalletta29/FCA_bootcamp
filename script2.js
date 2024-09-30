// Variables Section
let var1 = 0;
let var2 = 5;
let toggleState = true;

// Define min and max limits for variable2
const minNum = 0;
const maxNum = 10;

// List variable that holds the items
let itemListArray = ['Item 1', 'Item 2', 'Item 3'];

// Function to update the color of variable2 based on its value
function updateVariable2Color() {
  const varNum2 = document.getElementById('varNum2');
  if (var2 === maxNum) {
    varNum2.style.color = 'red';
  } else if (var2 === minNum) {
    varNum2.style.color = 'blue';
  } else {
    varNum2.style.color = 'black';
  }
}

// Display variable1 functionality
document.getElementById('plusBtn1').addEventListener('click', function() {
  var1 += 1;
  document.getElementById('varNum1').textContent = var1;
});

document.getElementById('minusBtn1').addEventListener('click', function() {
  var1 -= 1;
  document.getElementById('varNum1').textContent = var1;
});

// Display variable2 functionality with min and max limits
document.getElementById('plusBtn2').addEventListener('click', function() {
  if (var2 < maxNum) { 
    var2 += 1;
    document.getElementById('varNum2').textContent = var2;
    updateVariable2Color();
  }
});

document.getElementById('minusBtn2').addEventListener('click', function() {
  if (var2 > minNum) {
    var2 -= 1;
    document.getElementById('varNum2').textContent = var2;
    updateVariable2Color();
  }
});

// Toggle Text Button (Switch between "Next" and "Back")
document.getElementById('changeBtn').addEventListener('click', function() {
  toggleState = !toggleState;
  document.getElementById('varText').textContent = toggleState ? 'Next' : 'Back';
});

// Lists Section
const maxItems = 10;
const minItems = 1;

// Function to update the UI list based on the itemListArray
function updateList() {
    const itemList = document.getElementById('itemList'); // Get the ul element for the list
    itemList.innerHTML = ''; // Clear the current list items to avoid duplicates
    itemListArray.forEach((item, index) => {
      // Loop through each item in itemListArray and create a new list item (li) for it
      const newItem = document.createElement('li'); // Create a new li element
      newItem.className = 'list-group-item mb-2'; // Add the Bootstrap class for styling
      newItem.textContent = item; // Set the text content of the list item
      itemList.appendChild(newItem); // Append the new list item to the ul
    });
  }
  
  // Initial list render when the page loads
  updateList(); // Call this function to display the initial list from itemListArray
  
  // Add Item Button
  document.getElementById('addItem').addEventListener('click', function() {
    // When the "Add Item" button is clicked:
    if (itemListArray.length < maxItems) { // Check if the number of items is less than the maximum allowed
      itemListArray.push(`Item ${itemListArray.length + 1}`); // Add a new item to itemListArray
      updateList(); // Call the function to update the list displayed on the page
    } else {
      alert('Max items reached'); // Show an alert if the maxItems limit is reached
    }
  });
  
  // Remove Item Button
  document.getElementById('removeItem').addEventListener('click', function() {
    // When the "Remove Item" button is clicked:
    if (itemListArray.length > minItems) { // Check if there are more than the minimum number of items
      itemListArray.pop(); // Remove the last item from itemListArray
      updateList(); // Call the function to update the list displayed on the page
    } else {
      alert('Minimum 1 item required'); // Show an alert if the minItems limit is reached
    }
  });
