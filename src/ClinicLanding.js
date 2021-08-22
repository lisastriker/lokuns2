import { Typography, Button } from "@material-ui/core"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
function ClinicLanding(){
  let url = new URL(window.location.href);
  console.log(window.location.href)
  const id = url.searchParams.get("id"); // "foo"
  return(
    <Card >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          bullet
        </Typography>
        <Typography  color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default ClinicLanding