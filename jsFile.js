$(document).ready(function(){
    $("firstTable").dataTable();
})

function ucitaj() {
    zahtev.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            document.getElementById("fajl").innerHTML = this.responseText;
        }
    };
    zahtev.open("GET" , "HTTP://localhost:3000/zaposleni" , true);
    zahtev.send();
}