import './App.css';
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home.js"
import ErrorPage from './components/ErrorPages/ErrorPage.js';
import ForbiddenPage from './components/ErrorPages/ForbiddenPage.js';
import Activities from './components/Activities.js';
import { Breadcrumb, Layout, Menu, theme, Grid } from 'antd';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './components/authComponents/Login.js';
import LogoutButton from './components/authComponents/Login.js';
import { UserOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Dashboard from './components/Dashboard.js';
import ActivityInfo from './components/ActivityInfo.js';

const { Header, Content, Footer } = Layout;
const { useBreakpoint } = Grid;

function App() {
  const { xs } = useBreakpoint();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  let items = new Array(4).fill(null).map((_, index) => ({
    key: index + 1,
    label: `nav ${index + 1}`,
  }));

  const { user, isAuthenticated, isLoading } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();


  const handleSignIn = (e) => {
    e.preventDefault();
    loginWithRedirect();
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    logout({ logoutParams: { returnTo: window.location.origin } })
  };



  return (
    <Layout>
      <Header style={{ display: 'flex', height: "100%", alignItems: 'center' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
        {!isLoading && isAuthenticated ? (
          <div key="signout" onClick={handleSignOut} style={{ display: 'flex', alignItems: 'center' }}>
            <img src={user.picture} alt={user.name} style={{ height: "40px", marginTop: 0, marginRight: 10 }} />
            <div><a style={{ marginLeft: 10, color: "white" }}>
            </a>
              <a style={{ marginLeft: 10, color: "white" }} onClick={(e) => handleSignOut(e)}>
                Sign Out
              </a>
            </div>
          </div>
        ) : (
          <div key="signin" onClick={handleSignIn}>
            <a style={{ marginLeft: 10, color: "white" }} onClick={(e) => handleSignIn(e)}>
              Sign In
            </a>
          </div>
        )}
      </Header>
      <Content style={{ padding: xs ? "0px 16px" : "0px 48px" }} theme="dark">
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
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
            <Route path="/activities" element={<Activities />} />
            <Route path="/activities-dashboard" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/info/*" element={<ActivityInfo />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/forbidden" element={<ForbiddenPage />} />
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Kshitij Kumar ©{new Date().getFullYear()} Fitness App
      </Footer>
    </Layout>
  );
}

export default App;
