type Language = {
  extensions: string[]
  name: string
  languageId: number
}

export const languages: Language[] = [
  {
    extensions: ['c'],
    name: 'C (GCC 9.2.0)',
    languageId: 50,
  },
  {
    extensions: ['cpp', 'cc', 'cxx', 'c++'],
    name: 'C++ (GCC 9.2.0)',
    languageId: 54,
  },
  {
    extensions: ['pas'],
    name: 'Pascal (FPC 3.0.4)',
    languageId: 67,
  },
  {
    extensions: ['rust'],
    name: 'Rust (1.40.0)',
    languageId: 73,
  },
  {
    extensions: ['py'],
    name: 'Python (3.8.1)',
    languageId: 71,
  },
  {
    extensions: ['js'],
    name: 'JavaScript (Node.js 12.14.0)',
    languageId: 63,
  },
  {
    extensions: ['php'],
    name: 'PHP (7.4.1)',
    languageId: 68,
  },
]
