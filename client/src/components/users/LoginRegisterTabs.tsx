import * as React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

type AccountState = {
  setStateAccountDrawer: Function;
  setLoginState: Function;
}

export default function LoginRegisterTabs({setStateAccountDrawer, setLoginState}: AccountState) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: "400px" }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ my: 4 }}>
          <PersonIcon />
        </Avatar>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Sign In" {...a11yProps(0)} />
          <Tab label="Create Account" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <LoginForm setStateAccountDrawer={setStateAccountDrawer} setLoginState={setLoginState}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RegisterForm setValue={setValue}/>
      </TabPanel>
    </Box>
  );
}