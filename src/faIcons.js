import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faBook, faChevronDown, faGlobe, faNewspaper, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faGitlab, faGooglePlay, faPython, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';

library.add(faBook, faChevronDown, faGlobe, faNewspaper, faXmark);
library.add(faGithub, faGitlab, faGooglePlay, faPython, faTelegram, faTwitter);

dom.watch();
