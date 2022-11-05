//?
import { useEffect } from "react";
import { Avatar, Popover, notification } from "antd";
import { useNameContext } from "./context/NameContext";
import { UserOutlined, SmileOutlined } from "@ant-design/icons";
import Users from "./Users";

//?
const avatarStyle = {
  backgroundColor: "#87d068",
  position: "fixed",
  top: "50px",
  right: "50px",
  cursor: "pointer",
};

// todo
export default function UserButton() {
  //
  const [name, setName] = useNameContext();

  //
  useEffect(() => {
    fetch("/users/name")
      .then((response) => response.json())
      .then((result) => {
        if (!result) {
          notification.open({
            message: "Անհրաժեշտ է գրանցվել։",
            description: `կամ էլ օգտվեք հետևյալ փորձնակ․ հաշվից e-mail: plainuser@a.com; password: aaaaaa`,
            icon: <SmileOutlined style={{ color: "#108ee9" }} />,
            duration: 0,
          });
        }
        setName(result);
      });
  }, [setName]);

  //
  return (
    <Popover placement="bottomRight" trigger="click" content={Users}>
      <Avatar key="main" style={avatarStyle} size={40}>
        {name ? (
          name[0]?.toUpperCase()
        ) : (
          <UserOutlined style={{ verticalAlign: 2 }} />
        )}
      </Avatar>
    </Popover>
  );
}
