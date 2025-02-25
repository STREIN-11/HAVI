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
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');
const welcomeHTML = document.getElementById('passionModal').innerHTML;
let cardTitle = document.getElementById('cardTitle');
let cardImage = document.getElementById('cardImage');
let cardDescription = document.getElementById('cardDescription');

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
    window.location.assign(`#FooterSection`);
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

    window.location.assign(`#FooterSection`);
    setTimeout(backHome, 2000);
  }
}
function backHome() {
  window.location.assign(`#`);
}

function checkNotifications() {
  if (notification.style.display == 'flex') {
    return true;
  } else {
    startCountingTime();
  }
  notification.style.display = 'flex';
  return false;
}
function showNotification(text, number) {
  if (checkNotifications()) {
    return;
  } else {
    notificationText.textContent = `${text}`;
    notification.addEventListener('click', () => showPopUp(number), {
      once: true
    });
  }
}
//This is an Intersection Observer ... Duh🤣, in plain english, a method (function) of checking if each section is currently visisble
// on the user's screen, if not the item is hidden, if so then it loads in//
let observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (anime) {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        if (entry.target.classList.contains('AboutMe') && !shownWelcome) {
          showNotification('Welcome esteemed guest...', 1);
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
let hiddenElements = document.querySelectorAll('.AboutMe, .Skills');
hiddenElements.forEach((el) => observer.observe(el));
let loader = document.getElementById('preloader');
window.addEventListener('load', function (load) {
  // Lazy Loading :) //
  this.window.removeEventListener('load', load, false);
  if (window.location.hash === '#tos') {
    showToS();
  }
  this.setTimeout(function () {
    loader.style.display = 'none';
    unlockScreen();
    sendMessageToBot('isWebsite');
  }, 1000);
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
  const passionCard = document.getElementById('passionCard');
  lockScreen();
  stopCountingTime();
  switch (message) {
    case 1:
      {
        cardTitle.textContent = 'Site Navigation';
        cardDescription.textContent = ` Hey! I'm Passion, Tino's personalized AI chatbot. Welcome to ourportfolio website. Here are some helpful tips to navigate thesite. If you’re ready to start exploring, feel free to skip this guide.`;
        document.getElementById('cardTable').style.display = 'grid';
        cardImage.src = 'Images/Icons/speak.svg';
      }
      break;
    case 2:
      {
        cardTitle.textContent = 'Name Pronunciation';
        cardDescription.textContent = `Tinotenda Mhedziso, or Tino for short, is pronounced Tea-no-ten-da. His name translates to "Thank you."`;
        cardImage.src = 'Images/Icons/speak.svg';
      }
      break;
    case 2:
      {
        cardTitle.textContent = 'Quests Complete !';
        cardDescription.textContent = `Yayyy, You completed all the quests and for that I now promote you from internet guest to a friend of ours.`;
      }
      break;

    default:
      break;
  }
  passionCard.style.display = 'flex';
  notification.style.display = 'none';
}
function hidePopUp() {
  unlockScreen();
  document.getElementById('passionModal').style.display = 'none';
  document.getElementById('cardTable').style.display = 'none';
}

function showToS() {
  lockScreen();
  document.getElementById('ToS').style.display = 'flex';
}
function toggleCheckList() {
  let checkList = document.getElementById('checkCon');
  checkList.classList.toggle('hidden');
  checkList.classList.toggle('visible');
  backHome();
}

function hideToS(acceptance) {
  if (acceptance) {
    document.getElementById('ToSTask').checked = true;
    document.getElementById('acceptanceBtns').style.display = 'none';
    document.getElementById('closeToS').style.display = 'block';
    checkQuests();
  }
  document.getElementById('ToS').style.display = 'none';
  unlockScreen();
}

let intervalId;
let timeElapsed = 0;
function startCountingTime() {
  const timeElement = document.getElementById('timeSent');

  intervalId = setInterval(() => {
    timeElapsed++;
    timeElement.textContent = `${timeElapsed} minute${
      timeElapsed > 1 ? 's' : ''
    } ago`;
  }, 60000);

  timeElement.textContent = 'Just now';
}

function stopCountingTime() {
  clearInterval(intervalId);
}

// Botpress Logic
// Toggle the webchat visibility

let musicPlayer = document.getElementById('myMusic');

function playMusic() {
  musicPlayer.play();
}
window.addEventListener('message', (event) => {
  if (event.data.action === 'playMusic') {
    playMusic();
  } else if (event.data.action === 'checkPassion') {
    document.getElementById('TalktoPassionTask').checked = true;
  } else if (event.data.action === 'closeWebchat') {
    document.querySelector('.webchat').style.display = 'none';
    document.querySelector('.webchat-toggle').style.display = 'block';
  }
});

function sendMessageToBot(message) {
  const botIframe = document.querySelector('.webchat iframe');
  if (botIframe) {
    botIframe.contentWindow.postMessage({ action: `${message}` }, '*');
  }
}

function contactMe() {
  openWebchat();
  sendMessageToBot('contactMe');
}
function openWebchat() {
  document.querySelector('.webchat').style.display = 'block';
  document.querySelector('.webchat-toggle').style.display = 'none';
  sendMessageToBot('openWebchat');
}

function lockScreen() {
  document.documentElement.style.overflowY = 'hidden';
}

function unlockScreen() {
  document.documentElement.style.overflowY = 'auto';
}
