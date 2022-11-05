//
import "dotenv/config";

//
import AWS from "aws-sdk";

//
AWS.config.update({
  secretAccessKey: process.env.ACCESS_SECRET,
  accessKeyId: process.env.ACCESS_KEY,
  region: process.env.REGION,
});

//
export const s3 = new AWS.S3();

const checkBucketExists = async (bucket) => {
  const s3 = new AWS.S3();
  const options = {
    Bucket: bucket,
  };
  try {
    await s3.headBucket(options).promise();
    return true;
  } catch (error) {
    if (error.statusCode === 404) {
      return false;
    }
    throw error;
  }
};
