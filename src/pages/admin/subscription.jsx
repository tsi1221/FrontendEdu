import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Card,
  Row,
  Col,
  Spin,
  Table,
  Select,
  Statistic,
  Typography,
  Modal,
  Descriptions,
  Button,
} from "antd";
import {
  UserOutlined,
  TeamOutlined,
  BookOutlined,
  ReadOutlined,
  EyeOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from "@ant-design/icons";
import { fetchAdminSubscriptionStats } from "../../services/api";

const { Title, Text } = Typography;
const { Option } = Select;

const SubscriptionStats = () => {
  const [filterGrade, setFilterGrade] = useState(null);
  const [filterSection, setFilterSection] = useState(null);
  const [students, setStudents] = useState([]);
  const [summary, setSummary] = useState({
    totalStudents: 0,
    totalSections: 0,
    totalGrades: 0,
    activeStudents: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let active = true;

    const loadSubscriptionStats = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetchAdminSubscriptionStats();
        if (!active) return;

        const studentsData = Array.isArray(response?.data?.students)
          ? response.data.students
          : [];
        const summaryData = response?.data?.summary || {};

        setStudents(studentsData);
        setSummary({
          totalStudents: Number(summaryData.totalStudents || 0),
          totalSections: Number(summaryData.totalSections || 0),
          totalGrades: Number(summaryData.totalGrades || 0),
          activeStudents: Number(summaryData.activeStudents || 0),
        });
      } catch (fetchError) {
        if (!active) return;
        setError(fetchError.message || "Unable to load subscription stats.");
        setStudents([]);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadSubscriptionStats();

    return () => {
      active = false;
    };
  }, []);

  const grades = [
    ...new Set(
      students.map((s) => s.grade).filter((g) => g !== null && g !== undefined),
    ),
  ];
  const sections = [
    ...new Set(
      students
        .map((s) => s.section)
        .filter((sec) => typeof sec === "string" && sec.trim()),
    ),
  ];

  const filteredStudents = students.filter((student) => {
    if (filterGrade && student.grade !== filterGrade) return false;
    if (filterSection && student.section !== filterSection) return false;
    return true;
  });

  const columns = [
    {
      title: "#",
      key: "index",
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: "School",
      dataIndex: "school",
      key: "school",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Paid",
      dataIndex: "paid",
      key: "paid",
      width: 100,
      render: (paid) =>
        paid ? (
          <CheckCircleFilled style={{ color: "green", fontSize: 18 }} />
        ) : (
          <CloseCircleFilled style={{ color: "red", fontSize: 18 }} />
        ),
    },
    {
      title: "Actions",
      key: "actions",
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

  const totalStudents = summary.totalStudents;
  const totalSections = summary.totalSections;
  const totalGrades = summary.totalGrades;
  const activeStudents = summary.activeStudents;

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
              valueStyle={{ color: "#1f2937" }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Total Sections"
              value={totalSections}
              prefix={<BookOutlined className="text-indigo-500 mr-2" />}
              valueStyle={{ color: "#1f2937" }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Total Grades"
              value={totalGrades}
              prefix={<ReadOutlined className="text-indigo-500 mr-2" />}
              valueStyle={{ color: "#1f2937" }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Active Students"
              value={activeStudents}
              prefix={<UserOutlined className="text-indigo-500 mr-2" />}
              valueStyle={{ color: "#1f2937" }}
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
              {grades.map((grade) => (
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
              {sections.map((section) => (
                <Option key={section} value={section}>
                  Section {section}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        {error ? (
          <Alert type="error" showIcon className="mb-4" message={error} />
        ) : null}

        {loading ? (
          <div className="py-10 flex justify-center">
            <Spin />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={filteredStudents}
            rowKey={(record) => record.key || record.id}
            pagination={{
              pageSize: 5,
              showSizeChanger: false,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} students`,
              position: ["bottomCenter"],
              hideOnSinglePage: false,
            }}
          />
        )}
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
                <CheckCircleFilled style={{ color: "green", fontSize: 18 }} />
              ) : (
                <CloseCircleFilled style={{ color: "red", fontSize: 18 }} />
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Plan">
              {selectedStudent.plan || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Subscription Status">
              {selectedStudent.subscriptionStatus || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Period End">
              {selectedStudent.subscriptionPeriodEnd
                ? new Date(
                    selectedStudent.subscriptionPeriodEnd,
                  ).toLocaleString()
                : "-"}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default SubscriptionStats;
