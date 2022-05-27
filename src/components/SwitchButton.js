import styled from "styled-components";

const Wrapper = styled.div`
  width: 80px;
  height: 32px;
  position: relative;
`

const Border = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #fff;
  border-radius: 12px;
`

const Switch = styled.label`
  font-size: 16px;
  line-height: 24px;

  display: inline-block;
  margin: 0px;
  position: relative;

  >label {
    margin: 0px;
    width: 80px;
    height: 32px;
    // border-radius: 12px;
    overflow: hidden;
    position: relative;
    display: block;
    cursor: pointer;
  }
  >label:before {
    content: attr(data-on);
    position: absolute;
    right: 0;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    line-height: 24px;
  }
  >label:after {
    content: attr(data-off);
    position: absolute;
    width: 50%;
    height: 100%;
    background: #fff;
    border-radius: 12px;
    text-align: center;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    line-height: 24px;
  }

  input {
    width: 0;
    height: 0;
    margin: 0;
    position: absolute;
  }

  & input:checked + label:after {
    content: attr(data-on);
    right: 0;
  }

  & input:checked + label:before {
    content: attr(data-off);
    left: 0;
  }
`


export default function SwitchButton({ left, right }) {
  return <Wrapper>
    <Border />
    <Switch>
      <input type="checkbox" id="color_mode" value="1" />
      <label for="color_mode" data-on={right} data-off={left}></label>
    </Switch>
  </Wrapper >
}