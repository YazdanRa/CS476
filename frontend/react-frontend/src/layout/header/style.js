import styled from 'styled-components'

export default styled.div`
  padding: 0 24px 0 24px;
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  width: 100%;

  .header_content_right {
    float: right;
  }

  & .ant-layout-header {
    line-height: unset !important;
  }

  .header_content_left {
    float: left;
    display: flex;
    justify-content: space-between;

    .ant-dropdown-link {
      display: flex;
      align-items: center;
      gap: 8px;

      .avatar-wrapper {
        display: inline-block;
        width: 41px;
        height: 41px;
        background-color: #e3e7f7;
        border-radius: 50%;
        overflow: hidden;
      }

      .avatar-wrapper img {
        width: 100%;
        height: 100%;
      }
    }
  }

  @media only screen and (max-width: 992px) {
    padding: 0px 16px;
    height: 120px;
    .header_content_left {
      width: 100%;
      margin-bottom: 24px;
    }

    .header_content_right {
      width: 100%;
    }
  }
`
