import { Button, Divider, Form, FormProps, Input } from "antd";

import "../styles/register.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

type FieldType = {
	fullName?: string;
	password?: string;
	email?: string;
	phone?: string;
};

const RegisterPage = () => {
	const [isSubmit, setIsSubmit] = useState(false);

	const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
		console.log("Success:", values);
	};

	return (
		<div className="register-page">
			<main className="main">
				<div className="container">
					<section className="wrapper">
						<div className="heading">
							<h2 className="text text-large">
								đăng ký tài khoản
							</h2>
							<Divider />
						</div>
						<Form
							name="register-form"
							onFinish={onFinish}
							layout="vertical"
							autoComplete="off"
						>
							<Form.Item<FieldType>
								label="Họ tên"
								labelCol={{ span: 24 }}
								name="fullName"
								rules={[
									{
										required: true,
										message: "Họ tên không được để trống!",
									},
								]}
							>
								<Input />
							</Form.Item>

							<Form.Item<FieldType>
								label="Email"
								labelCol={{ span: 24 }}
								name="email"
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

							<Form.Item<FieldType>
								label="Số điện thoại"
								labelCol={{ span: 24 }}
								name="phone"
								rules={[
									{
										required: true,
										message:
											"Số điện thoại không được để trống!",
									},
								]}
							>
								<Input />
							</Form.Item>

							<Form.Item label={null}>
								<Button
									type="primary"
									htmlType="submit"
									loading={isSubmit}
								>
									Đăng ký
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
								Đã có tài khoản ?{" "}
								<span>
									<Link to=""> Đăng Nhập </Link>
								</span>
							</p>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
};

export default RegisterPage;
