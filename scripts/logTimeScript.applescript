on run {input, parameters}
	
	tell application "Terminal"
		activate
		do script "cd ~/Documents/google-maps-travel-time-fetcher/scripts;" & "node logTime.js"
	end tell
