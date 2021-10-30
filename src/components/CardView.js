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
            className="cardStyle"
                sx={{
                    boxShadow: 1,
                    flex: "1 0 auto",
                    margin: props.margin || 3 ,
                    width: props.width || 450,
                    minHeight: 300
                }}>
                <CardMedia
                    component="img"
                    height={props.imageHeight||"140"}
                    image={props.image}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
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