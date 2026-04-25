import { useEffect, useMemo, useState } from 'react';
import { Alert, Avatar, Card, Col, Empty, Row, Select, Spin, Statistic, Table, Typography } from 'antd';
import { BookOutlined, ReadOutlined, SnippetsOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { fetchTeacherDashboard } from '../../services/api';

const { Title, Text } = Typography;

const TeacherDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterGrade, setFilterGrade] = useState(undefined);
  const [filterSection, setFilterSection] = useState(undefined);

  useEffect(() => {
    let active = true;

    const loadDashboard = async () => {
      try {
        setLoading(true);
        const response = await fetchTeacherDashboard();
        if (!active) return;
        setDashboard(response?.data || null);
      } catch (fetchError) {
        if (!active) return;
        setError(fetchError.message || 'Unable to load teacher dashboard.');
      } finally {
        if (active) setLoading(false);
      }
    };

    loadDashboard();

    return () => {
      active = false;
    };
  }, []);

  const students = dashboard?.students || [];
  const classes = dashboard?.classes || [];
  const summary = dashboard?.summary || {};

  const grades = useMemo(() => {
    return [...new Set(students.map((student) => student.grade).filter(Boolean))];
  }, [students]);

  const sections = useMemo(() => {
    return [...new Set(students.map((student) => student.section).filter(Boolean))];
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      if (filterGrade && student.grade !== filterGrade) return false;
      if (filterSection && student.section !== filterSection) return false;
      return true;
    });
  }, [students, filterGrade, filterSection]);

  const columns = [
    {
      title: 'Student',
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
      render: (value, record) => (
        <div className="flex items-center gap-3">
          <Avatar src={record.photoUrl || undefined} icon={<UserOutlined />} />
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-xs text-gray-500">{record.email}</div>
          </div>
        </div>
      ),
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
      filters: grades.map((grade) => ({ text: `Grade ${grade}`, value: grade })),
      onFilter: (value, record) => record.grade === value,
      render: (value) => <span className="font-medium">Grade {value}</span>,
    },
    {
      title: 'Section',
      dataIndex: 'section',
      key: 'section',
      filters: sections.map((section) => ({ text: `Section ${section}`, value: section })),
      onFilter: (value, record) => record.section === value,
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Classes',
      dataIndex: 'classes',
      key: 'classes',
    },
  ];

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[60vh]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="teacher-page p-6 space-y-6 bg-white dark:bg-transparent text-gray-900">
      <div className="mb-2 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <Title level={3} className="mb-1! text-gray-900 dark:text-gray-100">
            Teacher Dashboard
          </Title>
          <Text type="secondary" className="dark:text-gray-100">
            Live overview of your classes, students, and subject coverage.
          </Text>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-md border border-blue-100 dark:bg-blue-950/40 dark:border-blue-900/60">
          <SnippetsOutlined className="text-[#0056D2]" />
          <span className="text-sm text-gray-700 dark:text-gray-100">{dashboard?.teacher?.user?.email || ''}</span>
        </div>
      </div>

      {error ? <Alert type="error" showIcon message={error} /> : null}

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm dark:bg-slate-800 dark:border-slate-700">
            <Statistic
              title="Total Students"
              value={summary.total_students || 0}
              prefix={<TeamOutlined className="text-indigo-500 mr-2" />}
              valueStyle={{ color: 'inherit' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm dark:bg-slate-800 dark:border-slate-700">
            <Statistic
              title="Total Classes"
              value={summary.total_classes || 0}
              prefix={<BookOutlined className="text-indigo-500 mr-2" />}
              valueStyle={{ color: 'inherit' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm dark:bg-slate-800 dark:border-slate-700">
            <Statistic
              title="Subjects Covered"
              value={summary.total_subjects || 0}
              prefix={<ReadOutlined className="text-indigo-500 mr-2" />}
              valueStyle={{ color: 'inherit' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm dark:bg-slate-800 dark:border-slate-700">
            <Statistic
              title="Active Students"
              value={summary.active_students || 0}
              prefix={<UserOutlined className="text-indigo-500 mr-2" />}
              valueStyle={{ color: 'inherit' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card bordered={false} className="shadow-sm h-full dark:bg-slate-800 dark:border-slate-700">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <Title level={4} className="mb-0! text-gray-800 dark:text-gray-100">
                  Student List
                </Title>
                <Text type="secondary" className="dark:text-gray-100">Students enrolled in your classes.</Text>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Select
                  placeholder="Filter by Grade"
                  allowClear
                  style={{ width: 160 }}
                  className="teacher-filter-select"
                  value={filterGrade}
                  onChange={(value) => setFilterGrade(value)}
                  dropdownClassName="teacher-page"
                  options={grades.map((grade) => ({ value: grade, label: `Grade ${grade}` }))}
                />
                <Select
                  placeholder="Filter by Section"
                  allowClear
                  style={{ width: 160 }}
                  className="teacher-filter-select"
                  value={filterSection}
                  onChange={(value) => setFilterSection(value)}
                  dropdownClassName="teacher-page"
                  options={sections.map((section) => ({ value: section, label: `Section ${section}` }))}
                />
              </div>
            </div>

            <Table
              columns={columns}
              dataSource={filteredStudents}
              pagination={{ pageSize: 8, showSizeChanger: true }}
              rowKey="key"
              locale={{ emptyText: <Empty description="No enrolled students found" /> }}
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card bordered={false} className="shadow-sm h-full dark:bg-slate-800 dark:border-slate-700">
            <div className="mb-4">
                <Title level={4} className="mb-0! text-gray-800 dark:text-gray-100">
                Recent Classes
              </Title>
              <Text type="secondary" className="dark:text-gray-100">Teacher-assigned classes and enrollment counts.</Text>
            </div>
            <div className="space-y-3">
              {classes.length > 0 ? classes.map((classItem) => (
                <div key={classItem.id} className="border border-gray-200 rounded-md p-3 dark:border-slate-700 dark:bg-slate-900/40">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">{classItem.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{classItem.subject} · Grade {classItem.grade || '-'}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{classItem.school}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-[#0056D2]">{classItem.studentCount}</div>
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">students</div>
                    </div>
                  </div>
                </div>
              )) : (
                <Empty description="No classes assigned yet" />
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TeacherDashboard;
