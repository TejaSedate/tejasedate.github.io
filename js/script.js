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
        .setAttribute('data-theme', theme.value);

    document
        .querySelector('#theme-toggle')
        ?.setAttribute('aria-label', theme.value);
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

const printResume = () => {
    const divContents = document.querySelector(".container").innerHTML;
    var a = window.open('', '', 'height=500, width=500');
    a.document.write('<html>');
    a.document.write('<head>');
    a.document.write('<title>Teja N | 14+ Years of Experience</title>');
    a.document.write('<link rel="stylesheet" href="css/styles.min.css">');
    a.document.write(`<body onload="window.print();" onafterprint="self.close()" class="container-fluid">`);
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
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