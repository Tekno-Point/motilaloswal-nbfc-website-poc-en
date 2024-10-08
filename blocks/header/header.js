import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');
const isMobile = window.matchMedia('(max-width: 769px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll('.nav-sections .default-content-wrapper > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
export function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll('.nav-drop');
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('role', 'button');
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('role');
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }
  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
  }
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const navBrand = nav.querySelector('.nav-brand');
  const brandLink = navBrand.querySelector('.button');
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container').className = '';
  }

  // Header background color change on scroll
  function initializeScroll() {
    // Ensure the element exists before attempting to manipulate it
    const navWrapperBackground = block.firstChild;
    if (!navWrapperBackground) {
      // console.log('Element with class "nav-wrapper" not found.');
      return; // Exit the function if the element is not found
    }
    const handleScroll = () => {
      if (window.scrollY > 50) { // Adjust the scroll distance as needed
        navWrapperBackground.style.backgroundColor = '#343a40'; // Set background color
      } else {
        navWrapperBackground.style.backgroundColor = ''; // Reset background color
      }
    };
    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);
  }
  // Initialize scroll listener only
  initializeScroll();
  function toggleMenuList(drop) {
    const p = drop.querySelector('p');
    const ul = drop.querySelector('ul');
    // debugger;
    p?.addEventListener('click', () => {
      // e.stopImmediatePropagation();
      // navDrops.forEach(function (eachdrop) {
      Array.from(drop.parentElement.children).forEach((eachdrop) => {
        if (eachdrop && eachdrop !== drop) {
          const li = eachdrop.firstElementChild.nextElementSibling;
          if (li) li.style.display = 'none';
        }
      });
      const isBlock = ul.style.display === 'block';
      ul.style.display = isBlock ? 'none' : 'block';
    });
  }

  // Navbar sections hover
  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    if (isMobile.matches) {
      const navBrandCopy = navBrand.cloneNode(true);
      navBrandCopy.classList.remove('nav-brand');
      navBrandCopy.classList.add('nav-brand-copy');
      navSections.append(navBrandCopy);
    }
    navSections.querySelectorAll(':scope .default-content-wrapper > ul > li ').forEach((navSection) => {
      if (navSection.querySelector('ul')) {
        navSection.classList.add('nav-drop');
      }
      if (isDesktop.matches) {
        navSection.addEventListener('mouseover', () => {
          if (isDesktop.matches) {
            // const expanded = navSection.getAttribute('aria-expanded') === 'true';
            toggleAllNavSections(navSections);
            navSection.setAttribute('aria-expanded', 'true');
            navSection.style.fontWeight = '900';
          }
        });

        navSection.addEventListener('mouseout', () => {
          if (isDesktop.matches) {
            navSection.setAttribute('aria-expanded', 'false');
            navSection.style.fontWeight = '';
          }
        });
      } else {
        // Event listener for mobile click
        navSection.addEventListener('click', () => {
          const isExpanded = navSection.getAttribute('aria-expanded') === 'true';
          toggleAllNavSections(navSections, 'false');
          navSection.setAttribute('aria-expanded', !isExpanded ? 'true' : 'false');
        });
      }
    });

    const navDrops = navSections.querySelectorAll('.nav-drop');
    navDrops.forEach((drop) => {
      toggleMenuList(drop);
      drop.querySelectorAll('li').forEach((eachUl) => {
        toggleMenuList(eachUl);
      });
    });
  }

  // Navbar Login Button
  const loginNavDown = nav.querySelector('.nav-tools #login--nav-down');
  const loginOptions = nav.querySelector('.nav-tools ul ul');
  if (loginNavDown && loginOptions) {
    // Add click event listener to the h4 element
    loginNavDown.addEventListener('click', () => {
      // Toggle the display of the ul
      if (loginOptions.style.display === 'none' || loginOptions.style.display === '') {
        loginOptions.style.display = 'block'; // Show options
      } else {
        loginOptions.style.display = 'none'; // Hide options
      }
    });
  }
  // Duplication of Login Options for Mobile View
  function addLoginOptionsForMobile() {
    const originalLoginOptions = nav.querySelector('#login--nav-down + ul');
    const navSectionsDefaultCont = nav.querySelector('.nav-sections .default-content-wrapper');

    if (originalLoginOptions) {
      const clonedLoginOptions = originalLoginOptions.cloneNode(true);

      if (navSectionsDefaultCont) {
        const existingClonedElement = navSectionsDefaultCont.querySelector('.mobile-login-options');
        if (!existingClonedElement) {
          clonedLoginOptions.classList.add('mobile-login-options');
          navSectionsDefaultCont.appendChild(clonedLoginOptions);
          const mobileLoginOptions = nav.querySelectorAll('.mobile-login-options li');
          mobileLoginOptions.forEach((li) => {
            li.classList.add('button');
          });
        }
      }
    }
  }
  // Function to handle visibility based on screen size
  function handleResponsiveDesign() {
    if (isMobile.matches) {
      addLoginOptionsForMobile();
    } else {
      // Optionally remove the duplicated element if it's not needed on desktop
      const clonedElement = document.querySelector('.mobile-login-options');
      if (clonedElement) {
        clonedElement.remove();
      }
    }
  }
  handleResponsiveDesign();

  // Function to toggle the background color
  function toggleBackgroundColor(element) {
    // Define the colors
    const color1 = 'rgb(19 19 19 / 75%)'; // Color when the menu is active
    const color2 = ''; // Default color when the menu is inactive

    // Check current background color and toggle
    if (element.style.backgroundColor === color2) {
      element.style.backgroundColor = color1;
    } else {
      element.style.backgroundColor = color2;
    }
  }
  // Hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener('click', () => {
    toggleMenu(nav, navSections);
    toggleBackgroundColor(document.querySelector('.nav-wrapper'));
  });
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');
  // prevent mobile nav behavior on window resize
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}
