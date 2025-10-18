import { App, Button, Divider, Form, FormProps, Input } from "antd";

import "../styles/login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginAPI } from "@/services/api";

type FieldType = {
	username: string;
	password: string;
};

const LoginPage = () => {
	const [isSubmit, setIsSubmit] = useState(false);
	const { message, notification } = App.useApp();
	const navigate = useNavigate();

	const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
		setIsSubmit(true);

		const { username, password } = values;

		const res = await loginAPI(username, password);

		if (res.data) {
			// success
			localStorage.setItem("access_token", res.data.access_token);
			message.success("Đăng nhập tài khoản thành công!");
			navigate("/");
		} else {
			notification.error({
				message: "Có lỗi xảy ra",
				description:
					res.message && Array.isArray(res.message)
						? res.message[0]
						: res.message,
				duration: 5,
			});
		}
		setIsSubmit(false);
	};

	return (
		<div className="login-page">
			<main className="main">
				<div className="container">
					<section className="wrapper">
						<div className="heading">
							<h2 className="text text-large">Đăng nhập</h2>
							<Divider />
						</div>

						<Form
							name="login-form"
							onFinish={onFinish}
							layout="vertical"
							autoComplete="off"
						>
							<Form.Item<FieldType>
								label="Email"
								labelCol={{ span: 24 }}
								name="username"
								rules={[
									{
										required: true,
										message: "Email không được để trống!",
									},
									{
										type: "email",
										message: "Email không hợp lệ!",
									},
								]}
							>
								<Input />
							</Form.Item>

							<Form.Item<FieldType>
								label="Mật khẩu"
								name="password"
								rules={[
									{
										required: true,
										message:
											"Mật khẩu không được để trống!",
									},
								]}
							>
								<Input.Password />
							</Form.Item>

							<Form.Item label={null}>
								<Button
									type="primary"
									htmlType="submit"
									loading={isSubmit}
								>
									Đăng nhập
								</Button>
							</Form.Item>
						</Form>
						<div className="footer-page">
							<div className="horizotal-line">
								<Divider>Or</Divider>
							</div>
							<p
								style={{ textAlign: "center" }}
								className="text-normal"
							>
								Chưa có tài khoản ?{" "}
								<span>
									<Link to="/register"> Đăng ký </Link>
								</span>
							</p>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
};

export default LoginPage;
