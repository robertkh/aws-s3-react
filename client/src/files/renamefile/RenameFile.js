//?
import { useState } from "react";
import { message, Divider, Form, Input, Button } from "antd";
import { FileTwoTone } from "@ant-design/icons";

//todo
export default function RenameFile({ className }) {
  const [loading, setLoading] = useState(false);

  //
  const onFinish = async (values) => {
    setLoading(true);
    try {
      let response = await fetch("/files/rename", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      let result = await response.json();
      setLoading(false);

      if (response.ok) {
        message.success(result);
      } else {
        message.error(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //
  return (
    <div className={className}>
      <Divider>
        <span className="text-primary">Rename File</span>
      </Divider>

      <Form name="rename" className="login-form" onFinish={onFinish}>
        <Form.Item
          name="oldname"
          rules={[
            {
              required: true,
              message: "Please input file oldname!",
            },
          ]}
        >
          <Input
            prefix={<FileTwoTone className="site-form-item-icon" />}
            placeholder="Old Filename"
            className="rounded"
          />
        </Form.Item>

        <Form.Item
          name="newname"
          rules={[
            {
              required: true,
              message: "Please input file newname!",
            },
          ]}
        >
          <Input
            prefix={<FileTwoTone className="site-form-item-icon" />}
            placeholder="New Filename"
            className="rounded"
          />
        </Form.Item>

        <Form.Item>
          <div className="d-grid">
            <Button type="primary" htmlType="submit" className="rounded block ">
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              {"\u00A0\u00A0Փոխել ֆայլի անունը"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
