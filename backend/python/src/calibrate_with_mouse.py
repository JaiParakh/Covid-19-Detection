from bird_view_transfo_functions import compute_perspective_transform,compute_point_perspective_transformation
import cv2
import numpy as np
import yaml
import imutils

 
# Define the callback function that we are going to use to get our coordinates
def CallBackFunc(event, x, y, flags, param):
    if event == cv2.EVENT_LBUTTONDOWN:
        print("Left button of the mouse is clicked - position (", x, ", ",y, ")")
        list_points.append([x,y])
    elif event == cv2.EVENT_RBUTTONDOWN:
        print("Right button of the mouse is clicked - position (", x, ", ", y, ")")
        list_points.append([x,y])



video_name = input("Enter the exact name of the video (including .mp4 or else) : ")

size_frame = input("Prompt the size of the image you want to get : ")


vs = cv2.VideoCapture("../video/"+video_name)
# Loop until the end of the video stream
while True:    
    # Load the frame and test if it has reache the end of the video
    (frame_exists, frame) = vs.read()
    frame = imutils.resize(frame, width=int(size_frame))
    cv2.imwrite("../img/static_frame_from_video.jpg",frame)
    break

# Create a black image and a window
windowName = 'MouseCallback'
cv2.namedWindow(windowName)


# Load the image 
img_path = "../img/static_frame_from_video.jpg"
img = cv2.imread(img_path)

# Get the size of the image for the calibration
width,height,_ = img.shape

# Create an empty list of points for the coordinates
list_points = list()

# bind the callback function to window
cv2.setMouseCallback(windowName, CallBackFunc)


if __name__ == "__main__":
    # Check if the 4 points have been saved
    while (True):
        cv2.imshow(windowName, img)
        if len(list_points) == 4:
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
                    size_frame = size_frame,
                    ))
            # Write the result to the config file
            with open('../conf/config_birdview.yml', 'w') as outfile:
                yaml.dump(config_data, outfile, default_flow_style=False)
            break
        if cv2.waitKey(20) == 27:
            break
    cv2.destroyAllWindows()

print("[ Loading config file for the bird view transformation ]")
with open("../conf/config_birdview.yml", "r") as ymlfile:
    cfg = yaml.load(ymlfile)
width_og, height_og = 0,0
corner_points = []
for section in cfg:
	corner_points.append(cfg["image_parameters"]["p1"])
	corner_points.append(cfg["image_parameters"]["p2"])
	corner_points.append(cfg["image_parameters"]["p3"])
	corner_points.append(cfg["image_parameters"]["p4"])
	width_og = int(cfg["image_parameters"]["width_og"])
	height_og = int(cfg["image_parameters"]["height_og"])
	img_path = cfg["image_parameters"]["img_path"]
	size_frame = cfg["image_parameters"]["size_frame"]
print(" Done : [ Config file loaded ] ...")


matrix,imgOutput = compute_perspective_transform(corner_points,width_og,height_og,cv2.imread(img_path))
cv2.imwrite("../img/chemin_1.png",imgOutput)
height,width,_ = imgOutput.shape
blank_image = np.zeros((height,width,3), np.uint8)
height = blank_image.shape[0]
width = blank_image.shape[1] 
dim = (width, height)