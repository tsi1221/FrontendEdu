import { useState, useMemo } from 'react';
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
  EyeOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons';
import allStudents from './sampleSchool.json';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const SchoolStats = () => {
  const [filterGrade, setFilterGrade] = useState(null);
  const [filterSection, setFilterSection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [form] = Form.useForm();

  // Mock 'paid' field if not present (replace with real data)
  const allStudentsData = useMemo(() => {
    return allStudents.map((student, index) => ({
      ...student,
      paid: Object.prototype.hasOwnProperty.call(student, 'paid')
        ? student.paid
        : index % 2 === 0,
    }));
  }, []);

  const grades = [...new Set(allStudentsData.map(s => s.grade))];
  const sections = [...new Set(allStudentsData.map(s => s.section))];

  const filteredStudents = allStudentsData.filter(student => {
    if (filterGrade && student.grade !== filterGrade) return false;
    if (filterSection && student.section !== filterSection) return false;
    return true;
  });

  const showDetail = (record) => {
    setSelectedSchool(record);
    setDetailModalOpen(true);
  };

  const columns = [
    {
      title: '#',
      key: 'index',
      width: 60,
      render: (_, __, index) => index + 1,
    },
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
    {
      title: 'Paid',
      dataIndex: 'paid',
      key: 'paid',
      width: 100,
      render: (paid) =>
        paid ? (
          <CheckCircleFilled style={{ color: 'green', fontSize: 18 }} />
        ) : (
          <CloseCircleFilled style={{ color: 'red', fontSize: 18 }} />
        ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (_, record) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => showDetail(record)}
        />
      ),
    },
  ];

  const totalStudents = allStudentsData.length;
  const totalSections = sections.length;
  const totalGrades = grades.length;
  const activeStudents = allStudentsData.length;

  const onFinish = (values) => {
    console.log('New School:', values);
    message.success('School added successfully!');
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="mb-2">
        <Title level={3}>School Statistics</Title>
        <Text type="secondary">
          Welcome back! Here’s an overview of your schools.
        </Text>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Students"
              value={totalStudents}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Sections"
              value={totalSections}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Grades"
              value={totalGrades}
              prefix={<ReadOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Students"
              value={activeStudents}
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
              placeholder="Filter by Grade"
              allowClear
              style={{ width: 160 }}
              value={filterGrade}
              onChange={setFilterGrade}
            >
              {grades.map(g => (
                <Option key={g} value={g}>
                  Grade {g}
                </Option>
              ))}
            </Select>
            <Select
              placeholder="Filter by Section"
              allowClear
              style={{ width: 160 }}
              value={filterSection}
              onChange={setFilterSection}
            >
              {sections.map(s => (
                <Option key={s} value={s}>
                  Section {s}
                </Option>
              ))}
            </Select>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              Add School
            </Button>
          </div>
        </div>

        {/* ✅ Scrollable table – no pagination, all rows visible */}
        <Table
          columns={columns}
          dataSource={filteredStudents}
          rowKey="key"
          pagination={false}
          scroll={{ y: 'calc(100vh - 430px)' }}
        />
      </Card>

      {/* Add School Modal */}
      <Modal
        title="Add New School"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
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
            rules={[{ required: true, type: 'email' }]}
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

      {/* Detail Modal */}
      <Modal
        title="School Details"
        open={detailModalOpen}
        onCancel={() => setDetailModalOpen(false)}
        footer={null}
      >
        {selectedSchool && (
          <div className="space-y-2">
            <p>
              <strong>School Name:</strong> {selectedSchool.schoolName}
            </p>
            <p>
              <strong>Grade:</strong> {selectedSchool.grade}
            </p>
            <p>
              <strong>Section:</strong> {selectedSchool.section}
            </p>
            <p>
              <strong>Email:</strong> {selectedSchool.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedSchool.phone}
            </p>
            <p>
              <strong>Address:</strong> {selectedSchool.address}
            </p>
            <p>
              <strong>Status:</strong>{' '}
              {selectedSchool.paid ? (
                <span style={{ color: 'green' }}>Paid</span>
              ) : (
                <span style={{ color: 'red' }}>Unpaid</span>
              )}
            </p>
            {selectedSchool.description && (
              <p>
                <strong>Description:</strong> {selectedSchool.description}
              </p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SchoolStats;