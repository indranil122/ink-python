export type Source = {
  id: string;
  title: string;
  author: string;
  url: string;
  license: string;
  licenseUrl: string;
  usage: string;
};

export const sources: Source[] = [
  {
    id: "exercism",
    title: "Exercism Python Track",
    author: "Exercism",
    url: "https://github.com/exercism/python",
    license: "MIT",
    licenseUrl: "https://opensource.org/license/mit",
    usage: "Practice exercises and test suites.",
  },
  {
    id: "python-docs",
    title: "The Python Tutorial",
    author: "Python Software Foundation",
    url: "https://docs.python.org/3/tutorial/",
    license: "PSF License",
    licenseUrl: "https://docs.python.org/3/license.html",
    usage: "Authoritative reference for language behaviour.",
  },
  {
    id: "py4e",
    title: "Python for Everybody",
    author: "Charles Severance",
    url: "https://github.com/csev/py4e",
    license: "CC BY (site materials)",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    usage: "Course sequencing, assignments, autograder design.",
  },
  {
    id: "google-python-class",
    title: "Google's Python Class",
    author: "Nick Parlante, Google engEDU",
    url: "https://github.com/google/python-class",
    license: "CC BY 2.5 (code: Apache 2.0)",
    licenseUrl: "https://creativecommons.org/licenses/by/2.5/",
    usage: "Lecture notes, string, file and HTTP exercises.",
  },
  {
    id: "freecodecamp",
    title: "freeCodeCamp Curriculum",
    author: "freeCodeCamp.org",
    url: "https://github.com/freeCodeCamp/curriculum",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    usage: "Project and challenge structure, quiz patterns.",
  },
  {
    id: "think-python",
    title: "Think Python, 2nd Edition",
    author: "Allen B. Downey",
    url: "https://greenteapress.com/wp/thinkpython/",
    license: "CC BY-NC 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-nc/3.0/",
    usage: "Concept explanations and debugging exercises.",
  },
  {
    id: "automate",
    title: "Automate the Boring Stuff with Python",
    author: "Al Sweigart",
    url: "https://automatetheboringstuff.com/",
    license: "CC BY-NC-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/3.0/",
    usage: "Practical automation projects with files and the web.",
  },
  {
    id: "cs50p",
    title: "CS50's Introduction to Programming with Python",
    author: "Harvard University",
    url: "https://cs50.harvard.edu/python/",
    license: "CC BY-NC-SA 4.0",
    licenseUrl: "https://cs50.harvard.edu/python/license/",
    usage: "Problem-set difficulty ladder and exercise format.",
  },
  {
    id: "scipy-lectures",
    title: "SciPy Lecture Notes",
    author: "Edited by Gaël Varoquaux et al.",
    url: "https://scipy-lectures.org/",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    usage: "NumPy, SciPy and Matplotlib material for the data track.",
  },
  {
    id: "py4e-book",
    title: "Python for Everybody — Textbook",
    author: "Charles Severance",
    url: "https://www.py4e.com/book",
    license: "CC BY-NC-SA",
    licenseUrl: "https://www.py4e.com/materials",
    usage: "Worked examples in the beginner tracks.",
  },
  {
    id: "pyodide",
    title: "Pyodide",
    author: "The Pyodide community",
    url: "https://pyodide.org/",
    license: "MPL-2.0 (runtime)",
    licenseUrl: "https://github.com/pyodide/pyodide/blob/main/LICENSE",
    usage: "The in-browser Python runtime that powers every code exercise.",
  },
];
