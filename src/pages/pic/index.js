import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";
import 'style/css.css'
import routes from "routes";
import axios from "axios";
import Helper from "helper";
import PicCell from "components/PicCell";

function PicPage() {
  const [articleList, setarticleList] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState({});

  useEffect(async () => {
    getListData();
  }, [])

  async function getListData() {
    try {
      const url = `${Helper.host}/restAPI/articleController.php?action=getArticleList`;
      const res = await axios.get(url, Helper.hostHeaders);
      if (res.data.result) {
        setarticleList(res.data.result);
        setSelectedEvent(res.data.result[0]);
      } else {
        throw new Error(res.data.message);
      }
    } catch (e) {

    }
  }

  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={false}
        sticky
      />
      <MKBox component="section" pt={20} pb={3}>
        <Container>
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <Card>
                <MKBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  p={3}
                  mt={-3}
                  mx={2}
                >
                  <MKTypography variant="h3" color="white">
                    活动照片
                  </MKTypography>
                  <MKTypography variant="body2" color="white" opacity={0.8}>
                    请点击相关的活动查看相关活动照片
                  </MKTypography>
                </MKBox>
                <MKBox p={{ xs: 3, md: 6 }} pt={{ xs: 0, md: 2 }}>
                  <Grid container spacing={3} sx={{ mt: 3 }}>
                    {articleList && articleList.length > 0 && articleList.map(x => {
                      return (
                        <Grid item xs={12} md={6} lg={4} key={x.article_id}>
                          <MKBox mt={3}>
                            <PicCell 
                            title={x.article_title}
                            date={x.article_date}
                            action={`/pic/detail/${x.article_id}`}
                            image={x.article_img}
                            description={x.article_description}
                            />
                          </MKBox>
                        </Grid>
                      )
                    })}
                  </Grid>
                </MKBox>
              </Card>
            </Grid>
          </Grid>

        </Container>
      </MKBox>
      <MKBox p={{ xs: 2, md: 4 }}>
        <SimpleFooter />
      </MKBox>
    </>
  );
}

export default PicPage;
