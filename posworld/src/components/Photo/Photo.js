import { Button, Spinner } from 'reactstrap';
import Card from '../../styles/Layout/Card';
import Layout from '../../styles/Layout/Layout';
import Sidebar from '../../styles/Layout/Sidebar';
import FlexWrapper from '../../styles/Layout/FlexWrapper';
import PhotoList from './PhotoList';
import Profile from '../Home/Profile';
import Contents from '../../styles/Layout/Contents';
import { useDispatch, useSelector } from 'react-redux';
import { selectPhoto, deletePhoto, updatePhoto } from '../../store/photos';
import { useEffect, useState } from 'react';
import { loginCheck } from '../../store/users';
import AuthRouter from '../AuthRouter';
import { useNavigate } from 'react-router-dom';

function Photo() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const myId = useSelector((state) => state.users.me);
    const myPhoto = useSelector((state) => state.photos.allPhoto);

    const photoDispatch = async () => {
        await dispatch(selectPhoto(myId.id));
    };

    const onClickDelete = async (id) => {
        await dispatch(deletePhoto(id));
        await dispatch(selectPhoto(myId.id));
    };
    useEffect(() => {
        photoDispatch();
    }, []);

    const moveTo = () => {
        return navigate('/PhotoAdd', { state: myId.id });
    };
    return (
        <>
            <Layout>
                <Sidebar>
                    <Card>
                        <FlexWrapper>
                            <Profile></Profile>
                        </FlexWrapper>
                    </Card>
                </Sidebar>
                <Contents>
                    <Card>
                        <Button onClick={moveTo}>사진등록</Button>
                        {myPhoto.loading ? (
                            <Spinner>loading...</Spinner>
                        ) : (
                            myPhoto.photos.map((photo) => (
                                <PhotoList key={photo.id} photo={photo} onClickDelete={onClickDelete}></PhotoList>
                            ))
                        )}
                    </Card>
                </Contents>
            </Layout>
            <AuthRouter></AuthRouter>
        </>
    );
}
export default Photo;
