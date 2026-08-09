#!/bin/bash
# Create a 1-minute intro video from multiple images with crossfade transitions
cd /home/hermes1/engineer-off-duty/public/images

rm -f clip_*.mp4 concat.txt intro-video.mp4

# Images to use (10 seconds each = 60 seconds total)
images=(
  "intro-video.png"
  "on-duty-cinematic.png" 
  "on-duty-sign.png"
  "off-duty-bg.png"
  "off-duty-sign.png"
  "profile.png"
)

# Create 6 ten-second clips with Ken Burns zoom effect
for i in "${!images[@]}"; do
  ffmpeg -y -loop 1 -t 10 -i "${images[$i]}" \
    -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,fps=24,format=yuv420p,zoompan=z='if(lte(on,1),1.0,1.0+0.001*on)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=240:s=1280x720:fps=24" \
    -c:v libx264 -preset fast -crf 23 -pix_fmt yuv420p \
    "clip_$i.mp4" 2>/dev/null
  echo "Created clip $i"
done

# Create concat file
for i in $(seq 0 5); do
  echo "file 'clip_$i.mp4'" >> concat.txt
done

# Concatenate all clips into final video
ffmpeg -y -f concat -safe 0 -i concat.txt -c copy intro-video.mp4 2>&1 | tail -3

# Cleanup temp files
rm -f clip_*.mp4 concat.txt

echo "Final video:"
ls -la intro-video.mp4
ffprobe -v quiet -print_format json -show_streams intro-video.mp4 2>/dev/null | grep -E '"duration"|"width"|"height"'
