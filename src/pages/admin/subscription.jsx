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
  Descriptions,
  Button,
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
import { allStudents } from './mockStudents';

const { Title, Text } = Typography;
const { Option } = Select;

const SubscriptionStats = () => {
  const [filterGrade, setFilterGrade] = useState(null);
  const [filterSection, setFilterSection] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const columns = [
    {
      title: '#',
      key: 'index',
      width: 60,
      render: (_, __, index) => index + 1,
    },
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
      width: 80,
      render: (_, record) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedStudent(record);
            setIsModalOpen(true);
          }}
        />
      ),
    },
  ];

  const totalStudents = allStudentsData.length;
  const totalSections = sections.length;
  const totalGrades = grades.length;
  const activeStudents = allStudentsData.length;

  return (
    <div className="p-6 space-y-6">
      <div className="mb-2">
        <Title level={3} className="text-gray-800! mb-1!">
          Subscription Statistics
        </Title>
        <Text type="secondary">
          Welcome back! Here’s an overview of your students.
        </Text>
      </div>

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
              onChange={setFilterGrade}
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
              onChange={setFilterSection}
            >
              {sections.map(section => (
                <Option key={section} value={section}>
                  Section {section}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        {/* ✅ Pagination always visible – 5 rows, next/back visible even with single page */}
        <Table
          columns={columns}
          dataSource={filteredStudents}
          rowKey="key"
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} students`,
            position: ['bottomCenter'],
            hideOnSinglePage: false,  // ← ensures next/back buttons always appear
          }}
        />
      </Card>

      <Modal
        title="Payment Details"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {selectedStudent && (
          <Descriptions column={1} size="small" bordered>
            <Descriptions.Item label="Full Name">
              {selectedStudent.fullName}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {selectedStudent.email}
            </Descriptions.Item>
            <Descriptions.Item label="School">
              {selectedStudent.school}
            </Descriptions.Item>
            <Descriptions.Item label="Payment Status">
              {selectedStudent.paid ? (
                <CheckCircleFilled style={{ color: 'green', fontSize: 18 }} />
              ) : (
                <CloseCircleFilled style={{ color: 'red', fontSize: 18 }} />
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Plan">Pro</Descriptions.Item>
            <Descriptions.Item label="Amount">$20</Descriptions.Item>
            <Descriptions.Item label="Transaction ID">TXN-123456</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default SubscriptionStats;