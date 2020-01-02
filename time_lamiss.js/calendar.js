function refresh_date()
{
	var d = new Date();
  da = d.getDate();
	document.getElementById("date").innerHTML=da;
}
function refresh_jour()
{
	var j = new Date();
  var days = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
  document.getElementById("jour").innerHTML = days[j.getDay()];
}
function refresh_mois()
{
	var m = new Date();
  var months = ["Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Decembre"];
  document.getElementById("mois").innerHTML = months[m.getMonth()];
}
