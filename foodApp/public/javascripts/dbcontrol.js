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