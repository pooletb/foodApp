var sections = ["landingmessage", "premadefood", "recipes", "ingredients"]
var btns = ["pmbtn", "rbtn", "ibtn"]

function SectionSwap() {
    for(var i = 0; i < sections.length; i++) {
        var element = document.getElementById(sections[i]);
        if(element.classList.contains("this-is-hidden")) {
            
        }
        else {
            element.classList.add("this-is-hidden")
        }
    }
    for(var i = 0; i < btns.length; i++) {
        var element = document.getElementById(sections[i]);
        if(element.classList.contains("is-active")) {
            
        }
        else {
            element.classList.add("is-active")
        }
    }
}

function PremadeFood() {
    SectionSwap();
    var section = document.getElementById("premadefood");
    var btn = document.getElementById("pmbtn");
    btn.classList.add("is-active");
    section.classList.remove("this-is-hidden");
    document.location.href = "#premadefood";
}

function Recipes() {
    SectionSwap();
    var section = document.getElementById("recipes");
    var btn = document.getElementById("rbtn");
    btn.classList.add("is-active");
    section.classList.remove("this-is-hidden");
    document.location.href = "#recipes";
}

function Ingredients() {
    SectionSwap();
    var section = document.getElementById("ingredients");
    var btn = document.getElementById("ibtn");
    btn.classList.add("is-active");
    section.classList.remove("this-is-hidden");
    document.location.href = "#ingredients";
}

function echoPrint(value) {
    console.log(value);
} 

function myFunction(num) {
    if (num === 1) {
        // Declare variables 
        var input, filter, table, tr, td, i;
        input = document.getElementById("pInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("pTable");
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
    if (num === 2) {
        // Declare variables 
        var input, filter, table, tr, td, i;
        input = document.getElementById("rInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("rTable");
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

    if (num === 3) {
        // Declare variables 
        var input, filter, table, tr, td, i;
        input = document.getElementById("iInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("iTable");
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

  }