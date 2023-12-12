import React from "react";

import { useEffect, useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
//button
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
//accordion
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
//switch
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";
//select
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
//textfield
import TextField from "@mui/material/TextField";
//App Bar
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
//card
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Fullscreen, WidthFull } from "@mui/icons-material";
//bootstrap textarea
import Form from "react-bootstrap/Form";
//upload

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
//Radio Group
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
//checkbox
import Checkbox from "@mui/material/Checkbox";
//datagrid
import { DataGrid, jaJP } from "@mui/x-data-grid";
//
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";

const BlogList = () => {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/blog");
        // console.log(response.data);
        setBlog(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const existingTheme = useTheme();

  const theme = useMemo(
    () => createTheme({}, jaJP, existingTheme),
    [existingTheme]
  );

  const columns = [
    {
      field: "id",
      headerName: "番号",
      type: "number",
      width: 50,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "image",
      headerName: "写真",
      width: 160,
      renderCell: (params) => (
        <img
          src={params.row.image}
          alt=""
          width={params.row.imageWidth}
          height={params.row.imageHeight}
        />
      ),
    },
    {
      field: "post_date",
      headerName: "投稿日時",
      type: "text",
      width: 120,
      renderCell: (params) => (
        <Link to={`/update-blog?id=${params.row._id}`}>{params.value}</Link>
      ),
    },
    {
      field: "contributor",
      headerName: "投稿者",
      type: "text",
      width: 120,
      renderCell: (params) => (
        <Link to={`/update-blog?id=${params.row._id}`}>{params.value}</Link>
      ),
    },
    {
      field: "category",
      headerName: "カテゴリー",
      type: "text",
      width: 160,
      renderCell: (params) => (
        <Link to={`/update-blog?id=${params.row._id}`}>{params.value}</Link>
      ),
    },
    {
      field: "title_character",
      headerName: "タイトル",
      type: "text",
      width: 220,
      renderCell: (params) => (
        <Link to={`/update-blog?id=${params.row._id}`}>{params.value}</Link>
      ),
    },
    {
      field: "coupon",
      headerName: "クーポン",
      type: "text",
      width: 400,
      renderCell: (params) => (
        <Link to={`/update-blog?id=${params.row._id}`}>{params.value}</Link>
      ),
    },
    {
      field: "post_text",
      headerName: "記事",
      type: "text",
      width: 450,
      renderCell: (params) => (
        <Link to={`/update-blog?id=${params.row._id}`}>{params.value}</Link>
      ),
    },
  ];

  const rows = blog.map((item, index) => ({
    id: index + 1,
    image: item.uploadImage,
    post_date: item.post_date,
    contributor: item.contributor,
    title_character: item.title_character,
    coupon: item.coupon,
    post_text: item.post_text,
    category: item.category,
    imageWidth: 100,
    imageHeight: 100,
    _id: item._id,
  }));

  const navigate = useNavigate();
  const addBlog = () => {
    navigate("/add-blog");
  };

  return (
    <>
      <div className="container-xl min-h-screen">
        <div className="flex justify-center pt-6">
          <Box>
            <Button variant="contained" className="w-48 py-2" onClick={addBlog}>
              ブログ追加
            </Button>
          </Box>
        </div>
        <div className="px-12 pt-16 max-md:px-0">
          <div blog={{ height: "100%", width: "100%" }}>
            <ThemeProvider theme={theme}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[5, 10, 20, 30]}
                checkboxSelection
                rowHeight={120}
              />
            </ThemeProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogList;
