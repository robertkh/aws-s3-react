//?
import { gl, rl, yl, ml } from "../util/logger.js";
import express from "express";
var filesRouter = express.Router();

// const BUCKET = process.env.BUCKET;
import { s3 } from "../aws-s3.js";

// todo
filesRouter.get("/check_bucket", async function (req, res) {
  //
  if (!req?.session?.user?.id) {
    res.json("no loged user");
    return;
  }
  const checkBucketExists = async (bucket) => {
    const options = {
      Bucket: req?.session?.user?.id,
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

  let response = await checkBucketExists(req?.session?.user?.id);
  ml.log(response);
  res.json(response);
});

//todo - create-ok
filesRouter.post("/upload", async function (req, res) {
  rl.log(req.files);

  if (!req?.session?.user?.id) {
    res.status(500).json("Դուք համակարգ մուտք չեք գործել։");
    return;
  }

  s3.headBucket(req?.session?.user?.id)
    .promise()
    .then((data) => console.log(data))
    .catch((err) => console.log("chka nman ban"));

  s3.upload(
    {
      Bucket: req?.session?.user?.id,
      Key: req.files.upImage.name,
      Body: req.files.upImage.data,
    },

    function (err, data) {
      if (err) {
        ml.log("Error", err.message);

        var params = {
          Bucket: req?.session?.user?.id,
          ACL: "public-read",
        };
        //
        s3.createBucket(params, function (err, data) {
          if (err) console.log(err.message); // an error occurred
          else console.log(data); // successful response
        });
      } else {
        yl.log("Upload Success!", data);
        gl.log(data?.Location);
        res.json("Ֆայլը հաջողությամբ վերբեռնվեց։");
      }
    }
  );
});

//todo - readList-ok
filesRouter.get("/getnames", async (req, res) => {
  //
  if (!req?.session?.user?.id) {
    res.status(500).json("Դուք համակարգ մուտք չեք գործել։");
    return;
  }

  try {
    yl.log(req?.session?.user?.id);

    let r = await s3.listObjects({ Bucket: req?.session?.user?.id }).promise();
    let x = r.Contents.map((item) => item.Key);
    yl.log(x);
    res.json(x);
  } catch (err) {
    console.log("Error", err);
    res.json("something went wrong");
  }
});

//todo - rename-ok
filesRouter.post("/rename", async (req, res) => {
  // yl.log(req.body);
  if (!req?.session?.user?.id) {
    res.status(500).json("Դուք համակարգ մուտք չեք գործել։");
    return;
  }

  try {
    await s3
      .copyObject({
        Bucket: req?.session?.user?.id,
        CopySource: encodeURI(`${req?.session?.user?.id}/${req.body.oldname}`),
        Key: req.body.newname,
      })
      .promise();

    await s3
      .deleteObject({
        Bucket: req?.session?.user?.id,
        Key: req.body.oldname,
      })
      .promise();

    res.json("Ֆայլի անունը հաջողությամբ փոխվեց։");
  } catch (err) {
    res.status(404).json("Նշված ֆայլը գոյություն չունի։");
  }
});

//todo - delete-ok
filesRouter.delete("/del", async (req, res) => {
  if (!req?.session?.user?.id) {
    res.status(500).json("Դուք համակարգ մուտք չեք գործել։");
    return;
  }

  const filename = req.body.filename;

  // ---------------
  let l_o = await s3.listObjects({ Bucket: req?.session?.user?.id }).promise();
  let item_keys = l_o.Contents.map((item) => item.Key);
  let item_index = item_keys.indexOf(filename);
  if (item_index === -1) {
    res.status(404).json("Նշված ֆայլը գոյություն չունի։");
    return;
  }
  // ----------------

  try {
    await s3
      .deleteObject({ Bucket: req?.session?.user?.id, Key: filename })
      .promise();

    res.json(filename + "-ը հաջողությամբ հեռացվեց պահոցից։");
  } catch {
    res.json("something went wrong");
  }
});

//todo
export default filesRouter;
