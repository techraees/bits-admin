import env from "../environment";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { urlSource } from "ipfs-http-client";

export const sendFileToIPFS = async (file, isEmote) => {
  console.log("file", file);
  if (file) {
    try {
      const authorization =
        "Basic " + btoa(env.PROJECT_ID + ":" + env.PROJECT_SECRET);
      const ipfs = ipfsHttpClient({
        url: env.INFURA,
        headers: {
          authorization,
        },
      });
      const result = await ipfs.add(isEmote ? urlSource(`${file}`) : file);
      console.log("result", result.cid._baseCache.get("z"));
      // console.log("ImgHash", res)
      const ImgHash = `${env.IPFS_PATH}/${result.cid._baseCache.get("z")}`;
      return ImgHash;
      console.log(ImgHash);
    } catch (error) {
      console.log("Error sending File to IPFS: ");
      console.log(error);
    }
  }
};

export const sendMetaToIPFS = async (data) => {
  console.log("file", data);
  if (data) {
    try {
      const authorization =
        "Basic " + btoa(env.PROJECT_ID + ":" + env.PROJECT_SECRET);
      const ipfs = ipfsHttpClient({
        url: env.INFURA,
        headers: {
          authorization,
        },
      });

      const finalData = JSON.stringify(data);
      const result = await ipfs.add(finalData);

      console.log("result", result);
      // console.log("ImgHash", res)
      const metaHash = `${env.IPFS_PATH}/${result.path}`;
      return metaHash;
      console.log(metaHash);
    } catch (error) {
      console.log("Error sending File to IPFS: ");
      console.log(error);
    }
  }
};

// export const sendFileToIPFS = async (fileImg) => {

//     if (fileImg) {
//         try {

//             const formData = new FormData();
//             formData.append("file", fileImg);

//             const resFile = await axios({
//                 method: "post",
//                 url: `${env.BACKEND_REST_URL}/save-file`,
//                 data: formData,
//                 headers: {
//                     "Content-Type": "multipart/form-data"
//                 },
//             });

//             const ImgHash = resFile.data.ImgHash

//          return ImgHash;
// //Take a look at your Pinata Pinned section, you will see a new file added to you list.

//         } catch (error) {
//             console.log("Error sending File to IPFS: ")
//             console.log(error)
//         }
//     }
// }
