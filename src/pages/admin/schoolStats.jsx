import { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Table,
  Select,
  Statistic,
  Typography,
  Modal,
  Form,
  Input,
  Button,
  message,
} from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  BookOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import allStudents from './sampleSchool.json';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const SchoolStats = () => {
  const [filterGrade, setFilterGrade] = useState(null);
  const [filterSection, setFilterSection] = useState(null);

  // ✅ Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Get unique grades & sections
  const grades = [...new Set(allStudents.map(s => s.grade))];
  const sections = [...new Set(allStudents.map(s => s.section))];

  // Apply filters
  const filteredStudents = allStudents.filter(student => {
    if (filterGrade && student.grade !== filterGrade) return false;
    if (filterSection && student.section !== filterSection) return false;
    return true;
  });

  // Table columns
  const columns = [
    {
      title: 'School Name',
      dataIndex: 'schoolName',
      key: 'schoolName',
      sorter: (a, b) => a.schoolName.localeCompare(b.schoolName),
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  // Stats
  const totalStudents = allStudents.length;
  const totalSections = sections.length;
  const totalGrades = grades.length;
  const activeStudents = allStudents.length;

  // ✅ Form submit
  const onFinish = (values) => {
    console.log("New School:", values);
    message.success("School added successfully!");

    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-2">
        <Title level={3}>School Statistics</Title>
        <Text type="secondary">
          Welcome back! Here’s an overview of your schools.
        </Text>
      </div>

      {/* Stats */}
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card><Statistic title="Total Students" value={totalStudents} prefix={<TeamOutlined />} /></Card>
        </Col>
        <Col span={6}>
          <Card><Statistic title="Total Sections" value={totalSections} prefix={<BookOutlined />} /></Card>
        </Col>
        <Col span={6}>
          <Card><Statistic title="Total Grades" value={totalGrades} prefix={<ReadOutlined />} /></Card>
        </Col>
        <Col span={6}>
          <Card><Statistic title="Active Students" value={activeStudents} prefix={<UserOutlined />} /></Card>
        </Col>
      </Row>

      {/* Table */}
      <Card>
        <div className="flex justify-between mb-4">
          <Title level={4}>School List</Title>

          <div className="flex gap-3">
            <Select
              placeholder="Filter by Grade"
              allowClear
              style={{ width: 160 }}
              value={filterGrade}
              onChange={setFilterGrade}
            >
              {grades.map(g => <Option key={g} value={g}>Grade {g}</Option>)}
            </Select>

            <Select
              placeholder="Filter by Section"
              allowClear
              style={{ width: 160 }}
              value={filterSection}
              onChange={setFilterSection}
            >
              {sections.map(s => <Option key={s} value={s}>Section {s}</Option>)}
            </Select>

            {/* ✅ OPEN MODAL BUTTON */}
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              Add School
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredStudents}
          rowKey="key"
        />
      </Card>

      {/* ✅ MODAL WITH FORM */}
      <Modal
        title="Add New School"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="School Name"
            name="schoolName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <TextArea rows={3} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Add School
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default SchoolStats;