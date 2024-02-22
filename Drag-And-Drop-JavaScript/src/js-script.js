	// Drag and Drop Game in Pure JavaScript.
	// Developed by Trainer Riad Thalji for educational game development.
	// However it can be used for any Drag and Drop Games.

	// Define number of icons to be draged.
	const numIcons = 19;   
        
	// ProcNames or you may call it Icon Text List will contain the text that will appear on each icon.
	const ProcNames = {
            p1: "Develop Project Charter",
            p2: "Develop Project Management Plan",
            p3: "Direct and Manage Project Work",
            p4: "Manage Project Knowledge",
            p5: "Monitor and Control Project",
            p6: "Perform Integrated Change Control",
            p7: "Close Project or Phase",
            p8: "Plan Scope Management",
            p9: "Collect Requirements",
            p10: "Define Scope",
            p11: "Create WBS",
            p12: "Validate Scope",
            p13: "Control Scope",
            p14: "Plan Schedule Management",
            p15: "Define Activities",
            p16: "Sequence Activities",
            p17: "Estimate Activity Durations",
            p18: "Develop Schedule",
            p19: "Control Schedule"
        };
 
	// This function will dipict the table of icons and targets once the game is started or re-started
        function depictTable() {
	    // Depect the top row of the table:
            document.write("<div class='row'>" +
                "<div class='th1 col-2'>&nbsp;</div>" +
                "<div class='th1 col-2'>Initiation</div>" +
                "<div class='th1 col-2'>Planning</div>" +
                "<div class='th1 col-2'>Execution</div>" +
                "<div class='th1 col-2'>Monitoring and Controlling</div>" +
                "<div class='th1 col-2'>Closing</div>" +
                "</div>");

	    // This is a high mechanisim where you can make some of the target cells blank and define others as targets.
	    // Now depect each row of the target cells.  A cell with "0" in it will not be a target.
	    // From this example in row 3 the second cell will be blank while the third will contain "p8" which is the  name of the correct expected icon to be dragged into it.
            var strRows = depictRows("Integration", "p1", "p2", "p3", "p5", "p7") +
                	  depictRows("0", "0", "0", "p4", "p6", "0") +
                          depictRows("Scope", "0", "p8", "0", "p12", "0") +
                          depictRows("0", "0", "p9", "0", "p13", "0") +
                          depictRows("0", "0", "p10", "0", "0", "0") +
                          depictRows("0", "0", "p11", "0", "0", "0") +
                          depictRows("Schedule", "0", "p14", "0", "p19", "0") +
                          depictRows("0", "0", "p15", "0", "0", "0") +
                          depictRows("0", "0", "p16", "0", "0", "0") +
                          depictRows("0", "0", "p17", "0", "0", "0") +
                          depictRows("0", "0", "p18", "0", "0", "0");
            document.write(strRows);
        }

 	// Once called this function will actually depict the Rows:
        function depictRows(leftTitle, v1, v2, v3, v4, v5) {
            const emptyLcDat = "<div class='emptyLc col-2'>&nbsp;</div>";
            const argAry = ["0", v1, v2, v3, v4, v5];
            const sepLine = "<div class='spline col-12'></div>";

            var str1 = "<div class='row col=12'>";

            if (leftTitle != "0") {
                str1 = str1 + sepLine + "<div id='" + leftTitle + "' class='col-2 lc'>" + leftTitle + "</div>";
            } else { str1 = str1 + emptyLcDat };

            for (var i = 1; i <= 5; i++) {
                if (argAry[i] == "0") {
                    str1 = str1 + "<div class='tcb col-2'>" + "" + "</div>";
                } else {
                    str1 = str1 + "<div id='" + argAry[i]
                        + "' ondrop='drop(event)' ondragover='allowDrop(event)' class='tc1 col-2'>"
                        + "" + "</div>";
                };
            }

            str1 = str1 + "</div>"
            return str1;
        }

	// This function will depict all the icons to be dragged and sort them randomly:
        function depictIcons() {
            var strBtn = "";
            var btnAry = [];
            for (var i = 1; i <= 19; i++) {
                btnAry.push("<button " + "Class='pbtn' " +
                    "draggable='true'" + "ondragstart='drag(event)'" +
                    "id='btnp" + i + "'>" + ProcNames["p" + i] + "</button>");
            };
            // Randomize
            btnAry.sort(function () { return 0.5 - Math.random(); });

            for (var w = 0; w < 19; w++) { strBtn = strBtn + btnAry[w]; }

            document.write(strBtn);
        }

	// This function will trigger when the button labled "Start Over" button is clicked
        function restartAll() {
            location.reload();
        }

	// This function will show the correct answer expected by the player so that he can undestand what is expected and compare his answers.
	// It will fire once the button labled "Peek to Answer" is clicked.
        function peek2Answers() {
            location.reload;
            for (var i = 1; i <= numIcons; i++) {
                var btn = document.querySelector("#btnp" + i);
                var pn = document.querySelector("#p" + i);
                moveElement(btn, pn);
                document.getElementById(pn.id).style.backgroundColor = "green";
            }
        }

        // This function will get the key name from the icon list (in this example the process names list shown at the beginning of the code):
	function lookupKey(pProcName) {
            for (var i = 0; i < numIcons; i++) {
                var theKey = "p" + i;
                if (ProcNames[theKey] == pProcName) { return theKey; };
            }
        }

	// This function will enable dropping icons into the target cell:
        function allowDrop(ev) {
            ev.preventDefault();
        }

	// This function will process the dragging of an icon:
        function drag(ev) {
            const psrc = document.getElementById(ev.target.id);
            const psrcParent = psrc.parentElement.id;
            if (psrcParent != "dragbox") { document.getElementById(psrcParent).style.backgroundColor = "white"; }
            
            ev.dataTransfer.setData("text", ev.target.id);
        }

	// This function will process the dropping of an icon:
        function drop(ev) {
            ev.preventDefault();
            const data = ev.dataTransfer.getData("text");
            const pdragbox = document.querySelector("#dragbox");
            var ptrg = document.querySelector("#" + ev.target.id);

            if (ev.target.id[0] == "b") { ptrg = ptrg.parentElement; };

            if (ptrg.children.length > 0) { moveElement(ptrg.firstElementChild, pdragbox) };

            ptrg.appendChild(document.getElementById(data));

            var drpdProcName = document.getElementById(data).innerHTML;

            if (ProcNames[ptrg.id] == drpdProcName) { document.getElementById(ptrg.id).style.backgroundColor = "green"; }
            else { document.getElementById(ptrg.id).style.backgroundColor = "red"; };
        }

	// This function processes the move of an element:
        function moveElement(p1, p2) {
            p1Parent = p1.parentElement;
            p1Parent.removeChild(p1);
            p2.appendChild(p1);
        }
