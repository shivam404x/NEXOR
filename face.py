# import cv2
# video_cp = cv2.VideoCapture(0)
# while True:
#     ret, video_data = video_cp.read()
#     cv2.imshow("video_live", video_data)
#     if cv2.waitKey(10) == ord("a"):
#      break
# video_cp.release()
# Only for camera open👆
# face authicantation
import cv2

face_cap = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)

video_cp = cv2.VideoCapture(0)
while True:
    ret, video_data = video_cp.read()
    if not ret:
        break
    col = cv2.cvtColor(video_data, cv2.COLOR_BGR2BGRA)
    face = face_cap.detectMultiScale(
        col,
        scaleFactor=1.3,
        minSize=(30, 30),
        minNeighbors=6,
        flags=cv2.CASCADE_SCALE_IMAGE
    )
    for (x, y, w, h) in face:
        cv2.rectangle(video_data, (x, y), (x+w, y+h), (0, 255, 0), 2)
    cv2.imshow("video_live", video_data)
    if cv2.waitKey(10) == ord("a"):
        break

video_cp.release()

