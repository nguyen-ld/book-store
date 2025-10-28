import { getUsersAPI } from "@/services/api";
import { dateRangeValidate } from "@/services/helper";
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button } from "antd";
import { useRef, useState } from "react";

const columns: ProColumns<IUserTable>[] = [
	{
		dataIndex: "index",
		valueType: "indexBorder",
		width: 48,
	},
	{
		title: "_id",
		dataIndex: "_id",
		hideInSearch: true,
		render(dom, entity, index, action, schema) {
			return <a href="#">{entity._id}</a>;
		},
	},
	{
		title: "Full Name",
		dataIndex: "fullName",
	},
	{
		title: "Email",
		dataIndex: "email",
		copyable: true,
	},
	{
		title: "Created At",
		dataIndex: "createdAt",
		valueType: "date",
		hideInSearch: true,
		sorter: true,
	},
	{
		title: "Created At",
		dataIndex: "createAtRange",
		valueType: "dateRange",
		hideInTable: true,
	},
	{
		title: "Action",
		hideInSearch: true,
		render(dom, entity, index, action, schema) {
			return (
				<>
					<EditTwoTone
						twoToneColor="#f57800"
						style={{ cursor: "pointer", marginRight: 15 }}
					/>
					<DeleteTwoTone
						twoToneColor="#ff4d4f"
						style={{ cursor: "pointer" }}
					/>
				</>
			);
		},
	},
];

type TSearch = {
	fullName: string;
	email: string;
	createdAt: string;
	createAtRange: string;
};

const TableUser = () => {
	const actionRef = useRef<ActionType>();

	const [meta, setMeta] = useState({
		current: 1,
		pageSize: 5,
		pages: 0,
		total: 0,
	});

	return (
		<>
			<ProTable<IUserTable, TSearch>
				columns={columns}
				actionRef={actionRef}
				cardBordered
				request={async (params, sort, filter) => {
					console.log("log", sort, filter);

					let query = "";

					if (params) {
						query += `current=${params.current}&pageSize=${params.pageSize}`;

						if (params.email) {
							query += `&email=${params.email}`;
						}

						if (params.fullName) {
							query += `&fullName=${params.fullName}`;
						}

						const createDateRange = dateRangeValidate(
							params.createAtRange
						);
						console.log(createDateRange);
						if (createDateRange) {
							query += `&createdAt>=${createDateRange[0]}&createdAt<=${createDateRange[1]}`;
						}
					}
					if (sort && sort.createdAt) {
						query += `&sort=${
							sort.createdAt === "ascend"
								? "createdAt"
								: "-createdAt"
						}`;
					}

					const res = await getUsersAPI(query);
					if (res?.data) {
						console.log(res.data);
						setMeta(res.data.meta);
					}

					return {
						data: res.data?.result,
						page: 1,
						success: true,
						total: res.data?.meta.total,
					};
				}}
				rowKey="_id"
				pagination={{
					pageSize: meta?.pageSize,
					current: meta?.current,
					showSizeChanger: true,
					total: meta?.total,
					showTotal(total, range) {
						return (
							<div>
								{range[0]}-{range[1]} trên {total} rows{" "}
							</div>
						);
					},
				}}
				headerTitle="Table user"
				toolBarRender={() => [
					<Button
						key="button"
						icon={<PlusOutlined />}
						onClick={() => {
							actionRef.current?.reload();
						}}
						type="primary"
					>
						Add new
					</Button>,
				]}
			/>
		</>
	);
};

export default TableUser;
