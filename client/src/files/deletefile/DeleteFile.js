//?
import { useState } from "react";
import { message, Divider, Form, Input, Button } from "antd";
import { FileTwoTone } from "@ant-design/icons";

// todo
export default function DeleteFile({ className }) {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      let response = await fetch("/files/del", {
        method: "DELETE",
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
        // setNames(result);
      } else {
        message.error(result);
      }
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  //
  return (
    <div className={className}>
      <Divider>
        <span className="text-success">Delete File</span>
      </Divider>
      <Form name="del" className="login-form" onFinish={onFinish}>
        <Form.Item
          name="filename"
          rules={[
            {
              required: true,
              message: "Please input file name!",
            },
          ]}
        >
          <Input
            prefix={<FileTwoTone className="site-form-item-icon" />}
            placeholder="Filename"
            className="rounded"
          />
        </Form.Item>

        <Form.Item>
          <div className="d-grid">
            <Button type="primary" htmlType="submit" className="rounded block ">
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              {"\u00A0\u00A0 Հեռացնել ֆայլը"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
