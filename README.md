Quest Smith is a Raspberry Pi Zero driven thermal printing text based game. In each level, it gives you options to choose so every game is different than the other one depending on your choices.

## Parts list:

1 Raspberry Pi Zero
1 Thermal printer, I used GOOJPRT (https://bit.ly/2H0mE9l) 
1 5V Voltage Step-up Boost Module (https://bit.ly/2SOJ13i)
1 TP4056 (https://bit.ly/2EQ2gWp)
1 18650 battery (https://bit.ly/2SM6QZk)
2 Momentary Tactile Switches (https://bit.ly/2TlT4BN)
Cables
1 3D printed case top
1 3D printed case bottom
1 Micro usb to usb female cable (https://bit.ly/2EzYsqP)
1 Usb cable (this should come with the thermal printer)
4 Screws 3.5 X 20 mm
1 On off swicth (https://bit.ly/2C4Zs5Z)

## Tools I used:
* Glue Gun 
* Soldering iron

## The sketch:
https://bekirdag.com/random_files/sketch.png

## Pictures
https://bekirdag.com/random_files/quest_smith1.jpg
https://bekirdag.com/random_files/quest_smith2.jpg
https://bekirdag.com/random_files/quest_smith3.jpg


### Putting everything together
Well after you solder the wires as it shown in the sketch picture above, you need to fit the hardware in the empty space left from the thermal printer in the box. The only tip I can give you would be to use a short usb cable to save from the space, glue the thermal pinter and the buttons, after you put everything together glue the swicth button to the hole as well. I used a Solar panel to charge the battery, so you will need to glue the solar panel to the case when you complete eveyrthing else.

### Coding:

1. Download and install raspbian OS from here https://www.raspberrypi.org/downloads/raspbian/
2. Update packages:
    
    `sudo apt-get update && sudo apt-get upgrade`
    
3. Install the packages:
    
    `sudo apt-get install libpython3-dev libpython3-stdlib libqt5printsupport5 php7.0-mbstring python3-rpi.gpio python-rpi.gpio python-setuptools python-dev build-essential`
    
4. Install composer (here are the instructions: https://getcomposer.org/download/)    
5. Install python packages:

    `pip install setuptools`
    `pip install locustio`
    
6. Create a dirctory under the home and get the code for the story:
    
    `mkdir quest_smith`
    `cd quest_smith`
    `git clone git@github.com:bekirdag/quest_smith.git .`
    `composer install`

7. Run the Quest Smith script on reboot by adding a line on crontab

    `crontab -e`

    And add this line:
    
    `@reboot sudo /usr/bin/screen -dmS story-game /usr/bin/python3 /home/pi/thermal/push3.py`
    

8. Add another line to crontab again to update the software on each reboot so your story will be up to date

    `@reboot sudo cd /home/pi/quest_smith && sudo git pull origin master`
    
    
### Final word

Well that's it, when you turn the raspberry pi on as well as the printer, it should run the script automaticlaly! Your game is ready to be played!

## Contribution 

Each level requires two versions of the story which makes the possiblities grow exponentially. So it will be very difficult for me to finish a single story by myself. For the player to reach level 9, we will need to have 1023 story parts to be written. If you can help me with that it would be amazing!

### How to contribute?

The story is under the story_text folder as txt files like:

    0.txt (the first item ever)
    00.txt (when the user choses -NO- at the beginning)
    01.txt (when the user choses -YES- at the beginning)
    001.txt (when the user choses -NO- and then -YES- respectively)
    010.txt (when the user choses -YESY- and then -NO- respectively)
    
    And so on. So as you can see, for no, put a 0, for yes, put a 1 at the and of your story option file name.
