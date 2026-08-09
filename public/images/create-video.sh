#!/bin/bash
cd /home/hermes1/engineer-off-duty/public/images

# Create a 1-minute cinematic intro video from generated images
# Using ffmpeg with Ken Burns effect, crossfade transitions, and text overlays

ffmpeg -y \
  -loop 1 -t 10 -i intro-video.png \
  -loop 1 -t 10 -i on-duty-cinematic.png \
  -loop 1 -t 10 -i on-duty-sign.png \
  -loop 1 -t 10 -i off-duty-bg.png \
  -loop 1 -t 10 -i off-duty-sign.png \
  -loop 1 -t 10 -i profile.png \
  -filter_complex "
    color=c=black:s=1920x1080:d=60:r=30[base];
    [0:v]scale=1920:1080,setsar=1,format=yuv420p,zoompan=z='1.2+0.001*in':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=300:s=1920x1080:fps=30,setpts=PTS-STARTPTS[v0];
    [1:v]scale=1920:1080,setsar=1,format=yuv420p,zoompan=z='1.3-0.001*in':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=300:s=1920x1080:fps=30,setpts=PTS-STARTPTS[v1];
    [2:v]scale=1920:1080,setsar=1,format=yuv420p,zoompan=z='1.1+0.002*in':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=300:s=1920x1080:fps=30,setpts=PTS-STARTPTS[v2];
    [3:v]scale=1920:1080,setsar=1,format=yuv420p,zoompan=z='1.4-0.001*in':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=300:s=1920x1080:fps=30,setpts=PTS-STARTPTS[v3];
    [4:v]scale=1920:1080,setsar=1,format=yuv420p,zoompan=z='1.2+0.001*in':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=300:s=1920x1080:fps=30,setpts=PTS-STARTPTS[v4];
    [5:v]scale=1920:1080,setsar=1,format=yuv420p,zoompan=z='1.5-0.001*in':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=300:s=1920x1080:fps=30,setpts=PTS-STARTPTS[v5];
    [v0][v1]xfade=transition=fade:duration=1:offset=9[v01];
    [v01][v2]xfade=transition=fade:duration=1:offset=19[v012];
    [v012][v3]xfade=transition=fade:duration=1:offset=29[v0123];
    [v0123][v4]xfade=transition=fade:duration=1:offset=39[v01234];
    [v01234][v5]xfade=transition=fade:duration=1:offset=49[out];
    [out]drawtext=text='Eddy':fontcolor=white:fontsize=120:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,1,8)':font=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf[txt1];
    [txt1]drawtext=text='Engineer Off Duty':fontcolor=cyan:fontsize=60:x=(w-text_w)/2:y=h-th-80:enable='between(t,1,8)':font=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf[txt2];
    [txt2]drawtext=text='Building the future':fontcolor=white:fontsize=80:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,11,18)':font=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf[txt3];
    [txt3]drawtext=text='Line by line':fontcolor=cyan:fontsize=50:x=(w-text_w)/2:y=h-th-80:enable='between(t,11,18)':font=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf[txt4];
    [txt4]drawtext=text='On Duty':fontcolor=#00ff88:fontsize=100:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,21,28)':font=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf[txt5];
    [txt5]drawtext=text='Problem solver':fontcolor=white:fontsize=50:x=(w-text_w)/2:y=h-th-80:enable='between(t,21,28)':font=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf[txt6];
    [txt6]drawtext=text='Exploring the world':fontcolor=#ff9900:fontsize=80:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,31,38)':font=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf[txt7];
    [txt7]drawtext=text='One adventure at a time':fontcolor=white:fontsize=50:x=(w-text_w)/2:y=h-th-80:enable='between(t,31,38)':font=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf[txt8];
    [txt8]drawtext=text='Off Duty':fontcolor=#ff6600:fontsize=100:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,41,48)':font=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf[txt9];
    [txt9]drawtext=text='Foodie & traveler':fontcolor=white:fontsize=50:x=(w-text_w)/2:y=h-th-80:enable='between(t,41,48)':font=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf[txt10];
    [txt10]drawtext=text='Eddy':fontcolor=white:fontsize=120:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,51,58)':font=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf[txt11];
    [txt11]drawtext=text='Engineer by day, explorer by night':fontcolor=cyan:fontsize=40:x=(w-text_w)/2:y=h-th-80:enable='between(t,51,58)':font=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf[final]
  " \
  -map "[final]" \
  -c:v libx264 -preset medium -crf 23 \
  -pix_fmt yuv420p \
  -t 60 \
  -movflags +faststart \
  intro-video.mp4

echo "Video created: intro-video.mp4"
ls -la intro-video.mp4
