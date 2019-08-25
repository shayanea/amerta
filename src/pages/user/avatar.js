import $ from "jquery";
import React, { Component } from "react";
import { Portal, Tabs, Button } from "zent";
import styled from "styled-components";

import AvatarShape from "../../assets/avatars/avatar";
// Hair
import Hair1 from "../../assets/avatars/hair/1";
import Hair2 from "../../assets/avatars/hair/2";
import Hair3 from "../../assets/avatars/hair/3";
import Hair4 from "../../assets/avatars/hair/4";
import Hair5 from "../../assets/avatars/hair/5";
import Hair6 from "../../assets/avatars/hair/6";
import Hair7 from "../../assets/avatars/hair/7";
import Hair8 from "../../assets/avatars/hair/8";
import Hair9 from "../../assets/avatars/hair/9";
import Hair10 from "../../assets/avatars/hair/10";
// Face
import Face1 from "../../assets/avatars/face/1";
import Face2 from "../../assets/avatars/face/2";
import Face3 from "../../assets/avatars/face/3";
import Face4 from "../../assets/avatars/face/4";
import Face5 from "../../assets/avatars/face/5";
import Face6 from "../../assets/avatars/face/6";
import Face7 from "../../assets/avatars/face/7";
import Face8 from "../../assets/avatars/face/8";
import Face9 from "../../assets/avatars/face/9";
import Face10 from "../../assets/avatars/face/10";
// Clothe
import Clothe1 from "../../assets/avatars/clothe/1";
import Clothe2 from "../../assets/avatars/clothe/2";
import Clothe3 from "../../assets/avatars/clothe/3";
import Clothe4 from "../../assets/avatars/clothe/4";
import Clothe5 from "../../assets/avatars/clothe/5";
import Clothe6 from "../../assets/avatars/clothe/6";
import Clothe7 from "../../assets/avatars/clothe/7";
import Clothe8 from "../../assets/avatars/clothe/8";
import Clothe9 from "../../assets/avatars/clothe/9";
import Clothe10 from "../../assets/avatars/clothe/10";

const WrappedPortal = Portal.withNonScrollable(Portal.withESCToClose(Portal));
const TabPanel = Tabs.TabPanel;

export default class avatar extends Component {
  state = {
    activeId: "1",
    avatar: {
      hair: null,
      face: null,
      clothe: null
    },
    hairs: [
      { id: 1, lock: true, url: require("../../assets/avatars/images/hair/1.svg") },
      { id: 2, lock: false, url: require("../../assets/avatars/images/hair/2.svg") },
      { id: 3, lock: false, url: require("../../assets/avatars/images/hair/3.svg") },
      { id: 4, lock: true, url: require("../../assets/avatars/images/hair/4.svg") },
      { id: 5, lock: false, url: require("../../assets/avatars/images/hair/5.svg") },
      { id: 6, lock: false, url: require("../../assets/avatars/images/hair/6.svg") },
      { id: 7, lock: false, url: require("../../assets/avatars/images/hair/7.svg") },
      { id: 8, lock: true, url: require("../../assets/avatars/images/hair/8.svg") },
      { id: 9, lock: false, url: require("../../assets/avatars/images/hair/9.svg") },
      { id: 10, lock: true, url: require("../../assets/avatars/images/hair/10.svg") }
    ],
    clothes: [
      { id: 1, lock: false, url: require("../../assets/avatars/images/clothe/1.svg") },
      { id: 2, lock: true, url: require("../../assets/avatars/images/clothe/2.svg") },
      { id: 3, lock: false, url: require("../../assets/avatars/images/clothe/3.svg") },
      { id: 4, lock: false, url: require("../../assets/avatars/images/clothe/4.svg") },
      { id: 5, lock: true, url: require("../../assets/avatars/images/clothe/5.svg") },
      { id: 6, lock: false, url: require("../../assets/avatars/images/clothe/6.svg") },
      { id: 7, lock: true, url: require("../../assets/avatars/images/clothe/7.svg") },
      { id: 8, lock: false, url: require("../../assets/avatars/images/clothe/8.svg") },
      { id: 9, lock: true, url: require("../../assets/avatars/images/clothe/9.svg") },
      { id: 10, lock: false, url: require("../../assets/avatars/images/clothe/10.svg") }
    ],
    faces: [
      { id: 1, lock: false, url: require("../../assets/avatars/images/face/1.svg") },
      { id: 2, lock: true, url: require("../../assets/avatars/images/face/2.svg") },
      { id: 3, lock: false, url: require("../../assets/avatars/images/face/3.svg") },
      { id: 4, lock: false, url: require("../../assets/avatars/images/face/4.svg") },
      { id: 5, lock: true, url: require("../../assets/avatars/images/face/5.svg") },
      { id: 6, lock: false, url: require("../../assets/avatars/images/face/6.svg") },
      { id: 7, lock: true, url: require("../../assets/avatars/images/face/7.svg") },
      { id: 8, lock: true, url: require("../../assets/avatars/images/face/8.svg") },
      { id: 9, lock: false, url: require("../../assets/avatars/images/face/9.svg") },
      { id: 10, lock: false, url: require("../../assets/avatars/images/face/10.svg") }
    ]
  };

  onTabChange = id => {
    this.setState({
      activeId: id
    });
  };

  changeFaceItem = (id, type) => {
    if (type === 1) {
      $("#svga-group-hair-front").remove();
      switch (id) {
        case 1:
          $("#svga-group-head").append(Hair1);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        case 2:
          $("#svga-group-head").append(Hair2);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        case 3:
          $("#svga-group-head").append(Hair3);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        case 4:
          $("#svga-group-head").append(Hair4);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        case 5:
          $("#svga-group-head").append(Hair5);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        case 6:
          $("#svga-group-head").append(Hair6);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        case 7:
          $("#svga-group-head").append(Hair7);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        case 8:
          $("#svga-group-head").append(Hair8);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        case 9:
          $("#svga-group-head").append(Hair9);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        case 10:
          $("#svga-group-head").append(Hair10);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        default:
          $("#svga-group-head").append(Hair1);
          $(".face-container svg").html($(".face-container svg").html());
      }
    }
    if (type === 2) {
      $("#svga-group-clothes-single").remove();
      switch (id) {
        case 1:
          $("#svga-group-subwrapper").append(Clothe1);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        case 2:
          $("#svga-group-subwrapper").append(Clothe2);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        case 3:
          $("#svga-group-subwrapper").append(Clothe3);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        case 4:
          $("#svga-group-subwrapper").append(Clothe4);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        case 5:
          $("#svga-group-subwrapper").append(Clothe5);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        case 6:
          $("#svga-group-subwrapper").append(Clothe6);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        case 7:
          $("#svga-group-subwrapper").append(Clothe7);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        case 8:
          $("#svga-group-subwrapper").append(Clothe8);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        case 9:
          $("#svga-group-subwrapper").append(Clothe9);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        case 10:
          $("#svga-group-subwrapper").append(Clothe10);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        default:
          $("#svga-group-subwrapper").append(Clothe1);
          $(".face-container svg").html($(".face-container svg").html());
      }
    }
    if (type === 3) {
      $("#svga-group-faceshape-single").remove();
      switch (id) {
        case 1:
          $("#svga-group-faceshape-wrap").append(Face1);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        case 2:
          $("#svga-group-faceshape-wrap").append(Face2);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        case 3:
          $("#svga-group-faceshape-wrap").append(Face3);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        case 4:
          $("#svga-group-faceshape-wrap").append(Face4);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        case 5:
          $("#svga-group-faceshape-wrap").append(Face5);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        case 6:
          $("#svga-group-faceshape-wrap").append(Face6);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        case 7:
          $("#svga-group-faceshape-wrap").append(Face7);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        case 8:
          $("#svga-group-faceshape-wrap").append(Face8);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        case 9:
          $("#svga-group-faceshape-wrap").append(Face9);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        case 10:
          $("#svga-group-faceshape-wrap").append(Face10);
          $(".face-container svg").html($(".face-container svg").html());
          break;
        default:
          $("#svga-group-faceshape-wrap").append(Face1);
          $(".face-container svg").html($(".face-container svg").html());
      }
    }
  };

  render() {
    const { status, onChangeAvatarModalStatus } = this.props;
    const { activeId, hairs, faces, clothes, avatar } = this.state;
    return (
      <WrappedPortal
        visible={status}
        onClickAway={onChangeAvatarModalStatus}
        onClose={onChangeAvatarModalStatus}
        className="avatar-picker"
        style={{ background: "rgba(0, 0, 0, 0.4)" }}
        useLayerForClickAway
      >
        <OverlayContainer>
          <div className="face-container">
            <CloseModalBtn onClick={onChangeAvatarModalStatus} />
            <AvatarShape />
            <Tabs activeId={activeId} onChange={this.onTabChange}>
              <TabPanel tab="Hair" id="1">
                <AvatarItemsContainer>
                  {hairs.map(item => (
                    <AvatarItems key={item.id} style={{ backgroundImage: `url(${item.url})` }} onClick={() => this.changeFaceItem(item.id, 1)}>
                      {item.lock && <AvatarLock />}
                    </AvatarItems>
                  ))}
                </AvatarItemsContainer>
              </TabPanel>
              <TabPanel tab="Clothes" id="2">
                <AvatarItemsContainer>
                  {clothes.map(item => (
                    <AvatarItems key={item.id} style={{ backgroundImage: `url(${item.url})` }} onClick={() => this.changeFaceItem(item.id, 2)}>
                      {item.lock && <AvatarLock />}
                    </AvatarItems>
                  ))}
                </AvatarItemsContainer>
              </TabPanel>
              <TabPanel tab="Face" id="3">
                <AvatarItemsContainer>
                  {faces.map(item => (
                    <AvatarItems key={item.id} style={{ backgroundImage: `url(${item.url})` }} onClick={() => this.changeFaceItem(item.id, 3)}>
                      {item.lock && <AvatarLock />}
                    </AvatarItems>
                  ))}
                </AvatarItemsContainer>
              </TabPanel>
            </Tabs>
            <Button className="save-avatar-btn" onClick={onChangeAvatarModalStatus} type="primary" size="large">
              Save
            </Button>
          </div>
        </OverlayContainer>
      </WrappedPortal>
    );
  }
}

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AvatarItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 325px;
`;

const AvatarItems = styled.div`
  position: relative;
  display: inline-block;
  width: 80px;
  height: 80px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #eee;
  margin-right: 15px;
  margin-bottom: 15px;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
`;

const AvatarLock = styled.span`
  position: absolute;
  bottom: 5px;
  right: 5px;
  height: 20px;
  width: 20px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 20px;
  background-image: url("data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgo8cGF0aCBzdHlsZT0iZmlsbDojMzAzQzQyOyIgZD0iTTQzNy4zMzMsMTkyaC0zMnYtNDIuNjY3QzQwNS4zMzMsNjYuOTksMzM4LjM0NCwwLDI1NiwwUzEwNi42NjcsNjYuOTksMTA2LjY2NywxNDkuMzMzVjE5MmgtMzIgIEM2OC43NzEsMTkyLDY0LDE5Ni43NzEsNjQsMjAyLjY2N3YyNjYuNjY3QzY0LDQ5Mi44NjUsODMuMTM1LDUxMiwxMDYuNjY3LDUxMmgyOTguNjY3QzQyOC44NjUsNTEyLDQ0OCw0OTIuODY1LDQ0OCw0NjkuMzMzVjIwMi42NjcgIEM0NDgsMTk2Ljc3MSw0NDMuMjI5LDE5Miw0MzcuMzMzLDE5MnogTTM0MS4zMzMsMTkySDE3MC42Njd2LTQyLjY2N0MxNzAuNjY3LDEwMi4yODEsMjA4Ljk0OCw2NCwyNTYsNjQgIHM4NS4zMzMsMzguMjgxLDg1LjMzMyw4NS4zMzNWMTkyeiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRjJGMkYyOyIgZD0iTTEyOCwxNDkuMzMzYzAtNzAuNTgzLDU3LjQxNy0xMjgsMTI4LTEyOHMxMjgsNTcuNDE3LDEyOCwxMjhWMTkyaC0yMS4zMzN2LTQyLjY2NyAgYzAtNTguODEzLTQ3Ljg1NC0xMDYuNjY3LTEwNi42NjctMTA2LjY2N1MxNDkuMzMzLDkwLjUyMSwxNDkuMzMzLDE0OS4zMzNWMTkySDEyOFYxNDkuMzMzeiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRkZDQTI4OyIgZD0iTTQyNi42NjcsNDY5LjMzM2MwLDExLjc2LTkuNTczLDIxLjMzMy0yMS4zMzMsMjEuMzMzSDEwNi42NjdjLTExLjc2LDAtMjEuMzMzLTkuNTczLTIxLjMzMy0yMS4zMzMgIHYtMjU2aDM0MS4zMzNWNDY5LjMzM3oiLz4KPHBhdGggc3R5bGU9Im9wYWNpdHk6MC4yO2ZpbGw6I0ZGRkZGRjtlbmFibGUtYmFja2dyb3VuZDpuZXcgICAgOyIgZD0iTTEyOCw0NjkuMzMzdi0yNTZIODUuMzMzdjI1NiAgYzAsMTEuNzYsOS41NzMsMjEuMzMzLDIxLjMzMywyMS4zMzNIMTQ0QzEzNS4xOCw0OTAuNjY3LDEyOCw0ODEuMDk0LDEyOCw0NjkuMzMzeiIvPgo8cGF0aCBzdHlsZT0ib3BhY2l0eTowLjE7ZW5hYmxlLWJhY2tncm91bmQ6bmV3ICAgIDsiIGQ9Ik0zODQsMjEzLjMzM3YyNTZjMCwxMS43Ni03LjE4LDIxLjMzMy0xNiwyMS4zMzNoMzcuMzMzICBjMTEuNzYsMCwyMS4zMzMtOS41NzMsMjEuMzMzLTIxLjMzM3YtMjU2SDM4NHoiLz4KPHBhdGggc3R5bGU9ImZpbGw6IzMwM0M0MjsiIGQ9Ik0yMzAuNzkyLDM1NC4zMTNsLTYuNzI5LDYwLjUxYy0wLjMzMywzLjAxLDAuNjM1LDYuMDMxLDIuNjU2LDguMjkyICBjMi4wMjEsMi4yNiw0LjkxNywzLjU1Miw3Ljk0OCwzLjU1Mmg0Mi42NjdjMy4wMzEsMCw1LjkyNy0xLjI5Miw3Ljk0OC0zLjU1MmMyLjAyMS0yLjI2LDIuOTktNS4yODEsMi42NTYtOC4yOTJsLTYuNzI5LTYwLjUxICBjMTAuOTI3LTcuOTQ4LDE3LjQ1OC0yMC41MjEsMTcuNDU4LTM0LjMxM2MwLTIzLjUzMS0xOS4xMzUtNDIuNjY3LTQyLjY2Ny00Mi42NjdTMjEzLjMzMywyOTYuNDY5LDIxMy4zMzMsMzIwICBDMjEzLjMzMywzMzMuNzkyLDIxOS44NjUsMzQ2LjM2NSwyMzAuNzkyLDM1NC4zMTN6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiM1QzY2NzE7IiBkPSJNMjU2LDI5OC42NjdjMTEuNzYsMCwyMS4zMzMsOS41NzMsMjEuMzMzLDIxLjMzM2MwLDguMTc3LTQuNjQ2LDE1LjUtMTIuMTI1LDE5LjEyNSAgYy00LjA3MywxLjk3OS02LjQ1OCw2LjI5Mi01Ljk1OCwxMC43ODFsNi4xNjcsNTUuNDI3aC0xOC44MzNsNi4xNjctNTUuNDI3YzAuNS00LjQ5LTEuODg1LTguODAyLTUuOTU4LTEwLjc4MSAgYy03LjQ3OS0zLjYyNS0xMi4xMjUtMTAuOTQ4LTEyLjEyNS0xOS4xMjVDMjM0LjY2NywzMDguMjQsMjQ0LjI0LDI5OC42NjcsMjU2LDI5OC42Njd6Ii8+CjxwYXRoIHN0eWxlPSJvcGFjaXR5OjAuMTtlbmFibGUtYmFja2dyb3VuZDpuZXcgICAgOyIgZD0iTTI0Ny43MTYsMzQwLjAwMWMtMS40MzQtMi44NjYtMi4zODMtNS45ODctMi4zODMtOS4zMzUgIGMwLTExLjc2LDkuNTczLTIxLjMzMywyMS4zMzMtMjEuMzMzYzMuMTIsMCw2LjAzNCwwLjc0OSw4LjcwOCwxLjk1OGMtMy4zNDktNy40MDYtMTAuNzM0LTEyLjYyNS0xOS4zNzUtMTIuNjI1ICBjLTExLjc2LDAtMjEuMzMzLDkuNTczLTIxLjMzMywyMS4zMzNjMCw4LjE3Nyw0LjY0NiwxNS41LDEyLjEyNSwxOS4xMjVDMjQ3LjE5MywzMzkuMzIsMjQ3LjM0OSwzMzkuNzYzLDI0Ny43MTYsMzQwLjAwMXoiLz4KPHBhdGggc3R5bGU9Im9wYWNpdHk6MC4xO2VuYWJsZS1iYWNrZ3JvdW5kOm5ldyAgICA7IiBkPSJNMjYxLjkyNywzNzMuOTY1bC0yLjQ4LTIyLjI4OGMtMC43MDEtMC42MDgtMS4xMjUtMS40NjYtMS45ODgtMS44ODUgIGMtMi4wOTYtMS4wMTYtMy45LTIuMzc2LTUuNTEyLTMuOTExYzAuMzg1LDEuMzIzLDAuOTYyLDIuNTk5LDAuODAzLDQuMDI2bC02LjE2Nyw1NS40MjdoMTEuODUzTDI2MS45MjcsMzczLjk2NXoiLz4KPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8xXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSItNDMuNjIyIiB5MT0iNjM3LjI2OTUiIHgyPSItMjMuODM2OCIgeTI9IjYyOC4wNDM1IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDIxLjMzMzMgMCAwIC0yMS4zMzMzIDk5Ni4zMzM0IDEzNzkxLjY2NykiPgoJPHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojRkZGRkZGO3N0b3Atb3BhY2l0eTowLjIiLz4KCTxzdG9wIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6I0ZGRkZGRjtzdG9wLW9wYWNpdHk6MCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8cGF0aCBzdHlsZT0iZmlsbDp1cmwoI1NWR0lEXzFfKTsiIGQ9Ik00MzcuMzMzLDE5MmgtMzJ2LTQyLjY2N0M0MDUuMzMzLDY2Ljk5LDMzOC4zNDQsMCwyNTYsMFMxMDYuNjY3LDY2Ljk5LDEwNi42NjcsMTQ5LjMzM1YxOTIgIGgtMzJDNjguNzcxLDE5Miw2NCwxOTYuNzcxLDY0LDIwMi42Njd2MjY2LjY2N0M2NCw0OTIuODY1LDgzLjEzNSw1MTIsMTA2LjY2Nyw1MTJoMjk4LjY2N0M0MjguODY1LDUxMiw0NDgsNDkyLjg2NSw0NDgsNDY5LjMzMyAgVjIwMi42NjdDNDQ4LDE5Ni43NzEsNDQzLjIyOSwxOTIsNDM3LjMzMywxOTJ6IE0zNDEuMzMzLDE5MkgxNzAuNjY3di00Mi42NjdDMTcwLjY2NywxMDIuMjgxLDIwOC45NDgsNjQsMjU2LDY0ICBzODUuMzMzLDM4LjI4MSw4NS4zMzMsODUuMzMzVjE5MnoiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==");
`;

const CloseModalBtn = styled.div`
  position: absolute;
  top: 7px;
  left: 7px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-size: 20px;
  background-image: url("data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxLjk3NiA1MS45NzYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxLjk3NiA1MS45NzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTI4cHgiIGhlaWdodD0iMTI4cHgiPgo8Zz4KCTxwYXRoIGQ9Ik00NC4zNzMsNy42MDNjLTEwLjEzNy0xMC4xMzctMjYuNjMyLTEwLjEzOC0zNi43NywwYy0xMC4xMzgsMTAuMTM4LTEwLjEzNywyNi42MzIsMCwzNi43N3MyNi42MzIsMTAuMTM4LDM2Ljc3LDAgICBDNTQuNTEsMzQuMjM1LDU0LjUxLDE3Ljc0LDQ0LjM3Myw3LjYwM3ogTTM2LjI0MSwzNi4yNDFjLTAuNzgxLDAuNzgxLTIuMDQ3LDAuNzgxLTIuODI4LDBsLTcuNDI1LTcuNDI1bC03Ljc3OCw3Ljc3OCAgIGMtMC43ODEsMC43ODEtMi4wNDcsMC43ODEtMi44MjgsMGMtMC43ODEtMC43ODEtMC43ODEtMi4wNDcsMC0yLjgyOGw3Ljc3OC03Ljc3OGwtNy40MjUtNy40MjVjLTAuNzgxLTAuNzgxLTAuNzgxLTIuMDQ4LDAtMi44MjggICBjMC43ODEtMC43ODEsMi4wNDctMC43ODEsMi44MjgsMGw3LjQyNSw3LjQyNWw3LjA3MS03LjA3MWMwLjc4MS0wLjc4MSwyLjA0Ny0wLjc4MSwyLjgyOCwwYzAuNzgxLDAuNzgxLDAuNzgxLDIuMDQ3LDAsMi44MjggICBsLTcuMDcxLDcuMDcxbDcuNDI1LDcuNDI1QzM3LjAyMiwzNC4xOTQsMzcuMDIyLDM1LjQ2LDM2LjI0MSwzNi4yNDF6IiBmaWxsPSIjMDAwMDAwIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==");
`;
