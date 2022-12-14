import React, {useState, useEffect} from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import WebFont from 'webfontloader';





function BookCard({bookObject,id, front, title, author, genre, back, pages, price, firstPublished, handleClick, addToCart, isInCart, handleAddToDom, giftCardTotal, setGiftCardTotal, handleGiftCardTotal}) {

    

    const [displayInfo, setDisplayInfo]= useState(true)
    const [displayInCart, setDisplayInCart] = useState(isInCart)
    
    function handleClick(){
        setDisplayInfo(!displayInfo)
    }
    // function handleGiftCardTotal(){
    //     if(giftCardTotal > 0)
    //     setGiftCardTotal(giftCardTotal - bookObject.price)
    // }
    function addToCart(){
        setDisplayInCart(!displayInCart)
        
        fetch(`http://localhost:3000/books/${id}`,
        {
        method:"PATCH",
        headers:{"Content-Type":"application/json",
        },
        body:JSON.stringify({isInCart: !bookObject.isInCart,}),
        }
        )
        .then((r)=>r.json())
        .then((updatedItem)=> handleAddToDom(updatedItem));
    }
    useEffect(() => {
        WebFont.load({
          google: {
            families: ['Noto Serif Oriya']
          }
        });
       }, []);



        
    return (

        <div className="book-item" sx={{display: "flex", justifyContent: "center"}}>
            <Card sx={{ maxHeight: 540, maxWidth: 200, padding: 5, margin: 5, background: "#8A0505", borderRadius: 10, border: "5px solid #b14848" }}>
      <CardActionArea>
        <CardMedia  
          sx={{ borderRadius: 5}}  
          border= "5px solid #b14848"  
          component="img"
          height="300"
          onClick={handleClick}
          image={displayInfo ? front : back }
          alt={title}
        />
        <CardContent>
           <Typography>
                <Typography gutterBottom variant="h5" component="div" fontSize={16} fontFamily="Noto Serif Oriya">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontFamily="Noto Serif Oriya">
                    Author: {author}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontFamily="Noto Serif Oriya">
                    Genre: {genre}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontFamily="Noto Serif Oriya">
                    Page Count: {pages}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontFamily="Noto Serif Oriya">
                    First Published: {firstPublished}
                </Typography>
            </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button sx={{border: "2px solid #20dfe6"}} size="small" color="primary" 
        value={bookObject} 
        onClick={()=> {addToCart()}
        }>{displayInCart ? "Remove from cart" : "Add to cart"}          
        </Button>
        {/* <Button sx={{border: "2px solid #20dfe6"}} size="small"   color="primary" value={bookObject} 
        onClick={()=>{
            handleGiftCardTotal() 
            alert('Thank you for your purchase!')
        }
        }>Buy for ${price}          
        </Button>      */}
      </CardActions>
    </Card>
        </div>
    )
}

export default BookCard



