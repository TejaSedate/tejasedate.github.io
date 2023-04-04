const storageKey = 'theme-preference'
let yOffset = 0;

const onClick = () => {
    // flip current value
    theme.value = theme.value === 'light'
        ? 'dark'
        : 'light'

    setPreference()
}

const getColorPreference = () => {
    if (localStorage.getItem(storageKey))
        return localStorage.getItem(storageKey)
    else
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
}

const setPreference = () => {
    localStorage.setItem(storageKey, theme.value)
    reflectPreference()
}

const reflectPreference = () => {
    document.firstElementChild
        .setAttribute('data-theme', theme.value)

    document
        .querySelector('#theme-toggle')
        ?.setAttribute('aria-label', theme.value)
}

const theme = {
    value: getColorPreference(),
}

// set early so no page flashes / CSS is made aware
reflectPreference()

// Smooth scroll to elements with additonal margin
const smoothScroll = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    const y = document.querySelector(href).getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
}



window.onload = () => {
    // set on load so screen readers can see latest value on the button
    reflectPreference()

    // now this script can find and listen for clicks on the control
    document
        .querySelector('#theme-toggle')
        .addEventListener('click', onClick);

    const nav = document.querySelector('nav');
    const links = nav?.querySelectorAll('a');
    if (links) {
        const navHeight = nav.getBoundingClientRect().height;
        yOffset = -navHeight;
        links.forEach(link => {
            const hrefVal = link.getAttribute('href');
            if (hrefVal && hrefVal.startsWith('#') && hrefVal.length > 1) {
                link.addEventListener('click', smoothScroll);
            }
        });
    }
}