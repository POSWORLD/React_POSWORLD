import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Input, Container, Button, Card } from 'reactstrap';
import { selectPhoto, updatePhoto } from '../../store/photos';
import Contents from '../../styles/Layout/Contents';
import FlexWrapper from '../../styles/Layout/FlexWrapper';
import Layout from '../../styles/Layout/Layout';
import Sidebar from '../../styles/Layout/Sidebar';
import AuthRouter from '../AuthRouter';
import Profile from '../Home/Profile';

const PhotoUpdate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const photoId = location.state;
    const userId = useSelector((state) => state.users.me.id);
    const myPhoto = useSelector((state) => state.photos.allPhoto.photos);
    const [form, setForm] = useState({
        id: photoId,
        title: '',
        content: '',
        img: '/img/image1.jpg',
        file: '',
        userId: userId,
    });

    const onChangeFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve) => {
            reader.onload = () => {
                setForm({ ...form, img: reader.result, file });
                resolve();
            };
        });
    };

    const onSubmit = async () => {
        await dispatch(updatePhoto(form));
        await dispatch(selectPhoto(userId.id));
        alert('사진이 수정되었습니다.');
        navigate('/Photo');
    };

    const onChangeContent = (e) => {
        const { value } = e.target;
        setForm({ ...form, content: value });
    };

    const onChangeTitle = (e) => {
        const { value } = e.target;
        setForm({ ...form, title: value });
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
                        <hr style={{ height: 2 }} />
                        <div className="photoUpdateForm">
                            <Input type="text" placeholder="제목" id="title" onChange={(e) => onChangeTitle(e)}></Input>
                            <div className="profileImgBox">
                                <label htmlFor="imgUpload">이미지</label>
                                <Input type="file" id="img" onChange={(e) => onChangeFile(e)}></Input>
                            </div>
                            <br></br>
                            <div>
                                <textarea id="content" onChange={(e) => onChangeContent(e)}></textarea>
                            </div>
                        </div>
                        <div>
                            <Link to="">
                                <Button id="listBtn">목록</Button>
                            </Link>
                            <Button type="submit" onClick={onSubmit} id="submitBtn">
                                수정
                            </Button>
                        </div>
                    </Card>
                </Contents>
            </Layout>
            <AuthRouter></AuthRouter>
        </>
    );
};

export default PhotoUpdate;
