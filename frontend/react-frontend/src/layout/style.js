import styled from 'styled-components'
import {Layout} from 'antd'

const {Header, Content, Sider} = Layout

export const CustomHeader = styled(Header)`
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 1;
  left: 0;
  height: fit-content;
  min-height: 78px;
  padding: 0;
  width: calc(100% - 237px);
  line-height: 1.5715 !important;
  @media only screen and (max-width: 992px) {
    & {
      width: 100%;
      padding-top: 25px;
    }
  }
`

export const CustomContent = styled(Content)`
  margin-top: 78px;
  padding: 0px 24px;
  padding-top: 14px;
  min-height: calc(100vh - 78px);
  @media only screen and (max-width: 992px) {
    & {
      padding: 16px 16px 0px 16px;
      margin-right: 0px;
      margin-top: 136px;
    }
  }
`

export const CustomSider = styled(Sider)`
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1;
  min-width: 237px !important;
  height: 100%;
  @media only screen and (max-width: 992px) {
    & {
      min-width: 0px !important;
    }
  }
`
