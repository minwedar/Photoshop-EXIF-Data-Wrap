// Extract EXIF data and either add Image Data around the boarder of the image or on the bottom depending what flag is set
// Photoshop CS3 Script

// I've tested this on my RAW images from my Canon EOS-10D, EOS-7D, G11, G15

// Note:  I am not the orginal creator of this script.  I simply found it many years ago and been using it, modifying it
// slightly.  The setup is pretty simple, just drop this script anywhere and size the photo to a web size (800x600 for
// example) and in Photoshop, open the "file" menu option and select "Script" than "Browse".  Select this script and it
// if (and only if) you left the EXIF data in the photo, you will see some of the EXIF data wrapped around the image.
// You can create an Action or even a droplet to make things easier to batch many photos with this script.

// Modification History:
// (April 2005) Created by Todd Burke
// (2006) Modified to work with CS2
// (August 2007) Tweaked to make sure it worked on CS3.  I did not check for backwards compatibility of older CS versions.
// (August 2007) Combined the version that put this same info at the bottom of the image instead of the boarder,
//   Just need to change the flag in order to get the other format to work.  This was easier then trying to do upkeep on two
//   different scripts when only the formatting of the text was different.s
// (January 2015) Tested to make sure it works with Photoshop CC latest version


// First thing is to set up what setting will be used in the rest of the script
// but save them so they can be reset to what they were before this script is ran.
displayDialogs = DialogModes.NO;
var defaultRulerUnits = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.PIXELS;

// Set copyright info
var strCopyright = "Copyright (c) 2015  Todd Burke";   // EDIT VALUE

// Possible format types
var Data_Format = {Boarder:1, Bottom:2};

// Currently you need to select what format you want, default is 'Boarder'
var Data_Format_Selector = Data_Format.Boarder;   // EDIT VALUE


// Define Colors
var black = new SolidColor();
black.rgb.red = black.rgb.green = black.rgb.blue = 0;
var white = new SolidColor();
white.rgb.red = white.rgb.green = white.rgb.blue = 255;
var red = new SolidColor();
red.rgb.red = 255;
red.rgb.green = red.rgb.blue = 0;

var AD = app.activeDocument;

// Get All camera data so I don't call it several times and set
// it in this array.
// [0] = Exposure
// [1] = Camera info and lens
// [2] = Date/Time
strImageInfo=new Array();
strImageInfo = getExifData();


// You can use one of two formats.  One is to create a white boarder with the EXIF data wrapped around
//  or you can place all the EXIF data at the bottom.  Just set this flag to one or the other.

switch(Data_Format_Selector) {
    
    // Polaroid white boarder with text around the image.
    case 1:
        PrepImage();
        Boarder_Canvas();
        
        // Broken out so each side can be adjusted
        Boarder_AuthorText();
        Boarder_ImageDataTextCameraLens(strImageInfo);
        Boarder_ImageDataTextExposure(strImageInfo);
        Boarder_ImageDataTextDate(strImageInfo);
        break;
        
    // Black background with all white EXIF data on bottom. 
    case 2:
        PrepImage();
        Bottom_Canvas();
        Bottom_ImageData(strImageInfo);
        break;
        
    default:
        alert("Text format must be slected.");
        break;
}

/*else if (0){
    
}
else { }*/

AD.flatten();

// END:Below are functions

// **********   COMMON FORMAT FUNCTIONS START  ***************
function PrepImage() {
    // Set resolution to 72dpi for monitor viewing
    var resRatio = AD.resolution/72;

    if(resRatio!=1){
        AD.resizeImage(AD.width.value,AD.height.value,72);
    }
}
// **********   COMMON FORMAT FUNCTIONS END  ***************



// **********   BOARDER FORMAT FUNCTIONS START  ***************
// Create white Polaroid type boarder around image for text
function Boarder_Canvas() {

    // Create boarder by increasing the canvas size
    backgroundColor = black;
    AD.resizeCanvas(AD.width+2,AD.height.value+2,AnchorPosition.MIDDLECENTER);
    backgroundColor = white;
    AD.resizeCanvas(AD.width+35,AD.height.value+35,AnchorPosition.MIDDLECENTER);
    backgroundColor = black;
    AD.resizeCanvas(AD.width+4,AD.height.value+4,AnchorPosition.MIDDLECENTER);

}


// This function sets Author and copywrite notice to image
function Boarder_AuthorText() {

    var nameLayer = AD.artLayers.add();
    nameLayer.kind = LayerKind.TEXT;
    var TI = nameLayer.textItem;
    TI.position = [AD.width.value - 3, AD.height.value - 25];
    TI.contents = strCopyright;
    TI.font = "ArialMT";
    TI.size = 12;
    TI.tracking = 100;
    TI.color = black;
    //TI.fauxBold = true;

    AD.activeLayer.rotate(-90,AnchorPosition.BOTTOMLEFT);
    //AD.activeLayer.translate(-20,10);

}


// Sets Image info text to image
function Boarder_ImageDataTextExposure(strData) {
    
    //var tmpString = new String(strData);
    var infoLayer = AD.artLayers.add();
    infoLayer.kind = LayerKind.TEXT;
    var TI = infoLayer.textItem;
    TI.position = [24, AD.height.value - 6];
    TI.contents = strData[0];
    TI.font = "ArialMT";
    TI.size = 12;
    TI.tracking = 100;
    TI.color = black;
    //TI.fauxBold = true;

    //AD.activeLayer.rotate(-90,AnchorPosition.BOTTOMLEFT);
    
}


// Sets Image info text to image
function Boarder_ImageDataTextCameraLens(strData) {
    
    //var tmpString = new String(strData);
    var infoLayer = AD.artLayers.add();
    infoLayer.kind = LayerKind.TEXT;
    var TI = infoLayer.textItem;
    TI.position = [18, AD.height.value - 25];   
    TI.contents = strData[1];
    TI.font = "ArialMT";
    TI.size = 12;
    TI.tracking = 100;
    TI.color = black;
    
    AD.activeLayer.rotate(-90,AnchorPosition.BOTTOMLEFT);
    
}


// Sets Image info text to image
function Boarder_ImageDataTextDate(strData) {
    
    //var tmpString = new String(strData);
    var infoLayer = AD.artLayers.add();
    infoLayer.kind = LayerKind.TEXT;
    var TI = infoLayer.textItem;
    TI.position = [24, 15];
    TI.contents = strData[2];
    TI.font = "ArialMT";
    TI.size = 12;
    TI.tracking = 100;
    TI.color = black;

    
}
// **********   BOARDER FORMAT FUNCTIONS END  ***************


// **********   BOTTOM FORMAT FUNCTIONS START  ***************
function Bottom_Canvas(){
    
    var heightVar = AD.height+2;
    
    backgroundColor = black;

    AD.resizeCanvas(AD.width+4,AD.height.value+4,AnchorPosition.MIDDLECENTER);
    AD.resizeCanvas(AD.width,AD.height.value+65,AnchorPosition.TOPCENTER);
    
}


function Bottom_ImageData(strData) {
    
    var nameLayer = AD.artLayers.add();
    nameLayer.kind = LayerKind.TEXT;
    var TI = nameLayer.textItem;
    TI.position = [5,AD.height-52];
    TI.contents = strCopyright;
    TI.tracking = 120;
    TI.font = "ArialMT";
    TI.size = 14;
    TI.color = white;
    TI.fauxBold = true;

    var infoLayer = AD.artLayers.add();
    infoLayer.kind = LayerKind.TEXT;
    var TI = infoLayer.textItem;
    TI.noBreak = false;
    TI.position = [5,AD.height-36];
    TI.contents = strData[0]+"\u000D"+strData[1]+"\u000D"+strData[2];
    TI.font = "ArialMT";
    TI.size = 13;
    TI.color = white;
    
}
// **********   BOTTOM FORMAT FUNCTIONS END  ***************



// **********   DATA FUNCTIONS START  ***************
// Common Data Functions used to gather EXIF data
// Sets image data to a string that will later be used to set into the image
function getExifData() {

    // Get exif data from file
    var exifData = AD.info.exif.toString();
    
    // Use this function to put string into array.
    // Returns tempArray
    var exifDataArray = explodeArray(exifData,","); 

    // Get the info I want, note that these are pairs which is why we use
    // n + 2....to see the match for each value, use n + 1 to see what it is.
    for(n = 0; n < exifDataArray.length; n = n + 1 ) {

        var stringTemp=exifDataArray[n]
        //alert(n + ": " + stringTemp);  //Show what's coming out of array
        if(stringTemp.indexOf("Exposure Time")!=-1){
            var expTime = exifDataArray[n+1];
        }

        if(stringTemp.indexOf("Date Time Original")!=-1){
            var DateTimeStamp = exifDataArray[n+1];
            var dateArray1 = DateTimeStamp.split(" ", 1);
            var phoTime = dateArray1[0];
            var dateArray2 = phoTime.split(":");

            var monthsArray =["January","February","March","April","May","June","July","August","September","October","November","December"];
            phoTime = monthsArray[dateArray2[1]-1]+" "+dateArray2[2]+", "+dateArray2[0];
        }

        if(stringTemp.indexOf("Model")!=-1){
            var cameraModel = exifDataArray[n+1];
        }

        if(stringTemp.indexOf("F-Stop")!=-1){
            var fstop = exifDataArray[n+1];     
        }

        if(stringTemp.indexOf("Focal Length")!=-1){
            var tmpFocal = exifDataArray[n+1];
            // Finding value has a return char at the end on my 10D for CS3 so lets normalize
            focal = tmpFocal.split(" ",1);
        }

        if(stringTemp.indexOf("ISO Speed Ratings")!=-1){
            var iso = exifDataArray[n+1];
        }

    } // End of For loop

    
    // Raw xml data to extract lens info
    // Only available on RAW images?
    var xmldata = AD.xmpMetadata.rawData;
        
    try {
        /*var temp = xmldata.split("Description>");
        var lenssection = temp[3];

        var temp2 = temp[3].split("<aux:Lens>");
        var temp3 = temp2[1].split("</aux:Lens>")
        var lens = temp3[0];*/
        
        var pattern = /(.*<aux:Lens>)(.*)(<\/aux:Lens>)/;
        var results = xmldata.match(pattern);
        if (results)
            lens = results[2];
        else lens = "?";
        
        
        //strLensInfo = "  Lens Info: "+lens+" @ ";
        
    }
    catch(err) {
        lens = "?";
        //strLensInfo = "  Focal Length @ ";
    }

    // Now take this data to produce a string
    //var strTemp = new String("Image Info:  "+expTime+"  "+fstop+"  ISO:"+iso); 
    //+"\u000DLens: "+lens+" Focal Lenth: "+focal+"\u000DDate photo taken: "+phoTime);

    strTemp=new Array();
    strTemp[0] = "Exposure: "+expTime+"  "+fstop+"  ISO:"+iso;
    strTemp[1] = cameraModel+"  Lens Info: "+lens+" @ "+focal;
    strTemp[2] = phoTime;

    return strTemp;

}


//function below credited to 'bradles' over at the Adobe User to User forums.
function explodeArray(item,delimiter) {

    tempArray=new Array(1);
    var Count=0;
    var tempString=new String(item);
    while (tempString.indexOf(delimiter)>0) {
        tempArray[Count]=tempString.substr(0,tempString.indexOf(delimiter));
        tempString=tempString.substr(tempString.indexOf(delimiter)+1,tempString.length-tempString.indexOf(delimiter)+1);
        Count=Count+1;
    }
    tempArray[Count]=tempString;
    return tempArray;
}
// **********   DATA FUNCTIONS END  ***************



// **********   MISC FUNCTIONS START  ***************
// Save File
function SaveJPEG(inFileName) {
    var jpegOptions = new JPEGSaveOptions();
    jpegOptions.quality = 9;
    activeDocument.saveAs( File( inFileName ), jpegOptions );
}

// **********   MISC FUNCTIONS END  ***************

