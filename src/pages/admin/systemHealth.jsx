import { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Progress,
  Typography,
  Switch,
  Tooltip,
  Tag,
} from "antd";
import {
  DashboardOutlined,
  CloudServerOutlined,
  DatabaseOutlined,
  ApiOutlined,
  UserOutlined,
  ThunderboltOutlined,
  SyncOutlined,
  PauseCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

export default function SystemHealth() {
  const [liveUpdates, setLiveUpdates] = useState(true);

  const [health, setHealth] = useState({
    cpu: 68,
    memory: 74,
    disk: 42,
    networkLatency: 24,
    uptime: "3 days 12 hrs",
    apiStatus: "online",
    dbStatus: "online",
    activeUsers: 124,
    services: [
      { name: "Auth Service", status: "ok" },
      { name: "Payment Service", status: "ok" },
      { name: "Notification", status: "delayed" },
      { name: "Storage", status: "ok" },
      { name: "Search", status: "down" },
    ],
  });

  // Simulate live updates
  useEffect(() => {
    if (!liveUpdates) return;

    const interval = setInterval(() => {
      setHealth((prev) => ({
        ...prev,
        cpu: Math.min(100, Math.max(5, prev.cpu + (Math.random() * 10 - 5))),
        memory: Math.min(100, Math.max(10, prev.memory + (Math.random() * 8 - 4))),
        disk: Math.min(100, Math.max(20, prev.disk + (Math.random() * 2 - 1))),
        networkLatency: Math.max(5, prev.networkLatency + (Math.random() * 6 - 3)),
        activeUsers: Math.max(0, prev.activeUsers + Math.floor(Math.random() * 3 - 1)),
        services: prev.services.map((svc) =>
          svc.name === "Notification"
            ? { ...svc, status: Math.random() > 0.3 ? "ok" : "delayed" }
            : svc
        ),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [liveUpdates]);

  // Helper to render service status tag
  const renderServiceTag = (service) => {
    let color = "green";
    let icon = <CheckCircleOutlined />;
    let label = "OK";

    if (service.status === "delayed") {
      color = "orange";
      icon = <ClockCircleOutlined />;
      label = "Delayed";
    } else if (service.status === "down") {
      color = "red";
      icon = <ExclamationCircleOutlined />;
      label = "Down";
    }

    return (
      <Tag
        icon={icon}
        color={color}
        className="text-sm px-3 py-1 font-medium shadow-sm"
        key={service.name}
      >
        {service.name}: {label}
      </Tag>
    );
  };

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      {/* Header with live update toggle */}
      <div className="flex flex-wrap items-center justify-between">
        <div>
          <Title level={3}>System Health Dashboard</Title>
          <Text type="secondary">
            Monitor system performance and service status in real time.
          </Text>
        </div>
        <Tooltip title={liveUpdates ? "Pause live updates" : "Resume live updates"}>
          <Switch
            checked={liveUpdates}
            onChange={setLiveUpdates}
            checkedChildren={<SyncOutlined spin />}
            unCheckedChildren={<PauseCircleOutlined />}
          />
        </Tooltip>
      </div>

      {/* Top Stats */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Active Users" value={health.activeUsers} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Uptime" value={health.uptime} prefix={<DashboardOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="API Status"
              value={health.apiStatus}
              prefix={<ApiOutlined />}
              valueStyle={{ color: health.apiStatus === "online" ? "#16a34a" : "#dc2626" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Database"
              value={health.dbStatus}
              prefix={<DatabaseOutlined />}
              valueStyle={{ color: health.dbStatus === "online" ? "#16a34a" : "#dc2626" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Performance Metrics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card title="CPU Usage" extra={<CloudServerOutlined />}>
            <Progress
              percent={Math.round(health.cpu)}
              status={health.cpu > 85 ? "exception" : "active"}
              strokeColor={health.cpu > 85 ? "#ff4d4f" : "#1677ff"}
            />
            <Text type="secondary">Current CPU load</Text>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Memory Usage" extra={<CloudServerOutlined />}>
            <Progress
              percent={Math.round(health.memory)}
              status={health.memory > 85 ? "exception" : "active"}
              strokeColor={health.memory > 85 ? "#ff4d4f" : "#1677ff"}
            />
            <Text type="secondary">RAM utilization</Text>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Disk Usage" extra={<DatabaseOutlined />}>
            <Progress
              percent={Math.round(health.disk)}
              status={health.disk > 90 ? "exception" : "active"}
              strokeColor={health.disk > 90 ? "#ff4d4f" : "#1677ff"}
            />
            <Text type="secondary">Storage used</Text>
          </Card>
        </Col>
      </Row>

      {/* Network & Events */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="Network Latency" extra={<ThunderboltOutlined />}>
            <Statistic value={Math.round(health.networkLatency)} suffix="ms" />
            <Progress
              percent={Math.min(100, (health.networkLatency / 200) * 100)}
              showInfo={false}
              strokeColor={
                health.networkLatency < 50 ? "#52c41a" :
                health.networkLatency < 100 ? "#faad14" : "#ff4d4f"
              }
            />
            <Text type="secondary">
              {health.networkLatency < 50
                ? "Excellent"
                : health.networkLatency < 100
                ? "Moderate"
                : "High latency"}
            </Text>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="System Events">
            <div className="space-y-2">
              <Text type="secondary">Last backup: 2 hours ago</Text>
              <br />
              <Text type="secondary">Certificates: Valid</Text>
              <br />
              <Text type="secondary">Maintenance: None scheduled</Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* ✅ Prominent Services Status */}
      <Card
        title="Services Status"
        className="shadow-sm border-2 border-blue-50"
        extra={
          <Text type="secondary" className="text-xs">
            {health.services.filter(s => s.status === "ok").length}/{health.services.length} healthy
          </Text>
        }
      >
        <div className="flex gap-4 flex-wrap">
          {health.services.map(renderServiceTag)}
        </div>
      </Card>
    </div>
  );
}