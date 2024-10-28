import React,{useMemo,useState,useEffect} from 'react'
import Sidebar from '../../Sidebar'
import { Card, Col, Row ,Form, Spinner,Button, Modal,Table} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { Collapse, Checkbox } from 'antd';
// import 'antd/dist/antd.css';

const { Panel } = Collapse;
function RoleMapping() {
const navigate=useNavigate();


const [menuData, setMenuData] = useState([
  { id: 1, name: 'Menu 1' },
  { id: 2, name: 'Menu 2', children: [{ id: 4, name: 'Submenu 2.1' }] },
  { id: 3, name: 'Menu 3', children: [{ id: 5, name: 'Submenu 3.1' }, { id: 6, name: 'Submenu 3.2' }] }
]);

const [allRoles, setAllRoles] = useState(['Admin', 'Manager', 'User']);

const [rolePermissions, setRolePermissions] = useState({
  'Admin': { 1: { add: false, delete: false, update: false, read: false }, 2: { add: false, delete: false, update: false, read: false }, 3: { add: false, delete: false, update: false, read: false }, 4: { add: false, delete: false, update: false, read: false }, 5: { add: false, delete: false, update: false, read: false }, 6: { add: false, delete: false, update: false, read: false } },
  'Manager': { 1: { add: false, delete: false, update: false, read: false }, 2: { add: false, delete: false, update: false, read: false }, 3: { add: false, delete: false, update: false, read: false }, 4: { add: false, delete: false, update: false, read: false }, 5: { add: false, delete: false, update: false, read: false }, 6: { add: false, delete: false, update: false, read: false } },
  'User': { 1: { add: false, delete: false, update: false, read: false }, 2: { add: false, delete: false, update: false, read: false }, 3: { add: false, delete: false, update: false, read: false }, 4: { add: false, delete: false, update: false, read: false }, 5: { add: false, delete: false, update: false, read: false }, 6: { add: false, delete: false, update: false, read: false } }
});

const handleMenuCheckboxChange = (role, menuId, checked) => {
  const updatedPermissions = { ...rolePermissions[role] };
  const menuPermission = updatedPermissions[menuId];
  menuPermission.add = checked;
  menuPermission.delete = checked;
  menuPermission.update = checked;
  menuPermission.read = checked;

  if (menuData.find(menu => menu.id === menuId)?.children) {
    menuData.find(menu => menu.id === menuId)?.children.forEach(subMenu => {
      updatedPermissions[subMenu.id] = {
        add: checked,
        delete: checked,
        update: checked,
        read: checked
      };
    });
  }

  setRolePermissions(prevPermissions => ({
    ...prevPermissions,
    [role]: updatedPermissions
  }));
};

const handleSubMenuCheckboxChange = (role, menuId, checked) => {
  const updatedPermissions = { ...rolePermissions[role] };
  const submenuPermission = updatedPermissions[menuId];
  submenuPermission.add = checked;
  submenuPermission.delete = checked;
  submenuPermission.update = checked;
  submenuPermission.read = checked;

  setRolePermissions(prevPermissions => ({
    ...prevPermissions,
    [role]: updatedPermissions
  }));
};

const handlePermissionCheckboxChange = (role, menuId, action, checked) => {
  setRolePermissions(prevPermissions => ({
    ...prevPermissions,
    [role]: {
      ...prevPermissions[role],
      [menuId]: {
        ...prevPermissions[role][menuId],
        [action]: checked
      }
    }
  }));
};

const handleRoleCheckboxChange = (role, checked) => {
  const updatedPermissions = { ...rolePermissions };
  Object.keys(updatedPermissions[role]).forEach(menuId => {
    updatedPermissions[role][menuId].add = checked;
    updatedPermissions[role][menuId].delete = checked;
    updatedPermissions[role][menuId].update = checked;
    updatedPermissions[role][menuId].read = checked;
  });
  setRolePermissions(updatedPermissions);
};

const handleSubmit = () => {
  console.log('Role permissions:', rolePermissions);
  // You can add your logic to submit the data to the server here
};


  return (
   <>
   <Card
              className="border-0 p-3 m-4"
           
              style={{ boxShadow: "0px 0px 2px 2px rgba(176,195,212,1)" }}
 
            >
              <p className='pg-label m-0'>Role Menu Mapping</p>
              <hr />




              <div>
            <Collapse accordion style={{backgroundColor:"#005bab"}}>
                {allRoles.map(role => (
                    <Panel header={role} key={role}>
                        <div class="d-flex">
                          <div>
                            <Checkbox checked={Object.values(rolePermissions[role]).every(perm => perm.add && perm.delete && perm.update && perm.read)} onChange={(e) => handleRoleCheckboxChange(role, e.target.checked)}>
                              Select All
                              </Checkbox>
                          </div>
                          <div className='mx-4 d-flex'>
                            {menuData.map(menuItem => (
                                <div key={`${role}-${menuItem.id}`} className='mx-3'>
                                    <Checkbox checked={rolePermissions[role]?.[menuItem.id]?.add && rolePermissions[role]?.[menuItem.id]?.delete && rolePermissions[role]?.[menuItem.id]?.update && rolePermissions[role]?.[menuItem.id]?.read} onChange={(e) => handleMenuCheckboxChange(role, menuItem.id, e.target.checked)}>
                                        {menuItem.name}
                                    </Checkbox>
                                    {menuItem.children && menuItem.children.map(submenuItem => (
                                        <div key={`${role}-${submenuItem.id}`} style={{ marginLeft: '20px' }}>
                                            <Checkbox checked={rolePermissions[role]?.[submenuItem.id]?.add && rolePermissions[role]?.[submenuItem.id]?.delete && rolePermissions[role]?.[submenuItem.id]?.update && rolePermissions[role]?.[submenuItem.id]?.read} onChange={(e) => handleSubMenuCheckboxChange(role, submenuItem.id, e.target.checked)}>
                                                {submenuItem.name}
                                            </Checkbox>
                                        </div>
                                    ))}
                                </div>
                                                    ))}
                          </div>
                        </div>
                    </Panel>
                ))}
            </Collapse>
           <Row className='mt-3 text-center'>
            <Col>
            
                <Button variant='' className='add-Btn' onClick={handleSubmit}>Submit</Button>
            </Col>
           </Row>
        </div>

</Card>
   </>
  )
}

export default RoleMapping