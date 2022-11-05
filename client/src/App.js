import React, { useEffect } from "react";

import { LngContextProvider } from "./new-user/context/LngContext";
import { NameContextProvider } from "./new-user/context/NameContext";
import GetFileNames from "./files/getfilenames/GetFilesName.js";
import DeleteFile from "./files/deletefile/DeleteFile.js";
import RenameFile from "./files/renamefile/RenameFile.js";
import FileUpload from "./files/fileupload/FileUpload.js";
import UserButton from "./new-user/UserButton.js";

import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css";

function App() {
  //
  return (
    <>
      <LngContextProvider>
        {
          <NameContextProvider>
            <UserButton />
          </NameContextProvider>
        }

        <FileUpload className="w-50 mx-auto mt-5 border border-warning p-2 rounded" />
        <GetFileNames className="w-50 mx-auto mt-5 border border-warning p-2 rounded" />
        <DeleteFile className="w-50 mx-auto mt-5 border border-warning p-2 rounded" />
        <RenameFile className="w-50 mx-auto mt-5 border border-warning p-2 rounded" />
      </LngContextProvider>
    </>
  );
}

export default App;
