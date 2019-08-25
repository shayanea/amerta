import React, { Component } from "react";
import Navbar from "./navbar";
import Menu from "./menu";
import { withRouter } from "react-router";

class mainView extends Component {
	state = {
		active: true
	};

	menuActive = status => this.setState({ active: status });

	render() {
		const { active } = this.state;
		return (
			<React.Fragment>
				<Navbar onMenuActive={this.menuActive} />
				<Menu {...this.props.history} active={active} />
			</React.Fragment>
		);
	}
}

export default withRouter(mainView);
