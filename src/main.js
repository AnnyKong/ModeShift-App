/* This file contains main thing js does
 * Contributor: Xinrong Zhao
 */

"use strict";  // turn on syntax check

window.addEventListener("load", init);

function init(){
  // init dropdown menu
  let drop_btn = document.getElementById("top-menu-drop-button");
  drop_btn.addEventListener("click", showDropDownMenu)

  let up_btn = document.getElementById("top-menu-up-button");
  up_btn.addEventListener("click", hideDropDownMenu)
}

function showDropDownMenu() {
	// delete myself
	document.getElementById("top-menu-drop-button-image").style.display = "none";
	this.style.display = "none";

	// set up button and menu visible
	document.getElementById("top-menu-up-button-image").style.display = "block";
	document.getElementById("top-menu-up-button").style.display = "block";
	document.getElementById("top-menu-bar").style.display = "flex";
}

function hideDropDownMenu() {
	// delete myself
	document.getElementById("top-menu-up-button-image").style.display = "none";
	this.style.display = "none";

	// set up button and menu visible
	document.getElementById("top-menu-drop-button-image").style.display = "block";
	document.getElementById("top-menu-drop-button").style.display = "block";
	document.getElementById("top-menu-bar").style.display = "none";
}