///////////////////////////////////
//Student:
// Sergey Radimashvili ID:317841526
///////////////////////////////////
$("document").ready(function() {

/////////////////////////////Help Section/////////////////////////////
$(".HelpButton").click(function()     // help lightbox function
{	
	console.log("ggg");
	$('<section id="overlay"></section>')
       .css("top", "0")
       .css('opacity', '0')
       .animate({'opacity': '0.5'}, 'slow')
       .appendTo('body');
	$(".Help").show("slow");
	$("#overlay").click(function() 
	{
		$(".Help").hide("slow");
    	$("#overlay").fadeOut('slow', function() 
		{
    		$(this).remove();
		});
	});
});

//////////////////////canvas///////////////////////////////
var CentreCanvasPoint = 600;         // center of canvas
var CanvasSizePoint = 1200;			// size of canvas

var canvas = document.getElementById("jopa");
var contex = canvas.getContext('2d');
var PageBackGround = "#369369";
contex.fillStyle = PageBackGround;
contex.fillRect(0, 0, CanvasSizePoint, CanvasSizePoint);


//////////////////////PutPixel function////////////////////////////
function putpixel( x, y, color)
{ 	
 	contex.fillStyle = color;
 	contex.fillRect(x, y, 1, 1);
 	if (x<GlobalMinX)
 	{
 		GlobalMinX=x;
 	}
 	if (x>GlobalMaxX)
 	{
 		GlobalMaxX=x;
 	}
 	if (y<GlobalMinY)
 	{
 		GlobalMinY=y;
 	}
 	if (y>GlobalMaxY)
 	{
 		GlobalMaxY=y;
 	}
 }
//////////////////DrawCurve////////////////////////////////

function DrawBezQ(x1, y1, x2, y2, x3, y3, x4, y4, t, color)
{
	var temp = 0;
	var xOne,yOne,xTwo,yTwo;
	xOne = Math.pow((1-temp),3)*x1+3*(Math.pow((1-temp),2))*temp*x2+3*(1-temp)*Math.pow(temp,2)*x3+Math.pow(temp,3)*x4;
	yOne = Math.pow((1-temp),3)*y1+3*(Math.pow((1-temp),2))*temp*y2+3*(1-temp)*Math.pow(temp,2)*y3+Math.pow(temp,3)*y4;
	while((temp<1) && (t<1) && (t>0))
	{
		temp = temp+t;
		xTwo = Math.pow((1-temp),3)*x1+3*(Math.pow((1-temp),2))*temp*x2+3*(1-temp)*Math.pow(temp,2)*x3+Math.pow(temp,3)*x4;
		yTwo = Math.pow((1-temp),3)*y1+3*(Math.pow((1-temp),2))*temp*y2+3*(1-temp)*Math.pow(temp,2)*y3+Math.pow(temp,3)*y4;	
		DrawLine(xOne, yOne, xTwo, yTwo, color);
		xOne = xTwo;
		yOne = yTwo;
	}

}

//////////////////DrawLine////////////////////////////////

function DrawLine (x1, y1, x2, y2, color)
{
	var temp;
	if(x2<x1)
	{
		temp=x1;
		x1=x2;
		x2=temp;
		temp=y1;
		y1=y2;
		y2=temp;
	}

	var m = (y2-y1)/(x2-x1);
	var x = x1;
	var y = y1;
	
	while(x<x2)
	{
		if ( (m<=1) && (m>=-1) )
						{
						y=y1+m*(x-x1);
						putpixel( x , y, color);
						x++;
						}
		else if( m>1 )
						{
						x=(y-y1+m*x1)/m;
						putpixel( x , y, color);
						y++;	
						}
		else if( m<-1 )
						{
						x=(y-y1+m*x1)/m;
						putpixel( x , y, color);
						y--;
						}
	}
}
////////////////////Polygon////////////////////////////////

function DrawPoligon( x1 , y1 ,x2 , y2 , n , color)
{
	var radius = Math.sqrt(Math.pow((x2-x1),2) + Math.pow((y2-y1),2));	 		
	var xCentr = x1;
	var yCentr = y1;
	var xPol1, yPol1, xPol2, yPol2, tmp = 0;
	var teta = (2*Math.PI)/n;
	xPol1 = x1+radius;
	yPol1 = y1;
	xPol2 = xCentr+radius*Math.cos(teta);
	yPol2 = yCentr+radius*Math.sin(teta);
	DrawLine(xPol1, yPol1, xPol2, yPol2, color);
	while(tmp<=2*Math.PI*radius)
	{				
		xPol2 = xCentr+radius*Math.cos(tmp);
		yPol2 = yCentr+radius*Math.sin(tmp);
		DrawLine(xPol1, yPol1, xPol2, yPol2, color);
		xPol1 = xPol2;
		yPol1 = yPol2;
		tmp = tmp+teta;
	}
 }


////////////////////////////////////////////////////

function DrawCircle (x1, y1, x2, y2, color)
{
	var radius = Math.sqrt(Math.pow((x2-x1),2) + Math.pow((y2-y1),2));
	var x = radius;
	var y = 0;
	var decisionOver2 = 1-x;   

	while( y <= x )													// split circle to 8 areas and do the calculation
	{
	    putpixel( x + x1,  y + y1 ,color); 
	    putpixel( y + x1,  x + y1,color); 
	    putpixel(-x + x1,  y + y1,color); 
	    putpixel(-y + x1,  x + y1,color); 
	    putpixel(-x + x1, -y + y1,color); 
	    putpixel(-y + x1, -x + y1,color); 
	    putpixel( x + x1, -y + y1,color); 
	    putpixel( y + x1, -x + y1,color); 
	    y++;
	   	if (decisionOver2<=0)							// deside if it's on the circle or not
		{
			decisionOver2 += 2*y+1;   
		}
	   	else
		{
	   		x--;
	   		decisionOver2 += 2*(y-x)+1;
		}
  	}
}

//////////////////////DrawPicture//////////////////////////////////
function DrawPic ()
{
	var c1 = 0, c2 = 0, c3 = 0;				
	while(c1<Picture[0].length)
	{
		DrawCircle(Picture[0][c1][0],Picture[0][c1][1],Picture[0][c1][2],Picture[0][c1][3],Picture[0][c1][4]);
		c1++;
	}
	while(c2<Picture[1].length)
	{
		DrawLine(Picture[1][c2][0],Picture[1][c2][1],Picture[1][c2][2],Picture[1][c2][3],Picture[1][c2][4]);
		c2++;
	}
	while(c3<Picture[2].length)
	{
		DrawBezQ(Picture[2][c3][0],Picture[2][c3][1],Picture[2][c3][2],Picture[2][c3][3],Picture[2][c3][4],
		Picture[2][c3][5],Picture[2][c3][6],Picture[2][c3][7],Picture[2][c3][8],Picture[2][c3][9]);
		c3++;
	}
}

/////////////////////Move////////////////////////////////////
function MovePic(MoveToX, MoveToY)
{
	contex.fillStyle = "#369369";
	contex.fillRect(0,0,CanvasSizePoint,CanvasSizePoint);
	var DeltaX = MoveToX-(GlobalMinX+(GlobalMaxX-GlobalMinX)/2);
	var DeltaY = MoveToY-(GlobalMinY+(GlobalMaxY-GlobalMinY)/2);
	for (var k=0;k<Picture[0].length;k++) 	
	{
		GlobalMaxX = -10000;
		GlobalMaxY = -10000;
		GlobalMinX = 10000;
		GlobalMinY = 10000;
		var a = 0, b = 1;
		while(a<4)
		{
			Picture[0][k][a] = Picture[0][k][a]+DeltaX; // for for X
			a = a+2;						
		}
		while(b<4)
		{
			Picture[0][k][b] = Picture[0][k][b]+DeltaY;  // For for Y
			b = b+2;
		}	
	}	
	for (var k=0;k<Picture[1].length;k++) 	
	{
		var a = 0, b = 1;
		while(a<4)
		{
			Picture[1][k][a] = Picture[1][k][a]+DeltaX; // for for X
			a = a+2;
		}
		while(b<4)
		{
			Picture[1][k][b]=Picture[1][k][b]+DeltaY;  // For for Y
			b = b+2;
		}		
	}
	for (var k=0;k<Picture[2].length;k++) 	
	{
		var a = 0, b = 1;
		while(a<8)
		{
			Picture[2][k][a] = Picture[2][k][a]+DeltaX; // for for X
			a = a+2;
		}
		while(b<8)
		{
			Picture[2][k][b] = Picture[2][k][b]+DeltaY;  // For for Y
			b = b+2;
		}		
	}
	DrawPic();
}

///////////////////////ZooM/////////////////////////////////

function ZoomPic(PointZoomX, PointZoomY ) //Zoom function
{
	contex.fillStyle = "#369369";
	contex.fillRect(0, 0, CanvasSizePoint, CanvasSizePoint);
	var ZoomIndex = 0;
	if (ZoomFu == 0)   //zoom in 
	{
		ZoomIndex = 1.2;
	}
	else if(ZoomFu==1)   // zoom out
	{
		ZoomIndex = 0.8;
	}
	var CentreX = GlobalMinX+(GlobalMaxX-GlobalMinX)/2;   // X center from 0;0
	var CentreY = GlobalMinY+(GlobalMaxY-GlobalMinY)/2;   // Y center from 0;0
	var DeltaPointX = (GlobalMaxX-GlobalMinX)/2+GlobalMinX-PointZoomX;  // delta from center to zoom point 
	var DeltaPointY = (GlobalMaxY-GlobalMinY)/2+GlobalMinY-PointZoomY;  // delta from center to zoom point

	for (var k=0;k<Picture[0].length;k++) 	
	{
		var a = 0;
		while(a<4)
		{
			Picture[0][k][a] = (Picture[0][k][a]-CentreX)*ZoomIndex+CentreCanvasPoint+DeltaPointX*ZoomIndex; // for for X
			Picture[0][k][a+1] = (Picture[0][k][a+1]-CentreY)*ZoomIndex+CentreCanvasPoint+DeltaPointY*ZoomIndex;  // For for Y
			a = a+2;						
		}					
	}							
	for (var k=0;k<Picture[1].length;k++) 	
	{
		var a = 0;
		while(a<4)
		{
			Picture[1][k][a] = (Picture[1][k][a]-CentreX)*ZoomIndex+CentreCanvasPoint+DeltaPointX*ZoomIndex; // for for X
			Picture[1][k][a+1] = (Picture[1][k][a+1]-CentreY)*ZoomIndex+CentreCanvasPoint+DeltaPointY*ZoomIndex;  // For for Y
			a = a+2;
		}							
	}
	for (var k=0;k<Picture[2].length;k++) 	
	{
		var a = 0;
		while(a<8)
		{
			Picture[2][k][a] = (Picture[2][k][a]-CentreX)*ZoomIndex+CentreCanvasPoint+DeltaPointX*ZoomIndex; // for for X
			Picture[2][k][a+1] = (Picture[2][k][a+1]-CentreY)*ZoomIndex+CentreCanvasPoint+DeltaPointY*ZoomIndex;  // For for Y
			a = a+2;
		}	
	}
		GlobalMaxX = -10000;
		GlobalMaxY = -10000;
		GlobalMinX = 10000;
		GlobalMinY = 10000;
		DrawPic();
}
///////////////////////Rotate/////////////////////////////////

function RotatePic(RotatePointX, RotatePointY , UserDegrees)
{
	contex.fillStyle = "#369369";
	contex.fillRect(0,0,CanvasSizePoint,CanvasSizePoint);  ////clear page
	var RotateIndex = (-UserDegrees);
	var RotateIndexRad = (RotateIndex*Math.PI)/180;
	for (var k=0;k<Picture[0].length;k++) 	
	{  
		var a = 0, b = 1;
		while(a<4)
		{
			var radius = Math.sqrt(Math.pow((Picture[0][k][a]-RotatePointX),2)+Math.pow((Picture[0][k][a+1]-RotatePointY),2));
			var OldX = Picture[0][k][a];
			if((Picture[0][k][a+1]-RotatePointY)<0)
			{
				Picture[0][k][a] = radius*(Math.cos(RotateIndexRad-(Math.acos((Math.pow((Picture[0][k][a]-RotatePointX),2)+Math.pow(radius,2)-Math.pow((Picture[0][k][a+1]-RotatePointY),2))/(2*(Picture[0][k][a]-RotatePointX)*radius)))))+RotatePointX;
				Picture[0][k][a+1] = radius*(Math.sin(RotateIndexRad-(Math.acos((Math.pow((OldX-RotatePointX),2)+Math.pow(radius,2)-Math.pow((Picture[0][k][a+1]-RotatePointY),2))/(2*(OldX-RotatePointX)*radius)))))+RotatePointY;
			}
			else
			{
				Picture[0][k][a] = radius*(Math.cos(RotateIndexRad+(Math.acos((Math.pow((Picture[0][k][a]-RotatePointX),2)+Math.pow(radius,2)-Math.pow((Picture[0][k][a+1]-RotatePointY),2))/(2*(Picture[0][k][a]-RotatePointX)*radius)))))+RotatePointX;
				Picture[0][k][a+1] = radius*(Math.sin(RotateIndexRad+(Math.acos((Math.pow((OldX-RotatePointX),2)+Math.pow(radius,2)-Math.pow((Picture[0][k][a+1]-RotatePointY),2))/(2*(OldX-RotatePointX)*radius)))))+RotatePointY;
			}
			a = a+2;						
		}
	}
	for (var k=0;k<Picture[1].length;k++) 	
	{
		var a = 0,b=1;
		while(a<4)
		{
			var radius = Math.sqrt(Math.pow((Picture[1][k][a]-RotatePointX),2)+Math.pow((Picture[1][k][a+1]-RotatePointY),2));
			var OldX = Picture[1][k][a];
			if((Picture[1][k][a+1]-RotatePointY)<0)
			{
				Picture[1][k][a] = radius*(Math.cos(RotateIndexRad-(Math.acos((Math.pow((Picture[1][k][a]-RotatePointX),2)+Math.pow(radius,2)-Math.pow((Picture[1][k][a+1]-RotatePointY),2))/(2*(Picture[1][k][a]-RotatePointX)*radius)))))+RotatePointX;
				Picture[1][k][a+1] = radius*(Math.sin(RotateIndexRad-(Math.acos((Math.pow((OldX-RotatePointX),2)+Math.pow(radius,2)-Math.pow((Picture[1][k][a+1]-RotatePointY),2))/(2*(OldX-RotatePointX)*radius)))))+RotatePointY;
			}
			else
			{
				Picture[1][k][a] = radius*(Math.cos(RotateIndexRad+(Math.acos((Math.pow((Picture[1][k][a]-RotatePointX),2)+Math.pow(radius,2)-Math.pow((Picture[1][k][a+1]-RotatePointY),2))/(2*(Picture[1][k][a]-RotatePointX)*radius)))))+RotatePointX;
				Picture[1][k][a+1] = radius*(Math.sin(RotateIndexRad+(Math.acos((Math.pow((OldX-RotatePointX),2)+Math.pow(radius,2)-Math.pow((Picture[1][k][a+1]-RotatePointY),2))/(2*(OldX-RotatePointX)*radius)))))+RotatePointY;
			}			
			a = a+2;
		}
	}
	for (var k=0;k<Picture[2].length;k++) 	
	{
		var a = 0, b = 1;
		while(a<8)
		{
			var radius = Math.sqrt(Math.pow((Picture[2][k][a]-RotatePointX),2)+Math.pow((Picture[2][k][a+1]-RotatePointY),2));
			var OldX = Picture[2][k][a];
			if((Picture[2][k][a+1]-RotatePointY)<0)
			{
				Picture[2][k][a] = radius*(Math.cos(RotateIndexRad-(Math.acos((Math.pow((Picture[2][k][a]-RotatePointX),2)+Math.pow(radius,2)-Math.pow((Picture[2][k][a+1]-RotatePointY),2))/(2*(Picture[2][k][a]-RotatePointX)*radius)))))+RotatePointX;
				Picture[2][k][a+1] = radius*(Math.sin(RotateIndexRad-(Math.acos((Math.pow((OldX-RotatePointX),2)+Math.pow(radius,2)-Math.pow((Picture[2][k][a+1]-RotatePointY),2))/(2*(OldX-RotatePointX)*radius)))))+RotatePointY;
			}
			else
			{
				Picture[2][k][a] = radius*(Math.cos(RotateIndexRad+(Math.acos((Math.pow((Picture[2][k][a]-RotatePointX),2)+Math.pow(radius,2)-Math.pow((Picture[2][k][a+1]-RotatePointY),2))/(2*(Picture[2][k][a]-RotatePointX)*radius)))))+RotatePointX;
				Picture[2][k][a+1] = radius*(Math.sin(RotateIndexRad+(Math.acos((Math.pow((OldX-RotatePointX),2)+Math.pow(radius,2)-Math.pow((Picture[2][k][a+1]-RotatePointY),2))/(2*(OldX-RotatePointX)*radius)))))+RotatePointY;
			}
			a = a+2;
		}
	}
	GlobalMaxX = -10000;
	GlobalMaxY = -10000;
	GlobalMinX = 10000;
	GlobalMinY = 10000;
	DrawPic();
}

////////////////////Shearing//////////////////////////////
function ShearingPicX (MouseDownX, MouseUpX, MouseDownY)
{
	contex.fillStyle = "#369369";
	contex.fillRect(0,0,CanvasSizePoint,CanvasSizePoint);
	switch(ShearingConstPointFunc)
	{
		case 1:
			ShearConstY = 0;  // top page
			break;
		case 2:
			ShearConstY = GlobalMinY; // top boat 
			break;
		case 3:
			ShearConstY = GlobalMaxY;   // bottom boat
			break;
		case 4:
			ShearConstY = CanvasSizePoint;   // bottom page
			break;
	}
	var ShearingIndex = (MouseDownX-MouseUpX)/(ShearConstY-MouseDownY);
	if( ShearConstY == 0 || ShearConstY == GlobalMinY )
	{
		if((ShearConstY-MouseDownY)<0)
		{	}
		else
		{
			(ShearingIndex = ShearingIndex*(-1));
		}
	}
	else
	{
		if((ShearConstY-MouseDownY)>=0)
		{	}
		else
		{
			(ShearingIndex = ShearingIndex*(-1));
		}
	}
	for(var k=0;k<Picture[0].length;k++) 	
	{ 
		var a = 0;
		while(a<4)
		{
			Picture[0][k][a] = Picture[0][k][a]+(ShearingIndex*(Picture[0][k][a+1]-ShearConstY));
			a = a+2;						
		}	
	}									
	for(var k=0;k<Picture[1].length;k++) 	
	{
		var a = 0;
		while(a<4)
		{
			Picture[1][k][a] = Picture[1][k][a]+(ShearingIndex*(Picture[1][k][a+1]-ShearConstY));
			a = a+2;
		}
	}
	for (var k=0;k<Picture[2].length;k++) 	
	{
		var a = 0;
		while(a<8)
		{
			Picture[2][k][a] = Picture[2][k][a]+(ShearingIndex*(Picture[2][k][a+1]-ShearConstY));
			a = a+2;
		}
	}
	GlobalMaxX = -10000;
	GlobalMaxY = -10000;
	GlobalMinX = 10000;
	GlobalMinY = 10000;
	DrawPic();
}	

/////////////////////////////////////////////////////////////////
function ShearingPicY (MouseDownX,MouseUpX,MouseDownY)   // The same algorithm that ShearingPicX but the shift is vertically
{
	contex.fillStyle = "#369369";
	contex.fillRect(0,0,CanvasSizePoint,CanvasSizePoint);
	switch(ShearingConstPointFunc)
	{
		case 1:
			ShearConstY = 0;  // left page
			break;
		case 2:
			ShearConstY = GlobalMinX; // left boat 
			break;
		case 3:
			ShearConstY = GlobalMaxX;   // right boat
			break;
		case 4:
			ShearConstY = CanvasSizePoint;   // right page
			break;
	}
	var ShearingIndex = (MouseDownX-MouseUpX)/(ShearConstY-MouseDownY);
	if( ShearConstY == 0 || ShearConstY == GlobalMinX )
	{
		if((ShearConstY-MouseDownY)<0)
		{	}
		else
		{
			(ShearingIndex = ShearingIndex*(-1));
		}
	}
	else
	{
		if((ShearConstY-MouseDownY)>=0)
		{	}
		else
		{
			(ShearingIndex = ShearingIndex*(-1));
		}
	}
	for (var k=0;k<Picture[0].length;k++) 	
	{ 
		var a=0;
		while(a<4)
		{
			Picture[0][k][a+1] = Picture[0][k][a+1]+(ShearingIndex*(Picture[0][k][a]-ShearConstY));
			a = a+2;						
		}	
	}									
	for (var k=0;k<Picture[1].length;k++) 	
	{
		var a = 0;
		while(a<4)
		{
			Picture[1][k][a+1] = Picture[1][k][a+1]+(ShearingIndex*(Picture[1][k][a]-ShearConstY));
			a = a+2;
		}
	}
	for (var k=0;k<Picture[2].length;k++) 	
	{
		var a = 0;
		while(a<8)
		{
			Picture[2][k][a+1] = Picture[2][k][a+1]+(ShearingIndex*(Picture[2][k][a]-ShearConstY));
			a = a+2;
		}
	}
	GlobalMaxX = -10000;
	GlobalMaxY = -10000;
	GlobalMinX = 10000;
	GlobalMinY = 10000;
	DrawPic();
}		



//////////////////////Main//////////////////////////////
var CheckI = 0;
var x1 ,x2 ,y1 ,y2 ,x3,y3,x4,y4,t;
var CheckFu = 0;
var MirFu = 0;
var ZoomFu = 0;
var color = 'black';
var PolV , val;
var CurV , ValCur, ccc;
var RotationDeg , RotationVal;
var OpacityV, ooo;
var ValOpacity = 1;
var CirclesFromPic = [];
var LineFromPic = [];
var CurveFromPic = [];
var Picture = [];
var ShapesNum;
var GlobalMinX = 10000, GlobalMinY = 10000, GlobalMaxX = -10000, GlobalMaxY = -10000;
var ShearingConstPointFunc = 0;
var ProjectionCheck = 0;
var Zoom3d = 0;
var Move3DValue;
var Move3DValX = 0;
var Move3DValY = 0;
var Move3DValZ = 0;
var Rotation3DVal, Rotation3DDeg;
var CavalAndCabinProjAngle, CavalAndCabinProjAngleVal;

$(".LonelyPixel").click( function ()
{ 
	CheckFu = 0;
	alert("Draw a single pixel.");
	$(".PolyValSec").css({"display" : "none"});
	$(".CurveSec").css({"display" : "none"});
	$(".ZoomPictureButton").css({"display" : "none"});
	$(".MirrorSec").css({"display" : "none"});
	$(".RotateValSec").css({"display" : "none"});
	$(".ShearingButtonsSec").css({"display" : "none"}); 
});

$(".LineButton").click( function ()
{ 	
	CheckFu = 1;
	CheckI = 0;
	alert("Click in two different places on the canvas. The first point is the beginning of the line, the second point is the end of the line.");
	$(".PolyValSec").css({"display" : "none"});
	$(".CurveSec").css({"display" : "none"});
	$(".ZoomPictureButton").css({"display" : "none"});
	$(".MirrorSec").css({"display" : "none"});
	$(".RotateValSec").css({"display" : "none"});
	$(".ShearingButtonsSec").css({"display" : "none"}); 
});

$(".CircleButton").click( function ()
{ 	
	CheckFu = 2;
	CheckI = 0;
	alert("Click in two different places on the canvas.The first point is the center of the circle, the second point is the point on the circle.");
	$(".PolyValSec").css({"display" : "none"});
	$(".CurveSec").css({"display" : "none"});
	$(".ZoomPictureButton").css({"display" : "none"});
	$(".MirrorSec").css({"display" : "none"});
	$(".RotateValSec").css({"display" : "none"});
	$(".ShearingButtonsSec").css({"display" : "none"}); });
	
$(".PoliButton").click( function ()
{ 	
	CheckFu = 3;
	CheckI = 0;
	alert("Enter the number of corners of the polygon and press the 'PolyNum' button.After that click in two different places on the canvas.The first is the center of the polygon and the second is the point on the polygon.");
	$(".CurveSec").css({"display" : "none"});
	$(".PolyValSec").css({"display" : "block"}); 
	$(".ZoomPictureButton").css({"display" : "none"});
	$(".MirrorSec").css({"display" : "none"});
	$(".RotateValSec").css({"display" : "none"});
	$(".ShearingButtonsSec").css({"display" : "none"});
});
	
$(".CurveButton").click( function ()
{
	CheckFu = 4;
	CheckI = 0;
	alert("Enter a number from 0 to 1, which means the accuracy of drawing curve and press the 'Curve T Val' button.After that click in four different places on the canvas.The first and last point is the beginning and end of the curve.The second and third is the direction of bending.");
	$(".PolyValSec").css({"display" : "none"}); 
	$(".CurveSec").css({"display" : "block"});
	$(".ZoomPictureButton").css({"display" : "none"});
	$(".MirrorSec").css({"display" : "none"});
	$(".RotateValSec").css({"display" : "none"});
	$(".ShearingButtonsSec").css({"display" : "none"}); 
});


////////////////////////////////////////////////////////////////////////
		
$(".ShearinghPicture").click( function()
{ 
	alert("First,select a horizontal or vertical axis.Second,select the reference point by clicking on one of the options.Then press the left mouse button and drag to the desired location on the canvas (then release).Note that the closer you click, to the reference point,the more distorted image is produced.");
	$(".CurveSec").css({"display" : "none"});
	$(".PolyValSec").css({"display" : "none"});
	$(".ZoomPictureButton").css({"display" : "none"});
	$(".MirrorSec").css({"display" : "none"});
	$(".RotateValSec").css({"display" : "none"});
	$(".ShearingButtonsSecY").css({"display" : "none"});
	$(".ShearingButtonsSecX").css({"display" : "none"});
	$(".ShearingButtonsSec").css({"display" : "block"}); 
});

$(".ShearingByX").click( function()
{
	CheckFu = 8;
	$(".CurveSec").css({"display" : "none"});
	$(".PolyValSec").css({"display" : "none"});
	$(".ZoomPictureButton").css({"display" : "none"});
	$(".MirrorSec").css({"display" : "none"});
	$(".RotateValSec").css({"display" : "none"});
	$(".ShearingButtonsSecY").css({"display" : "none"});
	$(".ShearingButtonsSecX").css({"display" : "block"}); 
});

$(".ShearingByY").click( function()
{ 
	CheckFu = 11;
	$(".CurveSec").css({"display" : "none"});
	$(".PolyValSec").css({"display" : "none"});
	$(".ZoomPictureButton").css({"display" : "none"});
	$(".MirrorSec").css({"display" : "none"});
	$(".RotateValSec").css({"display" : "none"});
	$(".ShearingButtonsSecX").css({"display" : "none"});
	$(".ShearingButtonsSecY").css({"display" : "block"}); 
});

//////////////////////////////////////////////////////////////////////////////////////////////


$(".ZoomPicture").click( function()
{ 
	CheckFu = 6;
	alert("Select 'Zoom In' or 'Zoom Out' to enlarge the picture or decrese it,respectively.The chosen segment will automatically move to the center of the canvas.");
	$(".CurveSec").css({"display" : "none"});
	$(".PolyValSec").css({"display" : "none"});
	$(".ShearingButtonsSec").css({"display" : "none"});
	$(".MirrorSec").css({"display" : "none"});
	$(".RotateValSec").css({"display" : "none"});
	$(".ZoomPictureButton").css({"display" : "block"}); 
});
		
$(".MirrorButton").click( function()
{ 
	CheckFu = 9;
	alert("First,select a horizontal or vertical axis.Then point the cursor on the canvas to select the mirroring pivot and press left mouse button.");
	$(".CurveSec").css({"display" : "none"});
	$(".PolyValSec").css({"display" : "none"});
	$(".ShearingButtonsSec").css({"display" : "none"});
	$(".ZoomPictureButton").css({"display" : "none"});
	$(".RotateValSec").css({"display" : "none"});
	$(".MirrorSec").css({"display" : "block"}); 
});
		
$(".RotatePicture").click( function()
{ 
	CheckFu = 7;
	alert("First,enter the angle of desired rotation in degrees (from -360 to 360).Second,press 'Set Value'. Last,select a point with the cursor.This will be the pivot point of the object rotation.");
	$(".CurveSec").css({"display" : "none"});
	$(".PolyValSec").css({"display" : "none"});
	$(".ShearingButtonsSec").css({"display" : "none"});
	$(".ZoomPictureButton").css({"display" : "none"});
	$(".MirrorSec").css({"display" : "none"});
	$(".RotateValSec").css({"display" : "block"}); 
});

$(".MovePicture").click( function()
{ 
	CheckFu = 5;
	alert("After pressing this button,move your cursor to the location where you want to place the picture.Then click on the cursor.");
	$(".CurveSec").css({"display" : "none"});
	$(".PolyValSec").css({"display" : "none"});
	$(".ShearingButtonsSec").css({"display" : "none"});
	$(".ZoomPictureButton").css({"display" : "none"});
	$(".MirrorSec").css({"display" : "none"});
	$(".RotateValSec").css({"display" : "none"}); 
});

$(".Normalize").click( function ()
{ 
	alert("Sets the picture in the center of the canvas.In case the picture overflows the canvas boundaries,the function aligns it to fit precisely into the canvas.");
	$(".CurveSec").css({"display" : "none"});
	$(".PolyValSec").css({"display" : "none"});
	$(".ShearingButtonsSec").css({"display" : "none"});
	$(".ZoomPictureButton").css({"display" : "none"});
	$(".MirrorSec").css({"display" : "none"});
	$(".RotateValSec").css({"display" : "none"});
	ZoomFu = 1;
	Norm();
});

$(".Sec2d").click( function ()
{ 
	$(".TransfomSec").css({"display" : "block"});
	$(".Transform3DSec").css({"display" : "none"});
});

$(".Sec3d").click( function ()
{	
	$(".Transform3DSec").css({"display" : "block"});
	$(".TransfomSec").css({"display" : "none"});
});

$(".Projection").click( function ()
{						
	$(".ProjectionSec").css({"display" : "block"});
	$(".Trans").css({"display" : "none"});
	$(".Rotation3DSec").css({"display" : "none"});
	$(".Resize3DSec").css({"display" : "none"});
	$(".Opacity3DSec").css({"display" : "none"});
});

$(".Transform3D").click( function ()
{				
	$(".Trans").css({"display" : "block"});
	$(".ProjectionSec").css({"display" : "none"});								
});

$(".MirLR").click( function (){ MirFu = 1 });
$(".MirUD").click( function (){ MirFu = 2 });

$(".ZoomInButton").click( function (){ ZoomFu = 0 });
$(".ZoomOutButton").click( function (){ ZoomFu = 1 });

$(".Blue").click( function (){ 	color = 'blue';});
$(".Black").click( function (){ color = 'black';});
$(".White").click( function (){ color = 'white';});
$(".Red").click( function (){ 	color = 'red';});
$(".Yellow").click( function (){color = 'yellow';});
		

$(".clear").click( function ()
{ 
	contex.fillStyle = "#369369";
	contex.fillRect(0, 0, CanvasSizePoint, CanvasSizePoint); 
});

$(".sub1").click( function ()
{ 
	PolV = $(".Pol")[0];
	val = PolV.value;
});

$(".sub2").click( function ()
{ 
	CurV = $(".Crv")[0];
	ccc = CurV.value;
	ValCur = parseFloat(ccc);
});

$(".SubRotateVal").click( function ()
{ 
	RotationVal = $(".RotateVal")[0];
	RotationDeg = RotationVal.value;
});

$(".JsonButton").click(function()
{	
	contex.fillStyle = "#369369";
	contex.fillRect(0, 0, CanvasSizePoint, CanvasSizePoint);
	GetPic() 
});

$(".Json3D").click( function()
{ 
	contex.fillStyle = "#369369";
	contex.globalAlpha = 1;
	contex.fillRect(0, 0, CanvasSizePoint, CanvasSizePoint);
	ProjectionCheck = 0;
	Get3DPic()
});

$(".perspective").click( function()
{ 	
	ProjectionCheck = 0;
	Perspective3D();	
});

$(".caval").click( function()
{ 	
	ProjectionCheck = 1;
	Caval3D();
});

$(".cabinet").click( function()
{ 	
	ProjectionCheck = 2;
	Cabin3D();
});

$(".parallel").click( function()
{ 	
	ProjectionCheck = 3;
	Parallel3D();	
});

$(".SubRotate3DVal").click( function ()
{
	Rotation3DVal = $(".Rotate3DVal")[0];
	Rotation3DDeg = Rotation3DVal.value;
});

$(".SubProjection3DVal").click( function ()
{ 
	CavalAndCabinProjAngleVal = $(".Projection3DVal")[0];
	CavalAndCabinProjAngle = CavalAndCabinProjAngleVal.value;
});
		
$(".SubOpacity3DVal").click( function ()
{ 
	Opacity3DVal = $(".Opacity3DVal")[0];
	ooo = Opacity3DVal.value;
	ValOpacity = parseFloat(ooo);
	Draw3D();
});

$(".SubMove3DVal").click( function ()
{ 
	Move3DValue = $(".Move3DXVal")[0];
	Move3DValX = Move3DValue.value;
	//console.log("piX= "+Move3DValX)
	Move3DValue = $(".Move3DYVal")[0];
	Move3DValY = Move3DValue.value;
	//console.log("piY= "+Move3DValY)
	Move3DValue = $(".Move3DZVal")[0];
	Move3DValZ = Move3DValue.value;
	//console.log("piZ= "+Move3DValZ)
	Move3D();
	//Draw3D();
});

$(".Rotate3DX").click( function()
{ 
	Rotation3DX()
});

$(".Rotate3DY").click( function()
{ 
	Rotation3DY()
});

$(".Rotate3DZ").click( function()
{ 
	Rotation3DZ()
});

$(".Rotation3D").click( function()
{ 
	$(".Rotation3DSec").css({"display" : "block"});
	$(".Resize3DSec").css({"display" : "none"});
	$(".Opacity3DSec").css({"display" : "none"});
	$(".Move3dSec").css({"display" : "none"});
});

$(".Resize3D").click( function()
{ 
	$(".Resize3DSec").css({"display" : "block"});
	$(".Rotation3DSec").css({"display" : "none"});
	$(".Opacity3DSec").css({"display" : "none"});
	$(".Move3dSec").css({"display" : "none"});
});

$(".Move3D").click( function()
{ 
	$(".Resize3DSec").css({"display" : "none"});
	$(".Rotation3DSec").css({"display" : "none"});
	$(".Opacity3DSec").css({"display" : "none"});
	$(".Move3dSec").css({"display" : "block"});
});

$(".Opacity").click( function()
{ 
	$(".Resize3DSec").css({"display" : "none"});
	$(".Rotation3DSec").css({"display" : "none"});
	$(".Opacity3DSec").css({"display" : "block"});
	$(".Move3dSec").css({"display" : "none"});
});

$(".Zoom3DIn").click( function()
{ 	
	Zoom3d = 1.2;
	Resize3D()
});

$(".Zoom3DOut").click( function()
{ 	
	Zoom3d = 0.8;
	Resize3D()										
});

$(".MovePicture").click( function(){ CheckFu = 5 });
$(".ZoomPicture").click( function(){ CheckFu = 6 });
$(".RotatePicture").click( function(){ CheckFu = 7 });
$(".ShearinghPicture").click( function(){ CheckFu = 8 });
$(".MirrorButton").click( function(){ CheckFu = 9 });
$(".S1").click( function(){ ShearingConstPointFunc = 1 });
$(".S2").click( function(){ ShearingConstPointFunc = 2 });
$(".S3").click( function(){ ShearingConstPointFunc = 3 });
$(".S4").click( function(){ ShearingConstPointFunc = 4 });
	

///////////Work with Json/////////////////////////////////////////	

function GetPic ()
{
	$.getJSON('UserPic.json', function(data) 
	{
		if(data.circle !== undefined)
		{
			for(var i=0; i<data.circle.length; i++)											// get circles
			{	
				CirclesFromPic[i] = [];
				CirclesFromPic[i][0] = data.circle[i].x1;   
				CirclesFromPic[i][1] = data.circle[i].y1;
				CirclesFromPic[i][2] = data.circle[i].x2;
				CirclesFromPic[i][3] = data.circle[i].y2;
				CirclesFromPic[i][4] = data.circle[i].color;
			}
		}									
		if(data.line !== undefined)
		{
		    for(var i=0;i<data.line.length;i++)										//get lines
			{	
				LineFromPic[i] = [];
				LineFromPic[i][0] = data.line[i].x1;
				LineFromPic[i][1] = data.line[i].y1;
				LineFromPic[i][2] = data.line[i].x2;
				LineFromPic[i][3] = data.line[i].y2;
				LineFromPic[i][4] = data.line[i].color;												
			}
		}
		if(data.curve !== undefined)
		{
		   	for(var i=0;i<data.curve.length;i++)
			{											/// get curves
				CurveFromPic[i] = [];
				CurveFromPic[i][0] = data.curve[i].x1;
				CurveFromPic[i][1] = data.curve[i].y1,
			 	CurveFromPic[i][2] = data.curve[i].x2,
				CurveFromPic[i][3] = data.curve[i].y2,
				CurveFromPic[i][4] = data.curve[i].x3,
				CurveFromPic[i][5] = data.curve[i].y3,
				CurveFromPic[i][6] = data.curve[i].x4,
			 	CurveFromPic[i][7] = data.curve[i].y4,
				CurveFromPic[i][8] = data.curve[i].t,
				CurveFromPic[i][9] = data.curve[i].color
			}
		}
		Picture[0] = CirclesFromPic;
		Picture[1] = LineFromPic;
		Picture[2] = CurveFromPic;
		DrawPic();							
	});
}
//////////////////////Normalise//////////////////////////////////

function Norm ()
{
	contex.fillStyle = "#369369";
	contex.fillRect(0, 0, CanvasSizePoint, CanvasSizePoint);
	while((GlobalMaxX-GlobalMinX)>CanvasSizePoint || (GlobalMaxY-GlobalMinY)>CanvasSizePoint )
	{
		ZoomPic((GlobalMaxX-GlobalMinX),(GlobalMaxY-GlobalMinY));							//  resize picture
	}
	var CentrePicX = (GlobalMaxX-GlobalMinX)/2+GlobalMinX;	//Centre of Picture from 0,0
	var CentrePicY = (GlobalMaxY-GlobalMinY)/2+GlobalMinY;	//Centre of Picture from 0,0
	var c1 = 0, c2 = 0, c3 = 0;
	for (var k=0;k<Picture[0].length;k++) 	
	{		
		var a = 0;
		while(a<4)
		{
			Picture[0][k][a] = Picture[0][k][a]-CentrePicX+CentreCanvasPoint; // for for X
			Picture[0][k][a+1] = Picture[0][k][a+1]-CentrePicY+CentreCanvasPoint; // For for Y
			a = a+2;						
		}		
	}	
	for (var k=0;k<Picture[1].length;k++) 	
	{
		var a = 0, b = 1;
		while(a<4)
		{
			Picture[1][k][a] = Picture[1][k][a]-CentrePicX+CentreCanvasPoint; // for for X
			Picture[1][k][a+1] = Picture[1][k][a+1]-CentrePicY+CentreCanvasPoint;  // For for Y
			a = a+2;
		}					
	}
	for (var k=0;k<Picture[2].length;k++) 	
	{
		var a = 0, b = 1;
		while(a<8)
		{
			Picture[2][k][a] = Picture[2][k][a]-CentrePicX+CentreCanvasPoint; // for for X
			a = a+2;
		}
		while(b<8)
		{
			Picture[2][k][b] = Picture[2][k][b]-CentrePicY+CentreCanvasPoint;  // For for Y
			b = b+2;
		}	
	}
	GlobalMaxX = -10000;
	GlobalMaxY = -10000;
	GlobalMinX = 10000;
	GlobalMinY = 10000;
	contex.fillStyle = "#369369";
	contex.fillRect(0, 0, CanvasSizePoint, CanvasSizePoint);
	DrawPic();
}
/////////////////Mirror////////////////////////////////////////

function Mirror (MirrorX, MirrorY) 
{
	switch(MirFu)									// mirror X
	{
		case 1:
			for (var i=0;i<Picture[0].length;i++) 	
			{
				var a = 0;
				while(a<4)	
				{
					Picture[0][i][a]=Picture[0][i][a]-(Picture[0][i][a]-MirrorX)*2;
					a = a+2;
				}	
			}						
			for (var k=0;k<Picture[1].length;k++) 	
			{
				var a = 0;
				while(a<4)	
				{
					Picture[1][k][a] = Picture[1][k][a]-(Picture[1][k][a]-MirrorX)*2;
					a = a+2;
				}	
			}
			for (var l=0;l<Picture[2].length;l++) 	
			{
				var a = 0;
				while(a<8)	
				{
					Picture[2][l][a] = Picture[2][l][a]-(Picture[2][l][a]-MirrorX)*2;
					a = a+2;
				}	
			}
			contex.fillStyle = "#369369";
			contex.fillRect(0,0,CanvasSizePoint,CanvasSizePoint);
			GlobalMaxX = -10000;
			GlobalMaxY = -10000;
			GlobalMinX = 10000;
			GlobalMinY = 10000;
			DrawPic();
			break;
		case 2:
			for (var i=0;i<Picture[0].length;i++) 					// mirror Y
			{
				var a = 1;
				while(a<4)	
				{
					Picture[0][i][a] = Picture[0][i][a]-(Picture[0][i][a]-MirrorY)*2;
					a = a+2;
				}	
			}
			for (var k=0;k<Picture[1].length;k++) 	
			{
				var a = 1;
				while(a<4)
				{
					Picture[1][k][a] = Picture[1][k][a]-(Picture[1][k][a]-MirrorY)*2;
					a = a+2;
				}	
			}
			for (var l=0;l<Picture[2].length;l++) 	
			{
				var a = 1;
				while(a<8)	
				{
					Picture[2][l][a] = Picture[2][l][a]-(Picture[2][l][a]-MirrorY)*2;
					a = a+2;
				}	
			}
			contex.fillStyle = "#369369";
			contex.fillRect(0,0,CanvasSizePoint,CanvasSizePoint);
			GlobalMaxX = -10000;
			GlobalMaxY = -10000;
			GlobalMinX = 10000;
			GlobalMinY = 10000;
			DrawPic();
			break;
	}
}
////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////				 ///////////////////////////////////////////////////
///////////////////////////////////     EX 3     ///////////////////////////////////////////////////
///////////////////////////////////				 ///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

var PolygonFromJson = [];
var PolyTempJson = [];
var PolyZSortArr = [];

function Get3DPic ()		//Get the objects from the JSON
{ 				
	console.log("Hohoho");
	$.getJSON('PolygonsList.json', function(data) 
	{
		if(data.Polygon !== undefined)
		{
			for(var i=0; i<data.Polygon.length; i++)											
			{	
				PolygonFromJson[i] = [];
				for(var k=0; k<data.Polygon[i].length; k++)
				{
					PolygonFromJson[i][k]= data.Polygon[i][k];
				}
				for(j=0;j<5;j++)
				{
					PolygonFromJson[i][PolygonFromJson[i].length]=0;
				}
			}
		}		    
		PolyNormal();
		PolyZMax();
		Perspective3D();																		
	});
}


function Draw3D()			//Drawing the objects on the screen
{									
	console.log("Draw");
	contex.globalAlpha = 1;
	contex.fillStyle = "#369369";								//screen color
	contex.fillRect(0, 0, CanvasSizePoint, CanvasSizePoint);		//screen refreshing
	
	contex.strokeStyle = "#000000";
	contex.lineWidth = 1;
	VisibPoly();													//the function checks which polygon to be displayed
	var i = 0;
	while(i<PolyTempJson.length)								//going through all polygons
	{
		if(PolyTempJson[i][PolyTempJson[i].length-4] == 1)		//if visibilty=1 -> draw polygon to screen
		{
			var k = 3;
			contex.beginPath();   //first point of polygon
			contex.moveTo(PolyTempJson[i][0]+CentreCanvasPoint, PolyTempJson[i][1]+CentreCanvasPoint);
			while(k<PolyTempJson[i].length-7)
			{
				contex.lineTo(PolyTempJson[i][k]+CentreCanvasPoint, PolyTempJson[i][k+1]+CentreCanvasPoint);  //connect polygon points 
				k = k+3;
			}									
			contex.closePath();    //close the polygon path
			contex.globalAlpha = 1;
			contex.stroke();
			contex.globalAlpha = ValOpacity;
			contex.fillStyle = PolyTempJson[i][PolyTempJson[i].length-6];
			contex.fill();		
		}
		i++;	
	}
						
}


function Caval3D()			//cavalier projection function
{		
	console.log("Caval3D");
	contex.fillStyle = "#369369";
	contex.globalAlpha = 1;
	contex.fillRect(0, 0, CanvasSizePoint, CanvasSizePoint);
	for(var i=0; i<PolygonFromJson.length; i++)					//copy from json array to temp array						
	{	
		PolyTempJson[i]=[];
		for(var k=0; k<PolygonFromJson[i].length; k++)
		{
			PolyTempJson[i][k] = PolygonFromJson[i][k];
		}
	}
	var Angle = 0;
	if(CavalAndCabinProjAngle == undefined)
	{
		Angle = 45;
	}
	else
	{
		Angle = CavalAndCabinProjAngle;
	}
	var ProjAngleX = Math.cos(-Angle*Math.PI/180);
	var ProjAngleY = Math.sin(-Angle*Math.PI/180);
	var i=0;
	while(i<PolyTempJson.length)
	{
		var k = 0;
		while(k<PolyTempJson[i].length-7)		//~where the point should be set on screen
		{
			PolyTempJson[i][k] = (PolyTempJson[i][k])+(PolyTempJson[i][k+2]*ProjAngleX);
			PolyTempJson[i][k+1] = (PolyTempJson[i][k+1])+(PolyTempJson[i][k+2]*ProjAngleY);
			k = k+3;
		}
		i++;
	}
	PolyZMax();			//which maximale Z the polygon owns
	SortPolyZ();		//Sort polygons through their maximale Z
	Draw3D();			//Draw on screen
}

function Cabin3D()		//cabinet projection function
{		
	console.log("Caval3D");
	contex.fillStyle = "#369369";
	contex.globalAlpha = 1;
	contex.fillRect(0, 0, CanvasSizePoint, CanvasSizePoint);
	for(var i=0; i<PolygonFromJson.length; i++)					//copy from json array to temp array						
	{	
		PolyTempJson[i] = [];
		for(var k=0; k<PolygonFromJson[i].length; k++)
		{
			PolyTempJson[i][k] = PolygonFromJson[i][k];
		}
	}
	var Angle;
	if(CavalAndCabinProjAngle == undefined)	//if the angle is set going to else if not to if.
	{
		Angle = 45;
	}
	else
	{
		Angle = CavalAndCabinProjAngle;
	}
	var ProjAngleX = Math.cos(-Angle*Math.PI/180);
	var ProjAngleY = Math.sin(-Angle*Math.PI/180);
	var i = 0;
	while(i<PolyTempJson.length)
	{
		var k = 0;
		while(k<PolyTempJson[i].length-7)
		{
			PolyTempJson[i][k] = (PolyTempJson[i][k])+(PolyTempJson[i][k+2]/2*ProjAngleX);
			PolyTempJson[i][k+1] = (PolyTempJson[i][k+1])+(PolyTempJson[i][k+2]/2*ProjAngleY);
			k = k+3;
		}
		i++;
	}
	PolyZMax();			//which maximale Z the polygon owns
	SortPolyZ();		//Sort polygons through their maximale Z
	Draw3D();			//Draw on screen
						
}

function Perspective3D()		//perspective projection function
{			
	console.log("Perspective3D");
	contex.fillStyle = "#369369";
	contex.fillRect(0, 0, CanvasSizePoint, CanvasSizePoint);

	for(var i=0; i<PolygonFromJson.length; i++)			//copy from json array to temp array								
	{	
		PolyTempJson[i] = [];
		for(var k=0; k<PolygonFromJson[i].length; k++)
		{
			PolyTempJson[i][k] = PolygonFromJson[i][k];
		}
	}

	var i = 0;
	while(i<PolyTempJson.length)		//go through all polygons and calculate the coordinates
	{
		var k = 0;
		while(k<PolyTempJson[i].length-7)
		{
			PolyTempJson[i][k] = (PolyTempJson[i][k])/(1+PolyTempJson[i][k+2]/600);
			PolyTempJson[i][k+1] = (PolyTempJson[i][k+1])/(1+PolyTempJson[i][k+2]/600);
			k = k+3;
		}
		i++;
	}
	PolyZMax();					//which maximale Z the polygon owns
	SortPolyZ();				//Sort polygons through their maximale Z
	Draw3D();					//Draw on screen
}

function Parallel3D()		//parallel projection
{		
	console.log("Parallel3D");
	contex.fillStyle = "#369369";
	contex.fillRect(0, 0, CanvasSizePoint, CanvasSizePoint);

	for(var i=0; i<PolygonFromJson.length; i++)			//copy from json array to temp array									
	{	
		PolyTempJson[i] = [];
		for(var k=0; k<PolygonFromJson[i].length; k++)
		{
			PolyTempJson[i][k] = PolygonFromJson[i][k];
		}
	}
	var i = 0;
	while(i<PolyTempJson.length)		//calculation
	{
		var k = 0;
		while(k<PolyTempJson[i].length-7)
		{
			PolyTempJson[i][k] = PolyTempJson[i][k];
			PolyTempJson[i][k+1] = PolyTempJson[i][k+1];
			k=k+3;
		}
		i++;
	}
	PolyZMax();
	SortPolyZ();
	Draw3D();
}


function PolyZMax()			//which maximale Z the polygon owns
{			
	console.log("PolyZMax");
	for(var i=0; i<PolygonFromJson.length;i++)	
	{			          	
		PolygonFromJson[i][PolygonFromJson[i].length-5] = -10000;	 // ZMax refreshing
		for (var k=2; k<PolygonFromJson[i].length-6; k+=3)
		{
	        if (PolygonFromJson[i][PolygonFromJson[i].length-5] < PolygonFromJson[i][k])
          	{
          		PolygonFromJson[i][PolygonFromJson[i].length-5] = PolygonFromJson[i][k];
          	}
	    }
	}
}

function PolyNormal()		//calculate the normal from each polygon
{			
	console.log("PolyNormal");
	for(var i=0; i<PolygonFromJson.length;i++)
	{			         
		var vector1 = [];
		var vector2 = []; 	
		for(k=0;k<3;k++)
		{
		    vector1[k] = PolygonFromJson[i][k+3]-PolygonFromJson[i][k];
		    vector2[k] = PolygonFromJson[i][k+6]-PolygonFromJson[i][k+3];
		}
		PolygonFromJson[i][PolygonFromJson[i].length-3] = vector1[1]*vector2[2]-vector1[2]*vector2[1];
		PolygonFromJson[i][PolygonFromJson[i].length-2] = vector1[2]*vector2[0]-vector1[0]*vector2[2];
		PolygonFromJson[i][PolygonFromJson[i].length-1] = vector1[0]*vector2[1]-vector1[1]*vector2[0];
	}
}

function VisibPoly()		//visiability of polygons
{		
	console.log("VisibPoly");
	var NormX = 0;
	var NormY = 0;
	var NormZ = 0;
	var VectX = 0;
	var VectY = 0;
	var VectZ = 0;	
	var VisPol = 0;
	var AngleNormUser = 0;

/////////////////////////caval or cabinet projection///////////
	var Angle;
	if(CavalAndCabinProjAngle == undefined)
	{
		Angle = 45;
	}
	else
	{
		Angle = CavalAndCabinProjAngle;
	}
	var ProjAngleX = Math.cos(-Angle*Math.PI/180);
	var ProjAngleY = Math.sin(-Angle*Math.PI/180);
	var xtovec = 0;
	var ytovec = 0;
	var ztovec = 0;
	if (ProjectionCheck == 1)    // cavalier projection
	{
		xtovec = 0+(5000*ProjAngleX);
		ytovec = 0+(5000*ProjAngleY);
		ztovec = 5000;
	}
	else if(ProjectionCheck == 2)		// cabinet projection
	{
		xtovec = 0+(5000/2*ProjAngleX);
		ytovec = 0+(5000/2*ProjAngleY);
		ztovec = 5000;
	}
	else					//not caval & not cabinet
	{		
		xtovec = 0;
		ytovec = 0;
		ztovec = 800;
	}

	for(var i=0; i<PolyTempJson.length;i++)				//check the angle between C.O.P & Polygon Normal
	{			      
		NormX = PolyTempJson[i][PolyTempJson[i].length-3];
		NormY = PolyTempJson[i][PolyTempJson[i].length-2];
		NormZ = PolyTempJson[i][PolyTempJson[i].length-1];
		VectX = PolyTempJson[i][0]-(xtovec);
		VectY = PolyTempJson[i][1]-(ytovec);
		VectZ = PolyTempJson[i][2]-(-ztovec);

		VisPol = Math.acos((VectX*NormX+VectY*NormY+VectZ*NormZ)/(Math.sqrt(Math.pow(VectX,2)+Math.pow(VectY,2)+Math.pow(VectZ,2))*Math.sqrt(Math.pow(NormX,2)+Math.pow(NormY,2)+Math.pow(NormZ,2)))); // calc angle between normal and C.O.P
		AngleNormUser = VisPol*(180/Math.PI); // from rad to deg
			  
		if(ValOpacity!==undefined && ValOpacity<1 && ValOpacity>=0)			//works with opacity
		{
	   		PolyTempJson[i][PolyTempJson[i].length-4]=1;
	    }
		else
	    {
			if(Math.cos(AngleNormUser*(Math.PI/180))<0)  
			{
				PolyTempJson[i][PolyTempJson[i].length-4] = 1;
			}
			else{PolyTempJson[i][PolyTempJson[i].length-4] = 0;}
	    }

	}
}


function Rotation3DX()		//rotation function on X
{			
	console.log("Rotation3DX");
	var AngleRotXUser = 0;
	if(Rotation3DDeg == undefined)
	{
		AngleRotXUser = 5;
	}
	else
	{
		AngleRotXUser = Rotation3DDeg;
	}
	var Yrot = 0;
	var Zrot = 0;
	for(var i=0; i<PolygonFromJson.length;i++)
	{			         
		for(var k=0;k<PolygonFromJson[i].length-7;k+=3)
	    {
	        Yrot = PolygonFromJson[i][k+1];
	        Zrot = PolygonFromJson[i][k+2];
	        PolygonFromJson[i][k+1] = Yrot*Math.cos(AngleRotXUser*Math.PI/180)+Zrot*(-1*Math.sin(AngleRotXUser*Math.PI/180));
			PolygonFromJson[i][k+2] = Yrot*Math.sin(AngleRotXUser*Math.PI/180)+Zrot*Math.cos(AngleRotXUser*Math.PI/180);
	    }
		Yrot = PolygonFromJson[i][PolygonFromJson[i].length-2];
		Zrot = PolygonFromJson[i][PolygonFromJson[i].length-1];
		PolygonFromJson[i][PolygonFromJson[i].length-2] = Yrot*Math.cos(AngleRotXUser*Math.PI/180)+Zrot*(-1*Math.sin(AngleRotXUser*Math.PI/180)); // Y normal rotation
		PolygonFromJson[i][PolygonFromJson[i].length-1] = Yrot*Math.sin(AngleRotXUser*Math.PI/180)+Zrot*Math.cos(AngleRotXUser*Math.PI/180);	// Z normal rotation	          		
	}

	PolyZMax();
	if (ProjectionCheck == 1)
	{
		Caval3D();
	}
	else if(ProjectionCheck == 2)
	{
		Cabin3D();
	}
	else if(ProjectionCheck == 3)
	{
		Parallel3D();
	}
	else
	{		
		Perspective3D();
	}
								
}

function Rotation3DY()				//rotation on Y
{
	console.log("Rotation3DY");
	var AngleRotXUser = 0;
	if(Rotation3DDeg == undefined)
	{
		AngleRotXUser = 5;
	}
	else
	{
		AngleRotXUser = Rotation3DDeg;
	}
	var Xrot = 0;
	var Zrot = 0;
	for(var i=0; i<PolygonFromJson.length;i++)
	{			         
		for(var k=0;k<PolygonFromJson[i].length-7;k+=3)
		{
	    	Xrot = PolygonFromJson[i][k];
	    	Zrot = PolygonFromJson[i][k+2];
	    	PolygonFromJson[i][k] = Xrot*Math.cos(AngleRotXUser*Math.PI/180)+Zrot*(-1*Math.sin(AngleRotXUser*Math.PI/180));
			PolygonFromJson[i][k+2] = Xrot*Math.sin(AngleRotXUser*Math.PI/180)+Zrot*Math.cos(AngleRotXUser*Math.PI/180);
	    }
		Xrot = PolygonFromJson[i][PolygonFromJson[i].length-3];
		Zrot = PolygonFromJson[i][PolygonFromJson[i].length-1];
		PolygonFromJson[i][PolygonFromJson[i].length-3] = Xrot*Math.cos(AngleRotXUser*Math.PI/180)+Zrot*(-1*Math.sin(AngleRotXUser*Math.PI/180)); // X normal rotation
		PolygonFromJson[i][PolygonFromJson[i].length-1] = Xrot*Math.sin(AngleRotXUser*Math.PI/180)+Zrot*Math.cos(AngleRotXUser*Math.PI/180);	// Z normal rotation		          		
	}
	PolyZMax();
	if (ProjectionCheck == 1)
	{
		Caval3D();
	}
	else if(ProjectionCheck == 2)
	{
		Cabin3D();
	}
	else if(ProjectionCheck == 3)
	{
		Parallel3D();
	}
	else
	{	
		Perspective3D();
	}
								
}

function Rotation3DZ()			//rotation on Z
{	
	console.log("Rotate3DZ");
	var AngleRotXUser = 0;
	if(Rotation3DDeg == undefined)
	{
		AngleRotXUser = 5;
	}
	else
	{
		AngleRotXUser = Rotation3DDeg;
	}
	var Xrot = 0;
	var Yrot = 0;
	for(var i=0; i<PolygonFromJson.length;i++)
	{			         
		for(var k=0;k<PolygonFromJson[i].length-7;k+=3)
		{
	    	Xrot = PolygonFromJson[i][k];
	    	Yrot = PolygonFromJson[i][k+1];
	    	PolygonFromJson[i][k] = Xrot*Math.cos(AngleRotXUser*Math.PI/180)+Yrot*Math.sin(AngleRotXUser*Math.PI/180);
			PolygonFromJson[i][k+1] = Xrot*(-1*Math.sin(AngleRotXUser*Math.PI/180))+Yrot*Math.cos(AngleRotXUser*Math.PI/180);
	    }
		Xrot = PolygonFromJson[i][PolygonFromJson[i].length-3];
		Yrot = PolygonFromJson[i][PolygonFromJson[i].length-2];
		PolygonFromJson[i][PolygonFromJson[i].length-3] = Xrot*Math.cos(AngleRotXUser*Math.PI/180)+Yrot*Math.sin(AngleRotXUser*Math.PI/180); // Y normal rotation
		PolygonFromJson[i][PolygonFromJson[i].length-2] = Xrot*(-1*Math.sin(AngleRotXUser*Math.PI/180))+Yrot*Math.cos(AngleRotXUser*Math.PI/180);	// Z normal rotation			          		
	}

	PolyZMax();

	if (ProjectionCheck == 1)
	{
		Caval3D();
	}
	else if(ProjectionCheck == 2)
	{
		Cabin3D();
	}
	else if(ProjectionCheck == 3)
	{
		Parallel3D();
	}
	else
	{		
		Perspective3D();
	}								
}

function SortPolyZ()				//sorting polygons by their maximale Z
{
	console.log("SortPolyZ");
	for (var i=0;i<PolyTempJson.length-1;i++)
	{
		for (var j=0;j<PolyTempJson.length-i-1;j++)
		{
			if(PolyTempJson[j][PolyTempJson[j].length-5] < PolyTempJson[j+1][PolyTempJson[j].length-5])
			{
				if (PolyTempJson[j].length == PolyTempJson[j+1].length)     //if the arrays lengths are equal
				{
					for(var k=0;k<PolyTempJson[j].length;k++)
					{
						PolyZSortArr[k] = PolyTempJson[j][k];
						PolyTempJson[j][k] = PolyTempJson[j+1][k];
						PolyTempJson[j+1][k] = PolyZSortArr[k];
					}
				}
				else
				{
					var temp1 = [];
					var temp2 = [];					
					for(var s=0;s<PolyTempJson[j].length;s++)
					{
						temp1[s] = PolyTempJson[j][s];
					}
					for(var s=0;s<PolyTempJson[j+1].length;s++)
					{
						temp2[s] = PolyTempJson[j+1][s];
					}
					PolyTempJson[j] = [];
					PolyTempJson[j+1] = [];
					for(var s=0;s<temp2.length;s++)
					{
						PolyTempJson[j][s] = temp2[s];
					}
					for(var s=0;s<temp1.length;s++)
					{
						PolyTempJson[j+1][s] = temp1[s];
					}
				}
			}
		}	
	}
}


function Resize3D()					//resizing function
{	
	console.log("Resize3D");
	for(var i=0; i<PolygonFromJson.length;i++)
	{			         
	   	for(var k=0;k<PolygonFromJson[i].length-7;k+=3)
		{
			PolygonFromJson[i][k] = PolygonFromJson[i][k]*Zoom3d;
			PolygonFromJson[i][k+1] = PolygonFromJson[i][k+1]*Zoom3d;
			PolygonFromJson[i][k+2] = PolygonFromJson[i][k+2]*Zoom3d;
		}
	}
	PolyNormal();
	PolyZMax();
	if (ProjectionCheck == 1)
	{
		Caval3D();
	}
	else if(ProjectionCheck == 2)
	{
		Cabin3D();
	}
	else if(ProjectionCheck == 3)
	{
		Parallel3D();
	}
	else
	{		
		Perspective3D();
	}

}	


function Move3D()				//moving objects on the grid
{
	console.log("Move3D");
	for(var i=0; i<PolygonFromJson.length;i++)
	{			     
		for(var k=0;k<PolygonFromJson[i].length-7;k+=3)
		{
			PolygonFromJson[i][k] = PolygonFromJson[i][k]+parseFloat(Move3DValX);
			PolygonFromJson[i][k+1] = PolygonFromJson[i][k+1]+parseFloat(Move3DValY);
			PolygonFromJson[i][k+2] = PolygonFromJson[i][k+2]+parseFloat(Move3DValZ);
		}
	}	

	PolyNormal();

	if (ProjectionCheck == 1)
	{
		Caval3D();
	}
	else if(ProjectionCheck == 2)
	{
		Cabin3D();
	}
	else if(ProjectionCheck == 3)
	{
		Parallel3D();
	}
	else
	{		
		Perspective3D();
	}

}

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
		

var MouseDownXToFunc = 0;
var MouseUpXToFunc = 0;
var MouseDownYToFunc = 0;
$("#jopa").mousedown(function($event) 
{		
	if (CheckFu == 8)
	{
		MouseDownXToFunc = $event.offsetX;
		MouseDownYToFunc = $event.offsetY;
	}
	else if(CheckFu == 11)
	{
		MouseDownXToFunc = $event.offsetY;
		MouseDownYToFunc = $event.offsetX;
	}
});

$("#jopa").mouseup(function($event) 
{		
	if (CheckFu == 8)
	{
		MouseUpXToFunc = $event.offsetX;
		ShearingPicX(MouseDownXToFunc, MouseUpXToFunc, MouseDownYToFunc);
	}
	else if (CheckFu == 11)
	{
		MouseUpXToFunc = $event.offsetY;
		ShearingPicY(MouseDownXToFunc, MouseUpXToFunc, MouseDownYToFunc);
	}
});

$("#jopa").click(function($event) 
{
	if (CheckFu == 5)
	{
		MovePic($event.offsetX, $event.offsetY);
	}
	if (CheckFu == 6)
	{
		ZoomPic($event.offsetX, $event.offsetY);
	}
	if (CheckFu == 7)
	{
		RotatePic($event.offsetX, $event.offsetY, RotationDeg);
	}
	if (CheckFu == 9)
	{
		Mirror($event.offsetX, $event.offsetY);
	}
	if (CheckFu == 0)
	{
		putpixel( $event.offsetX, $event.offsetY, color);
	}
	if(CheckFu == 4)
	{
		if(CheckI == 0)
	   	{
		   	x1 = $event.offsetX;
		   	y1 = $event.offsetY;
			CheckI++;
		}
		else if(CheckI == 1)
		{
	   	    x2 = $event.offsetX;
	   	    y2 = $event.offsetY;
		    CheckI++;
	    } 
		else if(CheckI == 2)
		{
	   	    x3 = $event.offsetX;
	   	    y3 = $event.offsetY;
		    CheckI++;
	    } 
		else if(CheckI == 3)
		{
	   	    x4 = $event.offsetX;
	   	    y4 = $event.offsetY;
		    CheckI=0;
		    DrawBezQ(x1, y1, x2, y2, x3, y3, x4, y4, ValCur, color);
	    } 
	}
	else
	{
		if(CheckI == 0)
		{
		   	x1 = $event.offsetX;
		   	y1 = $event.offsetY;
			CheckI++;
		}
		else if(CheckI == 1)
		{
			x2 = $event.offsetX;
   			y2 = $event.offsetY;
   			CheckI=0;
   			if( CheckFu == 1)
   			{
	   			DrawLine (x1,y1,x2,y2, color);	
   			}
			else if (CheckFu == 2)
			{
				DrawCircle (x1,y1,x2,y2,color);
			}
   			else if(CheckFu == 3)
			{
				DrawPoligon(x1, y1, x2, y2, val, color);	
			}	   			
		}
	}
});
});




////////////////////////////////////////////

