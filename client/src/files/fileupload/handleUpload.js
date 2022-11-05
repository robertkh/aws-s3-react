//?
import _ from "lodash";
import { message } from "antd";

// todo
export default async function handleUpload(file, set, setL) {
  setL(true);
  try {
    const formData = new FormData();

    formData.append("upImage", file);

    //
    let response = await fetch("/files/upload", {
      method: "POST",
      body: formData,
    });
    let result = await response.json();
    setL(false);

    if (response.ok) {
      message.success(result);
    } else {
      message.error(result);
    }

    set(false);
  } catch (err) {
    console.error(err);
  }
}
