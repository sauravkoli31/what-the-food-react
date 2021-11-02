import React from 'react'
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography
} from '@mui/material';

function CardView(props) {

    return (
        <div>
            <Card
            className="curved-edges"
                sx={{
                    boxShadow: 1,
                    flex: "1 0 auto",
                    margin: props.margin || 3 ,
                    width: props.width,
                    backgroundColor: props.backgroundColor || "rgba(255, 255, 255, 0.35)"
                    // minHeight: 300
                }}>
                {props.image && 
                <CardMedia
                    component="img"
                    height={props.imageHeight||"140"}
                    image={props.image}
                    alt="green iguana"
                />
                }                    
                <CardContent style={{flexDirection:"row"}}>
                    <Typography variant="h4" component="div" fontWeight={600}>
                        {props.title} 
                    </Typography>
                    <Typography variant="body2" component="div" color="text.secondary">
                        {props.description}
                    </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "center" }}>
                    {props.children}
                </CardActions>
            </Card>
        </div>
    )
}

export default CardView