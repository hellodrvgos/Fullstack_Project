import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { RootState, AppDispatch } from "../../redux/store";
import { getOrderListInfo } from "../../redux/thunks/orders";
import OrderListItem from "./OrderListItem";

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
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2, mt: -4, bgcolor: "#eee", borderRadius: 1 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function OrderList() {

    const token = localStorage.getItem("token");

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    const userId = localStorage.getItem("id") || "{}";

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getOrderListInfo(userId));
    }, [dispatch, userId]);

    const orderList = useSelector((state: RootState) => state.orderlist.orderList);

    const orderListReverse = [...orderList];
    orderListReverse.reverse();

        return (
        <Box 
            sx={{
                mx: 2,
                pt: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: "900px",
                margin: "0 auto"
            }}
        >
            <Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: 2, mb: 2 }}>
                    <Avatar sx={{ my: 4, bgcolor: "black"}}>
                        <ShoppingBagIcon />
                    </Avatar>
                    <Typography variant="h6">My Orders</Typography>
                </Box>
                {
                    token === null ?
                    <Box sx={{bgcolor: "#eee", p: 2, borderRadius: 1, minWidth: "900px"}}>
                    <Box sx={{bgcolor: "white", p: 5, borderRadius: 1}}>
                    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", minHeight: "50vh"}}>
                        <Typography>Please SIGN IN.</Typography>
                    </Box>
                    </Box>
                    </Box> :
                    orderList.length > 0 ?
                            <Box sx={{ flexGrow: 1, display: 'flex', mb: 5}}>
                                <Tabs
                                    orientation="vertical"
                                    variant="scrollable"
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="Vertical tabs example"
                                    sx={{
                                        minWidth: "70px",
                                        height: "300px",
                                        '& .MuiTabs-indicator': {
                                        bgcolor: '#eee',
                                        },
                                        '& .MuiTab-root.Mui-selected': {
                                        bgcolor: '#eee',
                                        borderRadius: "5px"
                                        },
                                    }}
                                >
                                    {
                                        orderListReverse.map((order) => {
                                            return <Tab sx={{fontSize: 16}} label={`Id: ${order._id.slice(0,6)}`} />
                                        })
                                    }
                                </Tabs>
                                {
                                    orderListReverse.map((order, index) => {
                                        return <TabPanel value={value} index={index}>
                                        <OrderListItem key={index} order={order}/>
                                        </TabPanel>
                                    })
                                }
                            </Box> :
                            <Box sx={{ flexGrow: 1, display: "flex", height: "30vh"}}>
                                <Typography>You have no orders.</Typography>
                            </Box>
                }
                </Box>
                </Box>
        )
}