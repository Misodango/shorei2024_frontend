import { useState, useEffect } from "react";
import {
	Group,
	Title,
	Text,
	Card,
	Badge,
	Grid,
	Loader,
	Stack,
	ThemeIcon,
	Paper,
	SegmentedControl,
} from "@mantine/core";
import {
	IconWashMachine,
	IconShirtFilled,
	IconCheck,
	IconX,
	IconActivityHeartbeat,
} from "@tabler/icons-react";

// Ambientデータを取得するカスタムフック
const useAmbientData = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [data, setData] = useState([]);

	const fetchData = async () => {
		try {
			setLoading(true);

			// .envファイルから環境変数を取得
			const channelId = import.meta.env.VITE_AMBIENT_CHANNEL_ID;
			const readKey = import.meta.env.VITE_AMBIENT_READ_KEY;

			console.log("here2");
			if (!channelId || !readKey) {
				throw new Error(
					"環境変数が設定されていません。.envファイルを確認してください。",
				);
			}

			// Ambient APIからデータを取得
			const response = await fetch(
				`https://ambidata.io/api/v2/channels/${channelId}/data?readKey=${readKey}&n=1`,
			);

			if (!response.ok) {
				throw new Error(`Ambient API エラー: ${response.status}`);
			}

			const rawData = await response.json();

			console.log(rawData);

			// d_i を洗濯機の ID として扱う
			const processedData = rawData
				.map((item) => {
					const timestamp = new Date(item.created);

					// 事前に決めた floor 配置
					const floorMapping = {
						1: 1,
						2: 1,
						3: 1, // 1F: 洗濯機 1〜3
						4: 2,
						5: 2,
						6: 2, // 2F: 洗濯機 4〜6
						7: 3,
						8: 3,
						9: 3,
						10: 3, // 3F: 洗濯機 7〜10
					};

					// d_1, d_2, ..., d_10 をそれぞれ処理
					return Object.keys(item)
						.filter((key) => key.startsWith("d")) // d_i のみを対象
						.map((key) => {
							const machineId = parseInt(key.slice(1), 10); // "d1" -> 1
							const vibrationValue = item[key]; // 0 or 1
							const floor = floorMapping[machineId] || 1; // floorMapping から取得

							return {
								id: machineId,
								floor: floor,
								timestamp: timestamp,
								active: vibrationValue === 1, // 稼働中
								available: vibrationValue === 0, // 利用可能
								vibration: vibrationValue,
								hasLaundry: vibrationValue === 1, // 洗濯物あり
							};
						});
				})
				.flat(); // 2次元配列をフラット化

			// 洗濯機IDでグループ化して最新の状態だけを取得
			const machineMap = new Map();
			processedData.forEach((machine) => {
				const existing = machineMap.get(machine.id);
				if (!existing || machine.timestamp > existing.timestamp) {
					machineMap.set(machine.id, machine);
				}
			});

			setData(Array.from(machineMap.values()));
			setLoading(false);
		} catch (err) {
			console.error("Ambientデータ取得エラー:", err);
			setError(err.message);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();

		// 1分ごとに更新
		const interval = setInterval(fetchData, 60000);

		return () => clearInterval(interval);
	}, []);

	return { loading, error, data, refetch: fetchData };
};

const AmbientMachineList = () => {
	const [selectedFloor, setSelectedFloor] = useState(null);
	const { loading, error, data, refetch } = useAmbientData();

	// 階数フィルター適用
	const filteredData = selectedFloor
		? data.filter((machine) => machine.floor === parseInt(selectedFloor))
		: data;

	// 階数の選択肢を作成
	const floorOptions = [
		{ label: "すべて", value: "all" },
		...Array.from(new Set(data.map((machine) => machine.floor)))
			.sort((a, b) => a - b)
			.map((floor) => ({ label: `${floor}F`, value: String(floor) })),
	];

	return (
		<Stack spacing="lg">
			<Group position="apart">
				<Title order={2}>洗濯機一覧 (Ambient)</Title>
				<Badge
					size="lg"
					color="blue"
					variant="outline"
					leftSection={<IconActivityHeartbeat size={14} />}
				>
					振動データ利用
				</Badge>
			</Group>

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
					<Text color="red">エラー: {error}</Text>
				</Paper>
			)}

			{!loading && !error && data.length === 0 && (
				<Paper p="md" radius="md" withBorder>
					<Text align="center">データがありません</Text>
				</Paper>
			)}

			{!loading && !error && filteredData.length > 0 && (
				<Grid>
					{filteredData.map((machine) => (
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
									<Text size="sm">利用可能:</Text>
									<Badge
										color={machine.available ? "green" : "red"}
										rightSection={
											machine.available ? (
												<IconCheck size={14} />
											) : (
												<IconCheck size={14} />
											)
										}
									>
										{machine.available ? "はい" : "いいえ"}
									</Badge>
								</Group>

								<Group position="apart" mt="xs">
									<Text size="sm">振動:</Text>
									<Badge color={machine.vibration === 1 ? "blue" : "gray"}>
										{machine.vibration === 1 ? "あり" : "なし"}
									</Badge>
								</Group>

								<Text size="xs" color="dimmed" mt="md">
									最終更新: {machine.timestamp.toLocaleString()}
								</Text>
							</Card>
						</Grid.Col>
					))}
				</Grid>
			)}
		</Stack>
	);
};

export default AmbientMachineList;
