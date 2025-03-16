import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";

const GET_MACHINES = gql`
query {
	machines{
		id
		floor
		active
		available
		hasLaundry
	}
}
`;

const MachineList = () => {
	console.log("called");
	const { loading, error, data } = useQuery(GET_MACHINES, {});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	console.log(data);

	return (
		<div>
			<h2>洗濯機一覧</h2>
			<ul>
				{data.machines.map((machine) => (
					<li key={machine.id}>
						階数:{machine.floor}
						稼働中: {machine.active ? "はい" : "いいえ"} - 利用可能:{" "}
						{machine.available ? "はい" : "いいえ"}{" "}
					</li>
				))}
			</ul>
		</div>
	);
};
export default MachineList;
