## How to Use

1. **Prepare Known Faces Dataset**:
   - Place images of known individuals in the `known_faces` directory.
   - Organize images into subdirectories by domain (e.g., `known_faces/domain1/person1.jpg`).
   - The filename should contain the person's name (e.g., `John Doe.jpg`).

2. **Run the Program**:
   - Execute the script:
     ```bash
     python main.py
     ```
   - Choose between capturing images from the camera or uploading images from the gallery.

3. **Capture or Upload Images**:
   - If using the camera, press `c` to capture images and `q` to quit.
   - If uploading from the gallery, provide the path to the image files.

4. **View Attendance**:
   - Attendance records are saved in a CSV file named with the current date (e.g., `attendance_2023-10-05.csv`).

## Example Directory Structure

```
project/
├── known_faces/
│   ├── domain1/
│   │   ├── John Doe.jpg
│   │   ├── Jane Smith.jpg
│   ├── domain2/
│       ├── Alice Brown.jpg
├── main.py
├── README.md
