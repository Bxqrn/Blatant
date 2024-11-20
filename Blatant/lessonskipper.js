//part 1
debug(lessonBridge.pause) // exposes scope when function called
lessonBridge.pause() //calls the 'lessonBridge.pause' func.

// part 2
window.mainHook = _0xcc7fd3; // extracts the '_0xcc7fd3' variable to get the completeLessonComponent func.
window.p1 = function(score) {
    let csid = html5Iframe.src.split('csid=')[1].split('&type')[0] // gets the current lesson csid
    objScore = { score: score } //makes the score into an obj to make server happy
    mainHook.completeLessonComponent(csid, objScore); // sends the request to complete the lesson
}
