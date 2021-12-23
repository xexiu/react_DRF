import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axios';

export default function Create() {
    const navigate = useNavigate();
    const { id } = useParams();

    const deletePost = async () => {
        try {
            await axiosInstance
                .delete(`admin/delete/${id}`);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                console.log('There was an error deleting the Post with id: ', id, 'Error: ', error);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await deletePost();
        navigate({
            pathname: '/admin/',
        });
        window.location.reload();
    };

    return (
        <Container component="main" maxWidth="sm">
            <Box
                display="flex"
                justifyContent="center"
                m={1}
                p={1}
                bgcolor="background.paper"
            >
                <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Press here to confirm delete
                </Button>
            </Box>
        </Container>
    );
}
