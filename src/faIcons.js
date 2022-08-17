import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faBook, faGlobe, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faGitlab, faGooglePlay, faPython, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';

library.add(faBook, faGlobe, faNewspaper);
library.add(faGithub, faGitlab, faGooglePlay, faPython, faTelegram, faTwitter);

dom.watch();
