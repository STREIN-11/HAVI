/** @format */

let menuToggle = document.querySelector('.menuToggle');
let menu = document.querySelector('.menu');
let shown = false;
menuToggle.onclick = function () {
  menu.classList.toggle('active');
  if (!menu.classList.contains('active')) {
    menu.classList.remove('tooltips-visible');
  }
};
let viewpoints = document.getElementsByClassName('Viewpoint');
let views = document.getElementsByClassName('View');
function show(viewObj) {
  for (viewpoint of viewpoints) {
    viewpoint.classList.remove('Activepoint');
  }
  for (view of views) {
    view.classList.remove('Activeview');
  }
  event.currentTarget.classList.add('Activepoint');
  document.getElementById(viewObj).classList.add('Activeview');
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
  updateQuestStatus('AnimationsTask', true);
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
    notyf.error('You already have a message.');
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
    notification.classList.add('show');
    notification.addEventListener('click', () => showPopUp(number), {
      once: true
    });
  }
}
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
    showNotification(`Hey ! I'm Passion...`, 1);
    shownWelcome = true;
    sendMessageToBot('isWebsite');
    loadQuestStatus();
  }, 500);
});

function downloadCV() {
  downloadFile('Documents/TinotendaMhedzisoCV.pdf', 'TinotendaMhedzisoCV.pdf');
  document.getElementById('CVTask').checked = true;
  updateQuestStatus('CVTask', true);
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
  updateQuestStatus('GitHubTask', true);
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
    updateQuestStatus('NavigationTask', true);
    checkQuests();
  },
  { once: true }
);
function openNavMenu() {
  const navMenu = document.getElementById('menuOpener');
  navMenu.click();
}
function resetQuestStatuses() {
  localStorage.removeItem('questsStatus');
  const quests = document.querySelectorAll('#checklist input');
  quests.forEach((checkbox) => {
    checkbox.checked = false;
    checkbox.disabled = true;
  });

  shown = false;
}
function loadQuestStatus() {
  const questsStatus = JSON.parse(localStorage.getItem('questsStatus')) || {};

  document.getElementById('NavigationTask').checked =
    questsStatus.NavigationTask || false;
  document.getElementById('CVTask').checked = questsStatus.CVTask || false;
  document.getElementById('AnimationsTask').checked =
    questsStatus.AnimationsTask || false;
  document.getElementById('ToSTask').checked = questsStatus.ToSTask || false;
  document.getElementById('TalktoPassionTask').checked =
    questsStatus.TalktoPassionTask || false;
  document.getElementById('GitHubTask').checked =
    questsStatus.GitHubTask || false;

  // Enable the checkboxes once the status is loaded
  document.querySelectorAll('#checklist input').forEach((checkbox) => {
    checkbox.disabled = false; // Enable checkboxes after loading status
  });
}
function updateQuestStatus(questId, status) {
  const questsStatus = JSON.parse(localStorage.getItem('questsStatus')) || {};
  questsStatus[questId] = status;
  localStorage.setItem('questsStatus', JSON.stringify(questsStatus));
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
        cardDescription.textContent = ` Hey! I'm Passion, Tino's personalized AI chatbot. Welcome to our portfolio website. Here are some helpful tips while navigating the site. If you know you're ready, feel free to skip this guide.`;
        document.getElementById('cardTable').style.display = 'grid';
        cardImage.src = 'Images/Icons/her.svg';
      }
      break;
    case 2:
      {
        cardTitle.textContent = 'Name Pronunciation';
        cardDescription.textContent = `Tinotenda Mhedziso, or Tino for short, is pronounced Tea-no-ten-da. His name translates to "Thank you."`;
        cardImage.src = 'Images/Icons/speak.svg';
      }
      break;
    case 3:
      {
        cardTitle.textContent = 'Portfolio Projects';
        cardDescription.textContent = `By clicking the <Code> button, you’ll be directed to the GitHub repository, where you can explore a detailed case study covering the project’s objectives, challenges, and key insights. The <Site> button lets you experience the project firsthand, but if it’s unavailable, simply download it to run locally. While some projects are hidden for now, Tino is eagerly preparing to release them soon — consider this a sneak peek of what's to come!`;
        cardImage.src = 'Images/Icons/website.svg';
      }
      break;
    case 4:
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
    updateQuestStatus('ToSTask', true);
    checkQuests();
  }
  document.getElementById('ToS').style.display = 'none';
  const passionDisplay = document.getElementById('passionModal').style.display;
  if (passionDisplay == 'none') {
    unlockScreen();
  }
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
  timeElapsed = 0;
}

// Botpress Logic

let musicPlayer = document.getElementById('myMusic');

function playMusic() {
  musicPlayer.play();
  notyf.success('Music has been enabled.');
}
window.addEventListener('message', (event) => {
  if (event.data.action === 'playMusic') {
    playMusic();
  } else if (event.data.action === 'checkPassion') {
    document.getElementById('TalktoPassionTask').checked = true;
    updateQuestStatus('TalktoPassionTask', true);
    checkQuests();
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

const notyf = new Notyf({
  duration: 5000,
  dismissible: true,
  ripple: false,
  position: {
    x: 'right',
    y: 'top'
  },
  types: [
    {
      type: 'success',
      background: '#1a8917',
      icon: {
        className: 'fas fa-check-circle',
        tagName: 'i',
        color: '#0f0'
      }
    },
    {
      type: 'error',
      background: '#e60000', // Dark background
      className: 'custom-error-notyf', // Custom class for extra styling
      icon: {
        className: 'fas fa-exclamation-circle',
        tagName: 'i',
        color: '#ff4c4c' // ChatGPT-like red accent
      }
    },
    {
      type: 'warning',
      background: '#db6300',
      icon: {
        className: 'fas fa-exclamation-triangle',
        tagName: 'i',
        color: 'black'
      }
    }
  ]
});

// GSAP animation for programming languages (fade in from the bottom)
let programmingLanguages = document.querySelectorAll('.Programming .language');

gsap.utils.toArray(programmingLanguages).forEach((item, index) => {
  gsap.from(item, {
    opacity: 0, // Start invisible
    y: 50, // Start 50px below the original position
    duration: 1, // Animation duration
    delay: index * 0.3, // Stagger delay for each item
    ease: 'power2.out', // Ease effect for smoothness
    scrollTrigger: {
      trigger: item, // Trigger the animation for each programming language item
      start: 'top 95%', // Start animation when the top of the item reaches 95% of the viewport height
      toggleActions: 'play none none none', // Play when in view, reverse when out of view
      once: true // Animation triggers only once
    },
    onComplete: () => {
      item.classList.add('bounce'); // Add a CSS animation trigger class
    }
  });
});

let projectItems = document.querySelectorAll('.project-item');

gsap.utils.toArray(projectItems).forEach((item) => {
  gsap.from(item, {
    opacity: 0,
    y: 50, // Start 50px lower
    duration: 1, // Animation duration
    stagger: 0.5, // Delay between each item's animation
    ease: 'power2.out', // Smooth ease
    scrollTrigger: {
      trigger: item, // The element itself
      start: 'top 80%', // Trigger when the top of the item is 80% from the top of the viewport
      toggleActions: 'play none none none',
      once: true // Only trigger the animation once
    }
  });
});

let socialPosts = document.querySelectorAll('.social-post');

gsap.utils.toArray(socialPosts).forEach((post, index) => {
  gsap.from(post, {
    opacity: 0, // Start invisible
    y: 50, // Start 50px lower
    duration: 1, // Animation duration
    delay: index * 0.3, // Stagger delay for each post
    ease: 'power2.out', // Ease effect for smoothness
    scrollTrigger: {
      trigger: post, // Trigger the animation for each social post
      start: 'top 80%', // Start animation when the top of the post reaches 80% of the viewport height
      toggleActions: 'play none none none', // Play when in view, reverse when out of view
      once: true // Animation triggers only once
    }
  });
});

let socialIcons = document.querySelectorAll('.social-Icon');

gsap.utils.toArray(socialIcons).forEach((icon, index) => {
  gsap.from(icon, {
    opacity: 0, // Start invisible
    x: -50, // Start 50px to the left
    duration: 1, // Animation duration
    delay: index * 0.3, // Stagger delay for each icon
    ease: 'power2.out', // Ease effect for smoothness
    scrollTrigger: {
      trigger: icon, // Trigger the animation for each social icon
      start: 'top 80%', // Start animation when the top of the icon reaches 80% of the viewport height
      toggleActions: 'play none none none', // Play when in view, reverse when out of view
      once: true // Animation triggers only once
    }
  });
});

// Starring features:
function starRepository(repoName) {
  const repoOwner = 'Passion-Over-Pain';
  const backendUrl =
    'https://portfolio-backend-pi-three.vercel.app/api/auth/login';
  window.location.href = `${backendUrl}?repoOwner=${encodeURIComponent(
    repoOwner
  )}&repoName=${encodeURIComponent(repoName)}`;
}
async function starRepo() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const repoOwner = urlParams.get('repoOwner');
  const repoName = urlParams.get('repoName');

  if (!repoOwner || !repoName) {
    alert('Repository details (repoOwner or repoName) are missing.');
    return;
  }

  if (code) {
    // Step 1: Pass the code, repoOwner, and repoName to the callback API
    const tokenResponse = await fetch(
      `https://portfolio-backend-pi-three.vercel.app/api/auth/callback?code=${code}&repoOwner=${repoOwner}&repoName=${repoName}`
    );

    const { access_token } = await tokenResponse.json(); // Get the access token from the response

    if (access_token) {
      // Step 2: Show success message after the backend stars the repo
      alert('Successfully starred the repo!');
    } else {
      alert('Failed to retrieve access token or star the repo.');
    }
  } else {
    alert('Authorization code is missing.');
  }
}

// Tooltip toggle function
document.getElementById('tooltipToggle').addEventListener('click', function () {
  document.querySelector('.menu').classList.toggle('tooltips-visible');
});
