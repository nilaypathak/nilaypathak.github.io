function boldSelection () {
			
			var textarea = document.getElementById("myArea");
			if ('selectionStart' in textarea) {
					
				if (textarea.selectionStart != textarea.selectionEnd) {
					var newText = textarea.value.substring (0, textarea.selectionStart) + 
						"**" + textarea.value.substring  (textarea.selectionStart, textarea.selectionEnd) + "**" +
						textarea.value.substring (textarea.selectionEnd);
					textarea.value = newText;
				}
				else {
					textarea.value +="**";
					document.getElementById("bol").classList.toggle("selected");
				}
			}
			
		}
		function italicsSelection () {
			
			var textarea = document.getElementById("myArea");
			if ('selectionStart' in textarea) {
					
				if (textarea.selectionStart != textarea.selectionEnd) {
					var newText = textarea.value.substring (0, textarea.selectionStart) + 
						"//" + textarea.value.substring  (textarea.selectionStart, textarea.selectionEnd) + "//" +
						textarea.value.substring (textarea.selectionEnd);
					textarea.value = newText;
				}
				else{
					textarea.value +="//";
					document.getElementById("italic").classList.toggle("selected");
				}
			}
			
		}
		function underlineSelection () {
			
			var textarea = document.getElementById("myArea");
			if ('selectionStart' in textarea) {
					
				if (textarea.selectionStart != textarea.selectionEnd) {
					var newText = textarea.value.substring (0, textarea.selectionStart) + 
						"__" + textarea.value.substring  (textarea.selectionStart, textarea.selectionEnd) + "__" +
						textarea.value.substring (textarea.selectionEnd);
					textarea.value = newText;
				}
				else{
					textarea.value +="__";
					document.getElementById("under").classList.toggle("selected");
				}
			}
			
		}
		function reply (){
		
		var textarea = document.getElementById("myArea");
		var str=textarea.value;
		var res=str.split("**");
		var i;
		var result="";
		var result2="";
		var result3="";
		for(i=0;res[i]!=undefined;i++)
		{
			if(i%2==0)
			result=result+res[i]+"<b>";
			else
			result=result+res[i]+"</b>";
		}
		var res2=result.split("//");
		for(i=0;res2[i]!=undefined;i++)
		{
			if(i%2==0)
			result2=result2+res2[i]+"<i>";
			else
			result2=result2+res2[i]+"</i>";
		}
		var res3=result2.split("__");
		for(i=0;res3[i]!=undefined;i++)
		{
			if(i%2==0)
			result3=result3+res3[i]+"<u>";
			else
			result3=result3+res3[i]+"</u>";
		}
		document.getElementById('new_reply').style.display = "block";
		document.getElementById("reply_text").innerHTML = result3;
		document.getElementById("name_user").innerHTML = document.getElementById("myName").value;
		var node = document.getElementById('date');
        
		document.getElementById("reply_date").innerHTML = node.textContent;
		closeNewTopic();
		window.scrollTo(0,document.body.scrollHeight);
		}
		

var now = new Date();
var days = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
var date = ((now.getDate()<10) ? "0" : "")+ now.getDate();
function fourdigits(number) {
return (number < 1000) ? number + 1900 : number;
}
today = days[now.getDay()] + ", " +
months[now.getMonth()] + " " +
date + ", " +
(fourdigits(now.getYear())) ;
document.getElementById("date").innerHTML = today;



function openNav() {
var mq = window.matchMedia( "(max-width: 620px)" );
if (mq.matches) {
    document.getElementById("mySidenav").style.width = "200px";
	document.getElementById('black-background').style.display = "block";
    
}
else {
    document.getElementById("mySidenav").style.width = "15vw";
    document.getElementById("main").style.marginLeft = "16.5vw";
	document.getElementById("main").style.width = "81vw";
}   
 
}

 function closeNav() {
 var mq = window.matchMedia( "(max-width: 620px)" );
if (mq.matches) {
    document.getElementById("mySidenav").style.width = "0";
	document.getElementById('black-background').style.display = "none";
}
else {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "2vw"
	document.getElementById("main").style.width = "94vw";
}
    
	
}

function newTopic(){
	document.getElementById('newtopic1').style.display = "block";
	document.getElementById('black-background').style.display = "block";
}
function newReply(){
	document.getElementById('newtopic1').style.display = "block";
	document.getElementById('black-background').style.display = "block";
}
function closeNewTopic(){
	document.getElementById('newtopic1').style.display = "none";
	document.getElementById('black-background').style.display = "none";
}

function myFunction() {

  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}
function myFunction2() {

  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput2");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}

$.fn.followTo = function (pos) {
    var $this = this,
        $window = $(window);

    $window.scroll(function (e) {
        if ($window.scrollTop() > pos) {
            $this.css({
                position: 'fixed',
                top: pos
            });
        } else {
            $this.css({
                position: 'absolute',
                top: 220
            });
        }
    });
};

$('#myInput2').followTo(130);

function drop() {
	
	 document.getElementById("myDropdown").classList.toggle("show1");
}


function droprecent() {
	  document.getElementById("recent-threads").classList.toggle("show1");
	  
}
function dropcategories(){
	 document.getElementById("categories").classList.toggle("show1");
	 
}

$('html').click(function(e){
if(e.target.id=='myDropdown'){
	
	}else{
	document.getElementById('myDropdown').style.display = "none";
	}
	});