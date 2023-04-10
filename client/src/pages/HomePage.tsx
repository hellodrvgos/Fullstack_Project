import { Carousel } from 'antd';
import Box from '@mui/material/Box';

import "../App.css";
import ProductList from "../components/products/ProductList";
import Dog from "../assets/bestiesdog.mp4";
import Cat from "../assets/bestiescat.mp4";


const contentStyle: React.CSSProperties = {
  height: '600px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

export default function HomePage() {

  return <div>
    <Box sx={{ mt: 8, bgcolor: "whitesmoke"}}>
      <Box sx={{bgcolor: "black"}}>
        <Box sx={{width: "90%", mx: "auto", bgcolor: "black", height: "600px"}}>
          <Carousel autoplay effect="fade" speed={10000} dotPosition="right">
            <div>
            <video autoPlay loop muted id='video'>
            <source src={Dog} type='video/mp4' />
            </video>
            </div>
            <div>
            <video autoPlay loop muted id='video'>
              <source src={Cat} type='video/mp4' />
            </video>
            </div>
          </Carousel>
        </Box>
      </Box>
      <Box sx={{ margin: "0 auto"}}>
        <ProductList/>
      </Box>
    </Box>
  </div>
}