// Add Image Data around the boarder of the image
// Photoshop CS Script

// I've tested this on my RAW images from my Canon EOS-10D & EOS-7D

// Partial Author: Todd Burke (May 2005)
// I can't take credit for this but I wish I remember where I found most of this script originally.
// I tweaked it a little bit over the years to get things working on the more recent versions of
// Photoshop but I can't take credit for the bare bones of this script.  I just wanted to put this
// into the repository in hopes someone else would find this helpful to them as well.


// First thing is to set up what setting will be used in the rest of the script
// but save them so they can be reset to what they were before this script is ran.
displayDialogs = DialogModes.NO;
var defaultRulerUnits = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.PIXELS;


// Define Colors
var black = new SolidColor();
black.rgb.red = black.rgb.green = black.rgb.blue = 0;
var white = new SolidColor();
white.rgb.red = white.rgb.green = white.rgb.blue = 255;
var BoarderColor = white;
var red = new SolidColor();
red.rgb.red = 255;
red.rgb.green = red.rgb.blue = 0;
var HotOrange = new SolidColor();
HotOrange.rgb.red = 224;
HotOrange.rgb.green = 146;
HotOrange.rgb.blue = 18;

var AD = app.activeDocument;


ImageDataText(getExifData());

//AD.flatten();

// END:Below are functions



// Sets Image info text to image
function ImageDataText(strData) {

	//var tmpString = new String(strData);
	var infoLayer = AD.artLayers.add();
	infoLayer.kind = LayerKind.TEXT;
	var TI = infoLayer.textItem;

	//Two print versions, one for print, one for web
	if (AD.resolution == 72) {
		TI.size = 15;
		TI.position = [AD.width.value - 167, AD.height.value - 16];
	}
	else {  // Assume else to be large res print size
		TI.size = 20;
		TI.position = [AD.width.value - 745, AD.height.value - 64];	
	}
	
    TI.contents = strData;
	TI.font = "ArialMT";
	TI.tracking = 50;
	TI.color = white;
	//TI.fauxBold = true;
	
	//If you wanted to add a drop shadow, in CS you have to save a style with a name to be used here.
	//For example, I check the drop shadow when I added a layer style and saved it as "Basic Drop Shadow".
	//That's all there is to it.  Just uncomment out the line below.
	infoLayer.applyStyle("Basic Drop Shadow");

	//AD.activeLayer.rotate(-90,AnchorPosition.BOTTOMLEFT);
    
}


// Sets image data to a string that will later be used to set into the image
function getExifData() {

	// Get exif data from file
	var exifData = AD.info.exif.toString();
    
	// Use this function to put string into array.
	// Returns tempArray
	var exifDataArray = explodeArray(exifData,","); 



	// Get the info I want
	for(n = 0; n < exifDataArray.length; n = n + 1 ) {

		var stringTemp=exifDataArray[n]
   	
  		if(stringTemp.indexOf("Date Time Original")!=-1){
   			var phoTime = exifDataArray[n+1];
		}

	} // End of For loop


	// This is temorary and really hacky
	// Raw xml data to extract lens info
    

	/*strTemp=new Array();
	strTemp[0] = "Exposure: "+expTime+"  "+fstop+"  ISO:"+iso; 
	strTemp[1] = cameraModel+"  Lens Info: "+lens+" @ "+focal;
	strTemp[2] = savePhotoTime;
*/

	return phoTime;

}






//function below credited to 'bradles' over at the Adobe User to User forums.
function explodeArray(item,delimiter) {

	tempArray=new Array(1);
	var Count=0;
	var tempString=new String(item);
	while (tempString.indexOf(delimiter)>0) {
		tempArray[Count]=tempString.substr(0,tempString.indexOf(delimiter));
		tempString=tempString.substr(tempString.indexOf(delimiter)+1,tempString.length-tempString.indexOf(delimiter)+1);
		Count=Count+1
	}
	tempArray[Count]=tempString;
	return tempArray;
}



