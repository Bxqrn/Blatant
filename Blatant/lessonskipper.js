(function() {
    // Part 1: Debugging and Exposing 'pause' Function with Error Handling and Logging
    const pauseLesson = () => {
        if (typeof lessonBridge !== 'undefined' && lessonBridge.pause) {
            console.log('Pausing lesson...');
            lessonBridge.pause(); // Calls the 'lessonBridge.pause' function to pause the lesson
        } else {
            console.error('lessonBridge.pause function is not defined or lessonBridge is unavailable.');
        }
    };

    // Part 2: Handling Lesson Completion with Score

    // A safer way to get the mainHook function, and provide a fallback if not available
    window.mainHook = window._0xcc7fd3 || (() => {
        console.error('mainHook (_0xcc7fd3) is not defined, ensure it is correctly initialized.');
    });

    // Function to handle the lesson completion with a score input and validation
    window.p1 = function(score) {
        if (typeof score !== 'number' || score < 0 || score > 100) {
            console.error('Invalid score value:', score);
            alert('Please enter a valid score between 0 and 100.');
            return;
        }

        const iframe = document.querySelector('iframe');
        if (!iframe) {
            console.error('Unable to find iframe on the page.');
            return;
        }

        // Extract csid safely and check for errors in extraction
        const iframeSrc = iframe.src || '';
        const csidMatch = iframeSrc.match(/csid=([^&]+)/);
        if (!csidMatch) {
            console.error('CSID extraction failed from iframe src.');
            return;
        }

        const csid = csidMatch[1]; // Extracted CSID
        const objScore = { score }; // Prepare the score object for the server

        // Safely invoke the completion function with error handling for the mainHook
        if (typeof mainHook.completeLessonComponent === 'function') {
            try {
                mainHook.completeLessonComponent(csid, objScore);
                console.log(`Lesson completed with score: ${score} (CSID: ${csid})`);
            } catch (err) {
                console.error('Error while completing the lesson:', err);
            }
        } else {
            console.error('mainHook.completeLessonComponent function is not available.');
        }
    };

    // Expose the pause function for direct use if needed
    window.pauseLesson = pauseLesson;

    // Optionally, invoke the pause function when the script runs, for auto-debugging
    // pauseLesson(); // Uncomment this line if you want the lesson to pause automatically

})();
