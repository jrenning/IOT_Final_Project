# main loop for the raspberry pi
import datetime
from camera import take_image
import cv2

from gpiozero import MotionSensor

from firebase import send_event_data, upload_image
from model import classify_image

import RPi.GPIO as GPIO
from time import sleep

from gpiozero import Servo
from gpiozero.pins.pigpio import PiGPIOFactory

def buzz():
    GPIO.setmode(GPIO.BCM)
    buzzer_pin = 23
    frequency = 1000
    duty_cycle = 50
    GPIO.setup(buzzer_pin, GPIO.OUT)
    buzzer_pwm = GPIO.PWM(buzzer_pin, frequency)

    # Start PWM
    buzzer_pwm.start(duty_cycle)
    sleep(1)    # duration of buzzer
    buzzer_pwm.stop()

def servo():
    # Use the pigpio pin factory for smoother servo control
    factory = PiGPIOFactory()
    # Initialize the servo using the pigpio pin factory on GPIO pin 2
    servo = Servo(2, pin_factory=factory)
    # Move the servo to the maximum position (clockwise)
    servo.max()
    sleep(0.4)  # Adjust sleep time as needed for desired speed
    servo.min()
    sleep(0.27)  # Adjust sleep time as needed for desired speed
    servo.detach()
    
    
def generate_image_id(): 
    return datetime.datetime.now().isoformat()
    

def main():
    
    pir = MotionSensor(26)

    while True:
        # detect motion
        pir.wait_for_motion()
        print("Motion detected")

        file_name = f"pic_{generate_image_id()}.jpg"
    
        # take image
        take_image(file_name)
        
        # read in new image 
        image = cv2.imread(file_name)

        image = cv2.rotate(image, cv2.ROTATE_90_COUNTERCLOCKWISE)
        
        # rewrite image with rotation
        cv2.imwrite(file_name, image)
        
        # classify image 
        label = classify_image(image)
        
        if label != "Background":
            if label == "Squirrels":
                buzz()
                pass
            elif label == "Birds":
                sleep(2)
                servo()
                pass
        
            # if image is squirrel/bird send to firebase 
            
            print(label)
            
            url = upload_image(file_name)
            
            send_event_data(label, url)
            

        pir.wait_for_no_motion()
        print("Motion no longer detected")
    

    
    
if __name__ == "__main__":
    main()
    