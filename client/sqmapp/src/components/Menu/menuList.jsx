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
  const isStudent = JSON.parse(localStorage.getItem("isStudent"))?.role;
  const isFaculty = JSON.parse(localStorage.getItem("isFaculty"))?.role;
  // console.log(isStudent)
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"))?.isAdmin;

  const [selectedKey, setSelectedKey] = useState(location.pathname);

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
  };

  return (
    <Menu mode="inline" className="menu-bar" theme="light" selectedKeys={[selectedKey]} onClick={handleMenuClick}>

      {isStudent==="student" && <>
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

        <Menu.Item key="/note" icon={<ChecklistRtlIcon />} className="custom-menu-item">
          <Link to="/note">Note</Link>
        </Menu.Item></>
      }

      {isFaculty==="faculty" && <>
        <Menu.Item key="/studentlist" icon={<GroupsIcon />} className="custom-menu-item">
          <Link to="/studentlist">Your Student</Link>
        </Menu.Item>

        <Menu.Item key="/askedquestion" icon={<QuestionAnswerIcon />} className="custom-menu-item">
          <Link to="/askedquestion">Asked Question</Link>
        </Menu.Item>

        <Menu.Item key="/askfaculty" icon={<PublicIcon />} className="custom-menu-item">
          <Link to="/askfaculty">Ask Faculty</Link>
        </Menu.Item>

        <Menu.Item key="/solvedbyyou" icon={<ChecklistRtlIcon />} className="custom-menu-item">
          <Link to="/solvedbyyou">Solved By You</Link>
        </Menu.Item>

        </>
      }

      {isAdmin && <>
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

        <Menu.Item key="/note" icon={<ChecklistRtlIcon />} className="custom-menu-item">
          <Link to="/note">Note</Link>
        </Menu.Item></>
      }   
      
    </Menu>
  );
};

export default MenuList;
