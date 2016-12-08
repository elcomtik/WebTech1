var canvas;
			var ctx;
			var x = 400;
			var y = 460;
			var WIDTH = 800;
			var HEIGHT = 500;
			var dragok = false;
			var pocetbodov = 0;
			var cislo;
			generuj();
			var max = 0;

			function zapis() {
				document.getElementById("points").innerHTML=pocetbodov;
				x=400-15;
				y=460-15;
				generuj();
			}

			function generuj() {
				cislo = Math.floor(Math.random() * 30) +1;
			}

			function rect(x,y,w,h) {
			 ctx.beginPath();
			 ctx.rect(x,y,w,h);
			 ctx.closePath();
			 ctx.fill();
			}

			function clear()
			{
				ctx.clearRect(0, 0, WIDTH, HEIGHT);
			}

			function init()
			{
				canvas = document.getElementById("canvas");
				ctx = canvas.getContext("2d");
				return setInterval(draw, 10);
			}

			function draw()
			{
				clear();
				ctx.fillStyle = "#111111";
				rect(0,0,WIDTH,HEIGHT);

				ctx.fillStyle = "#777777";
				rect(20, 50, 100, 100);

				ctx.font = "20px Verdana";
				ctx.fillStyle = "#000000";
				ctx.fillText("párne", 38, 110);
				
				ctx.fillStyle = "#777777";
				rect(680, 50, 100, 100);

				ctx.fillStyle = "#000000";
				ctx.fillText("nepárne", 690, 110);

				
				ctx.fillStyle = "#FFFFFF";
				
				ctx.font = "30px Verdana";
				ctx.fillText(cislo, 390, 240);

				rect(x - 15, y - 15, 30, 30);
			}

			function myMove(e)
			{
				//console.log(x);
				//console.log(y);
				if (dragok)
				{
					x = e.pageX - canvas.offsetLeft;
					y = e.pageY - canvas.offsetTop;
				}
			}

			function myDown(e)
			{
				if (e.pageX < x + 15 + canvas.offsetLeft && e.pageX > x - 15 +
				canvas.offsetLeft && e.pageY < y + 15 + canvas.offsetTop &&
				e.pageY > y -15 + canvas.offsetTop)
				{
					x = e.pageX - canvas.offsetLeft;
					y = e.pageY - canvas.offsetTop;
					dragok = true;
					canvas.onmousemove = myMove;
				}


			}

			function myUp()
			{
				dragok = false;
				canvas.onmousemove = null;
				if (x>20 && x<120 && y>50 && y<150) //lave vedierko
				{
					if (cislo%2==0){
						pocetbodov++;
						if (pocetbodov>max)
							max=pocetbodov;
						document.getElementById("maximum").innerHTML=max;
						zapis();
					}
					else
					{
						pocetbodov-=2;
						if (pocetbodov<0)
						{
							alert("Koniec hry !!");
							pocetbodov=0;
						}
						zapis();
					}
				}
				if (x>680 && x<780 && y>50 && y<150 ) //prave vedierko
				{
					if (cislo%2==1){
						pocetbodov++;
						if (pocetbodov>max)
							max=pocetbodov;
						//console.log(pocetbodov);
						
						document.getElementById("maximum").innerHTML=max;
						zapis();  
					}
					else
					{
						pocetbodov-=2;
						if (pocetbodov<0)
						{
							alert("Koniec hry !!");
							pocetbodov=0;
						}
						zapis();
					}
				}
			}

			init();
			canvas.onmousedown = myDown;
			canvas.onmouseup = myUp;