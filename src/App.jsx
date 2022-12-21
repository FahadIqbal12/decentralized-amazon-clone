import React,{useState,useEffect} from 'react';
import { Stack, Typography, AppBar, Toolbar, TextField, Button,IconButton,Modal } from '@mui/material';
import { Search,PersonalVideo,SportsEsports,DirectionsBike,PhotoCamera,Headphones,PhoneIphone,Watch,LocalGroceryStore,Public,ViewInAr,LocalShipping,Inventory2,Commute,TaskAlt } from '@mui/icons-material';
import Product from './components/product';
import items from './components/items';
import { ethers } from 'ethers';
import { abi,contractAddress,provider } from './contract/interaction';

const App = () => {
const [open,setOpen] = useState(false)
const [name,setName] = useState('');
const {des,setDes} = useState('');
const [img,setImg] = useState('');
  const [price, setPrice] = useState(0);
  const [seller,setSeller] = useState('')
  const [wallet, walletConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [allOrders,setAllOrders] = useState([])
  const Provider = new ethers.providers.Web3Provider(window.ethereum);  
  
  const connectWallet  = async () => {
    try {
      await Provider.send("eth_requestAccounts", []);
      walletConnected(true);
      const Signer = Provider.getSigner();
       const getAddress = await Signer.getAddress();
      console.log(getAddress)
      setAddress(getAddress)
    } catch (error) {
      console.log(error)
    }
  }

  const buyItem = async () => {
    const Signer = Provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, Signer);
    let overrides = {
      value: ethers.utils.parseEther(price)
    }
    
    try {
      await contract.buyItem(seller, address, overrides.value, name, overrides);
      alert('Item Purchased');
      setOpen(false)
    } catch (error) {
      console.log(error)
    }
   
  }

  const orders =async () => {
    const Signer = Provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, Signer);
    const order = await contract.queryFilter('productBought');
    setAllOrders(order);
    
  }

  const [openOrder,setOpenOrder] = useState(false)

  const ordersModal = () => {
    return (
      <Modal open={openOrder} onClose={()=>setOpenOrder(false)} sx={{m:30}}>
        <Stack sx={{backgroundColor:'#000',borderRadius:10}}>
          <Typography sx={{ color: '#fff', fontWeight: 'bold', m: 3 }}>Purchased Items:</Typography>
          {allOrders.map((itm, index) => {
           
            return (
              <Stack key={index}  sx={{ m: 2 }}>
                
                <Typography sx={{ color: '#fff' }}>Item : {itm.args.productName}</Typography>
                <Typography sx={{ color: '#fff' }}>Seller Add : {itm.args.seller}</Typography>
                <hr style={{width:'100%'}}/>
              </Stack>
              
            )
          
          })}
        </Stack>
      </Modal>
    )
  }




  const showModal = () => {
    return (
      
      <Modal open={open} onClose={() => setOpen(false)} sx={{ m:10,ml:40,mr:40}}>
      <Stack flexDirection={'row'} sx={{ backgroundColor: '#fff',borderRadius:10}}>
        <img src={img} style={{width:350,height:'auto',margin:20}}/>
        <Stack sx={{ml:20,mt:2}}>
        <Typography variant='h3' sx={{ color: '#000',}}>{name}</Typography>
        <Stack flexDirection={'row'} sx={{width:200,mt:2}}>
        <IconButton size='large' sx={{flexDirection:'column'}}>
          <LocalShipping/>
          <Typography sx={{color:'#0091D5',width:90}}>Free Shipping</Typography>
        </IconButton>
        <IconButton size='large' sx={{flexDirection:'column'}}>
          <Inventory2/>
          <Typography sx={{color:'#0091D5',width:90}}>7 day replacement</Typography>
        </IconButton>
        <IconButton size='large' sx={{flexDirection:'column'}}>
          <Commute/>
          <Typography sx={{color:'#0091D5',width:90}}>Amazon delivered</Typography>
        </IconButton>
        <IconButton size='large' sx={{flexDirection:'column'}}>
          <TaskAlt/>
          <Typography sx={{color:'#0091D5',width:90}}>Warranty Policy</Typography>
        </IconButton>
        
        </Stack>
        <Typography variant='h5' sx={{color:'#000',mt:5}}>Price:</Typography>
<Typography variant='h2' sx={{fontWeight:'bold',}}>{price} ETH</Typography>
<Button sx={{backgroundColor:'#FA8900',width:300,mt:3,mb:3}} onClick={()=>{buyItem()}}><Typography sx={{color:'#000'}} >Buy Now</Typography></Button>
      </Stack>
      </Stack>
      </Modal>
      
    )
    
  }
  useEffect(() => {
    connectWallet();
    orders();
  })

  return (
    <Stack>
     
      <AppBar sx={{backgroundColor:'#D5D5D5'}}>
        <Toolbar>
         
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png' style={{ width: 100, height: 'auto', marginLeft: 20 }} />
          <TextField placeholder='Search ..' sx={{ ml: 20, width: '30%' }} />
         <IconButton   size="large"
            color="inherit"
            sx={{borderRadius:0,backgroundColor:'#000',borderTopRightRadius:10,borderBottomRightRadius:10,height:55 }}><Search/></IconButton>
          <Button sx={{ml:10}} onClick={()=>{setOpenOrder(true)}}><Typography>Orders</Typography></Button>
          <Typography sx={{ color: '#000', ml: { md: 30 } }}>Address: {address}</Typography>
          
        </Toolbar>
      </AppBar>
      <Stack sx={{m:10,}}>
        <Stack sx={{borderRadius:10}}>
          <img src='https://m.media-amazon.com/images/W/WEBP_402378-T1/images/S/stores-image-uploads-eu-prod/a/AmazonStores/A21TJRUUN4KGV/07a999774ac95e5e2ff49e880c508767.w3000.h600._CR0%2C0%2C3000%2C600_SX1500_.jpg' style={{borderRadius:20,height:300}} />
        </Stack>

        <Typography sx={{fontWeight:'bold',mt:5,fontSize:25}}>Categories:</Typography>
        <Stack flexDirection={'row'}>
          <IconButton size='large' sx={{ backgroundColor: '#D5D5D5', borderRadius: 2, width: 55, height: 55 }}><PersonalVideo sx={{color:'#000'}}/></IconButton>
          <IconButton size='large' sx={{ backgroundColor: '#D5D5D5', borderRadius: 2, width: 55, height: 55, ml: 3 }}><SportsEsports sx={{color:'#000'}} /></IconButton>
          <IconButton size='large' sx={{ backgroundColor: '#D5D5D5', borderRadius: 2, width: 55, height: 55, ml: 3 }}><DirectionsBike sx={{color:'#000'}}/></IconButton>
          <IconButton size='large' sx={{ backgroundColor: '#D5D5D5', borderRadius: 2, width: 55, height: 55, ml: 3 }}><PhotoCamera sx={{color:'#000'}}/></IconButton>
          <IconButton size='large' sx={{ backgroundColor: '#D5D5D5', borderRadius: 2, width: 55, height: 55,ml:3 }}><Headphones sx={{color:'#000'}}/></IconButton>
          <IconButton size='large' sx={{ backgroundColor: '#D5D5D5', borderRadius: 2, width: 55, height: 55,ml:3 }}><PhoneIphone sx={{color:'#000'}}/></IconButton>
          <IconButton size='large' sx={{ backgroundColor: '#D5D5D5', borderRadius: 2, width: 55, height: 55,ml:3 }}><Watch sx={{color:'#000'}}/></IconButton>
          <IconButton size='large' sx={{ backgroundColor: '#D5D5D5', borderRadius: 2, width: 55, height: 55,ml:3 }}><LocalGroceryStore sx={{color:'#000'}}/></IconButton>
          <IconButton size='large' sx={{ backgroundColor: '#D5D5D5', borderRadius: 2, width: 55, height: 55, ml: 3 }}><Public sx={{color:'#000'}}/></IconButton>
          <IconButton size='large' sx={{ backgroundColor: '#D5D5D5', borderRadius: 2, width: 55, height: 55,ml:3 }}><ViewInAr sx={{color:'#000'}}/></IconButton>
         
        </Stack>

        <Typography sx={{color:'#000',fontSize:25,mt:5,fontWeight:'bold'}}>Latest Deals:</Typography>
        <Stack flexDirection={'row'}>
        {items.map((items,index)=>{
          return(
          <Button sx={{ width: 250 }} key={index} 
          onClick={() => { 
            setOpen(true);
            setName(items.name);
            setSeller(items.seller)
            setPrice(items.price);
            setImg(items.img)
            }}>
          <Product
            img={items.img}
            description={items.name}
            price={items.price}
          />
          </Button>
          )
        })}
          
         
          {ordersModal()}
          {showModal()}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default App;
