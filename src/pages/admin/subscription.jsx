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
  Descriptions,
} from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  BookOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import { allStudents } from './mockStudents';
import { Info } from 'lucide-react';

const { Title, Text } = Typography;
const { Option } = Select;

const SubscriptionStats = () => {
  const [filterGrade, setFilterGrade] = useState(null);
  const [filterSection, setFilterSection] = useState(null);

  // ✅ Modal state
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: 'School',
      dataIndex: 'school',
      key: 'school',
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              text === 'Active'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {text}
          </span>

          {/* ✅ Click → Open modal */}
          <button
            className="p-1 rounded-full hover:bg-gray-200 transition"
            onClick={() => {
              setSelectedStudent(record);
              setIsModalOpen(true);
            }}
          >
            <Info className="text-gray-400" size={18} />
          </button>
        </div>
      ),
    },
  ];

  // Stats
  const totalStudents = allStudents.length;
  const totalSections = sections.length;
  const totalGrades = grades.length;
  const activeStudents = allStudents.length; // placeholder

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-2">
        <Title level={3} className="text-gray-800! mb-1!">
          Subscription Statistics
        </Title>
        <Text type="secondary">
          Welcome back! Here’s an overview of your students.
        </Text>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Total Students"
              value={totalStudents}
              prefix={<TeamOutlined className="text-indigo-500 mr-2" />}
              valueStyle={{ color: '#1f2937' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Total Sections"
              value={totalSections}
              prefix={<BookOutlined className="text-indigo-500 mr-2" />}
              valueStyle={{ color: '#1f2937' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Total Grades"
              value={totalGrades}
              prefix={<ReadOutlined className="text-indigo-500 mr-2" />}
              valueStyle={{ color: '#1f2937' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Active Students"
              value={activeStudents}
              prefix={<UserOutlined className="text-indigo-500 mr-2" />}
              valueStyle={{ color: '#1f2937' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Table */}
      <Card bordered={false} className="shadow-sm">
        <div className="flex flex-wrap items-center justify-between mb-4">
          <Title level={4} className="mb-0! text-gray-700!">
            Student List
          </Title>

          <div className="flex gap-3">
            <Select
              placeholder="Filter by Grade"
              allowClear
              style={{ width: 160 }}
              value={filterGrade}
              onChange={(value) => setFilterGrade(value)}
            >
              {grades.map(grade => (
                <Option key={grade} value={grade}>
                  Grade {grade}
                </Option>
              ))}
            </Select>

            <Select
              placeholder="Filter by Section"
              allowClear
              style={{ width: 160 }}
              value={filterSection}
              onChange={(value) => setFilterSection(value)}
            >
              {sections.map(section => (
                <Option key={section} value={section}>
                  Section {section}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredStudents}
          pagination={{ pageSize: 8, showSizeChanger: true }}
          rowKey="key"
        />
      </Card>

      {/* ✅ Modal */}
      <Modal
        title="Payment Details"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {selectedStudent && (
          <Descriptions column={1} size="small">
            <Descriptions.Item label="Full Name">
              {selectedStudent.fullName}
            </Descriptions.Item>

            <Descriptions.Item label="Email">
              {selectedStudent.email}
            </Descriptions.Item>

            <Descriptions.Item label="School">
              {selectedStudent.school}
            </Descriptions.Item>

            <Descriptions.Item label="Status">
              {selectedStudent.status}
            </Descriptions.Item>

            {/* Example fields (replace with real payment data later) */}
            <Descriptions.Item label="Plan">
              Pro
            </Descriptions.Item>

            <Descriptions.Item label="Amount">
              $20
            </Descriptions.Item>

            <Descriptions.Item label="Transaction ID">
              TXN-123456
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default SubscriptionStats;