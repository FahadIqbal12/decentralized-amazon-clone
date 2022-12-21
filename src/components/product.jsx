import React from 'react';
import { Button, Typography,Stack } from '@mui/material';

const Product = (props) => {
  var sellerAddress = props.seller;
    return (
       
            
            <Stack sx={{ alignItems:'center'}}>
              <img src={props.img} style={{ width: 200, height: 'auto' }} />
                <Typography sx={{ color: '#000', mt: 1 }}>{props.description}</Typography>
                <Typography sx={{ color: '#000', mt: 1, fontSize: 30, fontWeight: 'bold' }}>{props.price} ETH</Typography>
            </Stack>
            
         
    )
}
export default Product;