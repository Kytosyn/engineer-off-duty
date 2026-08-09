#!/bin/bash

# Simpler approach - create video from images with crossfade
rm -f intro-video.mp4

# Create 6 ten-second clips with Ken Burns effect
for i in 0 1 2 3 4 5; do
  case $i in
    0) img="intro-video.png";;
    1) img="on-duty-cinematic.png";;
    2) img="on-duty-sign.png";;
    3) img="off-duty-bg.png";;
    4) img="off-duty-sign.png";;
    5) img="profile.png";;
  esac
  
  ffmpeg -y -loop 1 -t 10 -i "$img" \
    -vf "scale=1920:1080,setsar=1,format=yuv420p,zoompan=z='1.2':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=300:s=1920x1080:fps=30" \
    -c:v libx264 -preset fast -crf 23 -pix_fmt yuv420p \
    -movflags +faststart \
    "clip_$i.mp4" 2>&1 | tail -1
done

# Create concat file
for i in 0 1 2 3 4 5; do
  echo "file 'clip_$i.mp4'" >> concat.txt
done

# Concatenate all clips
ffmpeg -y -f concat -safe 0 -i concat.txt \
  -c copy intro-video.mp4 2>&1 | tail -3

# Cleanup
rm -f clip_*.mp4 concat.txt

ls -la intro-video.mp4
