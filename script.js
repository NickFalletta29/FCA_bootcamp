document.addEventListener("DOMContentLoaded", function () {

    // Function to display a message when a button is clicked
    function buttonClicked(buttonType) {
      alert(`You clicked the ${buttonType} button!`);
    }
  
    // Assign the function globally for HTML inline event handlers
    window.buttonClicked = buttonClicked;
  
    // Table row hover effect: logs the row clicked
    const tableRows = document.querySelectorAll("table tbody tr");
  
    tableRows.forEach(row => {
      row.addEventListener("click", function() {
        const rowIndex = this.querySelector("th").textContent;
        alert(`You clicked row ${rowIndex}!`);
      });
    });
  
  });
  