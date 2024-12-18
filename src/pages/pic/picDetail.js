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
import Icon from "@mui/material/Icon";
import { useNavigate, useParams } from "react-router-dom";

function PicDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [noAuth, setNoAuth] = useState(false);

  useEffect(async () => {
    getEventData();
  }, [])

  async function getEventData() {
    try {
      const url = `${Helper.host}/restAPI/articleController.php?action=getArticle&id=${id}`;
      const res = await axios.get(url, Helper.hostHeaders);
      if (res.data.result) {
        setArticle(res.data.result);
      } else {
        throw new Error(res.data.message);
      }
    } catch (e) {
      if (e.response && e.response.data.code == 403) {
        setNoAuth(true);
      }
      setArticle({})
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
                    {article.article_title}
                  </MKTypography>
                  <MKTypography variant="body2" color="white" opacity={0.8}>
                    {article.article_date}
                  </MKTypography>
                </MKBox>
                <MKBox p={{ xs: 1, md: 6 }} pt={{ xs: 0, md: 2 }}>
                  <Grid container sx={{ mt: 0 }}>
                    <Grid item xs={12} md={12}>
                      <MKBox p={6} hidden={!noAuth}>
                        <MKTypography variant="body2" color="grey" opacity={0.8}>
                          您无权查看本页面
                        </MKTypography>
                      </MKBox>
                      <MKBox p={{ xs: 3, md: 6 }} hidden={noAuth}>
                        <div className="quote">
                          <Icon fontSize="large">format_quote</Icon>
                          <div>{article.article_description}</div>
                        </div>
                        <div className="articleWrap" dangerouslySetInnerHTML={{ __html: article.article_content }}></div>
                      </MKBox>
                    </Grid>
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

export default PicDetailPage;
