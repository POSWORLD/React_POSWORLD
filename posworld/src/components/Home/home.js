import AuthRouter from '../AuthRouter';

import { publicUrl } from '../../utils/utils';
function Home() {
    return (
        <div>
            <h2>미니룸</h2>
            <div>
                <img src={publicUrl + '/resources/img/miniroom.gif'} alt="miniroom" />
            </div>
        </div>
    );
}
export default Home;
