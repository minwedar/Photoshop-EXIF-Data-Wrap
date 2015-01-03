Photoshop-EXIF-Data-Wrap
========================

This Javascript is ran within Photoshop and extract the EXIF data found in the image file and creates a boarder around the image.  To run this script, open Photoshop and in the "file" menu option, select "script" and then "browse" for this script.  This script is setup for web sized images so try something that is around 800x800.  You will need to adjust the script if you go too far out of this size range. 

I've used this in past Photoshop versions but this one I just tested in the lastest Photoshop CC and it seems to still be working just fine.  I've tested it with iPhones and a few Canon cameras and they all seem to work just fine.  To take a look at a few examples, follow this link to some images I posted to Flickr.
https://flic.kr/s/aHsk6Km5UH

This is the real one you want.  This is the one that wraps the image with the EXIF data around in a nice white boarder.
exif_image_data_overlay.jsx

This script is not so awesome.  It simply stamps a data to the lower right hand corner like those old cheesy film point and shoots back in the day.
exif_date_it.jsx

![Alt text](/examples/20140124-_MG_8235.jpg?raw=true "EXIF Wrap Example")
