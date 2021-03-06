// Game settings
var viewspeed = 500; // time the player can see the answers MS
var timeout = 500; // Time after all cards showed
var health = 5;
var newPlayground = 3; // replaces the level variable
var level = newPlayground * newPlayground;
var difficulty = 1;
var showcontent = false; // show numbers inside the cards
var allow_spin = true;
var nofail = false;
// Game settings end
var allow_click = 0; 
var play_array = [];
var anim = 0;
var y = 1;
var correct_answers = 0;
var avoid_repeat = []; // When a card is clicked, the player cant click on same card more than once
var randoms = 0;
var room_level;
var no_fail_round = 0;
var round_values = 0;
var translation = 1; // Spinning speed
// level transformations
var break_point_level_space = 10;
var break_point_level_slime = 20;
var blackhole_size = 10;

function initiate() { // Call all the functions
    setInterval(setTime, 1000);
    round_value();
    lifes();
    prep();
    calc_difficulty();
    console.log(level);
    make_playground();
    randomized();
    animation();
    console.log(difficulty);
}

function nextRound() {
    round_value();
    clear_playground();
    clear_values()
    calc_difficulty();
    console.log(level);
    make_playground();
    randomized();
    viewspeed_round_counter();
    animation();
    console.log(difficulty);
    level_skins();
}

function prep() { // handles everythiing before the game starts
    document.getElementById("start-the-game").style.visibility = "hidden"; //hides the start button
}

function round_value() {
    round_values++;
    document.getElementById("round").innerHTML = round_values;
}
function viewspeed_round_counter(){
    if(viewspeed > 10){
        viewspeed = viewspeed - 20;
    }
}
function animation() { //Animations, shows what cards you click on. Works like a loop. SetTimout cant be used in normal loop
    setTimeout(function () {
        if(round_values > break_point_level_space){
            $("#" + play_array[anim]).addClass('space')
        } else {
            $("#" + play_array[anim]).addClass('animations')
        }
        anim++;
        if (play_array.length > anim) {
            animation();
        } else {
            basic_timeout();
            allow_click = 1;
            spin_round();
        }
    }, viewspeed)
}

function basic_timeout() { // small timeout before you can click and the shown cards disapear.
    setTimeout(function () {
        $(".card").removeClass('animations');
        $(".card").removeClass('space');
    }, timeout)
}

function lifes() {
    for (let lives = 0; lives < health; lives++) {
        document.getElementById("health").innerHTML += '<img src="assets/textures/heart.png" alt="health">';
    }
}

function clear_values() { // Resets the values for next round.
    // newPlayground = newPlayground + 0.1;
    no_fail_round = 0;
    difficulty = 1;
    level = Math.ceil(newPlayground * newPlayground);
    play_array = [];
    randoms = 0;
    i = 0;
    card_ids = 0;
    y = 0;
    anim = 0;
    clicked_id = 0;
    allow_click = 0;
    avoid_repeat = [];
    correct_answers = 0;
    console.log("level=" + level + "\n difficulty=" + difficulty + "\n array=" + play_array + "\n clicked_id=" + clicked_id + "\n NewPLaygroud=" + newPlayground*newPlayground); // Console info
    calc_difficulty();
    newPlayground = newPlayground + 0.1;

}
function spin_round(){
    if(allow_spin === true){
        if(round_values >= 7 && 9>= round_values || round_values >= 12 && round_values % 3){
            document.getElementById("wrapper").style.transform = 'rotate(180deg)';
            document.getElementById("wrapper").style.height = 'unset';
            let x = document.getElementsByClassName("card");
            let i;
            for (i = 0; i < x.length; i++) {
                x[i].style.transform = 'rotate(180deg)';
            }
        }else{
            document.getElementById("wrapper").style.transform = 'rotate(0deg)';
            // let x = document.getElementsByClassName("card");
            // let i;
            // for (i = 0; i < x.length; i++) {
            // x[i].style.transform = 'rotate(0deg)';
            // }
        }
        if(round_values >= 15 && 29 >= round_values){
            if(tranlsation != 0.3){
                translation = translation - 0.1;
            }
            document.getElementById("wrapper").style.transform = 'scale(-1)';
            document.getElementById("wrapper").style.transition = translation + 's';
            let x = document.getElementsByClassName("card");
            let i;
            for (i = 0; i < x.length; i++) {
                x[i].style.transform = 'rotate(180deg)';
            }
        }
    }
}
function calc_difficulty() {
    if (level <= 9) { // The level value cannot be lower than 9.
        level = 9;
    }
    // difficulty = (20 / 100) * level + difficulty; //calc the difficulty to scale with the level
    difficulty = (20 / 100) * level % 3 + difficulty; //calc the difficulty to scale with the level
    difficulty = Math.round(difficulty) // Makes the difficulty value a integer
}
function level_skins(){
            
    if(round_values > break_point_level_space){
        blackhole_size = blackhole_size + 10;
        document.getElementsByClassName("cos-portal")[0].style.display = "flex";
        document.getElementById("blackhole").style.width = blackhole_size + "%";
        let i;
        let x = document.getElementsByClassName("card");
            for (i = 0; i < x.length; i++) {
                document.getElementsByClassName("card")[i].style.backgroundImage = "url(assets/textures/iron_crate.png)";
                
            }
            document.getElementById("particles-js").style.backgroundImage = "url(assets/textures/space.png)";
    }
    if(round_values > break_point_level_slime){
        let i;
        document.getElementsByClassName("cos-portal")[0].style.display = "none";
        let x = document.getElementsByClassName("card");
            for (i = 0; i < x.length; i++) {
                document.getElementsByClassName("card")[i].style.backgroundImage = "url(assets/textures/slime_crate.png)";
                
            }
            document.getElementById("particles-js").style.backgroundImage = "url(assets/textures/slime-placeholder.png)";
    }
}

function make_playground() {
    //Loop out cards on the playground
    var i = 0;
    var card_ids = 0;
    for (var y = 0; y < newPlayground; y++) {
        var row = document.createElement('div');
        row.setAttribute('id', 'card-row' + y);
        row.setAttribute('class', 'card-row');
        document.getElementById("test-group").appendChild(row);
        for (i = 0; i < newPlayground; i++) { //Creates a new div for each loop wth the attributes and content set below.
            card_ids++;
            var div = document.createElement('div');
            div.setAttribute('class', 'card noSelect');
            div.setAttribute('id', card_ids);
            div.setAttribute('onClick', 'reply_click(this.id)'); // add an onClick event to the div that sends the id of it to the funcition reply_click()
            document.getElementById('card-row' + y).appendChild(div);
            /*Content*/
            if (showcontent == true) {
            let content = document.createElement('div');
            content.appendChild(document.createTextNode(card_ids));
            content.setAttribute('class', 'card-numbers');
            document.getElementById(card_ids).appendChild(content);
            
            //   document.getElementById(card_ids).classList.add("printid");
            }
        }
    }
}

function clear_playground() { //When called, makes the playground empty
    document.getElementById("test-group").innerHTML = "";
    clear_values();
}

function randomized() { // Fills the array with random numbers. Max number determines by level
    while (play_array.length < difficulty) {
        randoms = Math.floor(Math.random() * level);
        if (randoms != 0) {
            if (play_array.indexOf(randoms) === -1) {
                play_array.push(randoms);
            }
        }
    }
}

function reply_click(clicked_id) { // Grabs the value from the id on the div/card when it's clicked on.
    clicked_id = Number(clicked_id);
    console.log("level=" + level + "\n difficulty=" + difficulty + "\n array=" + play_array + "\n clicked_id=" + clicked_id); // Console info

    if (play_array.includes(clicked_id)) { // Takes the id from the div and searches in the array for it. Returns either true or false.
        // document.getElementById(clicked_id).style.border = "3px solid green"; // Makes the div/cards border green
        if (allow_click === 1) {
            if (!avoid_repeat.includes(clicked_id)) {
                document.getElementById(clicked_id).style.backgroundColor = "green";
                document.getElementById(clicked_id).style.backgroundImage = "url(assets/textures/crate-green.png)";
                avoid_repeat.push(clicked_id);
                correct_answers++;
                let x = document.getElementById("score").textContent;

                if (play_array.length === correct_answers) {
                    if (no_fail_round != 0) {
                        document.getElementById("score").innerHTML = parseInt(x) * 1 + 13;
                    } else {
                        document.getElementById("score").innerHTML = parseInt(x) * 2 + 30;
                    }
                    // alert("You survived this round!");
                    nextRound();
                }
            }
        }
    } else {
        //Avoid repeat fix
        if (allow_click === 1) {
            if (!avoid_repeat.includes(clicked_id)) {
                // document.getElementById(clicked_id).style.border = "3px solid red"; // Makes the div/cards border red
                document.getElementById(clicked_id).style.backgroundColor = "red";
                document.getElementById(clicked_id).style.backgroundImage = "url(assets/textures/crate_bad.png)";

                avoid_repeat.push(clicked_id);

                health--;
                let list = document.getElementById("health");
                list.removeChild(list.childNodes[0]);
                no_fail_round = 1;
                console.log("Liv: " + health);
                if (health == 0 && nofail === false) {
                    allow_click = 0;
                    document.getElementById("start-the-game-loose").style.display = "flex";
                    // alert("Game over!");
                    card_ids = card_ids + 1;
                    for(var xo = 1; card_ids <= xo; xo++){
                        if(play_array.includes(xo)){
                            document.getElementById(xo).style.backgroundColor = "green";
                            document.getElementById(xo).style.backgroundImage = "url(assets/textures/crate-green.png)";
                        }else{
                            document.getElementById(xo).style.backgroundColor = "red";
                            document.getElementById(xo).style.backgroundImage = "url(assets/textures/crate_bad.png)";
                        }
                        
                    }
                    
                    
                }
            }
        }

    }
    document.getElementById("alerted").innerHTML = clicked_id; // Just prints it out on the screen for testing
}