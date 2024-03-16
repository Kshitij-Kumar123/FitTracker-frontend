import './App.css';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./components/Home.js";
import ErrorPage from './components/ErrorPages/ErrorPage.js';
import ForbiddenPage from './components/ErrorPages/ForbiddenPage.js';
import Activities from './components/Activities.js';
import { Breadcrumb, Layout, Menu, theme, Grid } from 'antd';
import { useAuth0 } from "@auth0/auth0-react";
import Dashboard from './components/Dashboard.js';
import ActivityInfo from './components/ActivityInfo.js';
import { Outlet, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import { Affix, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import CalorieTracking from './components/CalorieTracking.js';
import CalorieDashboard from './components/CalorieDashboard.js';
import WeightTracking from './components/WeightTracking.js';



const { Header, Content, Footer } = Layout;
const { useBreakpoint } = Grid;

const PrivateRoutes = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to={loginWithRedirect()} />;
  }
}

function App() {
  const { xs } = useBreakpoint();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = (e) => {
    e.preventDefault();
    logout({ returnTo: window.location.origin });
  };

  const menuItems = [
    { key: 'home', link: '/', label: 'Home' },
    { key: 'activities', link: '/activities', label: 'Activities' },
    { key: 'dashboard', link: '/activities-dashboard', label: 'Dashboard' },
    { key: 'calorieTracking', link: '/calorie-tracking', label: 'calorieTracking' },
    { key: 'calorieDashboard', link: '/calorie-dashboard', label: 'calorieDashboard' },
    { key: 'weightTracking', link: '/weight-tracking', label: 'weightTracking' },
  ].map(item => (
    <Menu.Item key={item.key}>
      <Link to={item.link}>{item.label}</Link>
    </Menu.Item>
  ));

  // Generate breadcrumb items dynamically based on current page
  const breadcrumbItems = location.pathname.split('/').filter(Boolean).map((path, index, paths) => (
    <Breadcrumb.Item key={index}>{path.charAt(0).toUpperCase() + path.slice(1)}</Breadcrumb.Item>
  ));

  return (
    <Layout>
      <Header style={{ display: 'flex', height: "100%", alignItems: 'center' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[location.pathname]}
          style={{ flex: 1, minWidth: 0 }}
        >
          {menuItems}
        </Menu>
        {!isLoading && isAuthenticated ? (
          <div key="signout" onClick={handleSignOut} style={{ display: 'flex', alignItems: 'center' }}>
            <img src={user.picture} alt={user.name} style={{ height: "40px", marginTop: 0, marginRight: 10 }} />
            <div>
              <a style={{ marginLeft: 10, color: "white" }} onClick={(e) => handleSignOut(e)}>
                Sign Out
              </a>
            </div>
          </div>
        ) : (
          <div key="signin">
            <a style={{ marginLeft: 10, color: "white" }} href="/#" onClick={(e) => loginWithRedirect()}>
              Sign In
            </a>
          </div>
        )}
      </Header>
      <Content style={{ padding: xs ? "0px 16px" : "0px 48px" }} theme="dark">
        <Breadcrumb style={{ margin: '16px 0' }}>
          {breadcrumbItems}
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/activities" element={<Activities />} />
              <Route path="/activities-dashboard" element={<Dashboard />} />
              <Route path="/info/*" element={<ActivityInfo />} />
              <Route path="/calorie-tracking" element={<CalorieTracking />} />
              <Route path="/calorie-dashboard" element={<CalorieDashboard/>} />
              <Route path="/weight-tracking" element={<WeightTracking/>} />
            </Route>
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/forbidden" element={<ForbiddenPage />} />
          </Routes>
        </div>
      </Content>
      <Affix offsetBottom={16}>
        <Button type="primary" style={{ float: "right", borderRadius: 50, margin: 16 }} onClick={() => navigate("/activities")}>
          <PlusOutlined /> Activities
        </Button>
      </Affix>
      <Footer style={{ textAlign: 'center' }}>
        Kshitij Kumar ©{new Date().getFullYear()} Fitness App
      </Footer>
    </Layout>
  );
}

export default App;
