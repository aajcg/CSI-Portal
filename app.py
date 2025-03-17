import cv2
import numpy as np
from deepface import DeepFace

# Load known face images (replace with your own)
KNOWN_FACES = {
    "yasha": "database/yasha.jpg",
    "john": "database/john.jpg",
}

def recognize_face(image):
    temp_path = "temp.jpg"
    cv2.imwrite(temp_path, image)

    for name, face_path in KNOWN_FACES.items():
        try:
            result = DeepFace.verify(temp_path, face_path, model_name="Facenet", enforce_detection=False)
            if result["verified"]:
                return name
        except Exception as e:
            print("Error:", e)
    
    return None

# Open camera
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    # Display camera feed
    cv2.imshow("Face Recognition Attendance", frame)

    # Press 's' to scan and recognize face
    key = cv2.waitKey(1) & 0xFF
    if key == ord("s"):
        name = recognize_face(frame)
        if name:
            print(f"✅ Attendance Marked for {name}")
        else:
            print("❌ Face not recognized")

    # Press 'q' to quit
    elif key == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()
