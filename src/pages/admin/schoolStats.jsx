import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Card,
  Row,
  Col,
  Table,
  Select,
  Statistic,
  Typography,
  Modal,
  Descriptions,
  Form,
  Input,
  Button,
  Switch,
  Tag,
  Spin,
  message,
} from "antd";
import {
  BankOutlined,
  UserOutlined,
  TeamOutlined,
  BookOutlined,
  ReadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { createSchool, fetchSchools } from "../../services/api";

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const STATUS_COLOR_MAP = {
  ACTIVE: "green",
  INACTIVE: "red",
  NO_ACTIVE_SUBSCRIPTIONS: "gold",
};

const STATUS_LABEL_MAP = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  NO_ACTIVE_SUBSCRIPTIONS: "No Active Subscription",
};

const SchoolStats = () => {
  const [statusFilter, setStatusFilter] = useState(null);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [form] = Form.useForm();

  const loadSchools = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetchSchools();
      setSchools(Array.isArray(response?.data) ? response.data : []);
    } catch (fetchError) {
      setError(fetchError.message || "Unable to load schools.");
      setSchools([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadSchools();
  }, []);

  const statusOptions = useMemo(
    () => [...new Set(schools.map((school) => school.status).filter(Boolean))],
    [schools],
  );

  const filteredSchools = schools.filter((school) => {
    if (statusFilter && school.status !== statusFilter) return false;
    return true;
  });

  const showDetail = (record) => {
    setSelectedSchool(record);
    setDetailModalOpen(true);
  };

  const columns = [
    {
      title: "#",
      key: "index",
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: "School Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) =>
        String(a.name || "").localeCompare(String(b.name || "")),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (value) => value || "-",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (value) => value || "-",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (value) => value || "-",
    },
    {
      title: "Students",
      dataIndex: "total_students",
      key: "total_students",
      width: 110,
      render: (value) => Number(value || 0),
    },
    {
      title: "Active Subs",
      dataIndex: "active_subscribers",
      key: "active_subscribers",
      width: 120,
      render: (value) => Number(value || 0),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 190,
      render: (value) => (
        <Tag color={STATUS_COLOR_MAP[value] || "default"}>
          {STATUS_LABEL_MAP[value] || value || "Unknown"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 90,
      render: (_, record) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => showDetail(record)}
        />
      ),
    },
  ];

  const summary = useMemo(() => {
    const totalSchools = schools.length;
    const enabledSchools = schools.filter(
      (school) => school.is_active !== false,
    ).length;
    const totalStudents = schools.reduce(
      (sum, school) => sum + Number(school.total_students || 0),
      0,
    );
    const activeSubscribers = schools.reduce(
      (sum, school) => sum + Number(school.active_subscribers || 0),
      0,
    );

    return {
      totalSchools,
      enabledSchools,
      totalStudents,
      activeSubscribers,
    };
  }, [schools]);

  const onFinish = async (values) => {
    try {
      setSubmitting(true);
      await createSchool({
        name: values.name,
        email: values.email || null,
        phone: values.phone || null,
        address: values.address || null,
        description: values.description || null,
        is_active: values.is_active !== false,
      });
      message.success("School added successfully!");
      form.resetFields();
      setIsModalOpen(false);
      await loadSchools();
    } catch (createError) {
      message.error(createError.message || "Unable to create school.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="mb-2">
        <Title level={3}>School Statistics</Title>
        <Text type="secondary">
          Add school information and monitor school status from live backend
          data.
        </Text>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Schools"
              value={summary.totalSchools}
              prefix={<BankOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Enabled Schools"
              value={summary.enabledSchools}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Students"
              value={summary.totalStudents}
              prefix={<ReadOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Subscribers"
              value={summary.activeSubscribers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <div className="flex justify-between mb-4">
          <Title level={4}>School List</Title>
          <div className="flex gap-3">
            <Select
              placeholder="Filter by Status"
              allowClear
              style={{ width: 220 }}
              value={statusFilter}
              onChange={setStatusFilter}
            >
              {statusOptions.map((status) => (
                <Option key={status} value={status}>
                  {STATUS_LABEL_MAP[status] || status}
                </Option>
              ))}
            </Select>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              Add School
            </Button>
          </div>
        </div>

        {error ? (
          <Alert type="error" showIcon message={error} className="mb-4" />
        ) : null}

        {loading ? (
          <div className="py-10 flex justify-center">
            <Spin />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={filteredSchools}
            rowKey={(record) => record._id}
            pagination={{ pageSize: 8, showSizeChanger: false }}
            scroll={{ x: true }}
          />
        )}
      </Card>

      {/* Add School Modal */}
      <Modal
        title="Add New School"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="School Name"
            name="name"
            rules={[{ required: true, message: "School name is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ type: "email" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="is_active"
            label="Enable school"
            valuePropName="checked"
            initialValue
          >
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={submitting}>
            Add School
          </Button>
        </Form>
      </Modal>

      {/* Detail Modal */}
      <Modal
        title="School Details"
        open={detailModalOpen}
        onCancel={() => setDetailModalOpen(false)}
        footer={null}
      >
        {selectedSchool && (
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="School Name">
              {selectedSchool.name}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={STATUS_COLOR_MAP[selectedSchool.status] || "default"}>
                {STATUS_LABEL_MAP[selectedSchool.status] ||
                  selectedSchool.status ||
                  "Unknown"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {selectedSchool.email || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {selectedSchool.phone || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {selectedSchool.address || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {selectedSchool.description || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Total Students">
              {Number(selectedSchool.total_students || 0)}
            </Descriptions.Item>
            <Descriptions.Item label="Active Subscribers">
              {Number(selectedSchool.active_subscribers || 0)}
            </Descriptions.Item>
            <Descriptions.Item label="Total Grades">
              {Number(selectedSchool.total_grades || 0)}
            </Descriptions.Item>
            <Descriptions.Item label="Total Sections">
              {Number(selectedSchool.total_sections || 0)}
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {selectedSchool.created_at
                ? new Date(selectedSchool.created_at).toLocaleString()
                : "-"}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default SchoolStats;
