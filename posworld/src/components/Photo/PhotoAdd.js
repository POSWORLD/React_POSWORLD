import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Input, Container, Button, Card } from 'reactstrap';
import { insertPhoto } from '../../store/photos';
import Contents from '../../styles/Layout/Contents';
import FlexWrapper from '../../styles/Layout/FlexWrapper';
import Layout from '../../styles/Layout/Layout';
import Sidebar from '../../styles/Layout/Sidebar';
import AuthRouter from '../AuthRouter';
import Profile from '../Home/Profile';
import './PhotoAdd.css';

function PhotoAdd() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state;

    const [form, setForm] = useState({
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
        await dispatch(insertPhoto(form));
        alert('사진이 등록되었습니다.');
        navigate('/photo');
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
                        <div className="photoInsertForm">
                            <Input type="text" placeholder="제목입력" id="title" onChange={(e) => onChangeTitle(e)}></Input>
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
                                확인
                            </Button>
                        </div>
                    </Card>
                </Contents>
            </Layout>
            <AuthRouter></AuthRouter>
        </>
    );
}

export default PhotoAdd;
