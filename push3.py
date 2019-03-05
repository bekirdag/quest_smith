import RPi.GPIO as GPIO
import subprocess
import time

GPIO.setmode(GPIO.BCM)
GPIO.setup(23, GPIO.IN, pull_up_down = GPIO.PUD_DOWN)
GPIO.setup(24, GPIO.IN, pull_up_down = GPIO.PUD_UP)

button = "none"
last_button_pressed_time= time.time()
story_follow_up = str("0")

subprocess.call(["php","-f","/home/pi/quest_smith/print.php","story_follow_up:"+str(story_follow_up)])

def leftButton(channel):
  global last_button_pressed_time 
  global button 
  global story_follow_up
  print("Button 1 pressed!")
  button = "left"
  current_time = time.time()
  time_passed_since_the_last_click = current_time - last_button_pressed_time
  last_button_pressed_time= current_time
  print(time_passed_since_the_last_click)
  if time_passed_since_the_last_click>5:
    story_follow_up += str("1")
    story_goes_on(1)

def rightButton(channel):
  global last_button_pressed_time 
  global button 
  global story_follow_up
  print("Button 2 pressed!")
  button = "right"
  current_time = time.time()
  time_passed_since_the_last_click = current_time - last_button_pressed_time
  last_button_pressed_time= current_time
  print(time_passed_since_the_last_click)
  if time_passed_since_the_last_click>5:
    story_follow_up += str("0")
    story_goes_on(0)

def story_goes_on(button):
  subprocess.call(["php","-f","/home/pi/quest_smith/print.php","story_follow_up:"+str(story_follow_up)])

GPIO.add_event_detect(23, GPIO.RISING, callback=leftButton, bouncetime=300)
GPIO.add_event_detect(24, GPIO.RISING, callback=rightButton, bouncetime=300)

message = input("Press enter to quit\n\n") # Run until someone presses enter
GPIO.cleanup() # Clean up


