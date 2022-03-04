// const back1 = new Image();
// back1.src = "./img/back.png";
const back2 = new Image();
back2.src = "./img/background.png";

const wb = new Image();
wb.src = "./img/wb.png";
// const back3 = new Image();
// back3.src = "./img/front.png";

const wave_img = new Image();
wave_img.src = "./img/wave.png";

const shouse1 = new Image();
shouse1.src = "./img/shouse1.png";
const large_house = new Image();
large_house.src = "./img/l2.png";

// var layer1 = new layer(back1,0.25);
var layer2 = new layer(back2,2);
// var layer3 = new layer(back3,0.75);
play = 1;
const player_img = new Image();
player_img.src = "./img/player_happy_r.png"

var player = {
    x:400,
    y:250,
    h:100,
    w:100,
    vy:-5,
    draw:function(){
        ctx.drawImage(player_img, player.x, ctx.canvas.height - player.y, player.h, player.w);
    }
};
let temp = 1;
let count = 0;
var wave = {
    x:-400,
    y:50,
    h:500,
    w:300,
    s_mod:2,
    draw:function(){
        this.x += 2 * this.s_mod;
        if(temp == 1){
            if(this.y <= 350){
                this.y += this.s_mod * temp;
            }
        }else{ // going down
            this.y += 0.2 * this.s_mod * temp;
        }
        count++;
        if(count == 30){
            temp *= -1;
            count = 0;
        }
        //ctx.fillRect(wave.x,ctx.canvas.height - wave.y,wave.h,wave.w)
        ctx.drawImage(wave_img, wave.x, ctx.canvas.height - wave.y, wave.w, wave.h);
        wave2.draw();
    }
};
var wave2 = {
    x:-500,
    y:20,
    h:400,
    w:250,
    s_mod:2,
    draw:function(){
        this.x += 2 * this.s_mod;
        if(temp == 1){
            if(this.y <= 350){
                this.y += this.s_mod * temp;
            }
        }else{ // going down
            this.y += 0.1 * this.s_mod * temp;
        }
        count++;
        if(count == 30){
            temp *= -1;
            count = 0;
        }
        //ctx.fillRect(wave.x,ctx.canvas.height - wave.y,wave.h,wave.w)
        ctx.drawImage(wave_img, wave2.x, ctx.canvas.height - wave2.y, wave2.w, wave2.h);
    }
};

var grounded = 0; //flag for if player can jump

//add new objects belows this
//max jump ~ 170
var ground = new rec(large_house,-200,100,900,100);
var ground2 = new rec(large_house,650,200,400,200);
var ground3 = new rec(large_house,1050,300,350,300);
var ground4 = new rec(large_house,1400,350,300,350);
var ground5 = new rec(large_house,1950,350,500,50);
var ground6 = new rec(large_house,1900,90,500,90);
var ground7 = new rec(large_house,2500,400,500,50);
var ground8 = new rec(large_house,2900,400,500,50);

//above this 
var collectables = [{
    x:1600,
    y:420,
    h:100,
    w:100
},{
    x:1600,
    y:220,
    h:100,
    w:100
}];
var final = document.getElementById("final");
var val_y = 0;
function update(){// update loop runs 30 times a sec
    val_y += 20;
    if(play){
        if(collision(player,wave)){
            player_img.src = "./img/player_sad_l.png";
            final.innerHTML = "You lose";
            exit();
        }
        if(player.y <= 0){
            player_img.src = "./img/player_sad_l.png";
            final.innerHTML = "You lose";               
            exit();   
            }
        }
        if(obj_arr[0].x <= -3000){
            final.innerHTML = "YOU WIN!";
            exit();
        }
        //SOMEHOW WORKS PLZ DONT TOUCH
        
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height); //clears canvas
        ctx.drawImage(wb, 0, val_y, 9000, 200);
        for(layer of layers_arr){//draws background
            layer.draw();
        }

        if(up && grounded){
            grounded = 0;
            player.vy = 40;       
        }

        player.y += player.vy;
        player.vy -= (player.vy < -5) ? 0 : 5;

        if(right){
            player_img.src = "./img/player_happy_r.png"
            for(layer of layers_arr){
                layer.update(-1);
            }
            wave.x -= hori_speed;
            wave2.x -= hori_speed;
            for (i of obj_arr){
                i.x -= hori_speed;
            }
        }
        if(left){
            player_img.src = "./img/player_happy_l.png";
            for(layer of layers_arr){
                layer.update(1);
            }
            wave.x += hori_speed;
            wave2.x += hori_speed;
            for (i of obj_arr){
                i.x += hori_speed;
            }
        }
        for(i of obj_arr){
            if(collision(player, i)){   
                // returns 1 if player does not collide with 'i'
                //player.y = i.y + player.h;
                player.vy = 0;
                grounded = 1;
            }
            i.draw();
        }
        wave.draw();
        player.draw();
}
if(play){
    setInterval(update,1000/30); 
}
