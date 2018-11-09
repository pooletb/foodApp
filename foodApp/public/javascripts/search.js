function SetupPage() {
    document.getElementById("searchController").addEventListener("focus", SearchLoading);
    document.getElementById("searchController").addEventListener("blur", SearchLoading);
    ConstantRun();
}

function ConstantRun() {
    var element = document.getElementById("searchBar")
    element.onkeyup = function(event) {
      var query = element.value
    }
}

function SearchLoading() {
    var element = document.getElementById("searchController")
    if(element.classList.contains("is-loading")) {
        element.classList.remove("is-loading");
    }
    else {
        element.classList.add("is-loading");
    }
}