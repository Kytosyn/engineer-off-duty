import fal
import os
import sys
import time

# Set FAL key - you can set this as env var or pass directly
# For now, check if it's set
fal_key = os.environ.get("FAL_KEY")
if not fal_key:
    print("FAL_KEY not found in environment. Checking for saved key...")
    try:
        with open(os.path.expanduser("~/.fal/key"), "r") as f:
            fal_key = f.read().strip()
    except:
        pass
    
if not fal_key:
    print("No FAL key found. Image-to-video requires FAL_KEY environment variable.")
    print("Please set FAL_KEY and try again.")
    sys.exit(1)

print("FAL key found. Submitting image-to-video request...")

# Use Stable Video Diffusion for image-to-video
handler = fal.submit(
    "fal-ai/stable-video-diffusion/image-to-video",
    arguments={
        "image_url": "https://v3b.fal.media/files/b/0aa5a864/7foXnf5pmSS8PMoNMUJyP_Mnp7Vh8G.png",
        "motion_bucket_id": 127,
        "fps": 6,
        "cond_aug": 0.02,
        "decoding_t": 1,
    },
)

print("Job submitted. Waiting for result...")

for event in handler.iter_events(with_logs=True):
    print(event)

result = handler.get()
print("\nResult:")
print(result)

# Save the video URL
if result and result.get("video"):
    video_url = result["video"]["url"]
    print(f"\nVideo URL: {video_url}")
    
    # Download it
    import requests
    response = requests.get(video_url, stream=True)
    if response.status_code == 200:
        output_path = "/home/hermes1/engineer-off-duty/public/videos/intro.mp4"
        with open(output_path, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f"Video saved to {output_path}")
        print(f"File size: {os.path.getsize(output_path)} bytes")
    else:
        print(f"Failed to download: {response.status_code}")
else:
    print("No video in result")
