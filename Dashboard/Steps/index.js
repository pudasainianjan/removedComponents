import React from 'react';
import { Steps as StepsWrapper} from 'antd';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';

const { Step } = StepsWrapper;


const Steps = ({user}) => {
    return(
            <StepsWrapper>
              <Step status="finish" title="Login" icon={<UserOutlined />} />
              <Step status="finish" title="Verification" icon={<SolutionOutlined />} />
              <Step status="process" title="Pay" icon={<LoadingOutlined />} />
              <Step status="wait" title="Done" icon={<SmileOutlined />} />
            </StepsWrapper>
            
    );
}

export default Steps;
