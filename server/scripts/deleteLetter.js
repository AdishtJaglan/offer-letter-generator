import fs from "fs/promises";

export async function deleteLetter(filePath) {
  try {
    await fs.unlink(filePath);
    console.log(`Deleted file: ${filePath}`);
  } catch (error) {
    console.error(`Error deleting file: ${error}`);
  }
}
