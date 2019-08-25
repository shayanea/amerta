import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import styled from "styled-components";
import { Layout, Table, Button, Icon, Breadcrumb } from "zent";

const { Row } = Layout;

const datasets = [
	{
		id: 0,
		title: "Big Battle Ever",
		type: "League",
		count: "10",
		status: "In Progress",
		last: "28 oct 2018 - 15:35"
	},
	{
		id: 0,
		title: "Big Battle Ever",
		type: "League",
		count: "10",
		status: "In Progress",
		last: "28 oct 2018 - 15:35"
	},
	{
		id: 0,
		title: "Big Battle Ever",
		type: "League",
		count: "10",
		status: "In Progress",
		last: "28 oct 2018 - 15:35"
	}
];

const columns = [
	{
		title: "Id",
		name: "id",
		width: "10%"
	},
	{
		title: "Title",
		name: "title",
		width: "20%"
	},
	{
		title: "Type",
		name: "type",
		width: "20%"
	},
	{
		title: "Players Count",
		name: "count",
		width: "15%"
	},
	{
		title: "Status",
		name: "status",
		width: "20%"
	},
	{
		title: "Last Status Date",
		name: "last",
		width: "30%"
	},
	{
		title: "",
		width: "20%",
		bodyRender: data => {
			return (
				<ul>
					<li />
					<li />
				</ul>
			);
		}
	}
];

class BattleList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			limit: 10,
			current: 0,
			total: 101,
			maxPageToShow: 8,
			pageSize: 20
		};
	}

	static propTypes = {
		battle: PropTypes.shape({
			isLoading: PropTypes.bool.isRequired
		})
	};

	onChange(data) {
		this.setState({
			current: data.current,
			pageSize: data.pageSize
		});
	}

	render() {
		const { isLoading } = this.props.battle;
		return (
			<div className="container">
				<Row>
					<Container>
						<Title>Leagues and Battles</Title>
						<Breadcrumb breads={[{ name: "Dashboard", href: "/" }]} />
					</Container>
					<Button
						type="primary"
						style={{ float: "right" }}
						onClick={() => this.props.history.push("/battle/add")}
					>
						<Icon type="plus" />
						New Battle
					</Button>
				</Row>
				<Row>
					<Table
						emptyLabel={isLoading ? "" : "there is no question in database"}
						columns={columns}
						datasets={datasets}
						rowKey="item_id"
						onChange={this.onChange.bind(this)}
						pageInfo={{
							limit: this.state.limit,
							current: this.state.current,
							maxPageToShow: this.state.maxPageToShow,
							total: this.state.total,
							pageSize: 20
						}}
					/>
				</Row>
			</div>
		);
	}
}

const Container = styled.div`
	display: inline-flex;
	margin-bottom: 15px;
	margin-left: 10px;
	align-items: center;
`;

const Title = styled.h1`
	font-size: 1.2em;
	color: #000;
	display: inline-block;
	margin-right: 15px;
`;

const mapStateToProps = state => ({
	battle: state.battle
});

export default connect(
	mapStateToProps,
	{}
)(BattleList);
