const fs = require("fs");
const path = require("path");

const generateNotes = (numNotes) => {
  const notes = [];

  for (let i = 1; i <= numNotes; ++i) {
    notes.push({
      id: i,
      title: `Note ${i}`,
      author: {
        name: `Author ${i}`,
        email: `mail_${i}@gmail.com`,
      },
      content: `Content for note ${i}`,
    });
  }

  return notes;
};

const main = (numNotes) => {
  const notes = generateNotes(numNotes);
  const data = { notes };

  const dirPath = path.join(__dirname, "data");
  const filePath = path.join(dirPath, "notes.json");

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`Generated ${numNotes} notes and wrote to ${filePath}`);
};

const numNotes = parseInt(process.argv[2], 10);
if (isNaN(numNotes) || numNotes <= 0) {
  console.error("Please provide a valid number of notes as the first argument");
  process.exit(1);
}

main(numNotes);
