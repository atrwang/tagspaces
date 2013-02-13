/* Copyright (c) 2012 The Tagspaces Authors. All rights reserved.
 * Use of this source code is governed by a AGPL3 license that 
 * can be found in the LICENSE file. */

define([
    'require',
    'exports',
    'module',
],function(require, exports, module) {
"use strict";

console.debug("Loading: viewThumb/extension.js");

exports.Title = "River View"
exports.ID = "viewRiver";  // ID should be equal to the directory name where the ext. is located   
exports.Type =  "view";
exports.Icon = "ui-icon-image";

var viewContainer = undefined;
var viewToolbar = undefined;
var viewFooter = undefined;

exports.init = function init() {
	console.debug("Initializing View "+exports.ID);
	
    viewContainer = $("#"+exports.ID+"Container");
    viewToolbar = $("#"+exports.ID+"Toolbar");
	viewFooter = $("#"+exports.ID+"Footer");
	
	viewContainer.empty();
	viewToolbar.empty();
	viewFooter.empty();	
	
    viewToolbar.append($("<button>", { 
        text: "New",
		disabled: true,
        title: "Create new file",
        id: exports.ID+"CreateFileButton",    
    }));

    viewContainer.append($("<div>", { 
        style: "width: 100%",
        id: exports.ID+"RV",
    }));	
	
    initButtons();
}

exports.load = function load() {
	console.debug("Showing View "+exports.ID);
   
	// Purging the thumbnail view, avoiding memory leak
	// document.getElementById(exports.ID+"SelectableFiles").innerHTML = "";

    $("#"+exports.ID+"RV").empty();
    var tagsHTML = undefined;
    for (var i=0; i < UIAPI.fileList.length; i++) {
        if(i > 10) break;
        tagsHTML = "";
        var fileName = UIAPI.fileList[i][0];
        var filePath = UIAPI.currentPath+UIAPI.getDirSeparator()+fileName;
        tagsHTML += '<iframe id="idFrameViewer" style="width: 100%; height: 150px;" src="'+'file:///'+filePath+'" />';
        $("#"+exports.ID+"RV").append(tagsHTML);
    }

    UIAPI.hideLoadingAnimation();     
}

exports.setFileFilter = function setFileFilter(filter) {
	console.debug("setFileFilter not implemented in "+exports.ID);
}

exports.clearSelectedFiles = function() {
    // TODO Deselect all
}

var initButtons = function() {
    $( "#"+exports.ID+"CreateFileButton" ).button({
        text: true,
        icons: {
            primary: "ui-icon-document"
        }
    })
    .click(function() {
        $( "#dialog-filecreate" ).dialog( "open" );
    });  
}

});