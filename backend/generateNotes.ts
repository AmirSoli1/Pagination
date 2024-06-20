require("dotenv").config();

const mongoose_ = require("mongoose");
const NoteModel = require("./models/Note.ts");

interface Author {
  name: string;
  email: string;
}

interface NoteInterface {
  id: number;
  title: string;
  author: Author;
  content: string;
}

const generateNotes = (numNotes: number): NoteInterface[] => {
  const notes: NoteInterface[] = [];

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

const main = async (numNotes: number) => {
  try {
    await mongoose_.connect(process.env.MONGODB_CONNECTION_URL); // Ensure database connection

    const notes = generateNotes(numNotes);
    await NoteModel.insertMany(notes);

    console.log(`Inserted ${numNotes} notes into the database`);
    mongoose_.connection.close(); // Close connection after operation
  } catch (error) {
    console.error("Error inserting notes:", error);
    mongoose_.connection.close();
    process.exit(1); // Exit with non-zero status on error
  }
};

const numNotes = parseInt(process.argv[2], 10);
if (isNaN(numNotes) || numNotes <= 0) {
  console.error("Please provide a valid number of notes as the first argument");
  process.exit(1);
}

main(numNotes);
