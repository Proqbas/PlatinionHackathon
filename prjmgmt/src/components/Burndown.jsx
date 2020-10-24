import React, { PureComponent, Component } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from 'recharts';

const data = [
	{
	  name: 'Oct 11', uv: 4000, pv: 2400, amt: 2400,
	},
	{
	  name: 'Oct 12', uv: 3500, pv: 1398, amt: 2210,
	},
	{
	  name: 'Oct 13', uv: 3300, pv: 9800, amt: 2290,
	},
	{
	  name: 'Oct 14', uv: 2780, pv: 3908, amt: 2000,
	},
	{
	  name: 'Oct 15', uv: 1890, pv: 4800, amt: 2181,
	},
	{
	  name: 'Oct 16', uv: 1790, pv: 3800, amt: 2500,
	},
	{
	  name: 'Oct 17', uv: 1590, pv: 4300, amt: 2100,
	},
  ];

/**
 * Burndown component
 *
 * @class Burndown
 * @extends {Component}
 */
class Burndown extends Component {
  /**
   * Creates an instance of MemberCard.
   * @param {Object} props
   * @memberof Navigation
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<AreaChart
			data={data}
			margin={{
				top: 20, right: 40, left: 0, bottom: 20,
			}}
			>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="name" stroke="#000000" dy={10}/>
			<YAxis stroke="#000000"/>
			<Tooltip />
			<Area type="monotone" dataKey="uv" stroke="#000000" fill="#adff2f" />
			</AreaChart>
		</ResponsiveContainer>
	  );
  }
}

export default Burndown;
