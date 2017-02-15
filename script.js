var selectCount;
var c1;
var c2;
var divSelects;
var linebreak;
//JSON TO HOLD THE DATA FOR OPTIONS
var options = [
    {"option":" "},{"option":"Korean"},{"option":"Japanese"},{"option":"American"},
    {"option":" "},{"option":" "},{"option":" "},{"option":" "},
    {"option":" "},{"option":"Movies"},{"option":"Urban Legends"},{"option":"Webtoons"},
    {"option":" "},{"option":"Movies"},{"option":"Urban Legends"},{"option":"Anime"},
    {"option":" "},{"option":"Movies"},{"option":"Urban Legends"},{"option":"Video Games"},
    {"option":" "},{"option":"2000s"},{"option":"1990s"},{"option":"Before 1980s"},
    {"option":" "},{"option":"Very Famous"},{"option":"Famous"},{"option":"Not so Famous"},
    {"option":" "},{"option":"Female"},{"option":"Male"},{"option":"Doesn't Matter"},
    {"option":" "},{"option":"2000s"},{"option":"1990s"},{"option":"Before 1980s"},
    {"option":" "},{"option":"Very Famous"},{"option":"Famous"},{"option":"Not so Famous"},
    {"option":" "},{"option":"Female"},{"option":"Male"},{"option":"Doesn't Matter"},
    {"option":" "},{"option":"2000s"},{"option":"1990s"},{"option":"Before 1980s"},
    {"option":" "},{"option":"Very Famous"},{"option":"Famous"},{"option":"Not so Famous"},
	{"option":" "},{"option":"Female"},{"option":"Male"},{"option":"Doesn't Matter"},
];

function $(eltID){
    return document.getElementById(eltID);
}
//ON LOADS THIS FUNCTION CALLS THE OTHER FUNCTIONS
function init(){
    c1 = counter();
    c2 = counter();
}
//WHEN CALLED IT RETURNS THE FUNCTIONS IN IT
function counter(){
    var n = 0;
    return{
        count: function(){return n++;},//KEEPS COUNT
        index: function() {return((n+1)*4)},//CHECK THE INDEX FOR THE SECOND SELECT
        indexK: function() {return((n+4)*4)},//CHECK THE INDEX FOR THE THIRD SELECT
        resetDepth:function() {n=0;},//RESET HOW FAR INTO THE SELECT YOU ARE IN
        setDepth:function(m) {n=m;},//SET THE DEPTH OF SELECT
        getCount: function() {return n;},//RETURN COUNT
        setIndexStartValue: function(i) {n = i;}//START THE INDEX VALUE
    };
}
//IT IS CALLED WHEN AN OPTION IS SELECTED
function addAselect(optionSelected){
    var selectedID = optionSelected.id.charAt(1);
    divSelects = document.getElementById('select');
    linebreak = document.createElement('br');
    
    selectCount = c2.count();
    //IF SELECTID IS LESS THAN CURRENT GOES BACK A SELECT
    if(selectCount > (selectedID - 1)){
        removeOldSelects(selectedID, selectCount);   
    }
    //IF THERE IS LESS THAN 4 LEVEL OF SELECT
    if(c2.getCount() < 4){
		//CREATE THE NEXT SELECTS AND OPTIONS
        var objSelect = document.createElement('select');
        objSelect.setAttribute('onchange', 'addAselect(this)');
        var thisID = 's' + (c2.getCount() + 1);
        objSelect.setAttribute('ID', thisID);
        var j = 0;
        //IF COUNT IS FOR SECOND SELECT RUN INDEX FOR SECOND SELECT
        if(c2.getCount() > 1){
            var offset = optionSelected.selectedIndex;
            c1.setIndexStartValue(offset);
            j = c1.index();
        }
		//IF COUNT IS FOR THIRD SELECT RUN INDEX FOR THIRD SELECT
        if(c2.getCount() > 2){
            var offset = optionSelected.selectedIndex;
            c1.setIndexStartValue(offset);
            j = c1.indexK();
        }
        var i = 0;
        //THERE ARE LESS THAN 4 OPTIONS
        while (i < 4){
			//CREATE OPTIONS
            var objOption = document.createElement('option');
            objOption.setAttribute('value', options[j+i].option);
			//IF JSON HAS EMPTY STRING DISABLE
            if(options[j+i].option == " "){
                options[j+i].option.disable = true;
                objOption.appendChild(document.createTextNode(options[j+i].option));
                objSelect.appendChild(objOption);
                i++;
            }
            else{
                objOption.appendChild(document.createTextNode(options[j+i].option));
                objSelect.appendChild(objOption);
                i++;
            }
        }
        divSelects.appendChild(objSelect);
    }
    else{
		//WHEN ALL SELECT IS RUN THROUGH, CALLS STORAGE FUNCTION
        setTimeout("storage()",500);    
    }
}
//GOES BACK ONE SELECT
function removeOldSelects(selectedID, selectCount){
    var depth = selectCount + 1;
    while(depth > selectedID){
        var nodeToRemove = document.getElementById('s' + depth);
        nodeToRemove.parentNode.removeChild(nodeToRemove);
        depth--;
    }
    c2.setDepth(depth);
}
//STORES THE OPTION THAT WAS SELECTED INTO LOCAL STORAGE
function storage(){
    var ans1 = $('s2').options[$('s2').selectedIndex].text;
    var ans2 = $('s3').options[$('s3').selectedIndex].value;
    var ans3 = $('s4').options[$('s4').selectedIndex].value;

    if(typeof(Storage) !== "undefined"){
		//store the value with a key
        localStorage.setItem("values1", ans1);
        localStorage.setItem("values2", ans2);
		localStorage.setItem("values3", ans3);
	}
	else{
		alert("sorry, your browser does not support local web storage");
	}
	//CALLS THE CREATE FUNCTION
    create();
}
//CREATES THE OUTPUT FORM
function create(){
    var formID = document.getElementById("formThing");
	console.log(formID);
    var div = document.createElement('div');
    div.id = "colorIn";

    var inputForm = document.createElement("P");
    var inputForm2 = document.createElement("P");
    var inputForm3 = document.createElement("P");

    inputForm.id = "inputs";
    inputForm2.id = "inputs";
    inputForm3.id = "inputs";

    var item1 = document.createTextNode("Story Origin: " + localStorage.getItem("values1"));
    var item2 = document.createTextNode("Entertainment Type: " + localStorage.getItem("values2"));
    var item3 = document.createTextNode("Random Facts: " + localStorage.getItem("values3"));

    inputForm.appendChild(item1);
    inputForm2.appendChild(item2);
    inputForm3.appendChild(item3);

    div.appendChild(inputForm);
    div.appendChild(document.createElement("br"));
    div.appendChild(inputForm2);
    div.appendChild(document.createElement("br"));
    div.appendChild(inputForm3);
    
    var reset = document.createElement("input");
    reset.type = "reset";
    reset.id = "resetB";
    reset.value = "Reset";
    reset.setAttribute("onclick","history.go(0)");
    
	var submit = document.createElement("input");
    submit.type = "submit";
    submit.id = "submitB";
    submit.value = "Submit";
    submit.setAttribute("onclick","storing()");
	
	var nameIn = document.createElement("input");
	nameIn.type = "text";
	nameIn.name = "Names";
	nameIn.id = "nameInn";
	nameIn.placeholder = "Enter Name Here";
	
	var inputss = document.createElement("input");
	inputss.type = "text";
	inputss.name = "Ask";
	inputss.id = "askInn";
	inputss.placeholder = "Did you enjoy this?";
	
	div.appendChild(nameIn);
	div.appendChild(inputss);
    div.appendChild(reset);
	div.appendChild(submit);
    formID.appendChild(div);
	picturePrint();
}
//CREATES THE PICTURE BASE ON THE SELECTED OPTIONS
function picturePrint(){
	var pic1 = localStorage.getItem("values1");
	var pic2 = localStorage.getItem("values2");
	var pic3 = localStorage.getItem("values3");
	
	var forms = document.getElementById("formThing");
	var div2 = document.createElement("div");
	div2.id = "pictureIn";
	var picture = document.createElement("img");
	picture.src = "images/" + pic1 + pic2 + pic3 + ".jpg";
	div2.appendChild(picture);
	forms.appendChild(div2);
}
function storing(){
	var nameIns = document.getElementById("nameInn").value;
	var inputsss = document.getElementById("askInn").value;
	
	if(typeof(Storage) !== "undefined"){
		//store the value with a key
        localStorage.setItem("Name1", nameIns);
        localStorage.setItem("Name2", inputsss);
	}
	else{
		alert("sorry, your browser does not support local web storage");
	}
}