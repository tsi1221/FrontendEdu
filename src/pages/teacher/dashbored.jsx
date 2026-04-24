// TeacherDashboard.jsx
import { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Table,
  Select,
  Statistic,
  Typography,
} from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  BookOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import { allStudents } from './mockStudents'; 

const { Title, Text } = Typography;
const { Option } = Select;

const TeacherDashboard = () => {
  const [filterGrade, setFilterGrade] = useState(null);
  const [filterSection, setFilterSection] = useState(null);

  // Get unique grades & sections
  const grades = [...new Set(allStudents.map(s => s.grade))];
  const sections = [...new Set(allStudents.map(s => s.section))];

  // Apply external filters
  const filteredStudents = allStudents.filter(student => {
    if (filterGrade && student.grade !== filterGrade) return false;
    if (filterSection && student.section !== filterSection) return false;
    return true;
  });

  // Table columns (keep exactly as before)
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
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
      filters: grades.map(g => ({ text: `Grade ${g}`, value: g })),
      onFilter: (value, record) => record.grade === value,
      render: (text) => <span className="font-medium">Grade {text}</span>,
    },
    {
      title: 'Section',
      dataIndex: 'section',
      key: 'section',
      filters: sections.map(s => ({ text: `Section ${s}`, value: s })),
      onFilter: (value, record) => record.section === value,
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  // Statistics
  const totalStudents = allStudents.length;
  const totalSections = sections.length;
  const totalGrades = grades.length;
  const activeStudents = allStudents.length; // placeholder

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-2">
        <Title level={3} className="text-gray-800! mb-1!">
          Teacher Dashboard
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

      {/* Student Table */}
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
          className="ant-table-custom"
        />
      </Card>
    </div>
  );
};

export default TeacherDashboard;