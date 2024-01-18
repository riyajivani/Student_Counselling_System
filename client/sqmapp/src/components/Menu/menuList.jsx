import { useState } from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PublicIcon from '@mui/icons-material/Public';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import './menuList.css';

const MenuList = () => {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname);

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
  };

  return (
    <Menu mode="inline" className="menu-bar" theme="light" selectedKeys={[selectedKey]} onClick={handleMenuClick}>
      <Menu.Item key="/groupprofile" icon={<GroupsIcon />} className="custom-menu-item">
        <Link to="/groupprofile">Group Profile</Link>
      </Menu.Item>

      <Menu.SubMenu key="questions" icon={<QuestionAnswerIcon />} title="Questions" className="custom-menu-item">
        <Menu.Item key="/myquestion">
          <Link to="/myquestion">My Questions</Link>
        </Menu.Item>
        <Menu.Item key="/askmentor">
          <Link to="/askmentor">Ask Mentor</Link>
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.Item key="/publicquestion" icon={<PublicIcon />} className="custom-menu-item">
        <Link to="/publicquestion">Public Questions</Link>
      </Menu.Item>

      <Menu.SubMenu key="important" icon={<ChecklistRtlIcon />} title="Important" className="custom-menu-item">
        <Menu.Item key="/note">
          <Link to="/note">Note</Link>
        </Menu.Item>
        <Menu.Item key="/todo">
          <Link to="/todo">To Do</Link>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default MenuList;
