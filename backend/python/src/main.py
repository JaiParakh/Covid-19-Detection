# python main.py "../video/PETS2009.avi" "922,302" "709,521" "251,345" "475,217"

from bird_view_transfo_functions import compute_perspective_transform, compute_point_perspective_transformation
import social_distanciation_video_detection
import numpy as np
import sys
import json
import os
import cv2
import yaml

video_path = sys.argv[1]
list_points = list()
for i in range(2,6):
    points_str = sys.argv[i].split(',')
    points = list(map(int, points_str))
    list_points.append(points)

vs = cv2.VideoCapture(video_path)
# Loop until the end of the video stream
while True:    
    # Load the frame and test if it has reache the end of the video
    (frame_exists, frame) = vs.read()
    cv2.imwrite("../img/static_frame_from_video.jpg",frame)
    break

# Load the image 
img_path = "../img/static_frame_from_video.jpg"
img = cv2.imread(img_path)

# Get the size of the image for the calibration
width,height,_ = img.shape

# Return a dict to the YAML file
config_data = dict(
    image_parameters = dict(
        p1 = list_points[2],
        p2 = list_points[3],
        p3 = list_points[1],
        p4 = list_points[0],
        width_og = width,
        height_og = height,
        img_path = img_path,
        size_frame = width,
        ))
# Write the result to the config file
with open('../conf/config_birdview.yml', 'w') as outfile:
    yaml.dump(config_data, outfile, default_flow_style=False)

blank_image = np.zeros((height,width,3), np.uint8)
#matrix,imgOutput = compute_perspective_transform(corner_points,width,height, blank_image)
#cv2.imwrite("../img/chemin_1.png", imgOutput)

# done = social_distanciation_video_detection.run(video_path)
# print(done)
x = {
    "msg": "done" 
}
print(json.dumps(x))



