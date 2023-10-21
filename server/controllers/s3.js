import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";


import dotenv from "dotenv";
dotenv.config();

const s3 = new S3Client();
const BUCKET = process.env.BUCKET;

const uploadToS3 = async ({ file }) => {
  const key = Date.now() + "_" + Math.random().toString(36).substring(7);
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  try {
    await s3.send(command);
    const url = `https://${BUCKET}.s3.eu-west-1.amazonaws.com/${key}`;
    return { url };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export { uploadToS3 };
