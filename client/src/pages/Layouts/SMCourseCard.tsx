import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

 
type SMCourseCardProps = {
    image: any,
    name: string,
    duration: any,
    content: any,
}

export default function SMCourseCard(props: SMCourseCardProps) {
    const {image, name, duration, content} = props;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {name}
          </Typography>
          <Typography variant="caption" component="div">
            {duration}
          </Typography>
          <Typography variant="body2" color="text.secondary">
{content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Quizzes
        </Button>
        <Button size="small" color="primary">
          Assessments
        </Button>
      </CardActions>
    </Card>
  );
}
