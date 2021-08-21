import { Typography } from "@material-ui/core"

function ClinicLanding(){
  let url = new URL(window.location.href);
  console.log(window.location.href)
  const id = url.searchParams.get("id"); // "foo"
  return(
    <Typography>{id}</Typography>
  )
}

export default ClinicLanding