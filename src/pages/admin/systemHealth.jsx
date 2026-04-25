import { Card, Row, Col, Statistic, Progress, Typography, Tag } from "antd";
import {
  DashboardOutlined,
  CloudServerOutlined,
  DatabaseOutlined,
  ApiOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

export default function SystemHealth() {
  // 🔧 Mock data (replace with API later)
  const health = {
    cpu: 68,
    memory: 74,
    uptime: "3 days 12 hrs",
    apiStatus: "online",
    dbStatus: "online",
    activeUsers: 124,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <Title level={3}>System Health Dashboard</Title>
        <Text type="secondary">
          Monitor system performance and service status in real time.
        </Text>
      </div>

      {/* Top Stats */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Users"
              value={health.activeUsers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Uptime"
              value={health.uptime}
              prefix={<DashboardOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="API Status"
              value={health.apiStatus}
              prefix={<ApiOutlined />}
              valueStyle={{
                color: health.apiStatus === "online" ? "#16a34a" : "#dc2626",
              }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Database"
              value={health.dbStatus}
              prefix={<DatabaseOutlined />}
              valueStyle={{
                color: health.dbStatus === "online" ? "#16a34a" : "#dc2626",
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* Performance Section */}
      <Row gutter={[16, 16]}>
        {/* CPU */}
        <Col xs={24} lg={12}>
          <Card title="CPU Usage" extra={<CloudServerOutlined />}>
            <Progress
              percent={health.cpu}
              status={health.cpu > 85 ? "exception" : "active"}
            />
            <Text type="secondary">Current CPU load</Text>
          </Card>
        </Col>

        {/* Memory */}
        <Col xs={24} lg={12}>
          <Card title="Memory Usage" extra={<CloudServerOutlined />}>
            <Progress
              percent={health.memory}
              status={health.memory > 85 ? "exception" : "active"}
            />
            <Text type="secondary">RAM utilization</Text>
          </Card>
        </Col>
      </Row>

      {/* Service Status */}
      <Card title="Services Status">
        <div className="flex gap-4 flex-wrap">
          <Tag color="green">Auth Service: OK</Tag>
          <Tag color="green">Payment Service: OK</Tag>
          <Tag color="orange">Notification: Delayed</Tag>
          <Tag color="green">Storage: OK</Tag>
        </div>
      </Card>
    </div>
  );
}