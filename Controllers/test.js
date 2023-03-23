// router.post(
//     "/",
//     passportJwt,
//     uploadDocument.any(),
//     ValidateUploadFile,
//     UploadFiles
//   );
  
  
//   import multer from "multer";
//   import path from "path";
//   import { defaultBucket, s3Config } from "./s3BucketHelper";
//   import multerS3 from "multer-s3";
//   import { S3Client } from "@aws-sdk/client-s3";
//   import { generateKey } from "../handlers/fileKey";
  
  
//   const s3 = new S3Client({
//       region: s3Config.region,
//       credentials: {
//           accessKeyId: s3Config.accessKeyId,
//           secretAccessKey: s3Config.secretAccessKey,
//       },
//   });
//   // This code initializes multer middleware for file uploading to S3 bucket
//   const documentStorage = multerS3({
//       s3: s3,
//       bucket: defaultBucket,
//       key: async (req: any, file, cb) => {
//           console.log(req.body, "request body in Multer S3");
//           const { folder } = req.body
//           const { id, role } = req.user;
//           const { originalname } = file;
//           // Generate a unique filename for the uploaded file
//           const filename: string =
//               originalname.split(".")[0] +
//               "_" +
//               Date.now() +
//               path.extname(originalname);
//           file.filename = filename;
//           // Construct the S3 object key for the file upload
//           const key: string = generateKey(folder, filename, id, role)
//           console.log(key);
  
//           if (!key) {
//               return cb(new Error("Key not found, upload failed"));
//           }
//           cb(null, key);
//       },
//   });
  
//   export const uploadDocument = multer({ storage: documentStorage });
  
  
  
//   export const UploadFiles = async (req: Request, res: Response) => {
//       try {
//           const documentFile: Array<IFile> | any = req.files as Express.Multer.File[];
//           console.log(documentFile);
  
//           const keys: string[] = []
//           for (const item of documentFile) {
//               keys.push(item.key)
//           }
//           console.log(keys);
  
//           return res.status(200).json({
//               success: true,
//               data: keys,
//               message: "File uploaded successfully",
//           });
//       } catch (err) {
//           if (err instanceof ApiError) {
//               return res
//                   .status(err.status)
//                   .json({ message: err.message, success: false });
//           }
//           res
//               .status(500)
//               .json({ success: false, message: "Something went wrong", err });
//       }
//   };

//   to Download 



// export const getFile = async (req: any, res: any): Promise<void> => {
//   try {
//     console.log(req.params[0]);
//     const key: string = `${req.params[0]}`;
//     const params: AWS.S3.PutObjectRequest = {
//       Bucket: defaultBucket,
//       Key: key,
//     };
//     const fileName: string = path.basename(req.params[0]);
//     // Lookup the file type for the given file name
//     const fileType: string | false = mime.lookup(fileName);
//     console.log(fileType);

//     // Use S3 getObject method to get the file object from S3 bucket
//     s3.getObject(
//       params,
//       async (err: AWS.AWSError, data: AWS.S3.GetObjectOutput) => {
//         if (err) {
//           console.log(err);
//           return res.status(500).json(err);
//         }
//         if (data) {
//           // If the file is found in S3, write the content and content-type to response and send it
//           res.writeHead(200, { "Content-Type": fileType });
//           res.write(data.Body, "binary");
//           res.end(null, "binary");
//         } else {
//           res.status(404).json("Not found");
//         }
//       }
//     );
//   } catch (error) {
//     console.log("error: ", error);
//     res.status(500).json(error);
//   }
// };