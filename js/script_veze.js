document.getelementById("best_time").addEventListener("load", get_result);
var canvas;
var ctx;
var x;
var y;
var WIDTH = 750;
var HEIGHT = 500;
var dragok = false;
var tower1=[];
var tower2=[];
var tower3=[];
var diff=5;
var src;
var element;
var img = new Image();
var run;
var name;
var time;
var time_val;
var best_time;

function rect(x,y,w,h) {
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
}

function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function draw() {
    clear();
    ctx.fillStyle = "#FFFFFF";
    rect(0,0,WIDTH,HEIGHT);
    ctx.fillStyle = "#000000";
    rect(0,480,WIDTH,HEIGHT-480);
    rect(123,100,5,400);
    rect(123,100,5,400);
    rect(373,100,5,400);
    rect(623,100,5,400);
    ctx.fillStyle = "#444444";
    for (i=0; i<tower1.length;i++)
        rect(tower1[i].x,(tower1[i].y),tower1[i].size,40);
    for (i=0; i<tower2.length;i++)
        rect(tower2[i].x,(tower2[i].y),tower2[i].size,40);
    for (i=0; i<tower3.length;i++)
        rect(tower3[i].x,(tower3[i].y),tower3[i].size,40);

}

function myMove(e){
    if (dragok){
        if (src===1)
        {
            x = tower1[0].x = e.pageX - canvas.offsetLeft - tower1[0].size/2;
            y = tower1[0].y = e.pageY - canvas.offsetTop - 20;
        }
        if (src===2)
        {
            x = tower2[0].x = e.pageX - canvas.offsetLeft - tower2[0].size/2;
            y = tower2[0].y = e.pageY - canvas.offsetTop - 20;
        }
        if (src===3)
        {
            x = tower3[0].x = e.pageX - canvas.offsetLeft - tower3[0].size/2;
            y = tower3[0].y = e.pageY - canvas.offsetTop - 20;
        }

    }
}

function myDown(e){
    if (!tower1.length==0)
    {
        console.log(e.pageX +','+ e.pageY+','+canvas.offsetLeft+','+canvas.offsetTop);
        if (((e.pageX - canvas.offsetLeft) > tower1[0].x) &&
            ((e.pageX - canvas.offsetLeft)<(tower1[0].x+tower1[0].size)) &&
            ((e.pageY - canvas.offsetTop) > tower1[0].y) &&
            ((e.pageY - canvas.offsetTop) < (tower1[0].y+40)))
        {
            console.log('true');
            dragok = true;
            src=1;
            canvas.onmousemove = myMove;
        }
    }
    if (!tower2.length==0)
    {
        console.log(e.pageX +','+ e.pageY+','+canvas.offsetLeft+','+canvas.offsetTop);
        if (((e.pageX - canvas.offsetLeft) > tower2[0].x) &&
            ((e.pageX - canvas.offsetLeft)<(tower2[0].x+tower2[0].size)) &&
            ((e.pageY - canvas.offsetTop) > tower2[0].y) &&
            ((e.pageY - canvas.offsetTop) < (tower2[0].y+40)))
        {
            console.log('true');
            dragok = true;
            src=2;
            canvas.onmousemove = myMove;
        }
    }
    if (!tower3.length==0)
    {
        console.log(e.pageX +','+ e.pageY+','+canvas.offsetLeft+','+canvas.offsetTop);
        if (((e.pageX - canvas.offsetLeft) > tower3[0].x) &&
            ((e.pageX - canvas.offsetLeft)<(tower3[0].x+tower3[0].size)) &&
            ((e.pageY - canvas.offsetTop) > tower3[0].y) &&
            ((e.pageY - canvas.offsetTop) < (tower3[0].y+40)))
        {
            console.log('true');
            dragok = true;
            src=3;
            canvas.onmousemove = myMove;
        }
    }
}

function myUp(){
    if (x > 0 && x < 250)
    {
        if (tower1.length)
        {
            if (src===1)
            {
                if (tower1[0].size > tower1[0].size)
                {
                    tower1[0].x = 125 - (tower1[0].size/2);
                    tower1[0].y = HEIGHT-tower1.length * 50 + 5 - 20;
                    src = 0;
                }
            }
            if (src===2)
            {
                if (tower2[0].size > tower1[0].size)
                {
                    tower2[0].x = 375 - (tower2[0].size/2);
                    tower2[0].y = HEIGHT-tower2.length * 50 + 5 - 20;
                    src = 0;
                }
            }
            if (src===3)
            {
                if (tower3[0].size > tower1[0].size)
                {
                    tower3[0].x = 625 - (tower3[0].size/2);
                    tower3[0].y = HEIGHT-tower3.length * 50 + 5 - 20;
                    src = 0;
                }
            }
        }
        if (src===1)
        {
            element = tower1.shift();
            element.x = 125 - (element.size/2);
            element.y = HEIGHT-(tower1.length + 1)*50+5-20;
            tower1.unshift(element);
            src = 0;
        }
        if (src ===2)
        {
            element = tower2.shift();
            element.x = 125 - (element.size/2);
            element.y = HEIGHT-(tower1.length + 1)*50+5-20;
            tower1.unshift(element);
            src = 0;
        }
        if (src===3)
        {
            element = tower3.shift();
            element.x = 125 - (element.size/2);
            element.y = HEIGHT-(tower1.length + 1)*50+5-20;
            tower1.unshift(element);
            src = 0;
        }

    }
    if (x > 250 && x < 500)
    {
        if (tower2.length)
        {
            if (src === 1)
            {
                if (tower1[0].size > tower2[0].size)
                {
                    tower1[0].x = 125 - (tower1[0].size / 2);
                    tower1[0].y = HEIGHT - tower1.length * 50 + 5 - 20;
                    src = 0;
                }
            }
            if (src === 2)
            {
                if (tower2[0].size > tower2[0].size)
                {
                    tower2[0].x = 375 - (tower2[0].size / 2);
                    tower2[0].y = HEIGHT - tower2.length * 50 + 5 - 20;
                    src = 0;
                }
            }
            if (src === 3)
            {
                if (tower3[0].size > tower2[0].size)
                {
                    tower3[0].x = 625 - (tower3[0].size / 2);
                    tower3[0].y = HEIGHT - tower3.length * 50 + 5 - 20;
                    src = 0;
                }
            }
        }
        if (src===1)
        {
            element = tower1.shift();
            element.x = 375 - (element.size/2);
            element.y = HEIGHT-(tower2.length + 1)*50+5-20;
            tower2.unshift(element);
            src = 0;
        }
        if (src ===2)
        {
            element = tower2.shift();
            element.x = 375 - (element.size/2);
            element.y = HEIGHT-(tower2.length + 1)*50+5-20;
            tower2.unshift(element);
            src = 0;

        }
        if (src===3)
        {
            element = tower3.shift();
            element.x = 375 - (element.size/2);
            element.y = HEIGHT-(tower2.length + 1)*50+5-20;
            tower2.unshift(element);
            src = 0;
        }
    }
    if (x > 500 && x < 750)
    {
        if (tower3.length)
        {
            if (src === 1)
            {
                if (tower1[0].size > tower3[0].size)
                {
                    tower1[0].x = 125 - (tower1[0].size / 2);
                    tower1[0].y = HEIGHT - tower1.length * 50 + 5 - 20;
                    src = 0;
                }
            }
            if (src === 2)
            {
                if (tower2[0].size > tower3[0].size)
                {
                    tower2[0].x = 375 - (tower2[0].size / 2);
                    tower2[0].y = HEIGHT - tower2.length * 50 + 5 - 20;
                    src = 0;
                }
            }
            if (src === 3)
            {
                if (tower3[0].size > tower3[0].size)
                {
                    tower3[0].x = 625 - (tower3[0].size / 2);
                    tower3[0].y = HEIGHT - tower3.length * 50 + 5 - 20;
                    src = 0;
                }
            }
        }
        if (src === 1)
        {
            element = tower1.shift();
            element.x = 625 - (element.size / 2);
            element.y = HEIGHT - (tower3.length + 1) * 50 + 5 - 20;
            tower3.unshift(element);
            src = 0;
        }
        if (src === 2)
        {
            element = tower2.shift();
            element.x = 625 - (element.size / 2);
            element.y = HEIGHT - (tower3.length + 1) * 50 + 5 - 20;
            tower3.unshift(element);
            src = 0;
        }
        if (src === 3)
        {
            element = tower3.shift();
            element.x = 625 - (element.size / 2);
            element.y = HEIGHT - (tower3.length + 1) * 50 + 5 - 20;
            tower3.unshift(element);
            src = 0;
        }
        if (tower3.length==diff)
        {
            var diff_name;
            if (diff == 3)
                diff_name="Easy";
            if (diff == 5)
                diff_name="Medium";
            if (diff ==  7)
                diff_name="Hard";
            clearInterval(run);
            clearInterval(time);
            if (best_time="undefined")
            {
                best_time = time_val;
                localStorage.setItem("besttime", best_time);
            }
            if (time_val < best_time)
            {
                localStorage.removeItem("besttime");
                localStorage.setItem("besttime",time_val);
                document.getElementById("best_time").innerHTML=time_val+'s';
            }
            ctx.drawImage(img,0,0,WIDTH,200);


        }
    }
    dragok = false;
    canvas.onmousemove = null;
}

function init() {
    canvas = null;
    ctx = null;
    img.src = '../images/cg_veze.jpg';
    x=0;
    y=0;
    dragok=false;
    tower1=[];
    tower2=[];
    tower3=[];
    src=0;
    element=null;
    canvas = document.getElementById("canvas");
    diff = parseInt(document.getElementById("sel1").value);
    if (diff ==0)
        diff=5;
    canvas.width=WIDTH;
    canvas.height = HEIGHT;
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    rect(0,0,WIDTH,HEIGHT);
    ctx.fillStyle = "#000000";
    rect(0,480,WIDTH,HEIGHT-480);
    rect(123,100,5,400);
    rect(123,100,5,400);
    rect(373,100,5,400);
    rect(623,100,5,400);
    for (var i=0; i<diff;i++)
    {
        var s = (150/diff*(i+1))
        tower1.push({x:(125-(s/2)),y:(HEIGHT-(diff-i)*50+5-20),size: s});
    }
    ctx.fillStyle = "#444444";
    for (i=0; i<tower1.length;i++)
        rect(tower1[i].x,(tower1[i].y),tower1[i].size,40);
    canvas.onmousedown = myDown;
    canvas.onmouseup = myUp;
    return setInterval(draw, 10);
}
function time_update() {
    document.getElementById("time").innerHTML=++time_val+'s';
}

function begin_game() {
    name = document.getElementById("usr").value;
    if (name=="")
    {
        alert("Name must be filled !");
    }
    else
    {
        if (run)
            clearInterval(run);
        run = init();
        time_val=0;
        if (time)
            clearInterval(time);
        time = setInterval(time_update, 1000);
    }
}

function get_result() {
    best_time=0;
    best_time = localStorage.besttime;
    if (best_time != "undefined")
    {
        document.getElementById("best_time").innerHTML = localStorage.besttime+'s';
    }


}