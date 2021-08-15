# RTPTranslator

Translates RTP.PT CCs

For those who watch rtp.pt/play and struggle with understanding, I wrote a small program that will translate the programs that have CC subtitles (very few do, sadly) and replace the Portuguese subtitles with Portuguese + English subtitles.
A few caveats:
- You'll need to watch a program that has the CC button displayed on the screen 
- You need to know how to open the "console" in Chrome
- You need to get a free developer API key from DeepL (https://www.deepl.com/pro/change-plan#developer)
- This will likely break if the RTP site is ever changed
- You can only translate 500,000 characters per month on the free account.  It's your responsibility to make sure this is working properly.  I'm not responsible for defects that might cause you to use up your limit too quickly.
You can see an example of how this works at https://www.loom.com/share/cf9f547c9592458188cf11a392802275

# How To
- Copy the code at https://raw.githubusercontent.com/straley/RTPTranslator/main/translate.js (adding your DEEPL API key).
- Go to https://rtp.pt/play
- Find programming where the [CC] button appears in the playback video
- Open the developer console and paste in the code

# Notes
- Sometimes it goes crazy if the page isn't fully loaded and you'll see lots of text repeating in the console.  If this happens, reload the page and paste again.
- You do not need to turn on CC before you run this, it'll do that for you
- If stores the translations locally in your local webstorage, if you ever want to do anything with them

# Help
- Turn this into a Google Chrome Extension!
