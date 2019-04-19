/* This file contains main thing js does
 * Contributor: Xinrong Zhao
 */

"use strict";  // turn on syntax check

window.addEventListener("load", init);
window.addEventListener("resize", resizeBackground);
///////////////////////////////////////////////////////
// response functions
///////////////////////////////////////////////////////
function init(){
  // init dropdown menu
  let drop_btn = document.getElementById("top-menu-drop-button");
  drop_btn.addEventListener("click", showDropDownMenu)

  let up_btn = document.getElementById("top-menu-up-button");
  up_btn.addEventListener("click", hideDropDownMenu)

  // init header/footer background
  resizeBackground();
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

function resizeBackground() {
  let header = document.querySelector("header");
  let height = getComputedStyle(header).getPropertyValue('height'); /* string */
  header.style.marginTop = "-" + height;
  document.querySelector("main").style.marginTop = height;

  let footer = document.querySelector("footer");
  height = getComputedStyle(footer).getPropertyValue('height'); /* string */

  let imgs = document.querySelectorAll("footer img");
  for (let i = 0; i < imgs.length; i++) {
    imgs[i].style.height = height;
  }

  let ps = document.querySelectorAll("footer p");
  for (let i = 0; i < imgs.length; i++) {
    ps[i].style.lineHeight = height;
  }
}