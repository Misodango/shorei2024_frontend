import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import {
	Title,
	Group,
	SegmentedControl,
	Paper,
	Card,
	Badge,
	Grid,
	Text,
	Loader,
	Stack,
	ThemeIcon,
} from "@mantine/core";
import {
	IconWashMachine,
	IconShirtFilled,
	IconCheck,
	IconX,
} from "@tabler/icons-react";

const GET_MACHINES = gql`
  query GetMachines($floor: Int!) {
    getMachines(floor: $floor) {
      id
      floor
      active
      available
      hasLaundry
      timeRemaining
      endTime
    }
  }
`;

const MachineList = () => {
	const [selectedFloor, setSelectedFloor] = useState(null);
	const { loading, error, data } = useQuery(GET_MACHINES, {
		variables: { floor: selectedFloor ? parseInt(selectedFloor) : -1 },
	});

	// 階数の選択肢を作成
	const floorOptions = [
		{ label: "すべて", value: "all" },
		...Array.from({ length: 3 }, (_, i) => ({
			label: `${i + 1}F`,
			value: String(i + 1),
		})),
	];
	console.log(data);
	return (
		<Stack spacing="lg">
			<Title order={2}>洗濯機一覧</Title>

			<Paper p="md" radius="md" withBorder>
				<Group position="apart" align="center">
					<Text weight={500}>階数を選択:</Text>
					<SegmentedControl
						value={selectedFloor || "all"}
						onChange={(value) =>
							setSelectedFloor(value === "all" ? null : value)
						}
						data={floorOptions}
						size="sm"
					/>
				</Group>
			</Paper>

			{loading && (
				<Group position="center" p="xl">
					<Loader size="lg" variant="dots" />
				</Group>
			)}

			{error && (
				<Paper p="md" radius="md" withBorder color="red">
					<Text color="red">エラー: {error.message}</Text>
				</Paper>
			)}

			{data && (
				<Grid>
					{data.getMachines.map((machine) => (
						<Grid.Col key={machine.id} span={12} sm={6} md={4} lg={3}>
							<Card shadow="sm" p="lg" radius="md" withBorder>
								<Group position="apart">
									<Group>
										<ThemeIcon
											size="xl"
											radius="md"
											color={
												machine.active
													? machine.available
														? "teal"
														: "red"
													: "gray"
											}
											variant="light"
										>
											<IconWashMachine size={24} />
										</ThemeIcon>
										<div>
											<Text weight={700}>洗濯機 #{machine.id}</Text>
											<Text size="sm" color="dimmed">
												階数: {machine.floor}F
											</Text>
										</div>
									</Group>

									{machine.hasLaundry && (
										<Badge color="blue" variant="light">
											<Group spacing={4}>
												<IconShirtFilled size={12} />
												<span>洗濯物あり</span>
											</Group>
										</Badge>
									)}
								</Group>

								<Group position="apart" mt="md">
									<Text size="sm">稼働中:</Text>
									<Badge
										color={machine.active ? "green" : "gray"}
										variant="dot"
									>
										{machine.active ? "はい" : "いいえ"}
									</Badge>
								</Group>

								<Group position="apart" mt="xs">
									<Text size="sm">残り時間:</Text>
									<Text>
										{machine.endTime
											? (() => {
													const endTime = new Date(machine.endTime);
													const now = new Date();
													console.log("now", now);
													console.log("end", endTime);

													// 残り時間（ミリ秒）を計算
													const remainingMs = endTime - now;

													console.log(machine.id, "ms", remainingMs);
													// すでに終了している場合
													if (remainingMs <= 0) {
														return "終了";
													}
													// 残り時間を分と秒に変換
													const remainingMins = Math.floor(
														remainingMs / (1000 * 60),
													);
													const remainingSecs = Math.floor(
														(remainingMs % (1000 * 60)) / 1000,
													);
													console.log("mins", remainingMins);
													return `${remainingMins}分${remainingSecs}秒`;
											  })()
											: "情報なし"}
									</Text>
								</Group>

								<Group position="apart" mt="xs">
									<Text size="sm">利用可能:</Text>
									<Badge
										color={machine.available ? "green" : "red"}
										rightSection={
											machine.available ? (
												<IconCheck size={14} />
											) : (
												<IconX size={14} />
											)
										}
									>
										{machine.available ? "はい" : "いいえ"}
									</Badge>
								</Group>
							</Card>
						</Grid.Col>
					))}
				</Grid>
			)}
		</Stack>
	);
};

export default MachineList;
