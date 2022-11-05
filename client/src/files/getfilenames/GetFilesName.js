//?
import { useState } from "react";
import { message, Divider } from "antd";
import { css } from "@emotion/react";
import PuffLoader from "react-spinners/PuffLoader";

// todo
export default function GetFileNames({ className }) {
  //
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  //
  async function clickHandler() {
    setLoading(true);
    try {
      let response = await fetch("/files/getnames");
      let result = await response.json();
      setLoading(false);

      if (response.ok) {
        if (result.length === 0) {
          message.warning("Պահոցում ֆայլ չկա։");
        }
        setNames(result);
      } else {
        message.error(result);
      }
    } catch (err) {
      console.log(err);
    }
  }

  //
  const fileNames = names.map((item) => {
    return <li key={item}>{item}</li>;
  });

  //
  return (
    <div className={className}>
      <Divider>
        <span className="text-warning">Get Filenames</span>
      </Divider>

      <button
        onClick={clickHandler}
        type="button"
        className="btn btn-primary btn-sm w-100 mb-2"
      >
        {loading && <span className="spinner-border spinner-border-sm"></span>}

        {fileNames?.length
          ? "\u00A0\u00A0 Պահոցում առկա ֆայլերն են՝"
          : "\u00A0\u00A0 Ստանալ ցուցակը"}
      </button>

      {fileNames}
    </div>
  );
}
