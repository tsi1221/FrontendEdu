// generatedQueze.jsx
import { Card, Table, Typography } from 'antd';
import { useQuizContext } from './QuizContext';

const { Title, Text } = Typography;

const GeneratedQuizzes = () => {
  const { quizzes } = useQuizContext();

  const columns = [
    { title: 'Title', dataIndex: 'quizTitle', key: 'quizTitle' },
    { title: 'Grade', dataIndex: 'grade', key: 'grade', render: (g) => `Grade ${g}` },
    { title: 'Subject', dataIndex: 'subject', key: 'subject' },
    {
      title: 'Questions',
      dataIndex: 'questions',
      key: 'questions',
      render: (arr) => `${arr.length} question(s)`,
    },
    {
      title: 'Posted',
      dataIndex: 'postedAt',
      key: 'postedAt',
      render: (iso) => new Date(iso).toLocaleDateString(),
    },
  ];

  return (
    <div className="p-6 max-h-screen overflow-y-auto">
      <Title level={3} className="text-gray-800! mb-1!">
        Generated Quizzes
      </Title>
      <Text type="secondary">
        All quizzes you have posted.
      </Text>

      <Card bordered={false} className="shadow-sm mt-4">
        {quizzes.length === 0 ? (
          <Text type="secondary">No quizzes posted yet.</Text>
        ) : (
          <Table
            columns={columns}
            dataSource={quizzes}
            rowKey="id"
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