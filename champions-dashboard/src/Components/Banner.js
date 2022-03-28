import { Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  banner: {
    background:
      "linear-gradient(rgba(0,0,0,0.025),rgba(0,0,0,0)),url(./banner.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "500px",
    width: "100%",
    backgroundPosition: "bottom",
  },

  bannerContent: {
    paddingTop: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));

function Banner() {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontFamily: "Montserrat",
              fontSize: { xs: "32px", sm: "38px", md: "45px" },
            }}
          >
            Champions Dashboard
          </Typography>
          <Typography
            sx={{
              color: "whitesmoke",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
              fontSize: { xs: "18px", sm: "20px", md: "22px" },
            }}
            className="bannerInfo"
          >
            Get all the Info regarding your favorite Champions
          </Typography>
        </div>
      </Container>
    </div>
  );
}

export default Banner;
