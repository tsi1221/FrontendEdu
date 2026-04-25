import { useEffect, useMemo, useState } from 'react';
import { Alert, Button, Card, Select, Space, Spin, Table, Tag, Typography, message } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { approveQuiz, fetchAdminGeneratedQuizzes } from '../../services/api';

const { Title, Text } = Typography;

const STATUS_COLORS = {
  DRAFT: 'gold',
  PUBLISHED: 'green',
  ARCHIVED: 'default',
};

const AdminGeneratedQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState('');
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState(undefined);

  useEffect(() => {
    let active = true;

    const loadQuizzes = async () => {
      try {
        setLoading(true);
        const response = await fetchAdminGeneratedQuizzes();
        if (!active) return;
        setQuizzes(Array.isArray(response?.data) ? response.data : []);
      } catch (fetchError) {
        if (!active) return;
        setError(fetchError.message || 'Unable to load teacher quizzes.');
      } finally {
        if (active) setLoading(false);
      }
    };

    loadQuizzes();

    return () => {
      active = false;
    };
  }, []);

  const filteredQuizzes = useMemo(() => {
    if (!statusFilter) return quizzes;
    return quizzes.filter((quiz) => quiz.status === statusFilter);
  }, [quizzes, statusFilter]);

  const handleApprove = async (quizId) => {
    try {
      setActionLoading(quizId);
      await approveQuiz(quizId);
      setQuizzes((prev) => prev.map((quiz) => (quiz._id === quizId ? { ...quiz, status: 'PUBLISHED' } : quiz)));
      message.success('Quiz approved successfully.');
    } catch (approveError) {
      message.error(approveError.message || 'Unable to approve quiz.');
    } finally {
      setActionLoading('');
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (value) => value || '-',
    },
    {
      title: 'Teacher',
      key: 'teacher',
      render: (_, record) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-gray-100">{record.teacher_name || '-'}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{record.teacher_email || '-'}</div>
        </div>
      ),
    },
    {
      title: 'Subject',
      dataIndex: 'subject_name',
      key: 'subject_name',
      render: (value, record) => `${value || '-'}${record.grade ? ` · Grade ${record.grade}` : ''}`,
    },
    {
      title: 'Questions',
      dataIndex: 'question_count',
      key: 'question_count',
      render: (count) => `${count || 0}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={STATUS_COLORS[status] || 'default'}>{status || 'DRAFT'}</Tag>,
    },
    {
      title: 'Created',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (value) => (value ? new Date(value).toLocaleString() : '-'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        record.status === 'PUBLISHED' ? (
          <Tag icon={<CheckCircleOutlined />} color="green">Approved</Tag>
        ) : (
          <Button
            type="primary"
            loading={actionLoading === record._id}
            onClick={() => handleApprove(record._id)}
          >
            Approve
          </Button>
        )
      ),
    },
  ];

  return (
    <div className="teacher-page p-6 max-h-screen overflow-y-auto bg-white dark:bg-transparent text-gray-900">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <Title level={3} className="mb-1! text-gray-900 dark:text-gray-100">
            Generated Quizzes
          </Title>
          <Text type="secondary" className="dark:text-gray-100">
            Review teacher-created quizzes and approve them for students.
          </Text>
        </div>
        <Space>
          <Select
            allowClear
            placeholder="Filter by status"
            style={{ width: 180 }}
            value={statusFilter}
            onChange={setStatusFilter}
            dropdownClassName="teacher-page"
            className="teacher-control-select"
            options={['DRAFT', 'PUBLISHED', 'ARCHIVED'].map((status) => ({ value: status, label: status }))}
          />
        </Space>
      </div>

      {error ? <Alert type="error" showIcon message={error} className="mb-4" /> : null}

      <Card bordered={false} className="shadow-sm dark:bg-slate-800 dark:border-slate-700">
        {loading ? (
          <div className="py-10 flex justify-center">
            <Spin />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={filteredQuizzes}
            rowKey={(record) => record._id}
            pagination={{ pageSize: 8, showSizeChanger: true }}
            scroll={{ x: true }}
            locale={{ emptyText: 'No teacher quizzes found' }}
          />
        )}
      </Card>
    </div>
  );
};

export default AdminGeneratedQuizzes;
