// generatedQueze.jsx
import { useEffect, useState } from 'react';
import { Alert, Card, Table, Typography, Spin } from 'antd';
import { fetchMyCreatedQuizzes } from '../../services/api';

const { Title, Text } = Typography;

const GeneratedQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const loadQuizzes = async () => {
      try {
        setLoading(true);
        const response = await fetchMyCreatedQuizzes();
        if (!active) return;
        setQuizzes(Array.isArray(response?.data) ? response.data : []);
      } catch (fetchError) {
        if (!active) return;
        setError(fetchError.message || 'Unable to load quizzes.');
      } finally {
        if (active) setLoading(false);
      }
    };

    loadQuizzes();

    return () => {
      active = false;
    };
  }, []);

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Grade', dataIndex: 'grade', key: 'grade', render: (g) => (g ? `Grade ${g}` : '-') },
    { title: 'Subject', dataIndex: 'subject_name', key: 'subject_name' },
    {
      title: 'Questions',
      dataIndex: 'question_count',
      key: 'questions',
      render: (count) => `${count || 0} question(s)`,
    },
    {
      title: 'Posted',
      dataIndex: 'created_at',
      key: 'postedAt',
      render: (iso) => new Date(iso).toLocaleDateString(),
    },
  ];

  return (
    <div className="teacher-page p-6 max-h-screen overflow-y-auto bg-white dark:bg-transparent text-gray-900">
      <Title level={3} className="mb-1! text-gray-900 dark:text-gray-100">
        Generated Quizzes
      </Title>
      <Text type="secondary">
        All quizzes you have posted.
      </Text>

      <Card bordered={false} className="shadow-sm mt-4 dark:bg-slate-800 dark:border-slate-700">
        {error ? <Alert type="error" showIcon message={error} className="mb-4" /> : null}
        {loading ? (
          <div className="py-10 flex justify-center">
            <Spin />
          </div>
        ) : quizzes.length === 0 ? (
          <Text type="secondary">No quizzes posted yet.</Text>
        ) : (
          <Table
            columns={columns}
            dataSource={quizzes}
            rowKey={(record) => record._id || record.id}
            pagination={false}
            scroll={{ y: 400 }}
            size="small"
          />
        )}
      </Card>
    </div>
  );
};

export default GeneratedQuizzes;