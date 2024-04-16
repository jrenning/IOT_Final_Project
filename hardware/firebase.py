import datetime
import firebase_admin
from firebase_admin import db
from firebase_admin import storage

cred_obj = firebase_admin.credentials.Certificate('firebase-cred.json')


default_app = firebase_admin.initialize_app(cred_obj, {
	'databaseURL': "https://iot-final-3f563-default-rtdb.firebaseio.com/",
    "storageBucket": "iot-final-3f563.appspot.com"
	})




# test setting a value in firebase
# ref = db.reference("/")

# sample_sensor_data = {
#     "timestamp": datetime.datetime(2024, 1, 1, 1, 1, 1, 1).isoformat(),
#     "event": "motion detected"
    
# }

# ref.set(sample_sensor_data)

# test uploading an image to firebase
    
# image_url = "bird.jpg"
# bucket = storage.bucket()
# blob = bucket.blob(image_url)
# blob.upload_from_filename(image_url)


