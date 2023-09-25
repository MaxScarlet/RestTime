import { UploadedFile } from "express-fileupload";
import path from "path";
import { v4 as uuid } from "uuid";
import fsPromises from "fs/promises";

function genFilePath(fileName: string) {
  const imagePath = path.join("1-assets", "images");
  return path.join(__dirname, "..", imagePath, fileName);
}
function genFileName(imageName: string, baseName: string = uuid()) {
  const extension = ".jpg";
  return baseName + extension;
}

async function saveImage(
  image: UploadedFile,
  baseName?: string
): Promise<string> {
    
  //Create file name using UUID as default
  const fileName = genFileName(image.name, baseName);

  //Create file path
  const absolutePath = genFilePath(fileName);
  await image.mv(absolutePath);

  return fileName;
}

async function updateImage(
  newImage: UploadedFile,
  oldImage: string
): Promise<string> {
  await deleteImage(oldImage);
  const fileName = await saveImage(newImage);

  return fileName;
}

async function deleteImage(oldImage: string): Promise<void> {
  try {
    if (!oldImage) return;
    const absolutePath = path.join(
      __dirname,
      "..",
      "1-assets",
      "images",
      oldImage
    );

    //Remove Image
    await fsPromises.rm(absolutePath);
  } catch (error) {
    console.log(error.message);
  }
}

export default {
  saveImage,
  deleteImage,
  updateImage,
  genFileName,
  genFilePath,
};
