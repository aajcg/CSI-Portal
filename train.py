import cv2
import face_recognition
import numpy as np
import os
import pandas as pd
from datetime import datetime

# Load known faces from the dataset
def load_known_faces(known_faces_dir):
    known_encodings = []
    known_names = []
    known_domains = []

    for domain in os.listdir(known_faces_dir):
        domain_dir = os.path.join(known_faces_dir, domain)
        if not os.path.isdir(domain_dir):  # Skip if it's not a directory
            continue

        for filename in os.listdir(domain_dir):
            img_path = os.path.join(domain_dir, filename)
            if not os.path.isfile(img_path):  # Skip if it's not a file
                continue

            # Extract the person's name from the filename
            person_name = os.path.splitext(filename)[0]  # Remove file extension
            person_name = person_name.split('(')[0].strip()  # Remove anything in parentheses

            # Load the image and encode the face
            img = face_recognition.load_image_file(img_path)
            encoding = face_recognition.face_encodings(img)
            if encoding:  # Ensure at least one face is found
                known_encodings.append(encoding[0])
                known_names.append(person_name)
                known_domains.append(domain)
    
    return known_encodings, known_names, known_domains

# Mark attendance in a CSV file
def mark_attendance(names, domains):
    now = datetime.now()
    date_str = now.strftime("%Y-%m-%d")
    time_str = now.strftime("%H:%M:%S")

    # Create a DataFrame for the new attendance
    new_attendance = {'Name': names, 'Domain': domains, 'Date': date_str, 'Time': time_str}
    new_df = pd.DataFrame(new_attendance)

    # Check if the attendance file already exists
    attendance_file = f"attendance_{date_str}.csv"
    if os.path.exists(attendance_file):
        # Load existing attendance
        existing_df = pd.read_csv(attendance_file)
        # Filter out names that are already recorded today
        new_df = new_df[~new_df['Name'].isin(existing_df['Name'])]
        # Append new attendance to the existing file
        updated_df = pd.concat([existing_df, new_df], ignore_index=True)
        updated_df.to_csv(attendance_file, index=False)
    else:
        # Save new attendance to a new file
        new_df.to_csv(attendance_file, index=False)
    
    print("Attendance marked.")

# Process a single image for face recognition
def process_image(image_path, known_encodings, known_names, known_domains):
    image = face_recognition.load_image_file(image_path)
    face_locations = face_recognition.face_locations(image)
    face_encodings = face_recognition.face_encodings(image, face_locations)

    attendance_names = []
    attendance_domains = []

    for face_encoding in face_encodings:
        matches = face_recognition.compare_faces(known_encodings, face_encoding)
        face_distances = face_recognition.face_distance(known_encodings, face_encoding)
        best_match_index = np.argmin(face_distances)

        if matches[best_match_index]:
            name = known_names[best_match_index]
            domain = known_domains[best_match_index]
            if name not in attendance_names:  # Avoid duplicates in the same image
                attendance_names.append(name)
                attendance_domains.append(domain)
    
    return attendance_names, attendance_domains

# Capture images from the camera
def capture_images_from_camera():
    cap = cv2.VideoCapture(0)  # Open the default camera
    image_paths = []

    print("Press 'c' to capture an image, 'q' to quit.")
    while True:
        ret, frame = cap.read()
        if not ret:
            print("Failed to capture image.")
            break

        cv2.imshow("Camera", frame)
        key = cv2.waitKey(1)

        if key == ord('c'):  # Capture image
            now = datetime.now()
            image_path = f"captured_image_{now.strftime('%Y%m%d_%H%M%S')}.jpg"
            cv2.imwrite(image_path, frame)
            image_paths.append(image_path)
            print(f"Image saved: {image_path}")
        elif key == ord('q'):  # Quit
            break

    cap.release()
    cv2.destroyAllWindows()
    return image_paths

# Upload images from the gallery
def upload_images_from_gallery():
    image_paths = []
    while True:
        image_path = input("Enter the path to an image (or type 'done' to finish): ")
        if image_path.lower() == 'done':
            break
        if os.path.isfile(image_path):
            image_paths.append(image_path)
        else:
            print("File not found. Please try again.")
    return image_paths

# Main function
def main():
    known_faces_dir = 'known_faces'  # Path to the dataset
    known_encodings, known_names, known_domains = load_known_faces(known_faces_dir)

    # Ask the user to choose between camera or gallery
    choice = input("Do you want to upload images from the camera or gallery? (camera/gallery): ").lower()

    if choice == 'camera':
        image_paths = capture_images_from_camera()
    elif choice == 'gallery':
        image_paths = upload_images_from_gallery()
    else:
        print("Invalid choice. Exiting.")
        return

    # Process all uploaded images
    all_names = []
    all_domains = []
    for image_path in image_paths:
        names, domains = process_image(image_path, known_encodings, known_names, known_domains)
        all_names.extend(names)
        all_domains.extend(domains)

    # Mark attendance
    if all_names:
        mark_attendance(all_names, all_domains)
        print("Attendance saved to a CSV file with today's date.")
    else:
        print("No faces recognized in the uploaded images.")

if __name__ == "__main__":
    main()