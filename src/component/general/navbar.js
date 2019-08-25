import React, { Component } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { connect } from "react-redux";

import { logoutUser } from "../../actions/authActions";
import { history } from "../../utils/history";
import styled, { keyframes } from "styled-components";
import { Sweetalert } from "zent";

class navbar extends Component {
  state = {
    active: true,
    openNotification: false,
    openProfile: false
  };

  componentDidMount() {
    document.body.classList.add("menu-is-open");
  }

  activeMenu = () => {
    this.setState({ active: !this.state.active });
    !this.state.active ? document.body.classList.add("menu-is-open") : document.body.classList.remove("menu-is-open");
    this.props.onMenuActive(!this.state.active);
  };

  logout = () => {
    Sweetalert.confirm({
      confirmType: "success",
      confirmText: "Yes",
      cancelText: "No",
      content: "Are you sure you want to exit ?",
      title: "Attention",
      className: "custom-sweetalert",
      maskClosable: true,
      parentComponent: this,
      onConfirm: () => {
        history.replace("/login");
        this.props.logoutUser();
      }
    });
  };

  render() {
    const { active, openNotification, openProfile } = this.state;
    return (
      <React.Fragment>
        <Navbar active={active}>
          <Column>
            <ControlHolder>
              <ControlHolderItem>
                <OutsideClickHandler onOutsideClick={() => this.setState({ openNotification: false })}>
                  <Notifications onClick={() => this.setState({ openNotification: !openNotification })}>
                    <i />
                  </Notifications>
                  <NotificationDropDown active={openNotification}>
                    <Header>Notifications (3)</Header>
                    <Items>
                      <li>
                        <p>New user register</p>
                        <span>2 hours ago</span>
                      </li>
                      <li>
                        <p>New user register</p>
                        <span>3 hours ago</span>
                      </li>
                      <li>
                        <p>New user register</p>
                        <span>4 hours ago</span>
                      </li>
                    </Items>
                  </NotificationDropDown>
                </OutsideClickHandler>
              </ControlHolderItem>
              <ControlHolderItem>
                <OutsideClickHandler onOutsideClick={() => this.setState({ openProfile: false })}>
                  <Profile onClick={() => this.setState({ openProfile: !openProfile })} />
                  <ProfileDropDown active={openProfile}>
                    <li>
                      <a>Edit Profile</a>
                    </li>
                    <li>
                      <a onClick={this.logout}>Sign out</a>
                    </li>
                  </ProfileDropDown>
                </OutsideClickHandler>
              </ControlHolderItem>
            </ControlHolder>
          </Column>
          <Column>
            <Logo>Amerta</Logo>
            <MenuIcon className={`${active ? "active" : ""}`} onClick={this.activeMenu}>
              <span />
              <span />
              <span />
            </MenuIcon>
          </Column>
        </Navbar>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    logoutUser
  }
)(navbar);

const Navbar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row-reverse;
  padding: 0 25px;
  height: 60px;
  z-index: 20;
  background-color: hsla(0, 0%, 100%, 0.96);
  box-shadow: 0 1px 15px 1px rgba(52, 40, 104, 0.08);
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  flex: 1;
  :first-child {
    justify-content: flex-start;
  }
  :last-child {
    justify-content: flex-end;
  }
`;

const Logo = styled.span`
  font-size: 2em;
  font-weight: bold;
  color: #222;
  display: inline-block;
`;

const MenuIcon = styled.div`
  display: inline-block;
  width: 30px;
  height: 20px;
  position: relative;
  margin-right: 15px;
  cursor: pointer;
  span {
    width: 15px;
    height: 2px;
    background-color: #222;
    display: block;
    margin: 7px 0;
    border-radius: 35px;
    transition: all 0.5s ease;
    &:nth-child(1) {
      width: 20px;
      margin-top: 0;
    }
    &:nth-child(2) {
      width: 30px;
    }
  }
  &.active {
    span {
      transition: all 0.5s ease;
      &:first-child {
        transform: translateX(10px);
      }
      &:nth-child(2) {
        transform: none;
      }
      &:last-child {
        transform: translateX(15px);
      }
    }
  }
`;

const ControlHolder = styled.ul`
  display: inline-flex;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ControlHolderItem = styled.li`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 25px;
  position: relative;
`;

const Profile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #eee;
  background-image: url("data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAyNTguNzUgMjU4Ljc1IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNTguNzUgMjU4Ljc1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjEyOHB4IiBoZWlnaHQ9IjEyOHB4Ij4KPGc+Cgk8Y2lyY2xlIGN4PSIxMjkuMzc1IiBjeT0iNjAiIHI9IjYwIiBmaWxsPSIjZGRkZGRkIi8+Cgk8cGF0aCBkPSJNMTI5LjM3NSwxNTBjLTYwLjA2MSwwLTEwOC43NSw0OC42ODktMTA4Ljc1LDEwOC43NWgyMTcuNUMyMzguMTI1LDE5OC42ODksMTg5LjQzNiwxNTAsMTI5LjM3NSwxNTB6IiBmaWxsPSIjZGRkZGRkIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==");
  background-position: center;
  background-size: 20px;
  background-repeat: no-repeat;
  display: inline-block;
  cursor: pointer;
`;

const ProfileDropDown = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  width: 130px;
  box-shadow: 0 1px 15px 1px rgba(52, 40, 104, 0.08);
  border-radius: 4px;
  overflow: hidden;
  background-color: #fff;
  z-index: 20;
  max-height: ${props => (props.active ? "1000px" : "0px")};
  transition: all ${props => (props.active ? "1s" : "0.5s")} ease;
  & li {
    & a {
      display: block;
      padding: 10px 25px;
      font-size: 14px;
      color: #444;
      cursor: pointer;
      &:hover {
        color: #e30917;
      }
    }
  }
`;

const BadgePulse = keyframes`
	0% {
		box-shadow: 0 0 0 0 rgba(254, 25, 94, 0.4);
	}

	70% {
		box-shadow: 0 0 0 10px rgba(254, 25, 94, 0);
	}

	100% {
		box-shadow: 0 0 0 20px rgba(254, 25, 94, 0);
	}
`;

const Swing = keyframes`
	20% {
		transform: rotate3d(0,0,1,15deg);
	}

	40% {
		transform: rotate3d(0,0,1,-10deg);
	}

	60% {
		transform: rotate3d(0,0,1,5deg);
	}

	80% {
		transform: rotate3d(0,0,1,-5deg);
	}

	100% {
		transform: rotate3d(0,0,1,0deg);
	}
`;

const Notifications = styled.div`
  display: inline-block;
  margin: 0 7px;
  position: relative;
  cursor: pointer;
  &::before {
    content: "";
    position: absolute;
    top: -2px;
    right: -2px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #e30917;
    border: 2px solid #fff;
    box-shadow: 0 0 0 rgba(254, 25, 94, 0.4);
    animation: ${BadgePulse} 1.8s infinite;
  }
  i {
    display: inline-block;
    width: 22px;
    height: 22px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 22px;
    background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjEyOHB4IiBoZWlnaHQ9IjEyOHB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDM4LjIxLDQxNS4xMzZsLTI0Ljk3Ny00Ni44NzhWMjUyLjQ4OWMwLTcxLjU2NS00OC4wNjItMTMyLjExMS0xMTMuNjAzLTE1MS4wNjlWNDMuNjMyQzI5OS42MzEsMTkuNTczLDI4MC4wNTksMCwyNTYsMCAgICBjLTI0LjA1OSwwLTQzLjYzMSwxOS41NzMtNDMuNjMxLDQzLjYzMnY1Ny43ODlDMTQ2LjgzLDEyMC4zOCw5OC43NjYsMTgwLjkyNSw5OC43NjYsMjUyLjQ5djExNS43NjhsLTI0Ljk3Niw0Ni44NzggICAgYy00LjgxLDkuMDI3LTQuNTM4LDE5LjY1MiwwLjcyNiwyOC40MjNjNS4yNjUsOC43NjksMTQuNTE0LDE0LjAwNSwyNC43NDMsMTQuMDA1aDk5LjE1OEMyMDAuMTA2LDQ4Ny44NjUsMjI1LjI4Myw1MTIsMjU2LDUxMiAgICBjMzAuNzE2LDAsNTUuODk0LTI0LjEzNSw1Ny41ODMtNTQuNDM2aDk5LjE1OWMxMC4yMjgsMCwxOS40NzctNS4yMzYsMjQuNzQzLTE0LjAwNSAgICBDNDQyLjc0Nyw0MzQuNzg4LDQ0My4wMTksNDI0LjE2Myw0MzguMjEsNDE1LjEzNnogTTIzNS40NTUsNDMuNjMyYzAtMTEuMzMsOS4yMTYtMjAuNTQ2LDIwLjU0NC0yMC41NDYgICAgczIwLjU0NCw5LjIxNiwyMC41NDQsMjAuNTQ2Vjk2LjZjLTYuNzI2LTAuODgyLTEzLjU4My0xLjM0Mi0yMC41NDQtMS4zNDJjLTYuOTYzLDAtMTMuODE5LDAuNDYxLTIwLjU0NCwxLjM0MlY0My42MzJ6ICAgICBNMTIxLjg1MywyNTIuNDg5YzAtNzMuOTY4LDYwLjE3OC0xMzQuMTQ3LDEzNC4xNDctMTM0LjE0N3MxMzQuMTQ3LDYwLjE3OSwxMzQuMTQ3LDEzNC4xNDd2MTA2LjIxN0gxMjEuODUzVjI1Mi40ODl6ICAgICBNMjU2LDQ4OC45MTRjLTE3Ljk4MSwwLTMyLjc5NS0xMy43OTItMzQuNDM1LTMxLjM1aDY4Ljg3MkMyODguNzk1LDQ3NS4xMjIsMjczLjk3OSw0ODguOTE0LDI1Niw0ODguOTE0eiBNNDE3LjY5LDQzMS42NzYgICAgYy0wLjUwNiwwLjg0My0xLjk5OSwyLjgwMi00Ljk0OCwyLjgwMkg5OS4yNTljLTIuOTQ4LDAtNC40NDMtMS45NTktNC45NDgtMi44MDJjLTAuNTA2LTAuODQxLTEuNTMyLTMuMDgyLTAuMTQ1LTUuNjg1ICAgIGwyMy41NDktNDQuMTk5aDI3Ni41NzJsMjMuNTQ5LDQ0LjE5OUM0MTkuMjIxLDQyOC41OTQsNDE4LjE5NCw0MzAuODM0LDQxNy42OSw0MzEuNjc2eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTI1NiwxNDkuMTEzYy01Ny4wMDIsMC0xMDMuMzc4LDQ2LjM3Ni0xMDMuMzc4LDEwMy4zNzhjMCw2LjM3NCw1LjE2OCwxMS41NDMsMTEuNTQzLDExLjU0MyAgICBjNi4zNzUsMCwxMS41NDMtNS4xNjksMTEuNTQzLTExLjU0M2MwLTQ0LjI3MiwzNi4wMTktODAuMjkyLDgwLjI5Mi04MC4yOTJjNi4zNzUsMCwxMS41NDMtNS4xNjksMTEuNTQzLTExLjU0MyAgICBDMjY3LjU0MywxNTQuMjgsMjYyLjM3NSwxNDkuMTEzLDI1NiwxNDkuMTEzeiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=);
    animation: ${Swing} 1.8s infinite;
    animation-fill-mode: both;
    transform-origin: top center;
  }
`;

const NotificationDropDown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 250px;
  box-shadow: 0 1px 15px 1px rgba(52, 40, 104, 0.08);
  border-radius: 4px;
  overflow: hidden;
  max-height: ${props => (props.active ? "1000px" : "0px")};
  transition: all ${props => (props.active ? "1s" : "0.5s")} ease;
`;

const Header = styled.div`
  padding: 35px 20px;
  text-align: center;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  background: linear-gradient(to right, #e23f83 0%, #ea5844 100%);
`;

const Items = styled.ul`
  list-style: none;
  background-color: #fff;
  padding: 0;
  margin: 0;
  & li {
    margin: 0;
    padding: 7px;
    display: block;
    border-bottom: 1px solid #eee;
    text-align: left;
    &:last-child {
      border-bottom: none;
    }
    p {
      font-size: 14px;
      color: #555;
      margin-bottom: 5px;
      padding: 0 15px;
    }
    span {
      padding: 0 15px;
      display: block;
      font-size: 12px;
      color: #999;
    }
  }
`;
