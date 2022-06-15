import styled from "styled-components";

const Wrapper = styled.div`
  width: 80px;
  height: 32px;
  position: relative;

  @media (max-width: 930px) {
    width: 60px;
    height: 20px;  
  }
`

const Border = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #fff;
  border-radius: 12px;

  @media (max-width: 930px) {
    border-radius: 8px;
  }
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
    visibility: hidden;
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

  @media (max-width: 930px) {
    font-size: 12px;

    >label {
      width: 60px;
      height: 20px;  
    }
    >label:before {
      font-size: 12px;
      transform: scale(calc(10/12))
    }

    >label:after {
      font-size: 12px;
      border-radius: 8px;
      transform: scale(calc(10/12));
      width: 60%;
      height: 120%;
      top: -2px;
      left: -2px;
    }

    & input:checked + label:after {
      content: attr(data-on);
      top: -2px;
      right: -2px;
      left: unset;
    }
  
  }

`


export default function SwitchButton({ left, right, onSwitch, switchOn }) {

  const inputChangedHandler = ({ target }) => {
    onSwitch(target.checked)
  }
  return <Wrapper>
    <Border />
    <Switch>
      <input type="checkbox" id="switch" checked={switchOn} onChange={inputChangedHandler} />
      <label htmlFor="switch" data-on={right} data-off={left}></label>
    </Switch>
  </Wrapper >
}