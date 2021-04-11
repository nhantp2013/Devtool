import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import { CardActionArea } from "@material-ui/core";



const useStyles = makeStyles({
  root: {
    minWidth: 300,
    boxShadow: '0 3px 5px 2px rgba(51,51,51,0.2)',

  },
  customGrid: {
    flexGrow: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  pos: {
    textAlign: "right",
    verticalAlign: "top",
  },
  CardActionArea: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  },
});


export default function OutlinedCard() {
  const classes = useStyles();

  const [Room, setRoom] = useState([]);

  const [open, setOpen] = useState(false);


  useEffect(() => {
    async function fetching() {
      try {
        const response = await fetch('http://localhost:1337/rooms');
        const responseJson = await response.json();
        console.log({ responseJson });

        const data = responseJson;

        console.log(data);

        setRoom(data);

      }
      catch (err) {
        console.log('opps! somthing wrong', err);
      }
    }

    fetching();
  }, []);

  return (
    <div style={{ marginTop: 5, padding: 5 }} spacing={3}>
      <p className={classes.title}>Single Room</p>
      <Grid container spacing={2} className={classes.customGrid} style={{ marginTop: 5, padding: 5 }} >
        <Grid container item>
          {Room.map((room,i) => (
            <Card key={i} className={classes.root} variant="outlined" spacing={3} style={{ marginLeft: 20 }}>
              {room.Status === 'Available' ?

                // check room is available 
                <CardActionArea className={classes.CardActionArea}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                      variant="h5"
                    >
                     
                      {room.RoomID}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary" variant="contained">
                      {room.Status}
                    </Typography>


                    <Typography variant="body2" component="h2">
                      {room.customer ? <p>{room.customer._id}</p> : <p>Free Room</p>}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                :
                // =========== check-out room
                <CardActionArea>
                  <CardContent>

                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                      variant="h5"
                    >
                      {room.RoomID}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary" variant="contained">
                      {room.Status}
                    </Typography>

                    <Typography variant="body2" component="h2">

                      {room.customer ? <p>{room.customer.FullName}</p> : <p>2</p>}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              }
              <CardActions>
                <Button size="small" >Check In</Button>
              </CardActions>
            </Card>
          ))}
        </Grid>



      </Grid>

    </div>
  );
}