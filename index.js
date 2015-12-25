"use strict"

var EOL = require("os").EOL

// main function
// usage:
// var nodedown = require("nodedown")
// nodedown.digest("#your markdown text", function(result){
// 	console.log(result)
// })
// -
module.exports.digest = function(str, cb){
	// this function used large quantity regexp
	// so, here use nextTick to process and give a callback
	process.nextTick(function(){
		// split the input string with double wrap
		var arr = str.split(EOL + EOL)

		var result = "";
		for(var i=0;i<arr.length;i++){
			// test title number
			var hn = title(arr[i])
			if(hn){
				// if is title,
				// format the title
				var text = arr[i].match(/#{1,6}(.*)/)[1]
				result += "<h" + hn + ">" + text + "</h" + hn + ">"
			}else{
				if(/> /.test(arr[i])){
					// test is quote
					var text = arr[i].match(/> (.*)/)[1]
					result += "<p class='quote'>" + text + "</p>"
				}else if(/^\* .*/.test(arr[i])){
					// list
					var list = arr[i].match(/^\* (.*)/gm)
					var text = "<ul>"
					for(var j=0;j<list.length;j++){
						text += "<li>" + list[j].slice(2) + "</li>"
					}
					text += "</ul>"
					result += text
				}else if(/^\`\`\`/m.test(arr[i]) && /\`\`\`$/m.test(arr[i])){
					// code
					var code = arr[i].split(EOL)
					var text = "<code>"
					for(var j=1;j<code.length - 1;j++){
						text += "<li>" + code[j] + "</li>"
					}
					text += "</code>"
					result += text
				}else{
					// normal paragraph
					result += "<p>" + arr[i] + "</p>"
				}
			}
		}

		// convert inline element
		result = inline(result)

		// use callback return the result
		cb(result)
	})
}

// get title level
function title(str){
	var hn = str.match(/^#*/g)[0].length
	if(hn > 0 && hn < 7){
		return hn
	}else{
		return false
	}
}

// process inline elements
function inline(str){
	// bold
	str = str.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")

	// italics
	str = str.replace(/\*(.*?)\*/g, "<i>$1</i>")

	// delete line
	str = str.replace(/~(.*?)~/g, "<del>$1</del>")

	// link
	str = str.replace(/\[(.*?)\]\((.*?)\)/g, "<a href='$2'>$1</a>")

	// image
	str = str.replace(/\!\[(.*?)\]\((.*?)\)/g, "<img src='$2' alt='$1' />")

	return str
}