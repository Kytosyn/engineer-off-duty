#!/bin/bash
# Create a cinematic 30-second intro video from multiple images
# Using Ken Burns effect with smooth transitions

cd /home/hermes1/engineer-off-duty/public/images

# First, generate more images for variety
echo "Creating video from images..."

# Remove old video
rm -f ../videos/intro.mp4
rm -f /tmp/clip_*.mp4

# Create 6 five-second clips from different images
# Each with unique Ken Burns movement

# Clip 1: Intro video (push zoom)
ffmpeg -y -loop 1 -t 5 -i intro-video.png \
  -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,fps=24,format=yuv420p,zoompan=z='1.0+0.002*in':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=120:s=1280x720:fps=24" \
  -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p /tmp/clip_0.mp4 2>/dev/null

# Clip 2: Developer (pan right)
ffmpeg -y -loop 1 -t 5 -i on-duty-cinematic.png \
  -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,fps=24,format=yuv420p,zoompan=z='1.0':x='iw/2-(iw/zoom/2)+in*2':y='ih/2-(ih/zoom/2)':d=120:s=1280x720:fps=24" \
  -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p /tmp/clip_1.mp4 2>/dev/null

# Clip 3: Tropical beach (tilt up)
ffmpeg -y -loop 1 -t 5 -i tropical-beach.png \
  -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,fps=24,format=yuv420p,zoompan=z='1.0':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)-in*1.5':d=120:s=1280x720:fps=24" \
  -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p /tmp/clip_2.mp4 2>/dev/null

# Clip 4: Aerial sunset (zoom out)
ffmpeg -y -loop 1 -t 5 -i aerial-sunset.png \
  -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,fps=24,format=yuv420p,zoompan=z='1.3-0.004*in':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=120:s=1280x720:fps=24" \
  -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p /tmp/clip_3.mp4 2>/dev/null

# Clip 5: Profile (push zoom)
ffmpeg -y -loop 1 -t 5 -i profile.png \
  -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,fps=24,format=yuv420p,zoompan=z='1.0+0.003*in':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=120:s=1280x720:fps=24" \
  -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p /tmp/clip_4.mp4 2>/dev/null

# Clip 6: Phuket resort (pull back)
ffmpeg -y -loop 1 -t 5 -i phuket-resort.png \
  -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,fps=24,format=yuv420p,zoompan=z='1.5-0.006*in':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=120:s=1280x720:fps=24" \
  -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p /tmp/clip_5.mp4 2>/dev/null

echo "All clips created. Concatenating..."

# Create concat file
for i in 0 1 2 3 4 5; do
  echo "file '/tmp/clip_$i.mp4'" >> /tmp/concat.txt
done

# Concatenate all clips
ffmpeg -y -f concat -safe 0 -i /tmp/concat.txt -c copy ../videos/intro.mp4 2>&1 | tail -3

# Cleanup
rm -f /tmp/clip_*.mp4 /tmp/concat.txt

echo "Final video:"
ls -la ../videos/intro.mp4
ffprobe -v quiet -show_entries stream=codec_name,pix_fmt,duration -of default ../videos/intro.mp4
