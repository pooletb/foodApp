var sections = ["landingmessage", "premadefood", "recipes"]

function SectionSwap() {
    for(var i = 0; i < sections.length; i++) {
        var element = document.getElementById(sections[i]);
        if(element.classList.contains("this-is-hidden")) {
            
        }
        else {
            element.classList.add("this-is-hidden")
        }
    }
}

function PremadeFood() {
    SectionSwap();
    var section = document.getElementById("premadefood");
    section.classList.remove("this-is-hidden");
    ConstantRun();
}

function Recipes() {
    SectionSwap();
    var section = document.getElementById("recipes");
    section.classList.remove("this-is-hidden");
    ConstantRun();
}

function ConstantRun() {
    var element = document.getElementById("searchBar")
    element.onkeyup = function(event) {
      var query = element.value
      console.log(query);
    }
}

function ConstantRun2() {
    var element = document.getElementById("searchBar2")
    element.onkeyup = function(event) {
      var query = element.value
      console.log(query);
    }
}

function echoPrint(value) {
    console.log(value);
} 

function myFunction() {
    // Declare variables 
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      } 
    }
  }