# IOT_Final_Project

Our project is a smart bird feeder. The bird feeder will dispense food to approaching birds. There
is a motion sensor set up in the front of the bird feeder which will trigger when an animal
approaches. A camera will take a picture of the animal. If the animal is correctly identified by a trained
model as a bird, then a mechanism will trigger, dispensing bird food for the bird. If the animal is a
squirrel, however, then a noise will play and startle the squirrel. 


## TODO

### Physical components

- [x] Build birdhouse
- [ ] Construct feeder
- [x]  Set up motor for dispenser
- [x]  Wire motor into PI for control
- [ ]  Setup motion sensor
- [ ]  Setup camera

### Software components

- [x] Teachable machine
- [x] Train it
- [x] Port code
- [x] Hook up to images from camera
- [x] Photos
  - [x] Capture from the camera
  - [x] Send to firebase
- [x] Sensor data
  -  [x] Send sensor data to firebase
- [ ] Analytics
  - [ ] Perform analytics on data
- [x] Security
- [ ] Website

