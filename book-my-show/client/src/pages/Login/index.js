import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../api/users";

function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      const response = await LoginUser(values);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        navigate("/");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  };
  return (
    <>
      <main className="App-header">
        <h1>Login to Book My Show</h1>
        <section className="mw-500 text-center px-3">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              htmlFor="email"
              name="email"
              className="d-block"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input type="email" id="email" placeholder="Enter your Email" />
            </Form.Item>
            <Form.Item
              label="Password"
              htmlFor="password"
              name="password"
              className="d-block"
              rules={[{ required: true, message: "password is required" }]}
            >
              <Input
                type="password"
                id="password"
                placeholder="Enter your Password"
              />
            </Form.Item>
            <Form.Item className="d-block">
              <Button
                type="primary"
                block
                htmlType="submit"
                style={{ fontSize: "1.5rem", fontWeight: "600" }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <div>
            <p>
              {" "}
              New User ? <Link to="/register">Register Here</Link>
            </p>
            <p>
              {" "}
              Forgot Password ? <Link to="/forget">Click Here</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;
