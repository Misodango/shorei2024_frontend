import { useState } from "react";
import MachineList from "../components/MachineList";
import AmbientMachineList from "../components/AmbientMachineList";
import {
	Container,
	Title,
	Paper,
	Tabs,
	Group,
	Alert,
	Text,
	ActionIcon,
	Tooltip,
	Switch,
	useMantineTheme,
} from "@mantine/core";
import {
	IconDatabase,
	IconCloudFilled,
	IconRefresh,
	IconInfoCircle,
} from "@tabler/icons-react";

function DashboardPage() {
	const [dataSource, setDataSource] = useState("local");
	const [autoRefresh, setAutoRefresh] = useState(false);
	const theme = useMantineTheme();

	return (
		<Container size="xl" py="xl">
			<Paper shadow="xs" p="md" mb="lg" radius="md">
				<Group position="apart">
					<Group>
						<Title order={1}>洗濯機ダッシュボード</Title>
						<Tooltip label="最終更新: 2025年3月17日 13:45">
							<ActionIcon color="gray" variant="subtle">
								<IconInfoCircle size={20} />
							</ActionIcon>
						</Tooltip>
					</Group>

					<Group>
						<Switch
							label="自動更新"
							checked={autoRefresh}
							onChange={(event) => setAutoRefresh(event.currentTarget.checked)}
						/>
						<Tooltip label="データを更新">
							<ActionIcon color="blue" variant="light" size="lg">
								<IconRefresh size={20} />
							</ActionIcon>
						</Tooltip>
					</Group>
				</Group>
			</Paper>

			<Tabs value={dataSource} onChange={setDataSource} radius="md" mb="lg">
				<Tabs.List grow>
					<Tabs.Tab value="local" icon={<IconDatabase size={16} />}>
						ローカルデータ
					</Tabs.Tab>
					<Tabs.Tab value="ambient" icon={<IconCloudFilled size={16} />}>
						Ambientデータ
					</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value="local" pt="md">
					<MachineList />
				</Tabs.Panel>

				<Tabs.Panel value="ambient" pt="md">
					<AmbientMachineList />
				</Tabs.Panel>
			</Tabs>
		</Container>
	);
}

export default DashboardPage;
