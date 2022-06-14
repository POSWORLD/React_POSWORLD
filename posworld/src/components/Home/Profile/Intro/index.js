import ScrollToTop from '../../../../style/Layout/ScrollToTop';
import Dev from './Dev';
import Info from './Info';
import Main from './Main';
import Qna from './Qna';
import React from 'react';

const Intro = ({ match }) => {
    let { type } = match.params;
    type = type ? type : 'main';

    const intros = [
        {
            type: 'main',
            component: <Main />,
        },
        {
            type: 'default',
            component: <Info title="기본정보" />,
        },
        {
            type: 'dev',
            component: <Dev title="기술 및 히스토리" />,
        },
        {
            type: 'qna',
            component: <Qna title="TMI 자문자답" />,
        },
    ];
    const { component } = intros.find((item) => item.type === type);

    return <ScrollToTop path={type}>{component}</ScrollToTop>;
};

export default Intro;
