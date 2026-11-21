

const fs = require("fs");
const path = require("path");

const testfolder = path.join(__dirname, "..", "test-files");
const organisedfolder = path.join(__dirname, "..", "organised");

const categories = {
    Documents: [".pdf", ".txt", ".docx"],
    Images: [".jpg", ".jpeg", ".png"],
    Videos: [".mp4", ".mkv"],
    Audio: [".mp3", ".wav"],
    Code: [".js", ".json"],
};


async function getUniquePath(destinationpath) {
    const parsed = path.parse(destinationpath);

    let newPath = destinationpath;
    let count = 1;

    while (true) {
        try {
            await fs.promises.access(newPath);

            newPath = path.join(
                parsed.dir,
                `${parsed.name} (${count})${parsed.ext}`
            );

            count++;
        } catch {
            return newPath;
        }
    }
}

async function readfiles(foldername = ".") {
    try {
        const sourcefolder = path.resolve(testfolder, foldername);

        
        if (!sourcefolder.startsWith(testfolder + path.sep) && sourcefolder !== testfolder) {
            console.log("Invalid folder path!");
            return;
        }

        const files = await fs.promises.readdir(sourcefolder);

        if (files.length === 0) {
            console.log("Source folder is empty");
            return;
        }

        
        for (const file of files) {
            const extension = path.extname(file);
            console.log(file, "->", extension);
        }


        const folderNames = [...Object.keys(categories), "Others"];

        for (const category of folderNames) {
            const folderpath = path.join(organisedfolder, category);

            await fs.promises.mkdir(folderpath, { recursive: true });
        }

    
        for (const file of files) {
            const sourcePath = path.join(sourcefolder, file);

            
            const stats = await fs.promises.stat(sourcePath);
            if (!stats.isFile()) {
                continue;
            }

            const extension = path.extname(file);

            const result = Object.entries(categories).find(
                ([category, extensions]) => extensions.includes(extension)
            );

            const category = result ? result[0] : "Others";

            const destinationfolder = path.join(
                organisedfolder,
                category
            );

            let destinationpath = path.join(destinationfolder, file);

            destinationpath = await getUniquePath(destinationpath);

            
            await fs.promises.rename(sourcePath, destinationpath);

            console.log(`${file} moved to ${category}`);
        }

        console.log("File organization completed successfully!");

    } catch (error) {
        console.log("Something went wrong:", error.message);
    }
}


const command = process.argv[2];
const foldername = process.argv[3];

if (command === "organize") {
    readfiles(foldername || ".");
}
else if (command === "help") {
    console.log(`
File Organizer

Commands:
  organize [foldername]  Organize files from a folder
  help                  Show available commands

Examples:
  node src/organizer.js organize
  node src/organizer.js organize demo
`);
}
else {
    console.log("Invalid command!");
    console.log("Run: node src/organizer.js help");
}
