# File Organizer

A simple Node.js CLI tool that automatically organizes files into different folders based on their file extensions.

## Features

- Automatically categorizes files based on their extensions.
- Creates folders for Documents, Images, Videos, Audio, Code, and Others.
- Moves files into their respective categories.
- Handles duplicate filenames without overwriting existing files.
- Supports custom source folders within the test-files directory.
- Handles empty folders and errors using try-catch.

## Tech Stack

- Node.js
- JavaScript
- File System (`fs`)
- Path (`path`)

## Project Structure

```text
file-organiser/
├── src/
│   └── organizer.js
├── test-files/
├── organised/
├── package.json
└── README.md
```

## File Categories

| Category | Extensions |
|---|---|
| Documents | .pdf, .txt, .docx |
| Images | .jpg, .jpeg, .png |
| Videos | .mp4, .mkv |
| Audio | .mp3, .wav |
| Code | .js, .json |
| Others | Unsupported extensions |

## How to Run

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Navigate to the project directory:

```bash
cd file-organiser
```

Organize the default test folder:

```bash
node src/organizer.js organize
```

Organize a custom folder inside `test-files`:

```bash
node src/organizer.js organize demo
```

View available commands:

```bash
node src/organizer.js help
```

## How It Works

The application reads files from the source folder, identifies their extensions, determines the appropriate category, creates the necessary directories, and moves the files into their respective folders.

If a file with the same name already exists in the destination folder, the application generates a unique filename to prevent overwriting.

## Learning Outcomes

- Working with Node.js file system operations
- Understanding path handling using the `path` module
- Asynchronous programming with async/await
- Working with arrays, objects, and higher-order methods
- Handling errors
- Building command-line utilities

---

Built as a hands-on Node.js project to practice backend fundamentals.
