import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faBars, faBook, faChevronDown, faGlobe, faNewspaper, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faGitlab, faGooglePlay, faPython, faTelegram } from "@fortawesome/free-brands-svg-icons";

library.add(faBars, faBook, faChevronDown, faGlobe, faNewspaper, faXmark);
library.add(faGithub, faGitlab, faGooglePlay, faPython, faTelegram);

dom.watch();
