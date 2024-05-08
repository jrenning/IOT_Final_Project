import datetime
import firebase_admin
from firebase_admin import storage, firestore

cred_obj = firebase_admin.credentials.Certificate('firebase-cred.json')


default_app = firebase_admin.initialize_app(cred_obj, {
	'databaseURL': "https://iot-final-3f563-default-rtdb.firebaseio.com/",
    "storageBucket": "iot-final-3f563.appspot.com"
	})

db = firestore.client()



def upload_image(path):
    bucket = storage.bucket()
    blob = bucket.blob(path)
    blob.upload_from_filename(path)
    
    blob.make_public()
    
    return blob.public_url
 
 
def send_event_data(detection_type, image_url):
    
	now = datetime.datetime.now()
    
	ref = db.collection("events").document(now.isoformat())

	sample_sensor_data = {
	    "timestamp": now.isoformat(),
	    "detection type": detection_type,
		"image_url": image_url
		
	}

	ref.set(sample_sensor_data)

if __name__ == "__main__":
    url = upload_image("woods.jpg")
    
    send_event_data("Bird", url)



