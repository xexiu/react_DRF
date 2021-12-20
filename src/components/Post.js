import Container from '@material-ui/core/Container';
//MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axios';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

export default function Post() {
    const { id } = useParams();
    const classes = useStyles();

    const [data, setData] = useState({ posts: [] });

    useEffect(() => {
        axiosInstance.get(id).then((res) => {
            setData({ posts: res.data });
            console.log(res.data);
        });
    }, [setData, id]);

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <div className={classes.paper}></div>
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="textPrimary"
                        gutterBottom
                    >
                        {data.posts.title}
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        color="textSecondary"
                        paragraph
                    >
                        {data.posts.excerpt}
                    </Typography>
                </Container>
            </div>
        </Container>
    );
}
