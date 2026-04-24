// Quiz.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  Typography,
  Row,
  Col,
  Divider,
  message,
  Radio,
  Space,
} from 'antd';
import {
  PlusOutlined,
  MinusCircleOutlined,
  FormOutlined,
  HistoryOutlined, // icon for "Previous Quizzes"
} from '@ant-design/icons';
import { allStudents } from './mockStudents';
import { useQuizContext } from './QuizContext';

const { Title, Text } = Typography;
const { Option } = Select;

const SUBJECTS = ['Mathematics', 'Biology', 'Physics', 'Chemistry'];
const QUESTION_TYPES = [
  { value: 'mcq', label: 'Multiple Choice' },
  { value: 'truefalse', label: 'True / False' },
  { value: 'short', label: 'Short Answer' },
];

const createEmptyQuestion = (type = 'mcq') => ({
  id: Date.now(),
  type,
  text: '',
  options: type === 'mcq' ? ['', '', '', ''] : type === 'truefalse' ? ['True', 'False'] : [],
  correctOption: type === 'short' ? '' : 0,
});

const Quiz = () => {
  const { addQuiz } = useQuizContext();
  const [form] = Form.useForm();
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const grades = [...new Set(allStudents.map((s) => s.grade))];

  const addQuestion = () => {
    setQuestions([...questions, createEmptyQuestion()]);
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestion = (id, field, value) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== id) return q;
        const updated = { ...q, [field]: value };

        if (field === 'type') {
          if (value === 'mcq') {
            updated.options = ['', '', '', ''];
            updated.correctOption = 0;
          } else if (value === 'truefalse') {
            updated.options = ['True', 'False'];
            updated.correctOption = 0;
          } else if (value === 'short') {
            updated.options = [];
            updated.correctOption = '';
          }
        }
        return updated;
      })
    );
  };

  const updateOption = (qId, optIndex, value) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === qId) {
          const newOptions = [...q.options];
          newOptions[optIndex] = value;
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const handleSubmit = (values) => {
    if (questions.length === 0) {
      message.error('Add at least one question.');
      return;
    }

    const incomplete = questions.some((q) => {
      if (!q.text.trim()) return true;
      if (q.type === 'mcq' && q.options.some((o) => !o.trim())) return true;
      if (q.type === 'short' && !q.correctOption.trim()) return true;
      return false;
    });

    if (incomplete) {
      message.error('Complete all question fields.');
      return;
    }

    const quizData = {
      ...values,
      questions: questions.map((q) => ({
        type: q.type,
        text: q.text,
        options: q.type !== 'short' ? q.options : undefined,
        correctOption: q.correctOption,
      })),
      postedAt: new Date().toISOString(),
    };

    addQuiz(quizData);
    message.success('Quiz posted!');
    form.resetFields();
    setQuestions([]);
  };

  return (
    <div className="p-6 space-y-6 max-h-screen overflow-y-auto">
      {/* Header with Title and Previous Quizzes button */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <Title level={3} className="text-gray-800! mb-1!">
            Create Quiz
          </Title>
          <Text type="secondary">
            Choose grade and subject, then add questions by type.
          </Text>
        </div>
        <Button
          icon={<HistoryOutlined />}
          onClick={() => navigate('/generated-quizzes')}
        >
          Previous Quizzes
        </Button>
      </div>

      <Card bordered={false} className="shadow-sm">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={[24, 0]}>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Quiz Title"
                name="quizTitle"
                rules={[{ required: true, message: 'Enter a title' }]}
              >
                <Input placeholder="e.g., Midterm Quiz" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Grade"
                name="grade"
                rules={[{ required: true, message: 'Select a grade' }]}
              >
                <Select placeholder="Choose a grade" allowClear>
                  {grades.map((g) => (
                    <Option key={g} value={g}>Grade {g}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Subject"
                name="subject"
                rules={[{ required: true, message: 'Select a subject' }]}
              >
                <Select placeholder="Choose a subject" allowClear>
                  {SUBJECTS.map((s) => (
                    <Option key={s} value={s}>{s}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Due Date (optional)" name="dueDate">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Divider />

          <div className="mb-4">
            <Space className="mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Title level={5} className="mb-0!">Questions</Title>
              <Button type="dashed" icon={<PlusOutlined />} onClick={addQuestion}>
                Add Question
              </Button>
            </Space>

            {questions.length === 0 && (
              <Text type="secondary">No questions yet. Click the button above.</Text>
            )}

            <div className="max-h-100 overflow-y-auto pr-2 space-y-3">
              {questions.map((q, idx) => (
                <Card
                  key={q.id}
                  size="small"
                  className="bg-gray-50"
                  title={`Question ${idx + 1}`}
                  extra={
                    <Button
                      type="text"
                      danger
                      icon={<MinusCircleOutlined />}
                      onClick={() => removeQuestion(q.id)}
                    />
                  }
                >
                  <Row gutter={12}>
                    <Col span={12}>
                      <Form.Item label="Question Type">
                        <Select
                          value={q.type}
                          onChange={(val) => updateQuestion(q.id, 'type', val)}
                        >
                          {QUESTION_TYPES.map((t) => (
                            <Option key={t.value} value={t.value}>{t.label}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item label="Question text" required>
                    <Input.TextArea
                      rows={2}
                      value={q.text}
                      onChange={(e) => updateQuestion(q.id, 'text', e.target.value)}
                      placeholder="Enter your question"
                    />
                  </Form.Item>

                  {/* MCQ Options */}
                  {q.type === 'mcq' && (
                    <Row gutter={[12, 12]}>
                      {q.options.map((opt, oi) => (
                        <Col xs={24} sm={12} key={oi}>
                          <Form.Item label={`Option ${oi + 1}`}>
                            <Input
                              value={opt}
                              onChange={(e) => updateOption(q.id, oi, e.target.value)}
                              placeholder={`Option ${oi + 1}`}
                              addonAfter={
                                <Radio
                                  checked={q.correctOption === oi}
                                  onChange={() => updateQuestion(q.id, 'correctOption', oi)}
                                />
                              }
                            />
                          </Form.Item>
                        </Col>
                      ))}
                    </Row>
                  )}

                  {/* True/False Options */}
                  {q.type === 'truefalse' && (
                    <Radio.Group
                      value={q.correctOption}
                      onChange={(e) => updateQuestion(q.id, 'correctOption', e.target.value)}
                    >
                      <Space direction="horizontal">
                        <Radio value={0}>True</Radio>
                        <Radio value={1}>False</Radio>
                      </Space>
                    </Radio.Group>
                  )}

                  {/* Short Answer */}
                  {q.type === 'short' && (
                    <Form.Item label="Correct Answer" required>
                      <Input.TextArea
                        rows={2}
                        value={q.correctOption}
                        onChange={(e) => updateQuestion(q.id, 'correctOption', e.target.value)}
                        placeholder="Enter the model answer"
                      />
                    </Form.Item>
                  )}
                </Card>
              ))}
            </div>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<FormOutlined />}>
              Post Quiz
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Quiz;