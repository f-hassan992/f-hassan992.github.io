/*
  script.js
  Portfolio Website — Fayza Hassan
  Purpose: UI interactions (mobile menu, scroll animations, code copy, skill bars)
  This file is a browser script — open index.html in a browser to run it.
*/

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {

    /* ---- 1. Mobile hamburger menu ---- */
    var hamburger = document.querySelector(".hamburger");
    var navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
      hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("open");
        hamburger.classList.toggle("active");
      });

      var links = navLinks.querySelectorAll("a");
      for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function () {
          navLinks.classList.remove("open");
          hamburger.classList.remove("active");
        });
      }
    }

    /* ---- 2. Active nav link highlighting ---- */
    var currentPage = window.location.pathname.split("/").pop() || "index.html";
    var allNavLinks = document.querySelectorAll(".nav-links a");
    for (var j = 0; j < allNavLinks.length; j++) {
      if (allNavLinks[j].getAttribute("href") === currentPage) {
        allNavLinks[j].classList.add("active");
      }
    }

    /* ---- 3. Scroll reveal animation ---- */
    var animateElements = document.querySelectorAll(".animate-in");

    if ("IntersectionObserver" in window) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, index) {
          if (entry.isIntersecting) {
            setTimeout(function () {
              entry.target.classList.add("visible");
            }, index * 80);
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      for (var k = 0; k < animateElements.length; k++) {
        revealObserver.observe(animateElements[k]);
      }
    } else {
      for (var m = 0; m < animateElements.length; m++) {
        animateElements[m].classList.add("visible");
      }
    }

    /* ---- 4. Click to copy code blocks ---- */
    var codeBlocks = document.querySelectorAll(".code-block");
    for (var n = 0; n < codeBlocks.length; n++) {
      codeBlocks[n].style.cursor = "pointer";
      codeBlocks[n].setAttribute("title", "Click to copy");
      codeBlocks[n].addEventListener("click", function (event) {
        var block = event.currentTarget;
        var codeEl = block.querySelector("code");
        if (!codeEl) { return; }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(codeEl.innerText).then(function () {
            block.classList.add("copied");
            setTimeout(function () { block.classList.remove("copied"); }, 1600);
          });
        }
      });
    }

    /* ---- 5. Skill bar scroll animation ---- */
    var skillSection = document.getElementById("skill-bars");
    if (skillSection && "IntersectionObserver" in window) {
      var barObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var bars = document.querySelectorAll(".skill-bar-fill");
            for (var b = 0; b < bars.length; b++) {
              bars[b].style.width = bars[b].dataset.width + "%";
            }
            barObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      barObserver.observe(skillSection);
    }

  });

}());
