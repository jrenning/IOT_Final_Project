import subprocess

# work around since the python library doesn't work
def take_image(image_name):
    # take image and supress output 
    subprocess.call(["rpicam-jpeg", "-o", image_name, "-t", "500", "-v", "0"], stdout=subprocess.DEVNULL)
    
    print(f"Image: {image_name} taken")
    
    
if __name__ == "__main__":
    take_image("test.jpg")

