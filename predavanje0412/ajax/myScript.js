$(document).ready(function(){
    // $("#test_file").load("test.html");

    // $.validator.setDefaults({
    //     submitHandler: function(){
    //         alert("Forma je poslata");
    //     }
    // })

    $("#forma1").validate({
        rules: {
            ime: {
                required: true,
                minlength: 5
            },
            email: "required",
            komentar: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            ime: {
                required: "Unesite vase ime",
                minlength: "Ime mora imati bar 5 karaktera"
            },
            email: "Unesite validan email",
            komentar: {
                required: "Komentar je obavezan",
                minlength: "Mora imati minimum 10 karaktera"
            }
        }
    });
})


function loadData(){
    // let zahtev = new XMLHttpRequest();
    // zahtev.onreadystatechange = function(){
    //     if(this.readyState == 4 && this.status == 200){
    //         $("#file_p").html(this.responseText);
    //     }
    // };
    // zahtev.open("GET", "http://localhost:3000/zaposleni", true);
    // zahtev.send();

    let zahtev = $.get("http://localhost:3000/zaposleni");
    zahtev.done(function(podaci){
        console.log(podaci);
        let displayText = "";
        if(podaci && podaci.length){
            podaci.forEach(element => {
                displayText += element.id + ": " + element.ime + "<br>";
            });
            $("#file_p").html(displayText);
        }
    });
    zahtev.fail(function(greska){
        console.log(greska);
    })
}

function addData(){
    let newData = {
        "ime": "Mirko",
        "prezime": "Panic",
        "email": "mp@gmail.com"
    };
    // let zahtev = new XMLHttpRequest();
    // zahtev.onreadystatechange = function(){
    //     if(this.readyState == 4 && this.status == 200){
    //         $("#file_p").html(this.responseText);
    //     }
    // };
    // zahtev.open("POST", "http://localhost:3000/zaposleni", true);
    // zahtev.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    // zahtev.send(JSON.stringify(newData));

    // let zahtev = $.post("http://localhost:3000/zaposleni", newData);
    // zahtev.done(function(podaci){
    //     console.log(podaci);
    //     let displayText = "";
    //     if(podaci && podaci.length){
    //         podaci.forEach(element => {
    //             displayText += element.id + ": " + element.ime + "<br>";
    //         });
    //         $("#file_p").html(displayText);
    //     }
    // });
    // zahtev.fail(function(greska){
    //     console.log(greska);
    // })

    let zahtev = $.ajax({
        type: "POST",
        url: "http://localhost:3000/zaposleni",
        data: newData
    });

    zahtev.done(function(podaci){
        console.log(podaci);
    });
    zahtev.fail(function(greska){
        console.log(greska);
    })
}