var sections = ["landingmessage", "premadefood", "recipes", "ingredients", "advanced"]
var btns = ["pmbtn", "rbtn", "ibtn", "abtn"]

function SectionSwap() {
    for (var i = 0; i < sections.length; i++) {
        var element = document.getElementById(sections[i]);
        if (element.classList.contains("this-is-hidden")) {

        }
        else {
            element.classList.add("this-is-hidden")
        }
    }
    for (var i = 0; i < btns.length; i++) {
        var element = document.getElementById(btns[i]);
        if (element.classList.contains("is-active")) {
            element.classList.remove("is-active")
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

function Advanced() {
    SectionSwap();
    var section = document.getElementById("advanced");
    var btn = document.getElementById("abtn");
    btn.classList.add("is-active");
    section.classList.remove("this-is-hidden");
    document.location.href = "#advanced";
}

function echoPrint(value) {
    console.log(value);
}

function OpenInfo(id, db) {
    var prefix
    if (db == 1) {
        prefix = "pm"
    }
    else if (db == 2) {
        prefix = "hf"
    }
    var modal = document.getElementById(prefix + id)
    modal.classList.add("is-active");
}

function CloseInfo(id, db) {
    var prefix
    if (db == 1) {
        prefix = "pm"
    }
    else if (db == 2) {
        prefix = "hf"
    }
    var modal = document.getElementById(prefix + id)
    modal.classList.remove("is-active");
}

function LoveIt(user, id, db) {
    console.log(user + " loves " + db + " " + id);
}

function LikeIt(user, id, db) {
    console.log(user + " likes " + db + " " + id);
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

function SwapAdv(num) {
    var pmButton = document.getElementById('aPMButton');
    var hfButton = document.getElementById('aHFButton');
    var ingColumn = document.getElementById('ingColumn');
    if (num == 0) {
        if (pmButton.classList.contains('is-outlined')) {
            pmButton.classList.remove('is-outlined');
            hfButton.classList.add('is-outlined')
            ingColumn.classList.add('this-is-hidden')
        }
        else {
        }
    }
    if (num == 1) {
        if (hfButton.classList.contains('is-outlined')) {
            hfButton.classList.remove('is-outlined');
            pmButton.classList.add('is-outlined')
            ingColumn.classList.remove('this-is-hidden')
        }
        else {
        }
    }
}
function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i = 0, iLen = options.length; i < iLen; i++) {
        opt = options[i];

        if (opt.selected) {
            result.push(opt.value || opt.text);
        }
    }
    return result;
}

function SuperQuery(num) {
    var db
    var json = {};
    json.post = 1;

    if(num == 1) {
        async function f() {
            const response = await fetch('/api/3', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(json)
            });
            var results = await response.json()   
            console.log(results) 
        }
        f()
    }
    else {
        SendData(4,json).db;
    }

    var phaseOne = db

    var cals = document.getElementById('aCalsInput').value;
    var fatCals = document.getElementById('aFatCalsInput').value;
    var totalFat = document.getElementById('aTotalFatInput').value;
    var satFat = document.getElementById('aSatFatInput').value;
    var transFat = document.getElementById('aTransFatInput').value;
    var cholesterol = document.getElementById('aCholesterolInput').value;
    var sodium = document.getElementById('aSodiumInput').value;
    var carbs = document.getElementById('aCarbsInput').value;
    var dietFiber = document.getElementById('aFiberInput').value;
    var sugars = document.getElementById('aSugarsInput').value;
    var protein = document.getElementById('aProteinInput').value;

    if (cals != "") {
        if (cals.charAt(0) === '<') {
            cals = cals.substr(1);
            for (var i = 0; i < db.length; i++) {
                if (cals > db[i].calories) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
        else if (cals.charAt(0) === '>') {
            cals = cals.substr(1);
            for (var i = 0; i < db.length; i++) {
                if (cals < db[i].calories) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
        else {
            for (var i = 0; i < db.length; i++) {
                if (cals != db[i].calories) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
    }

    if (fatCals != "") {
        if (fatcals.charAt(0) === '<') {
        fatCals = fatCals.substr(1);
            for (var i = 0; i < db.length; i++) {
                if (fatCals > db[i].fat_calories) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
        else if (fatCals.charAt(0) === '>') {
        fatCals = fatCals.substr(1);
            for (var i = 0; i < db.length; i++) {
                if (fatCals < db[i].fat_calories) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
        else {
            for (var i = 0; i < db.length; i++) {
                if (fatCals != db[i].fat_calories) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
    }

    if (transFat != "") {
        if (transFat.charAt(0) === '<') {
        transFat = transFat.substr(1);
            for (var i = 0; i < db.length; i++) {
                if (transFat > db[i].trans_fat) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
        else if (transFat.charAt(0) === '>') {
        transFat = transFat.substr(1);
            for (var i = 0; i < db.length; i++) {
                if (transFat < db[i].trans_fat) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
        else {
            for (var i = 0; i < db.length; i++) {
                if (transFat != db[i].trans_fat) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
    }

    if (satFat != "") {
        if (satFat.charAt(0) === '<') {
        satFat = satFat.substr(1);
            for (var i = 0; i < db.length; i++) {
                if (satFat > db[i].sat_fat) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
        else if (satFat.charAt(0) === '>') {
        satFat = satFat.substr(1);
            for (var i = 0; i < db.length; i++) {
                if (satFat < db[i].sat_fat) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
        else {
            for (var i = 0; i < db.length; i++) {
                if (satFat != db[i].sat_fat) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
    }

    if (totalFat != "") {
        if (totalFat.charAt(0) === '<') {
            totalFat = totalFat.substr(1);
            for (var i = 0; i < db.length; i++) {
                if (totalFat > db[i].total_fat) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
        else if (totalFat.charAt(0) === '>') {
            totalFat = totalFat.substr(1);
            for (var i = 0; i < db.length; i++) {
                if (totalFat < db[i].total_fat) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
        else {
            for (var i = 0; i < db.length; i++) {
                if (totalFat != db[i].total_fat) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
    }

    if (cholesterol != "") {
        if (cholesterol.charAt(0) === '<') {
        cholesterol = cholesterol.substr(1);
            for (var i = 0; i < db.length; i++) {
                if (cholesterol > db[i].cholesterol) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
        else if (cholesterol.charAt(0) === '>') {
        cholesterol = cholesterol.substr(1);
            for (var i = 0; i < db.length; i++) {
                if (cholesterol < db[i].cholesterol) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
        else {
            for (var i = 0; i < db.length; i++) {
                if (cholesterol != db[i].cholesterol) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
    }

    if (sodium != "") {
        if (sodium.charAt(0) === '<') {
        sodium = sodium.substr(1);
            for (var i = 0; i < db.length; i++) {
                if (sodium > db[i].sodium) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
        else if (sodium.charAt(0) === '>') {
        sodium = sodium.substr(1);
            for (var i = 0; i < db.length; i++) {
                if (sodium < db[i].sodium) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
        else {
            for (var i = 0; i < db.length; i++) {
                if (sodium != db[i].sodium) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
    }

    if (carbs != "") {
        if (carbs.charAt(0) === '<') {
        carbs = carbs.substr(1);
            for (var i = 0; i < db.length; i++) {
                if (carbs > db[i].total_carbs) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
        else if (carbs.charAt(0) === '>') {
        carbs = carbs.substr(1);
            for (var i = 0; i < db.length; i++) {
                if (carbs < db[i].total_carbs) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
        else {
            for (var i = 0; i < db.length; i++) {
                if (carbs != db[i].total_carbs) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
    }

    if (dietFiber != "") {
        if (dietFiber.charAt(0) === '<') {
        dietFiber = dietFiber.substr(1);
            for (var i = 0; i < db.length; i++) {
                if (dietFiber > db[i].diet_fiber) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
        else if (dietFiber.charAt(0) === '>') {
        dietFiber = dietFiber.substr(1);
            for (var i = 0; i < db.length; i++) {
                if (dietFiber < db[i].diet_fiber) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
        else {
            for (var i = 0; i < db.length; i++) {
                if (dietFiber != db[i].diet_fiber) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
    }

    if (sugars != "") {
        if (sugars.charAt(0) === '<') {
        sugars = sugars.substr(1);
            for (var i = 0; i < db.length; i++) {
                if (sugars > db[i].sugars) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
        else if (sugars.charAt(0) === '>') {
        sugars = sugars.substr(1);
            for (var i = 0; i < db.length; i++) {
                if (sugars < db[i].sugars) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
        else {
            for (var i = 0; i < db.length; i++) {
                if (sugars != db[i].sugars) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
    }

    if (protein != "") {
        if (protein.charAt(0) === '<') {
        protein = protein.substr(1);
            for (var i = 0; i < db.length; i++) {
                if (protein > db[i].protein) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
        else if (protein.charAt(0) === '>') {
        protein = protein.substr(1);
            for (var i = 0; i < db.length; i++) {
                if (protein < db[i].protein) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
        else {
            for (var i = 0; i < db.length; i++) {
                if (protein != db[i].protein) {
                }
                else {
                    phaseOne = phaseOne.filter(function(item) { 
                        return item !== db[i]
                    })                
                }
            }
        }
    }

    console.log(phaseOne);

    var ingredients = getSelectValues(document.getElementById('aIngredients'))
    var allergens = getSelectValues(document.getElementById('aAllergens'))
    var categories = getSelectValues(document.getElementById('aCategories'))

    console.log(cals, fatCals, totalFat, satFat, transFat, cholesterol, sodium, carbs, dietFiber, sugars, protein, ingredients, allergens, categories)
}