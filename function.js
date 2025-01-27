/** @format */

let menuToggle = document.querySelector('.menuToggle');
let menu = document.querySelector('.menu');
let shown = false;
menuToggle.onclick = function () {
  menu.classList.toggle('active');
};
var viewpoints = document.getElementsByClassName('Viewpoint');
var views = document.getElementsByClassName('View');
function show(thingy) {
  /* YeS... I am naming this variable thingy😀*/
  for (viewpoint of viewpoints) {
    viewpoint.classList.remove('Activepoint');
  }
  for (view of views) {
    view.classList.remove('Activeview');
  }
  event.currentTarget.classList.add('Activepoint');
  document.getElementById(thingy).classList.add('Activeview');
}
let anime = true;
const abutton = document.getElementById('Anime');
abutton.addEventListener('click', animate);
let Icons = document.querySelectorAll('.Icon');
let skillCards = document.querySelectorAll('.skill-card');
let titles = document.querySelectorAll('.subTitle');
let shownWelcome = false;
function animate() {
  document.getElementById('AnimationsTask').checked = true;
  checkQuests();
  if (anime) {
    for (i = 0; i < Icons.length; ++i) {
      Icons[i].classList.remove('animate');
    }
    for (s = 0; s < skillCards.length; ++s) {
      skillCards[s].classList.remove('bounce');
    }
    for (t = 0; t < titles.length; ++t) {
      titles[t].classList.remove('bounce');
    }
    anime = false;
    window.location.assign(`#ContactSection`);
    setTimeout(backHome, 2000);
  } else {
    for (i = 0; i < Icons.length; ++i) {
      Icons[i].classList.add('animate');
    }
    for (s = 0; s < skillCards.length; ++s) {
      skillCards[s].classList.add('bounce');
    }
    for (t = 0; t < titles.length; ++t) {
      titles[t].classList.add('bounce');
    }
    anime = true;

    window.location.assign(`#ContactSection`);
    setTimeout(backHome, 2000);
  }
}
function backHome() {
  window.location.assign(`#`);
}
function showWelcome() {
  const notification = document.getElementById('notification');
  notification.style.display = 'flex';
}
//This is an Intersection Observer ... Duh🤣, in plain english, a method (function) of checking if each section is currently visisble
// on the user's screen, if not the item is hidden, if so then it loads in//
let observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (anime) {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        if (entry.target.classList.contains('AboutMe') && !shownWelcome) {
          showWelcome();
          shownWelcome = true;
        }
      } else {
        entry.target.classList.remove('show');
      }
    } else {
      entry.target.classList.add('show');
    }
  });
});
let hiddenElements = document.querySelectorAll('.Projects, .AboutMe, .Skills');
hiddenElements.forEach((el) => observer.observe(el));
let loader = document.getElementById('preloader');
window.addEventListener('load', function (load) {
  // Lazy Loading :) //
  this.window.removeEventListener('load', load, false);
  if (window.location.hash === '#tos') {
    // Display the ToS modal
    document.getElementById('ToS').style.display = 'flex';
  }
  this.setTimeout(function () {
    loader.style.display = 'none';
    this.document.body.style.overflowY = 'scroll';
  }, 3000);
});

function downloadCV() {
  downloadFile('Documents/TinotendaMhedzisoCV.pdf', 'TinotendaMhedzisoCV.pdf');
  document.getElementById('CVTask').checked = true;
  checkQuests();
}
function downloadFile(fileUrl, fileName) {
  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function openGitHub() {
  document.getElementById('GitHubTask').checked = true;
  navigateToSite('https://github.com/Passion-Over-Pain');
  checkQuests();
}

function openEmail() {
  navigateToSite('mailto:tinomhedziso21@gmail.com');
}
function openDevTo() {
  navigateToSite('https://dev.to/passionoverpain');
}
function openLinkedIn() {
  navigateToSite('https://www.linkedin.com/in/tinotenda-mhedziso/');
}
function openProjects() {
  document.getElementById('GitHubTask').checked = true;
  navigateToSite(`https://github.com/Passion-Over-Pain?tab=repositories`);
  checkQuests();
}
function navigateToSite(fileUrl) {
  const link = document.createElement('a');
  link.href = fileUrl;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
document.getElementById('menuOpener').addEventListener(
  'click',
  () => {
    document.getElementById('NavigationTask').checked = true;
    checkQuests();
  },
  { once: true }
);
function openNavMenu() {
  const navMenu = document.getElementById('menuOpener');
  navMenu.click();
}
// Function to check the checkbox when the chatbot opens
function handleChatbotOpen(mutationsList) {
  mutationsList.forEach((mutation) => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      const botpressWebchat = mutation.target;
      if (botpressWebchat.classList.contains('bpOpen')) {
        document.getElementById('TalktoPassionTask').checked = true;
        checkQuests();
      }
    }
  });
}
const botpressWebchat = document.querySelector('iframe[name="webchat"]');
if (botpressWebchat) {
  const observer = new MutationObserver(handleChatbotOpen);
  observer.observe(botpressWebchat, { attributes: true }); // Observe changes in attributes
} else {
  console.warn('Botpress Webchat iframe not found');
}
function checkQuests() {
  let complete = true;
  const quests = document.getElementsByName('r');
  quests.forEach((quest) => {
    if (!quest.checked) {
      complete = false;
    }
  });
  if (complete && !shown) {
    showPopUp(3);
    shown = true;
  }
}
function showPopUp(message) {
  document.getElementById('passionModal').style.display = 'flex';
  const cardIcon = document.getElementById('passionCardIcon');
  const cardContent = document.getElementById('passionCardContent');
  const notification = document.getElementById('notification');
  switch (message) {
    case 1:
      {
        cardIcon.localName = 'logo-github';
        cardContent.innerHTML = `<div class="flexBox">
              <img src="Images/Passion.webp" alt="" />
            </div>
            <p class="card__title">Welcome</p>
            <p class="card__description">
              Hey there! I'm Passion, Tino's personalized AI chatbot. Welcome to
              our portfolio website. Here are a few things to keep in mind as
              you explore:
            </p>
            <ol class="leftText">
              <li>
                The sunshine-like icon at the top right is your navigation menu.
              </li>
              <li>
                I've prepared some optional quest-like tasks to help you
                familiarize yourself with the site, along with some personal
                requests.
              </li>
              <li>
                You can access these tasks through the to-do or checklist icon.
              </li>
              <li>
                Feel free to interact with me anytime using the message icon at
                the bottom right corner.
              </li>
            </ol>
            <div class="flexBox">
              <button class="ui-btn" onclick="hidePopUp()">
                <span>Return</span>
              </button>
            </div>`;
      }

      break;

    default:
      break;
  }
  notification.style.display = 'none';
}
function hidePopUp() {
  document.getElementById('passionModal').style.display = 'none';
}

function showToS() {
  document.getElementById('ToS').style.display = 'flex';
}
function toggleCheckList() {
  let checkList = document.getElementById('checkCon');
  checkList.classList.toggle('hidden');
  checkList.classList.toggle('visible');
}

function hideToS(acceptance) {
  if (acceptance) {
    document.getElementById('ToSTask').checked = true;
    document.getElementById('acceptanceBtns').style.display = 'none';
    document.getElementById('closeToS').style.display = 'block';
    checkQuests();
  }
  document.getElementById('ToS').style.display = 'none';
}
