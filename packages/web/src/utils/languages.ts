type Language = {
  extensions: string[]
  name: string
  languageId: number
  grammar: string
}

export const languages: Language[] = [
  {
    extensions: ['c'],
    name: 'C (GCC 9.2.0)',
    languageId: 50,
    grammar: 'c',
  },
  {
    extensions: ['cpp', 'cc', 'cxx', 'c++'],
    name: 'C++ (GCC 9.2.0)',
    languageId: 54,
    grammar: 'cpp',
  },
  {
    extensions: ['pas'],
    name: 'Pascal (FPC 3.0.4)',
    languageId: 67,
    grammar: 'pascal',
  },
  {
    extensions: ['rust'],
    name: 'Rust (1.40.0)',
    languageId: 73,
    grammar: 'rust',
  },
  {
    extensions: ['py'],
    name: 'Python (3.8.1)',
    languageId: 71,
    grammar: 'python',
  },
  {
    extensions: ['js'],
    name: 'JavaScript (Node.js 12.14.0)',
    languageId: 63,
    grammar: 'javascript',
  },
  {
    extensions: ['php'],
    name: 'PHP (7.4.1)',
    languageId: 68,
    grammar: 'php',
  },
]
